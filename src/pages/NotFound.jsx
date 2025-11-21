import React from 'react';
import { Link } from 'react-router';

const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200">
            <div className="text-center px-6">
                <h1 className="text-9xl font-bold text-primary">404</h1>
                <h2 className="text-3xl font-semibold mt-4 mb-2">Page Not Found</h2>
                <p className="text-lg opacity-70 mb-8">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <Link to="/" className="btn btn-primary btn-lg">
                    Go Back Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;