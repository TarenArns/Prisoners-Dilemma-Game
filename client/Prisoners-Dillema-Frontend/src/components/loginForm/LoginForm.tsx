function LoginForm() {

    async function handleSubmit(formData: FormData) {
        const username = formData.get('username')
        const response = postRequest('/login', { username })
        console.log(response)
    }

    return (
        <form className="flex flex-col gap-4 max-w-sm">
            <input type="text" placeholder="Username" className="px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary" />
            <button type="submit" className="px-6 py-2 bg-secondary text-white rounded-lg hover:bg-primary transition-colors">Login</button>
        </form>
    )
}

export default LoginForm
