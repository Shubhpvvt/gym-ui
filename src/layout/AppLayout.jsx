import Sidebar from "./Sidebar";

export default function AppLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      {/* RIGHT CONTENT */}
      <div className="flex-1 bg-slate-100 relative">
        {/* Naked Admin / Logout */}
        <div
          className="absolute top-3 right-6
                     flex items-center gap-2
                     text-sm font-medium text-slate-600"
        >
          <span className="text-slate-800">Admin</span>
          <span className="text-slate-300">/</span>
          <button
            onClick={() => (window.location.href = "/")}
            className="text-slate-500 hover:text-red-600"
            title="Logout"
          >
            Logout ↪
          </button>
        </div>

        {/* PAGE CONTENT */}
        <div className="p-4 sm:p-6 mt-8">
          {children}
        </div>
      </div>
    </div>
  );
}
