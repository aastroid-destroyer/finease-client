import React, { useContext, useState, useMemo, useEffect } from "react";
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { AuthContext } from "../conext/AuthContext";
import toast from "react-hot-toast";

const Reports = () => {
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");

  useEffect(() => {
    if (!user?.email) return;

    fetch(`https://finese-server-api.vercel.app/transactions?email=${user.email}`, {
      headers: { authorization: `Bearer ${user.accessToken}` }
    })
      .then(res => res.json())
      .then(data => setTransactions(data))
      .catch(() => toast.error("Failed to load transactions"));
  }, [user]);

  const filteredTransactions = useMemo(() => {
    if (!selectedMonth) return transactions;
    return transactions.filter(t => t.date.slice(0, 7) === selectedMonth);
  }, [selectedMonth, transactions]);


  const totalIncome = filteredTransactions.filter(t => t.type === "income").reduce((acc, t) => acc + t.amount, 0);
  const totalExpense = filteredTransactions.filter(t => t.type === "expense").reduce((acc, t) => acc + t.amount, 0);
  const balance = totalIncome - totalExpense;

  const pieChartData = useMemo(() => {
    const grouped = {};
    filteredTransactions.forEach(t => {
      const key = `${t.category} (${t.type})`;
      grouped[key] = (grouped[key] || 0) + t.amount;
    });
    return Object.entries(grouped).map(([name, value]) => ({ name, value }));
  }, [filteredTransactions]);


  const monthlyData = useMemo(() => {
    const months = {};
    transactions.forEach(t => {
      const m = t.date.slice(0, 7);
      months[m] = (months[m] || 0) + t.amount;
    });
    return Object.keys(months)
      .sort()
      .map(month => ({ month, total: months[month] }));
  }, [transactions]);
  const uniqueMonths = [...new Set(transactions.map(t => t.date.slice(0, 7)))].sort();

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D", "#FFC658", "#FF6B9D", "#C084FC", "#38BDF8"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-200 py-10 px-4">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">Financial Reports</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
        </div>

        <div className="flex justify-center mb-8">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Filter by Month</span>
            </label>
            <select
              className="select select-bordered w-64 rounded-xl border border-base-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
              value={selectedMonth}
              onChange={e => setSelectedMonth(e.target.value)}
            >
              <option value="">All Months</option>
              {uniqueMonths.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
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

        {filteredTransactions.length === 0 ? (
          <div className="card bg-base-100 shadow-2xl rounded-2xl border border-base-300 p-12">
            <p className="text-center text-base-content/60 text-xl">No data available for the selected period.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

            <div className="card bg-base-100 shadow-2xl rounded-2xl overflow-hidden border border-base-300">
              <div className="bg-gradient-to-r from-primary to-secondary h-2"></div>
              <div className="card-body p-8">
                <h2 className="card-title text-2xl text-center mb-6 justify-center">Category Distribution</h2>
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name.split(' ')[0]}: ${(percent * 100).toFixed(0)}%`
                      }
                      dataKey="value"
                    >
                      {pieChartData.map((_, i) => (
                        <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v) => `৳${v.toLocaleString()}`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="card bg-base-100 shadow-2xl rounded-2xl overflow-hidden border border-base-300">
              <div className="bg-gradient-to-r from-secondary to-accent h-2"></div>
              <div className="card-body p-8">
                <h2 className="card-title text-2xl text-center mb-6 justify-center">Monthly Totals</h2>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip formatter={(v) => `৳${v.toLocaleString()}`} />
                    <Bar dataKey="total" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8884d8" stopOpacity={0.8} />
                        <stop offset="100%" stopColor="#8884d8" stopOpacity={0.3} />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;