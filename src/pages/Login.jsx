import { useContext, useEffect, useState } from "react"
import { useNavigate, Link, useLocation } from "react-router"
import { toast } from "react-toastify"
import { AuthContext } from "../conext/AuthContext"
import { FcGoogle } from "react-icons/fc"

export const Login = () => {
    const { signInWithemailfunc, signinWithPopupfunc, user, setUser, loginEmailRef } = useContext(AuthContext);
    const [loading, setLoading] = useState(false)
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "FinEase"
        if (user) {
            navigate('/')
        }
    }, [user, navigate])

    const handleEmailLogin = (e) => {
        e.preventDefault();
        const email = loginEmailRef.current.value;
        const password = e.target.password.value;
        setLoading(true)
        signInWithemailfunc(email, password)
            .then(() => {
                toast.success("You're logged in")
                navigate('/')
            })
            .finally(() => setLoading(false))
    }

    const signInwithgooglefunc = () => {
        setLoading(true)
        signinWithPopupfunc()
            .then(res => {
                toast.success("You're logged in")
                navigate('/')
            })
            .finally(() => setLoading(false))
    }
    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4">
            <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-bold text-white text-center mb-6">Login</h1>
                <form onSubmit={handleEmailLogin} className="space-y-4">
                    <div>
                        <label className="block text-gray-300 mb-2">Email</label>
                        <input
                            ref={loginEmailRef}
                            name="email"
                            type="email"
                            required
                            className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-accent"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300 mb-2">Password</label>
                        <input
                            name="password"
                            type="password"
                            required
                            className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-accent"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-accent hover:bg-blue-600 text-white font-semibold py-2 rounded transition duration-200 disabled:opacity-50"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
                <button
                    onClick={signInwithgooglefunc}
                    disabled={loading}
                    className="w-full mt-4 bg-white hover:bg-gray-200 text-gray-900 font-semibold py-2 rounded transition duration-200 disabled:opacity-50 flex justify-center items-center space-x-2"
                >
                    <FcGoogle className="h-5 w-5" />
                    <span>Login with Google</span>
                </button>
                <div className="mt-4 text-center text-gray-400">
                    <p>
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-accent hover:underline">
                            Register here
                        </Link>
                    </p>
                    <Link to="/forgot-password" className="text-accent hover:underline text-sm">
                        Forgot password?
                    </Link>
                </div>
            </div>
        </div>
    )
}
