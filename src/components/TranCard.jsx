import React, { use } from 'react'
import { Link, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../conext/AuthContext';

const TranCard = ({ transaction }) => {
    const navigate = useNavigate()
    const {user} = use(AuthContext)
    const handleDlete = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://finese-server-api.vercel.app/transactions/${transaction._id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${user.accessToken}`
                    },
                })
                    .then((res) => res.json())
                    .then((data) => {
                        // console.log(data);
                        navigate("/my-transactions");

                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success",
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        });
    };


    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };
    return (
        <div key={transaction._id} className="card bg-base-100 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 rounded-xl overflow-hidden group">
            <div className="card-body p-6">

                <div className="flex justify-between items-center mb-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${transaction.type === 'income'
                        ? 'bg-green-50 text-green-700 border border-green-200'
                        : 'bg-red-50 text-red-700 border border-red-200'
                        }`}>
                        {transaction.type === 'income' ? (
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        ) : (
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        )}
                        {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                    </span>
                    <span className="text-sm text-gray-500 font-medium">{formatDate(transaction.date)}</span>
                </div>


                <div className="mb-4">
                    <h3 className={`text-2xl font-bold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                        }`}>
                        ৳ {transaction.amount.toLocaleString()}
                    </h3>
                </div>


                <div className="space-y-2 mb-6">
                    <div className="flex items-center text-gray-700">
                        <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                        <span className="font-semibold">{transaction.category}</span>
                    </div>
                    {transaction.description && (
                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                            {transaction.description}
                        </p>
                    )}
                </div>

                <div className="card-actions justify-end border-t border-gray-100 pt-4 mt-2">
                    <div className="flex gap-2">
                        <Link
                            to={`/transaction/${transaction._id}`}
                            className="btn btn-sm btn-ghost text-gray-600 hover:text-gray-800 hover:bg-gray-50 border border-gray-300"
                        >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            View
                        </Link>
                        <Link
                            to={`/transaction/update/${transaction._id}`}
                            className="btn btn-sm btn-ghost text-blue-600 hover:text-blue-800 hover:bg-blue-50 border border-blue-300"
                        >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Edit
                        </Link>
                        <button onClick={handleDlete}
                            className="btn btn-sm btn-ghost text-red-600 hover:text-red-800 hover:bg-red-50 border border-red-300"
                        >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TranCard