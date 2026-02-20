import axios from 'axios';
import './loginForm.css'



function LoginForm() {

    async function handleSubmit(formData: FormData) {
        const username = formData.get('username')
        let url = 'http://localhost:6769/api/login';

        const response = await axios.post(url, {user: username});
        console.log(response.data)
    }

    return (
        <form className="login-form" action={handleSubmit}>
            <input type="text" placeholder="Username" name='username' className="login-input" />
            <button type="submit" className="login-button">Login</button>
        </form>
    )
}

export default LoginForm
