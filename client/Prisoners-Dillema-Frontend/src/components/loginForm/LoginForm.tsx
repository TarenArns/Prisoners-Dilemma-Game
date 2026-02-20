import './loginForm.css'
import { io } from "socket.io-client";

export const socket = io("http://localhost:6769");

function LoginForm() {

    function handleSubmit(formData: any) {
        const username = formData.get('username')
        const response = postRequest('/login', { username })
        console.log(response)
    }

    return (
        <form className="login-form" action={handleSubmit}>
            <input type="text" placeholder="Username" name='username' className="login-input" />
            <button type="submit" className="login-button">Login</button>
        </form>
    )
}

export default LoginForm
