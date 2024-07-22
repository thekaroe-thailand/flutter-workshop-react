import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import config from "./config";

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const payload = {
        username: username,
        password: password,
      };
      const url = config.apiPath + "/api/user/signIn";
      console.log(url);
      const res = await axios.post(url, payload);

      if (res.data.token !== undefined) {
        localStorage.setItem("token_flutter", res.data.token);
        navigate("/home");
      }
    } catch (e) {
      Swal.fire({
        title: "Error",
        text: e.message,
        icon: "error",
      });
    }
  };

  return (
    <>
      <div class="card m-4">
        <div class="card-header">SignIn</div>
        <div class="card-body">
          <div>Username</div>
          <div>
            <input
              class="form-control"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div class="mt-3">Password</div>
          <div>
            <input
              class="form-control"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
          </div>
          <div class="mt-3">
            <button onClick={() => handleSignIn()} class="btn btn-primary">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignIn;
