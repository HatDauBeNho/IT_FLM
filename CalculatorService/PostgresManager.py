from sqlalchemy import func,create_engine, Column, Integer, String, MetaData, text, select, delete, join ,text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import SQLAlchemyError
from datetime import datetime
import psycopg2
Base = declarative_base() 

class PostgresManager:
    def __init__(self, connection_string):
        self.engine = create_engine(connection_string)
        self.Session = sessionmaker(bind=self.engine)
        self.session = self.Session()
        self.metadata = MetaData()
    
    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.session.close()
        self.engine.dispose()
            
    def get_table(self, table_name):
        self.metadata.reflect(bind=self.engine, views=True)
        table = self.metadata.tables.get(table_name)
        if table is None:
            raise ValueError(f"Table '{table_name}' does not exist.")
        return table

    def insert_data(self, table_name, **kwargs):
        table = self.get_table(table_name)
        new_data = table.insert().values(**kwargs)
        result=self.session.execute(new_data)
        self.session.commit()
        return result.inserted_primary_key[0]

    def update_data(self, table_name, condition, **kwargs):
        table = self.get_table(table_name)
        update_query = table.update().where(text(condition)).values(**kwargs)
        result = self.session.execute(update_query)
        if result.rowcount > 0:
            self.session.commit()
        else:
            pass

    def delete_data(self, table_name, condition):
        try:
            table = self.get_table(table_name)
            delete_query = delete(table).where(text(condition))
            self.session.execute(delete_query)
            self.session.commit()
            print("Data deleted.")
        except SQLAlchemyError as e:
            self.session.rollback()
            print(f"Error deleting data: {e}")
            raise # Re-raise exception để xử lý ở cấp độ cao hơn

    def select_data(self, table_name, columns=None, condition=None):
        table = self.get_table(table_name)
        query = table.select()

        if columns:
            if columns == '*':
                query = query.with_only_columns()
            else:
                column_list = [getattr(table.c, column) for column in columns]
                query = query.with_only_columns(*column_list)

        if condition:
            query = query.where(text(condition))

        result = self.session.execute(query)
        rows = result.fetchall()

        return rows

    def select_with_join(self, table_name, columns=None, condition=None, joins=None):
        # Lấy bảng chính
        main_table = self.get_table(table_name)

        # Chuẩn bị danh sách cột
        column_list = []
        if columns:
            for column in columns:
                if '.' in column:
                    # Xử lý trường hợp có alias bảng
                    table_alias, column_name = column.split('.', 1)
                    table_obj = self.get_table(table_alias)
                    column_list.append(getattr(table_obj.c, column_name.strip('"')))
                elif column.lower().startswith("max(") and column.endswith(")"):
                    # Xử lý cú pháp MAX() trong SQLAlchemy
                    column_name = column[4:-1].strip()  # Loại bỏ 'MAX(' và ')'
                    column_list.append(func.max(getattr(main_table.c, column_name.strip('"'))))
                else:
                    column_list.append(getattr(main_table.c, column.strip('"')))
        else:
            column_list = [main_table]  # Lấy tất cả các cột

        # Khởi tạo truy vấn SELECT (truyền *column_list)
        query = select(*column_list)

        # Thêm JOIN
        if joins:
            current_table = main_table
            for join_table_name, join_condition in joins:
                join_table = self.get_table(join_table_name)
                current_table = join(current_table, join_table, text(join_condition))

            query = query.select_from(current_table)
        else:
            query = query.select_from(main_table)

        if condition:
            query = query.where(text(condition))
        
        # Đảm bảo group by nếu có nhóm
        if 'group by' in condition.lower():
            query = query.group_by(text(condition.split('group by')[1].strip()))

        print(f"Generated SQL Query: {query}")

        # Thực thi truy vấn
        result = self.session.execute(query)
        return result.fetchall()
    
    def close_connection(self):
        self.session.close()
        print("Connection closed.")
    
    