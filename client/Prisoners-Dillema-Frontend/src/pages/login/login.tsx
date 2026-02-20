import LoginForm from '../../components/loginForm/LoginForm'
import './login.css'

function LoginPage() {
  return (
    <div className="LoginPage">
      <h2>Welcome to the prisoners dillema game</h2>
      <text> please type in a username and submin in order to join the game</text>
      <LoginForm />
    </div>
  )
}

export default LoginPage
