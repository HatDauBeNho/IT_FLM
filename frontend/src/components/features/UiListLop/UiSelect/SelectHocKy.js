import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { GetValueStore } from "src/components/function";
import { APIGetSemester } from "src/services/connectAPI/admin";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";

const SelectHocKy = (props) => {
  const { StoreSelectHocKy } = GetValueStore();
  const [list, setList] = useState([]);

  const handleGetData = async () => {
    try {
      const ret = await APIGetSemester();
      const newData = ret?.data || [];
      setList(newData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    handleGetData();
  }, []);

  return (
    <Form.Select
      className={`Select-Permission ${props.className}`}
      defaultValue={StoreSelectHocKy || 1}
      onChange={(e) => props.onClick(e.target.value)}
    >
      {list.map((item) => (
        <option key={item.semesterId} value={item.semesterId}>
          {item.name}
        </option>
      ))}
    </Form.Select>
  );
};

export default SelectHocKy;
