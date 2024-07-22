import { useEffect, useState } from "react";
import MyModal from "./components/MyModal";
import Template from "./Template";
import Swal from "sweetalert2";
import axios from "axios";
import config from "./config";

function Room() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [rooms, setRooms] = useState([]);

  const handleSave = async () => {
    try {
      const payload = {
        name: name,
        price: price,
      };
      const res = await axios.post(
        config.apiPath + "/api/room/create",
        payload
      );

      if (res.data.message === "success") {
        Swal.fire({
          title: "save",
          text: "save success",
          icon: "success",
          timer: 1000,
        });
        fetchData();
        document.getElementById("modalRoom_btnClose").click();
      }
    } catch (e) {
      Swal.fire({
        title: "error",
        text: e.message,
        icon: "error",
      });
    }
  };

  const fetchData = async () => {
    try {
      const res = await axios.get(config.apiPath + "/api/room/list");

      if (res.data.results !== undefined) {
        setRooms(res.data.results);
      }
    } catch (e) {
      Swal.fire({
        title: "error",
        text: e.message,
        icon: "error",
      });
    }
  };

  // onLoad
  useEffect(() => {
    /*
    ดึงข้อมูลทุกๆ 1000ms = 1 วินาที
    setTimeout(() => {
      fetchData();
    }, 1000);
    */
    fetchData();
  }, []);

  const handleDelete = async (item) => {
    try {
      const button = await Swal.fire({
        title: "Delete Room ?",
        text: "Are you sure",
        icon: "question",
        showCancelButton: true,
        showConfirmButton: true,
      });

      if (button.isConfirmed) {
        const res = await axios.delete(
          config.apiPath + "/api/room/remove/" + item.id
        );

        if (res.data.message === "success") {
          fetchData();
        }
      }
    } catch (e) {
      Swal.fire({
        title: "error",
        text: e.message,
        icon: "error",
      });
    }
  };

  return (
    <Template>
      <div className="h3">ห้องพัก</div>
      <button
        className="mt-3 btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#modalRoom"
      >
        <i className="fa fa-plus me-2"></i>
        New Record
      </button>

      <table className="mt-3 table table-bordered">
        <thead>
          <tr>
            <th>id</th>
            <th>ชื่อห้องพัก</th>
            <th>ราคาห้อง</th>
            <th width="110px"></th>
          </tr>
        </thead>
        <tbody>
          {rooms.length > 0 ? (
            rooms.map((item) => (
              <tr>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td className="text-center">
                  <button className="btn btn-primary me-1">
                    <i className="fa fa-pencil"></i>
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(item)}
                  >
                    <i className="fa fa-times"></i>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <></>
          )}
        </tbody>
      </table>

      <MyModal id="modalRoom" title="จัดการห้องพัก">
        <div>ชื่อห้องพัก</div>
        <input
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="mt-3">ราคาห้อง ต่อวัน</div>
        <input
          className="form-control"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <div className="mt-3">
          <button className="btn btn-primary" onClick={() => handleSave()}>
            <i className="fa fa-check me-2"></i>บันทึก
          </button>
        </div>
      </MyModal>
    </Template>
  );
}

export default Room;
