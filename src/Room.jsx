import { useState } from "react";
import MyModal from "./components/MyModal";
import Template from "./Template";
import Swal from "sweetalert2";
import axios from "axios";
import config from "./config";

function Room() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);

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
