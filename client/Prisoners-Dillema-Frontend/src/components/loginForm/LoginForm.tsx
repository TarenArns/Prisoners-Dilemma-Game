import './loginForm.css'

function LoginForm() {
    return (
        <form className="login-form">
            <input type="text" placeholder="Username" className="login-input" />
            <button type="submit" className="login-button">Login</button>
        </form>
    )
}

export default LoginForm
