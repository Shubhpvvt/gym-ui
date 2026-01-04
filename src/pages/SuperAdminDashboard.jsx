export default function SuperAdminDashboard({ onLogout }) {
  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Top Bar */}
      <div className="bg-white shadow px-6 py-4 flex justify-between">
        <h1 className="text-xl font-bold">Super Admin Dashboard</h1>
        <button
          onClick={onLogout}
          className="text-sm bg-red-500 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-gray-700">
          Welcome Super Admin 👋  
          Yahan se gym, users, trainers manage honge.
        </p>
      </div>

    </div>
  );
}
