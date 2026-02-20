import { postRequest } from '../../utils/apiRequests';

function LoginForm() {

    function handleSubmit(formData: any) {
        const username = formData.get('username')
        postRequest('/login', { user: username })
    }

    return (
        <form className="flex flex-col gap-4 max-w-sm">
            <input type="text" placeholder="Username" className="px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary" />
            <button type="submit" className="px-6 py-2 bg-secondary text-white rounded-lg hover:bg-primary transition-colors">Login</button>
        </form>
    )
}

export default LoginForm
