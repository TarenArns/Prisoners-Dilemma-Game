import { useNavigate } from 'react-router-dom';
import { useSocket } from '../../hooks/useSocket';

function LoginForm() {

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const username = formData.get("username");

        const response = await postRequest("/login", { user: username });
        console.log(response.data);
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm">
            <input type="text" placeholder="Username" name="username" className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">Login</button>
        </form>
    )
}

export default LoginForm
