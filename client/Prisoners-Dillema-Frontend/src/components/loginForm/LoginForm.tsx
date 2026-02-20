import './loginForm.css'
import { postRequest } from '../../utils/apiRequests';

function LoginForm() {

    function handleSubmit(formData: any) {
        const username = formData.get('username')
        postRequest('/login', { user: username })
    }

    return (
        <form className="login-form" action={handleSubmit}>
            <input type="text" placeholder="Username" name='username' className="login-input" />
            <button type="submit" className="login-button">Login</button>
        </form>
    )
}

export default LoginForm
