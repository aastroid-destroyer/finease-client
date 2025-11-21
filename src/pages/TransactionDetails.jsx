import React, { useEffect, useState } from 'react';
import { useParams, Link, useLoaderData } from 'react-router';
import toast from 'react-hot-toast';
import TranDetailCard from '../components/TranDetailCard';

const TransactionDetails = () => {
    const { id } = useParams();
    const transaction = useLoaderData()
    const [loading, setLoading] = useState(true);
    if (!loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    if (!transaction) {
        return (
            <div className="container mx-auto px-4 py-10 text-center">
                <h2 className="text-2xl font-bold mb-4">Transaction not found</h2>
                <Link to="/my-transactions" className="btn btn-primary">
                    Back to Transactions
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-10">
            <div className="max-w-3xl mx-auto">
                {/* Back Button */}
                <Link to="/my-transactions" className="btn btn-ghost mb-6">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                    </svg>
                    Back to My Transactions
                </Link>

                <h1 className="text-4xl font-bold text-center mb-8">
                    Transaction Details
                </h1>

                <TranDetailCard transaction={transaction}/>
            </div>
        </div>
    );
};

export default TransactionDetails;