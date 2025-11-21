import React, { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { AuthContext } from "../conext/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import Switch from "./ToggleSwitch";
import LogSign from "./shortcomps/LogSign";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, signOutFunc, loading, setUser } = useContext(AuthContext);

    if (loading) return null;

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                setUser(null);
                navigate('/');
            })
            .catch((error) => {
                console.error('Logout error:', error);
            });
    };

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="sticky top-0 z-50 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-lg border-b border-gray-100 dark:border-gray-800 transition-all duration-500">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Left Section */}
                    <div className="flex items-center gap-8">
                        {/* Mobile Menu */}
                        <div className="dropdown lg:hidden">
                            <label tabIndex={0} className="btn btn-ghost btn-sm btn-circle hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h12M4 18h16" />
                                </svg>
                            </label>

                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content mt-3 z-[20] p-2 shadow-2xl bg-white dark:bg-gray-900 rounded-2xl w-56 space-y-1 border border-gray-100 dark:border-gray-800"
                            >
                                <li>
                                    <Link to="/" className={`font-semibold rounded-lg transition-all duration-300 ${isActive('/') ? 'bg-[#644dff] text-white shadow-lg scale-105' : 'hover:bg-blue-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'}`}>
                                        Home
                                    </Link>
                                </li>
                                {user && (
                                    <>
                                        <li>
                                            <Link to="/add-transaction" className={`font-semibold rounded-lg transition-all duration-300 ${isActive('/add-transaction') ? 'bg-[#644dff] text-white shadow-lg scale-105' : 'hover:bg-blue-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'}`}>
                                                Add Transaction
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/my-transactions"
                                                className={`font-semibold rounded-lg transition-all duration-300 ${isActive('/my-transactions') ? 'bg-[#644dff] text-white shadow-lg scale-105' : 'hover:bg-blue-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'}`}
                                            >
                                                My Transactions
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/reports"
                                                className={`font-semibold rounded-lg transition-all duration-300 ${isActive('/reports') ? 'bg-[#644dff] text-white shadow-lg scale-105' : 'hover:bg-blue-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'}`}
                                            >
                                                Reports
                                            </Link>
                                        </li>
                                        <li className="px-3 py-2">
                                            <Switch />
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>

                        {/* Logo */}
                        <Link
                            to="/"
                            className="flex items-center gap-2 group"
                        >
                            <div className="relative">
                            </div>
                            <span className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                FinEase
                            </span>
                        </Link>

                        {/* Center Navigation for Desktop */}
                        <div className="hidden lg:flex">
                            <ul className="flex items-center gap-2">
                                <li>
                                    <Link
                                        className={`relative px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-lg ${isActive('/') ? 'text-white bg-[#644dff] shadow-lg shadow-blue-500/30 scale-105' : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-105'}`}
                                        to="/"
                                    >
                                        Home
                                    </Link>
                                </li>

                                {user && (
                                    <>
                                        <li>
                                            <Link
                                                className={`relative px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-lg ${isActive('/add-transaction') ? 'text-white bg-[#644dff] shadow-lg shadow-blue-500/30 scale-105' : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-105'}`}
                                                to="/add-transaction"
                                            >
                                                Add Transaction
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                className={`relative px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-lg ${isActive('/my-transactions') ? 'text-white bg-[#644dff] shadow-lg shadow-blue-500/30 scale-105' : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-105'}`}
                                                to="/my-transactions"
                                            >
                                                My Transactions
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                className={`relative px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-lg ${isActive('/reports') ? 'text-white bg-[#644dff] shadow-lg shadow-blue-500/30 scale-105' : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-105'}`}
                                                to="/reports"
                                            >
                                                Reports
                                            </Link>
                                        </li>
                                        <li className="px-3 py-2">
                                            <Switch />
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-3">
                        {user ? (
                            <div className="dropdown dropdown-end">
                                <label
                                    tabIndex={0}
                                    className="btn btn-ghost btn-circle avatar hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
                                >
                                    <div className="w-10 h-10 rounded-full ring-2 ring-blue-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-900 overflow-hidden">
                                        <img
                                            src={user.photoURL || "https://via.placeholder.com/150"}
                                            alt="Profile"
                                            className="object-cover"
                                        />
                                    </div>
                                </label>

                                <ul
                                    tabIndex={0}
                                    className="mt-3 z-[20] p-2 shadow-2xl menu menu-sm dropdown-content bg-white dark:bg-gray-900 rounded-2xl w-64 border border-gray-100 dark:border-gray-800"
                                >
                                    <li className="p-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-blue-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-900">
                                                <img
                                                    src={user.photoURL || "https://via.placeholder.com/150"}
                                                    alt="Profile"
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="font-semibold text-gray-900 dark:text-white truncate">
                                                    {user.displayName || "User"}
                                                </div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</div>
                                            </div>
                                        </div>
                                    </li>

                                    <div className="divider my-1"></div>

                                    <li>
                                        <Link
                                            to="/my-profile"
                                            className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
                                        >
                                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            <span className="font-medium text-gray-700 dark:text-gray-300">My Profile</span>
                                        </Link>
                                    </li>

                                    <li>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-xl font-medium transition-all duration-300 shadow-md hover:shadow-lg"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <LogSign />
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;