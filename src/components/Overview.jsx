import { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../conext/AuthContext";
import { toast } from "react-toastify";

const OverviewCards = () => {
    const [transactions, setTransactions] = useState([]);
    const { user } = useContext(AuthContext);
    const [selectedMonth, setSelectedMonth] = useState('');

    useEffect(() => {
        if (!user?.email) return;
        fetch(`https://finese-server-api.vercel.app/transactions?email=${user.email}`, {
            headers: {
                authorization: `Bearer ${user.accessToken}`
            }
        })
            .then((res) => res.json())
            .then((data) => setTransactions(data))
            .catch(() => toast.error('Failed to load transactions'));
    }, [user]);

    const filteredTransactions = useMemo(() => {
        if (!selectedMonth) return transactions;
        return transactions.filter((t) => new Date(t.date).toISOString().slice(0, 7) === selectedMonth);
    }, [selectedMonth, transactions]);

    const totalIncome = filteredTransactions.filter((t) => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
    const totalExpense = filteredTransactions.filter((t) => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
    const balance = totalIncome - totalExpense;

    return (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <div className="mb-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                    Budgeting Tips for Success
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                    Master your finances with these proven strategies
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Total Income Card */}
                <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 p-[1px] shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                    <div className="relative h-full rounded-2xl bg-gradient-to-br from-emerald-50 to-white p-6 backdrop-blur-sm">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-200 rounded-full -mr-16 -mt-16 opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
                        <div className="relative">
                            <div className="flex items-center justify-between mb-3">
                                <h2 className="text-sm font-semibold text-emerald-900 uppercase tracking-wider">Total Income</h2>
                                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                                    </svg>
                                </div>
                            </div>
                            <p className="text-4xl font-bold text-emerald-900 mb-1">৳{totalIncome.toLocaleString()}</p>
                            <div className="h-1 w-16 bg-gradient-to-r from-emerald-500 to-emerald-300 rounded-full"></div>
                        </div>
                    </div>
                </div>

                {/* Total Expenses Card */}
                <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-500 via-rose-600 to-rose-700 p-[1px] shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                    <div className="relative h-full rounded-2xl bg-gradient-to-br from-rose-50 to-white p-6 backdrop-blur-sm">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-rose-200 rounded-full -mr-16 -mt-16 opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
                        <div className="relative">
                            <div className="flex items-center justify-between mb-3">
                                <h2 className="text-sm font-semibold text-rose-900 uppercase tracking-wider">Total Expenses</h2>
                                <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                                    </svg>
                                </div>
                            </div>
                            <p className="text-4xl font-bold text-rose-900 mb-1">৳{totalExpense.toLocaleString()}</p>
                            <div className="h-1 w-16 bg-gradient-to-r from-rose-500 to-rose-300 rounded-full"></div>
                        </div>
                    </div>
                </div>

                {/* Balance Card */}
                <div className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${balance >= 0 ? 'from-blue-500 via-blue-600 to-blue-700' : 'from-amber-500 via-amber-600 to-amber-700'} p-[1px] shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1`}>
                    <div className={`relative h-full rounded-2xl bg-gradient-to-br ${balance >= 0 ? 'from-blue-50 to-white' : 'from-amber-50 to-white'} p-6 backdrop-blur-sm`}>
                        <div className={`absolute top-0 right-0 w-32 h-32 ${balance >= 0 ? 'bg-blue-200' : 'bg-amber-200'} rounded-full -mr-16 -mt-16 opacity-20 group-hover:scale-150 transition-transform duration-500`}></div>
                        <div className="relative">
                            <div className="flex items-center justify-between mb-3">
                                <h2 className={`text-sm font-semibold ${balance >= 0 ? 'text-blue-900' : 'text-amber-900'} uppercase tracking-wider`}>Balance</h2>
                                <div className={`w-10 h-10 rounded-full ${balance >= 0 ? 'bg-blue-100' : 'bg-amber-100'} flex items-center justify-center`}>
                                    <svg className={`w-5 h-5 ${balance >= 0 ? 'text-blue-600' : 'text-amber-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                            <p className={`text-4xl font-bold ${balance >= 0 ? 'text-blue-900' : 'text-amber-900'} mb-1`}>৳{balance.toLocaleString()}</p>
                            <div className={`h-1 w-16 bg-gradient-to-r ${balance >= 0 ? 'from-blue-500 to-blue-300' : 'from-amber-500 to-amber-300'} rounded-full`}></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OverviewCards;