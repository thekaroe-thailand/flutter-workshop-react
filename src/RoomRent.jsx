import { useEffect, useState } from "react";
import Template from "./Template";
import Swal from "sweetalert2";
import axios from "axios";
import config from "./config";
import * as dayjs from "dayjs";
import MyModal from "./components/MyModal";

function RoomRent() {
  const [roomRents, setRoomRents] = useState([]);
  const [roomRent, setRoomRent] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(config.apiPath + "/api/roomRent/list");

      if (res.data.results !== undefined) {
        setRoomRents(res.data.results);
      }
    } catch (e) {
      Swal.fire({
        title: "error",
        text: e.message,
        icon: "error",
      });
    }
  };

  const openModalRoomRent = (item) => {
    setRoomRent(item);
  };

  return (
    <Template>
      <div className="card">
        <div className="card-header">ข้อมูลการจองห้องพัก</div>
        <div className="card-body">
          <table className="table table-bordered table-stripped">
            <thead>
              <tr>
                <th width="170px"></th>
                <th>ผู้จอง</th>
                <th>เบอร์โทร</th>
                <th>วันที่จอง</th>
                <th>วันที่จะเข้าพัก</th>
                <th>วันที่สิ้นสุด</th>
                <th>วันที่ชำระเงิน</th>
              </tr>
            </thead>
            <tbody>
              {roomRents.length > 0 ? (
                roomRents.map((item) => (
                  <tr>
                    <td>
                      <button
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#modalRoomRent"
                        onClick={() => openModalRoomRent(item)}
                      >
                        <i className="fa fa-file-alt me-2"></i>ข้อมูลการจอง
                      </button>
                    </td>
                    <td>{item.customerName}</td>
                    <td>{item.customerPhone}</td>
                    <td>{dayjs(item.rentDate).format("DD/MM/YYYY HH:mm")}</td>
                    <td>{dayjs(item.checkinDate).format("DD/MM/YYYY")}</td>
                    <td>{dayjs(item.checkoutDate).format("DD/MM/YYYY")}</td>
                    <th>
                      {item.payDate !== null ? (
                        dayjs(item.payDate).format("DD/MM/YYYY HH:mm")
                      ) : (
                        <span className="badge badge-danger">รอการชำระ</span>
                      )}
                    </th>
                  </tr>
                ))
              ) : (
                <></>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <MyModal id="modalRoomRent" title="ข้อมูลการจองห้องพัก">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>ห้อง</th>
              <th className="text-end">ราคา</th>
            </tr>
          </thead>
          <tbody>
            {roomRent.RoomRentDetails !== undefined &&
            roomRent.RoomRentDetails.length > 0 ? (
              roomRent.RoomRentDetails.map((item) => (
                <tr>
                  <td>{item.Room.name}</td>
                  <td className="text-end">{item.Room.price}</td>
                </tr>
              ))
            ) : (
              <></>
            )}
          </tbody>
        </table>
      </MyModal>
    </Template>
  );
}

export default RoomRent;
