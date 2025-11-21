import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../conext/AuthContext";
import { toast } from "react-toastify";
import Button from "../components/common/Button";

const AddTransaction = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = {
            type: e.target.type.value,
            category: e.target.category.value,
            amount: parseFloat(e.target.amount.value),
            description: e.target.description.value,
            date: new Date(e.target.date.value).toISOString(),
            email: user.email,
            name: user.displayName || "User"
        };

        fetch("https://finese-server-api.vercel.app/transaction", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${user.accessToken}`
            },
            body: JSON.stringify(formData)
        })
            .then((res) => res.json())
            .then(() => {
                toast.success("Transaction added successfully!");
                navigate("/my-transactions");
            })
            .catch(() => {
                toast.error("Failed to add transaction!");
            })
            .finally(() => setLoading(false));
    };

    return (
        <div className="min-h-screen py-10 px-4">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">Add Transaction</h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
                </div>

                <div className="card bg-base-100 shadow-2xl rounded-2xl overflow-hidden border border-base-300">
                    <div className="bg-gradient-to-r from-primary to-secondary h-2"></div>
                    <div className="card-body p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold text-base-content/80">Transaction Type</span>
                                    </label>
                                    <select
                                        name="type"
                                        required
                                        className="select select-bordered w-full rounded-xl border border-base-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                                    >
                                        <option value="income">Income</option>
                                        <option value="expense">Expense</option>
                                    </select>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold text-base-content/80">Category</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="category"
                                        required
                                        className="input input-bordered w-full rounded-xl border border-base-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                                        placeholder="Enter category"
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold text-base-content/80">Amount</span>
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/60">৳</span>
                                        <input
                                            type="number"
                                            name="amount"
                                            required
                                            min="0"
                                            step="0.01"
                                            className="input input-bordered w-full pl-8 rounded-xl border border-base-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                                            placeholder="0.00"
                                        />
                                    </div>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold text-base-content/80">Date</span>
                                    </label>
                                    <input
                                        type="date"
                                        name="date"
                                        required
                                        className="input input-bordered w-full rounded-xl border border-base-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                                    />
                                </div>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold text-base-content/80">Description</span>
                                </label>
                                <textarea
                                    name="description"
                                    required
                                    rows="3"
                                    className="textarea textarea-bordered w-full rounded-xl border border-base-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 resize-none"
                                    placeholder="Enter description"
                                ></textarea>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold text-base-content/80">Username</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={user.displayName || "User"}
                                        readOnly
                                        className="input input-bordered w-full rounded-xl bg-base-200 border-base-300 cursor-not-allowed"
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold text-base-content/80">User Email</span>
                                    </label>
                                    <input
                                        type="email"
                                        value={user.email}
                                        readOnly
                                        className="input input-bordered w-full rounded-xl bg-base-200 border-base-300 cursor-not-allowed"
                                    />
                                </div>
                            </div>

                            <div className="form-control mt-8">
                                <Button name={"Add Transaction"}/>
                                {/* <button
                                    type="submit"
                                    className="btn bg-gradient-to-r from-primary to-secondary border-0 text-white font-medium py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <span className="loading loading-spinner"></span>
                                            Adding Transaction...
                                        </>
                                    ) : (
                                        "Add Transaction"
                                    )}
                                </button> */}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddTransaction;