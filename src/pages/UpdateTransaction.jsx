import { use, useContext } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { AuthContext } from "../conext/AuthContext";
import { toast } from "react-toastify";
import Button from "../components/common/Button";

const UpdateTransaction = () => {
  const { user } = useContext(AuthContext)
  const transaction = useLoaderData();
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      type: e.target.type.value,
      category: e.target.category.value,
      amount: parseFloat(e.target.amount.value),
      description: e.target.description.value,
      date: new Date(e.target.date.value).toISOString()
    };
    // console.log(formData)

    fetch(`https://finese-server-api.vercel.app/transaction/update/${transaction._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${user.accessToken}`

      },
      body: JSON.stringify(formData)
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Transaction updated successfully!");
        navigate('/my-transactions')
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="card bg-base-100 w-full max-w-md mx-auto shadow-2xl rounded-2xl mb-10">
      <div className="card-body p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Update Transaction</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label font-medium">Transaction Type</label>
            <select
              name="type"
              defaultValue={transaction.type}
              required
              className="select w-full rounded-full focus:border-0 focus:outline-gray-200"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
          <div>
            <label className="label font-medium">Category</label>
            <input
              type="text"
              name="category"
              required
              defaultValue={transaction.category}
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="Enter category"
            />
          </div>
          <div>
            <label className="label font-medium">Amount</label>
            <input
              type="number"
              name="amount"
              required
              defaultValue={transaction.amount}
              min="0"
              step="0.01"
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="Enter amount"
            />
          </div>

          {/* Description */}
          <div>
            <label className="label font-medium">Description</label>
            <textarea
              name="description"
              required
              defaultValue={transaction.description}
              rows="3"
              className="textarea w-full rounded-2xl focus:border-0 focus:outline-gray-200 h-[200px]"
              placeholder="Enter description"
            ></textarea>
          </div>

          {/* Date */}
          <div>
            <label className="label font-medium">Date</label>
            <input
              type="date"
              name="date"
              required
              defaultValue={transaction.date?.slice(0, 10)}
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
            />
          </div>

          {/* Submit */}
          <div >
            <Button name={"Update Transaction"}/>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTransaction;
