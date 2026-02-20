import LoginForm from '../../components/loginForm/LoginForm'

function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center bg-tertiary h-screen w-screen">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">Welcome to the prisoners dillema game</h2>
      <p className="text-gray-600 mb-6 text-center">please type in a username and submin in order to join the game</p>
      <LoginForm />
    </div>
  )
}

export default LoginPage
