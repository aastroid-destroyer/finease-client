import React from 'react'
import { Link } from 'react-router';
import Button from './common/Button';

const TranDetailCard = ({ transaction }) => {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };
    return (
        <div className="card bg-gradient-to-br from-slate-50 to-slate-100 shadow-2xl border border-slate-200 overflow-hidden">
            {/* Premium accent bar */}
            <div className={`h-2 ${transaction.type === 'income' ? 'bg-gradient-to-r from-emerald-500 to-green-400' : 'bg-gradient-to-r from-rose-500 to-red-400'}`}></div>

            <div className="card-body p-8">
                {/* Type and Amount Header */}
                <div className="flex justify-between items-center mb-8 pb-6 border-b border-slate-200">
                    <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-2xl ${transaction.type === 'income' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'} shadow-sm`}>
                            {transaction.type === 'income' ? (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            )}
                        </div>
                        <div>
                            <span className={`text-sm font-semibold tracking-wider ${transaction.type === 'income' ? 'text-emerald-600' : 'text-rose-600'} uppercase`}>
                                {transaction.type}
                            </span>
                            <p className="text-xs text-slate-500 mt-1">Transaction Type</p>
                        </div>
                    </div>

                    <div className="text-right">
                        <span className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                            ৳{transaction.amount.toLocaleString()}
                        </span>
                        <p className="text-sm text-slate-500 mt-1">Amount</p>
                    </div>
                </div>

                {/* Transaction Info */}
                <div className="space-y-5">
                    <div className="flex justify-between items-center py-3 border-b border-slate-100">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                            <span className="font-semibold text-slate-700">Category</span>
                        </div>
                        <span className="text-slate-900 font-medium px-3 py-1 bg-slate-50 rounded-lg">{transaction.category}</span>
                    </div>

                    <div className="flex justify-between items-center py-3 border-b border-slate-100">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <span className="font-semibold text-slate-700">Date</span>
                        </div>
                        <span className="text-slate-900 font-medium">{formatDate(transaction.date)}</span>
                    </div>

                    <div className="py-4 border-b border-slate-100">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <span className="font-semibold text-slate-700">Description</span>
                        </div>
                        <p className="text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                            {transaction.description}
                        </p>
                    </div>

                    <div className="flex justify-between items-center py-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl px-5 border border-blue-100">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <span className="font-semibold text-slate-800">
                                Total in {transaction.category}
                            </span>
                        </div>
                        <span className="text-xl font-bold text-indigo-700">
                            ৳{transaction.categoryTotal?.toLocaleString() || transaction.amount.toLocaleString()}
                        </span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="card-actions justify-end mt-8 pt-6 border-t border-slate-200">
                    <Link
                        to={`/transaction/update/${transaction._id}`}>
                       <Button name={"Transaction"}/>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default TranDetailCard