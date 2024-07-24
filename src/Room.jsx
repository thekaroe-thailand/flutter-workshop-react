import { useEffect, useState } from "react";
import MyModal from "./components/MyModal";
import Template from "./Template";
import Swal from "sweetalert2";
import axios from "axios";
import config from "./config";

function Room() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [rooms, setRooms] = useState([]); // ใช้เพื่อเอาไป loop เลยต้องสร้างแบบ Array
  const [room, setRoom] = useState({}); // defind object
  const [fileRoom, setFileRoom] = useState(null);
  const [roomImages, setRoomImages] = useState([]);

  const chooseFile = (files) => {
    if (files !== undefined) {
      if (files !== null) {
        if (files.length > 0) {
          const file = files[0];
          setFileRoom(file);
        }
      }
    }
  };

  const uploadFile = async () => {
    try {
      if (fileRoom !== null) {
        let formData = new FormData();
        formData.append("fileRoom", fileRoom);
        const headers = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
        await axios.post(
          config.apiPath + "/api/roomImage/create/" + room.id,
          formData,
          headers
        );

        fetchDataRoomImages(room.id);

        document.getElementById("modalRoomImage_btnClose").click();
      }
    } catch (e) {
      Swal.fire({
        title: "error",
        text: e.message,
        icon: "error",
      });
    }
  };

  const fetchDataRoomImages = async (roomId) => {
    try {
      const res = await axios.get(
        config.apiPath + "/api/roomImage/list/" + roomId
      );

      if (res.data.results !== undefined) {
        setRoomImages(res.data.results);
      }
    } catch (e) {
      Swal.fire({
        title: "error",
        text: e.message,
        icon: "error",
      });
    }
  };

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

  const chooseRoom = (item) => {
    setRoom(item);
    fetchDataRoomImages(item.id);
  };

  const removeRoomImage = async (item) => {
    try {
      const button = await Swal.fire({
        title: "ลบภาพ",
        text: "ยืนยันการลบภาพของห้องนี้",
        icon: "question",
        showCancelButton: true,
        showConfirmButton: true,
      });

      if (button.isConfirmed) {
        await axios.delete(config.apiPath + "/api/roomImage/remove/" + item.id);
        fetchDataRoomImages(item.roomId);
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
            <th width="160px"></th>
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
                  <button
                    className="btn btn-success me-1"
                    data-bs-toggle="modal"
                    data-bs-target="#modalRoomImage"
                    onClick={() => chooseRoom(item)}
                  >
                    <i className="fa fa-image"></i>
                  </button>
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

      <MyModal id="modalRoomImage" title="เลือกภาพของห้องพัก">
        <div className="row">
          <div className="col-2">ห้อง</div>
          <div className="col-10">
            <input className="form-control" disabled value={room.name} />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-2">เลือกภาพ</div>
          <div className="col-10">
            <input
              className="form-control"
              type="file"
              onChange={(e) => chooseFile(e.target.files)}
            />
          </div>
        </div>

        <div className="text-center">
          <button className="mt-3 btn btn-primary" onClick={() => uploadFile()}>
            <i className="fa fa-plus me-2"></i>เพิ่มภาพของห้องนี้
          </button>
        </div>

        <div className="row mt-3">
          {roomImages.length > 0 ? (
            roomImages.map((item) => (
              <div className="col-4">
                <div className="card">
                  <div className="card-image">
                    <img
                      src={config.apiPath + "/uploads/" + item.name}
                      width="100%"
                    />
                  </div>
                  <div className="card-body text-center">
                    <button
                      className="btn btn-danger"
                      onClick={() => removeRoomImage(item)}
                    >
                      <i className="fa fa-times me-2"></i>ลบภาพ
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
      </MyModal>

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
