export default function SuperAdminDashboard() {
  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl font-bold text-slate-800 mb-4">
        Super Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded shadow">Total Gyms</div>
        <div className="bg-white p-4 rounded shadow">Total Users</div>
        <div className="bg-white p-4 rounded shadow">Total Trainers</div>
        <div className="bg-white p-4 rounded shadow">Revenue</div>
      </div>
    </div>
  );
}
