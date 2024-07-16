import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function SignIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = async () => {
        try {
            const payload = {
                username: username,
                password: password
            }
            const res = await axios.post('http://localhost:3000/api/admin/singIn', payload);

            if (res.data.message === 'success') {
                alert('ok success');
            }
        } catch (e) {
            Swal.fire({
                title: 'Error',
                text: e.message,
                icon: 'error',
            })
        }
    }

    return <>
        <div class="card m-4">
            <div class="card-header">SignIn</div>
            <div class="card-body">
                <div>Username</div>
                <div>
                    <input class="form-control"
                        onChange={e => setUsername(e.target.value)} />
                </div>
                <div class="mt-3">Password</div>
                <div>
                    <input class="form-control"
                        onChange={e => setPassword(e.target.value)}
                        type="password" />
                </div>
                <div class="mt-3">
                    <button onClick={() => handleSignIn()} class="btn btn-primary">Sign In</button>
                </div>
            </div>
        </div>
    </>
}

export default SignIn;