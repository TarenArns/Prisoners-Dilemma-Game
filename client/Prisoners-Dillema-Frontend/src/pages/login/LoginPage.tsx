import LoginForm from '../../components/loginForm/LoginForm'

function LoginPage() {
  return (
    <div className="flex h-screen w-screen">
      <div className="w-1/2 bg-secondary flex flex-col justify-center p-16">
        <h1 className="text-6xl font-black mb-8 text-gray-900 tracking-tight drop-shadow-lg">Prisoner's Dilemma</h1>
        <p className="text-lg text-gray-900 max-w-lg leading-relaxed">
          (all temp text and im really tired so please dont let this into the final version.)
          <br /><br />
          in this game you will simulate the prisoners dillema agains other players, exept instead of jail time, youre palying for points.
          <br /><br />
          the prisoners dillema is a game theory problem where two players can either cooperate or defect. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Pellentesque sem dolor, eleifend nec nunc aliquam, consequat varius lectus. Aenean vestibulum est quis faucibus mollis. Maecenas nisi massa, porttito
        </p>
      </div>
      <div className="w-1/2 bg-tertiary flex flex-col items-center justify-center p-8 shadow-2xl">
        <h2 className="text-4xl font-bold mb-3 text-gray-900">Log in?</h2>
        <p className="text-gray-700 mb-8 text-center max-w-md text-lg font-medium">Will you spare others and risk your safety, or put it all on the line for the gretest payout or the greatest loss?</p>
        <LoginForm />
      </div>
    </div>
  )
}

export default LoginPage
