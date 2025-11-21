import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../firebase/firebase.config";

const SignupPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        document.title = "FinEase ";
    }, []);

    const handleRegister = async (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const photoURL = e.target.photo?.value || "https://via.placeholder.com/150?text=User";

        // Password validation: 8+ chars, uppercase, lowercase, number, symbol
        const passwordRegEx = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?\W).{8,}$/;
        if (!passwordRegEx.test(password)) {
            toast.error("⚠️ Weak Password: Needs 8+ chars, Uppercase, Lowercase, Number, and Symbol.");
            return;
        }

        setLoading(true);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, { displayName: name, photoURL });
            toast.success("Registration successful!");
            navigate("/login");
        } catch (error) {
            toast.error(error.message || "Something went wrong during registration.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4">
            <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-bold text-white text-center mb-6">Register</h1>

                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label className="block text-gray-300 mb-2">Name</label>
                        <input
                            name="name"
                            type="text"
                            required
                            className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-accent"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300 mb-2">Email</label>
                        <input
                            name="email"
                            type="email"
                            required
                            className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-accent"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300 mb-2">Photo URL</label>
                        <input
                            name="photo"
                            type="url"
                            placeholder="https://example.com/photo.jpg"
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
                        <p className="text-xs text-gray-400 mt-1">
                            Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 symbol
                        </p>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-accent hover:bg-blue-600 text-white font-semibold py-2 rounded transition duration-200 disabled:opacity-50"
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>

                <div className="mt-4 text-center text-gray-400">
                    <p>
                        Already have an account?{" "}
                        <Link to="/login" className="text-accent hover:underline">
                            Login here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
