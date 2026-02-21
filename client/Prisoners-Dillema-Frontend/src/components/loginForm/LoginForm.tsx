import { useNavigate } from 'react-router-dom';
import { useSocket } from '../../hooks/useSocket';

function LoginForm() {
    const socket = useSocket();
    const navigate = useNavigate();

    function handleSubmit(formData: any) {
        const username = formData.get('username');
        socket.emit('login', { user: username });
        socket.on("request_response", () => {
            navigate('/lobbyselect');
        })
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm">
            <input name="username" type="text" placeholder="Username" className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">Login</button>
        </form>
    )
}

export default LoginForm
