import React from 'react'
import { Link } from 'react-router'

const LogSign = () => {
    return (
        <div className="flex gap-2">
            <Link
                className="px-4 py-2 text-sm font-medium text-base-content border border-base-300 rounded-lg hover:bg-base-200 transition-all duration-300"
                to="/login"
            >
                Login
            </Link>
            <Link
                className="px-4 py-2 text-sm font-medium text-base-100 bg-primary hover:bg-primary/90 rounded-lg transition-all duration-300"
                to="/signup"
            >
                Signup
            </Link>
        </div>
    )
}

export default LogSign