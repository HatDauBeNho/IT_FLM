import threading
import time
from PostgresManager import PostgresManager
from datetime import datetime
from config import ConfigReader
from urllib.parse import quote

class GPACaculation(threading.Thread):
    def __init__(self):
        threading.Thread.__init__(self,daemon=True)
        self.config = ConfigReader()
    
    def run(self):
        try:
            while True:
                time_start = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
                print(f"Thread gpa calculatate - start - {time_start}")
                self.caculate()
                time_end = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
                print(f"Thread gpa calculatate - end {time_end}")
                print("\n<<<<<< ========================================== >>>>>\n")
                time.sleep(self.config.get_time_sleep())
        except Exception as ex:
            print(ex)
            
    def open_connection(self):
        try:
            host, port, user, password, database = self.config.get_config_postgres()
            encoded_password = quote(password, safe='')
            connection_string = f'postgresql+psycopg2://{user}:{encoded_password}@{host}:{port}/{database}'
            return PostgresManager(connection_string)
        except Exception as ex:
            print("Failed to open database connection")
            raise       
    
    def caculate(self):
        try:
            with self.open_connection() as postgres_manager:
                joins = [
                    ("tb_classroom", "tb_classroom.class_id = tb_course_registration.class_id"),
                    ("tb_course","tb_course.course_id = tb_classroom.course_id")
                ]
                
                columns = [
                    "MAX(tb_course_registration.point) AS max_point",
                    "tb_course.course_id",
                    "tb_course_registration.student_id",
                    "tb_course.credit"
                ]
                
                condition = (f"tb_course_registration.student_id = 11 AND tb_course_registration.point <> -1 group by tb_course.course_id, tb_course_registration.student_id ORDER BY tb_course.course_id;")
                list_point = postgres_manager.select_with_join("tb_course_registration", columns, condition, joins)
                
                if not list_point:
                    print("Nothing point to cal")
                    return
                
                gpa = 0
                sum = 0
                for point in list_point:
                    max_point, course_id, student_id, credit = point
                    sum = sum + max_point*credit
                print(f"Tong {sum}")

        except Exception as ex:
            print(ex)   
    
    