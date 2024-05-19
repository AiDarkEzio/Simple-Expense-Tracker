"use client";
import { useState } from "react";
import { v4 as uuIdV4 } from "uuid";

interface Expense {
  id: string;
  type: 'expense' | 'income';
  title: string;
  date: Date;
  amount: number;
}

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const [formData, setFormData] = useState<Partial<Expense>>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: name === 'amount' ? parseFloat(value) : name === 'date' ? new Date(value) : value,
    });
  };

  const handleAddExpense = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      if (!formData.title || formData.title.trim() === '') throw new Error("Title is required");
      if (formData.title.trim().length < 3 || formData.title.trim().length > 25) throw new Error("Title must be between 3 and 25 characters long");
      if (!formData.amount) throw new Error("Amount must be greater than 0")
      if (formData.amount <= 0) throw new Error("Amount must be greater than 0")

      const newExpense: Expense = {
        id: uuIdV4(), // Generate a new UUID for each expense
        type: formData.type || 'expense',
        title: formData.title,
        amount: formData.amount,
        date: formData.date || new Date(),
      } as Expense;

      setExpenses([...expenses, newExpense]);

      // Reset the form after submission
      setFormData({
        type: 'expense',
        title: '',
        date: new Date(),
        amount: 0,
      });
    } catch (error: any) {
      alert(`Failed to add expense${error.message ? ` due to ${error.message}.` : '.'}`);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveExpense = (expenseId: string) => {
    const updatedExpenses = expenses.filter(expense => expense.id !== expenseId);
    setExpenses(updatedExpenses);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="bg-gray-800 p-8 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-white mb-4">Add New Expenses</h2>
        <form onSubmit={handleAddExpense}>
          <div className="mb-4 text-black">
            <label htmlFor="type" className="block text-white font-bold mb-2">Type:</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
          <div className="mb-4 text-black">
            <label htmlFor="title" className="block text-white font-bold mb-2">Title:</label>
            <input
              onChange={handleChange}
              type="text"
              id="title"
              name="title"
              value={formData.title}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4 text-black">
            <label htmlFor="date" className="block text-white font-bold mb-2">Date:</label>
            <input
              onChange={handleChange}
              type="date"
              id="date"
              name="date"
              value={formData.date?.toISOString().split('T')[0]}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4 text-black">
            <label htmlFor="amount" className="block text-white font-bold mb-2">Amount:</label>
            <input
              onChange={handleChange}
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            {loading ? "Loading..." : "Add Expense"}
          </button>
        </form>
      </div>
      {(expenses.length > 0) && (
        <div className="mt-8 w-full">
          <h2 className="text-white mb-4">Expenses</h2>
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-white">
              <thead>
                <tr className="bg-gray-700">
                  <th className="px-4 py-2">Type</th>
                  <th className="px-4 py-2">Title</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Amount</th>
                  <th className="px-4 py-2">Remove</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map(expense => (
                  <tr key={expense.id} className="bg-gray-800 border-b border-gray-700">
                    <td className="px-4 py-2">{expense.type}</td>
                    <td className="px-4 py-2">{expense.title}</td>
                    <td className="px-4 py-2">{expense.date.toLocaleDateString()}</td>
                    <td className="px-4 py-2">{expense.amount.toFixed(2)}</td>
                    <td className="px-4 py-2">
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded-md font-medium hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
                        onClick={() => handleRemoveExpense(expense.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
