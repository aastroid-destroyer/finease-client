import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../conext/AuthContext';

const TranCard = ({ transaction, onDelete }) => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const handleDlete = () => {
        Swal.fire({
            title:"Are you sure?",
            text:"You won't be able to revert this!",
            icon:"warning",
            showCancelButton:true,
            confirmButtonColor:"#3085d6",
            cancelButtonColor:"#d33",
            confirmButtonText:"Yes, delete it!"
        }).then(result => {
            if(result.isConfirmed){
                fetch(`https://finese-server-api.vercel.app/transactions/${transaction._id}`, {
                    method:"DELETE",
                    headers:{
                        "Content-Type":"application/json",
                        authorization:`Bearer ${user.accessToken}`
                    }
                })
                .then(res => res.json())
                .then(() => {

                    // remove card instantly
                    onDelete(transaction._id);

                    navigate("/my-transactions");

                    Swal.fire({
                        title:"Deleted!",
                        text:"Your transaction has been deleted.",
                        icon:"success"
                    });
                })
                .catch(err => console.log(err));
            }
        });
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US',{
            year:'numeric', month:'short', day:'numeric'
        });
    };

    return (
        <div key={transaction._id} className="card bg-base-100 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 rounded-xl overflow-hidden group">
            <div className="card-body p-6">

                <div className="flex justify-between items-center mb-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        transaction.type === 'income'
                        ? 'bg-green-50 text-green-700 border border-green-200'
                        : 'bg-red-50 text-red-700 border border-red-200'
                    }`}>
                        {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                    </span>
                    <span className="text-sm text-gray-500 font-medium">{formatDate(transaction.date)}</span>
                </div>

                <div className="mb-4">
                    <h3 className={`text-2xl font-bold ${
                        transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}>
                        ৳ {transaction.amount.toLocaleString()}
                    </h3>
                </div>

                <div className="space-y-2 mb-6">
                    <div className="flex items-center text-gray-700">
                        <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
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
                            className="btn btn-sm btn-ghost text-gray-600 border border-gray-300"
                        >
                            View
                        </Link>

                        <Link
                            to={`/transaction/update/${transaction._id}`}
                            className="btn btn-sm btn-ghost text-blue-600 border border-blue-300"
                        >
                            Edit
                        </Link>

                        <button
                            onClick={handleDlete}
                            className="btn btn-sm btn-ghost text-red-600 border border-red-300"
                        >
                            Delete
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default TranCard;
