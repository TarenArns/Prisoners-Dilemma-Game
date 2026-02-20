import './loginForm.css'
import { postRequest } from '../../utils/apiRequests';



function LoginForm() {

    async function handleSubmit(formData: FormData) {
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
