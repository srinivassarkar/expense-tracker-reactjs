import { useState } from "react";
import { useAddTransactions } from "../../hooks/useAddTransactions";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase-config";

export const ExpenseTracker = () => {
  const { addTransaction } = useAddTransactions();
  const { transactions, transactionTotal } = useGetTransactions();
  const { name, profilePhoto } = useGetUserInfo();
  const naviagte = useNavigate();
  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");
  const [showSignOutButton, setShowSignOutButton] = useState(false);

  const { balance, income,expenses } = transactionTotal

  const onSubmit = (e) => {
    e.preventDefault();
    addTransaction({
      description,
      transactionAmount,
      transactionType,
    });
    setDescription("")
    setTransactionAmount("")
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      naviagte("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className=" bg-gray-800 text-white min-h-screen flex items-center justify-center">
      <div className="container mx-4 bg-gray-900 p-8 rounded shadow-md mt-6 mb-6">
        {/* className="fixed top-5 right-3 p-4" */}

        <p className="text-3xl font-bold mb-4">{`${name}'s Expense Tracker`}</p>
        <div className="relative">
          {profilePhoto && (
            <div
              className="absolute top-0 right-0 -mt-16 p-4"
              onMouseEnter={() => setShowSignOutButton(true)}
              onMouseLeave={() => setShowSignOutButton(false)}
            >
              <img
                src={profilePhoto}
                className="rounded-full w-12 h-12 object-cover cursor-pointer"
                alt="Profile"
              />
              {showSignOutButton && (
                <div className="absolute top-0 right-0 p-4">
                  <button
                    onClick={signOutUser}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded-full focus:outline-none focus:shadow-outline-red w-12 h-12 text-sm"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="">
          <h3 className="text-xl font-semibold mb-2">Your Balance</h3>
          <h2 className="text-2xl font-bold">

          {balance>= 0? (
            <p>${balance}</p>) : (<p> -${balance*-1}</p>
          )}



          </h2>
        </div>

        <div className=" mt-6">
          <div className=" mb-4">
            <h4 className="text-lg font-semibold mb-2">Income</h4>
            <p className="text-green-400 font-bold">${income}</p>
          </div>

          <div className=" mb-4">
            <h4 className="text-lg font-semibold mb-2">Expenses</h4>
            <p className="text-red-400 font-bold">${expenses}</p>
          </div>

          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Description"
              value={description}
              className="block w-full mb-2 p-2 bg-gray-700 border border-gray-600 rounded text-white"
              required
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="number"
              placeholder="Amount"
              value={transactionAmount}
              className="block w-full mb-2 p-2 bg-gray-700 border border-gray-600 rounded text-white"
              required
              onChange={(e) => setTransactionAmount(e.target.value)}
            />

            <div className="flex items-center mb-2">
              <input
                type="radio"
                id="expense"
                value="expense"
                className="mr-1"
                required
                checked={transactionType === "expense"}
                onChange={(e) => setTransactionType(e.target.value)}
              />
              <label htmlFor="expense" className="text-sm text-gray-300">
                Expense
              </label>

              <input
                type="radio"
                id="income"
                value="income"
                className="ml-4 mr-1"
                required
                checked={transactionType === "income"}
                onChange={(e) => setTransactionType(e.target.value)}
              />
              <label htmlFor="income" className="text-sm text-gray-300">
                Income
              </label>
            </div>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue"
            >
              Add Transaction
            </button>
          </form>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Transactions</h3>
          <ul>
            {transactions.map((transaction) => {
              const { id, description, transactionAmount, transactionType } =
                transaction;

              const labelColor =
                transactionType === "income"
                  ? "text-green-400"
                  : "text-red-400";

              return (
                <li key={id} className="border p-4 mb-4 rounded">
                  <h4>{description}</h4>
                  <p>
                    $ {transactionAmount} ●{" "}
                    <label htmlFor="" className={`font-bold ${labelColor}`}>
                      {transactionType}
                    </label>
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
