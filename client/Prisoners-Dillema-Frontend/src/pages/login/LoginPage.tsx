import LoginForm from '../../components/loginForm/LoginForm'
import useWindowDimensions from '../../hooks/windowDimensions'

function LoginPage() {
  const { height, width } = useWindowDimensions();

  if (width < 723) {
    return (
      <div className="flex-block h-screen w-screen">
        <div className="w-1/2 bg-secondary flex-auto flex-col justify-center p-14">
          <h1 className="text-6xl font-black mb-8 text-gray-900 tracking-tight drop-shadow-lg">Prisoner's Dilemma</h1>
          <p className="text-lg text-gray-900 max-w-lg leading-relaxed">
            You will simulate the prisoners dilemma against other players, instead of jail time you're playing for points.
            <br /><br />
            The Prisoner's Dilemma is a game theory problem where two players can either cooperate or defect. It describes
            a situation where two individuals act on an incentive to protect themselves at the expense of the other.
          </p>
        </div>
        <div className="bg-tertiary flex flex-col items-center justify-center p-8 shadow-2xl">
          <h2 className="text-4xl font-bold mb-3 text-gray-900">Log in?</h2>
          <p className="text-gray-700 mb-8 text-center max-w-md text-lg font-medium">Will you spare others and risk your safety, or put it all on the line for the gretest payout or the greatest loss?</p>
          <LoginForm />
        </div>
      </div>
    )

  } else {
    return (
      <div className="flex h-screen w-screen">
        <div className="w-1/2 bg-secondary flex flex-col justify-center p-16 ">
          <h1 className="text-6xl font-black mb-8 text-gray-900 tracking-tight drop-shadow-lg">Prisoner's Dilemma</h1>
          <p className="text-lg text-gray-900 max-w-lg leading-relaxed">
            You will simulate the prisoners dilemma against other players, instead of jail time you're playing for points.
            <br /><br />
            The Prisoner's Dilemma is a game theory problem where two players can either cooperate or defect. It describes
            a situation where two individuals act on an incentive to protect themselves at the expense of the other.
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

}

export default LoginPage
