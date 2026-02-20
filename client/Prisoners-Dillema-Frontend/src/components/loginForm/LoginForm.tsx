function LoginForm() {
    return (
        <form className="flex flex-col gap-4 max-w-sm">
            <input type="text" placeholder="Username" className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">Login</button>
        </form>
    )
}

export default LoginForm
