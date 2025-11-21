import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';
import toast from 'react-hot-toast';
import { AuthContext } from '../conext/AuthContext';
import TranCard from '../components/TranCard';
import Loader from '../components/Loader';

const MyTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('date');
    const [sortOrder, setSortOrder] = useState('desc');
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (!user?.email) return;
        setLoading(true);
        fetch(`https://finese-server-api.vercel.app/transactions?email=${user.email}`, {
            headers: {
                authorization: `Bearer ${user.accessToken}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setTransactions(data);
                setLoading(false);
            })
            .catch(() => {
                toast.error('Failed to load transactions');
                setLoading(false);
            });
    }, [user]);

    const handleDelete = (id) => {

    };

    if (loading) {
        return <div className='flex h-screen items-center justify-center bg-gradient-to-br from-base-200 via-base-100 to-base-200'>
            <Loader />
        </div>
    }
    const sortedTransactions = [...transactions].sort((a, b) => {
        let valA, valB;

        if (sortBy === 'amount') {
            valA = a.amount;
            valB = b.amount;
        } else {
            valA = new Date(a.date).getTime();
            valB = new Date(b.date).getTime();
        }
        if (sortOrder === 'asc') return valA - valB;
        return valB - valA;
    });

    return (
        <div className="min-h-screen py-10 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">Transaction History</h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
                    <p className="text-base-content/70 mt-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Manage and review your financial transactions</p>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                    <div className="w-full md:w-auto">
                        <div className="stats shadow-md bg-base-100 rounded-xl">
                            <div className="stat flex flex-col justify-center items-center">
                                <div className="stat-title">Total Transactions</div>
                                <div className="stat-value text-primary">{transactions.length}</div>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3 w-full md:w-auto">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Sort By</span>
                            </label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="select select-bordered rounded-xl border-base-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                            >
                                <option value="date">Date</option>
                                <option value="amount">Amount</option>
                            </select>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Order</span>
                            </label>
                            <select
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value)}
                                className="select select-bordered rounded-xl border-base-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                            >
                                <option value="desc">High To Low</option>
                                <option value="asc">Low To High</option>
                            </select>
                        </div>
                    </div>
                </div>

                {!loading && transactions.length === 0 && (
                    <div className="card bg-base-100 shadow-2xl rounded-2xl overflow-hidden border border-base-300 p-12">
                        <div className="text-center">
                            <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center">
                                <svg className="w-16 h-16 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-base-content mb-4">No transactions found</h2>
                            <p className="text-base-content/70 mb-6">Start tracking your finances by adding your first transaction</p>
                            <Link to="/add-transaction" className="btn bg-gradient-to-r from-primary to-secondary border-0 text-white font-medium py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                                Add Your First Transaction
                            </Link>
                        </div>
                    </div>
                )}

                {!loading && transactions.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-base-100 border-1 border-gray-100 shadow-lg rounded-2xl p-10">
                        {sortedTransactions.map((transaction) => (
                            <TranCard key={transaction.id} transaction={transaction} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyTransactions;