'use client';

import { useEffect, useState } from 'react';
import * as Papa from 'papaparse';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const userData = [
  { id: 1, name: 'Akash', email: 'akash@example.com', role: 'Admin' },
  { id: 2, name: 'Ankith', email: 'ankith@example.com', role: 'Editor' },
  { id: 3, name: 'Surya', email: 'surya@example.com', role: 'Viewer' },
];

const chartData = [
  { name: 'Jan', users: 200 },
  { name: 'Feb', users: 300 },
  { name: 'Mar', users: 500 },
  { name: 'Apr', users: 400 },
];

const exportToCSV = (data: any[]) => {
  const csv = Papa.unparse(data);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'data.csv';
  link.click();
};

const exportToPDF = (data: any[]) => {
  const doc = new jsPDF();
  const headers = [["ID", "Name", "Email", "Role"]];
  const rows = data.map((user) => [user.id, user.name, user.email, user.role]);

  autoTable(doc, {
    head: headers,
    body: rows,
  });

  doc.save("data.pdf");
};

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [showChart, setShowChart] = useState(false); // 👈 State for toggle

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-10 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">User Dashboard</h1>

      <div className="mb-4 flex flex-wrap gap-4">
        <button
          onClick={() => exportToCSV(userData)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Export CSV
        </button>
        <button
          onClick={() => exportToPDF(userData)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Export PDF
        </button>
        <button
          onClick={() => setShowChart(!showChart)} // 👈 Toggle chart
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          {showChart ? 'Hide Graphical View' : 'Show Graphical View'}
        </button>
      </div>

      {showChart && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">User Growth</h2>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        {loading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          </div>
        ) : (
          <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Role</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((user) => (
                <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4">{user.id}</td>
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
