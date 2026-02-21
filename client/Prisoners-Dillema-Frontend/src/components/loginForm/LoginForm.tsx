import { postRequest } from '../../utils/apiRequests';

function LoginForm() {

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const username = formData.get("username");

        const response = await postRequest("/login", { user: username }) as any;
        if(response.data === "SUCCESS") {
            window.location.href = "/lobbySelect";
        }
        else {
            alert("Login failed. Please try again.");
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm">
            <input type="text" placeholder="Username" name="username" className="px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary" />
            <button type="submit" className="px-6 py-2 bg-secondary text-white rounded-lg hover:bg-primary transition-colors">Login</button>
        </form>
    )
}

export default LoginForm

