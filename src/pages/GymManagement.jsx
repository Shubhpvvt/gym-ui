import { useState } from "react";
import Modal from "../components/Modal";

export default function GymManagement() {
  const [gyms, setGyms] = useState([
    { id: 1, name: "Iron Core Fitness", status: "Active" },
    { id: 2, name: "Fit Zone Gym", status: "Inactive" },
  ]);

  const [name, setName] = useState("");
  const [status, setStatus] = useState("Active");

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const [editGym, setEditGym] = useState(null);

  // ADD
  const addGym = () => {
    if (!name.trim()) return;

    setGyms([
      ...gyms,
      { id: Date.now(), name, status },
    ]);

    setName("");
    setStatus("Active");
  };

  // DELETE
  const deleteGym = (id) => {
    setGyms(gyms.filter((g) => g.id !== id));
  };

  // SEARCH + FILTER
  const filteredGyms = gyms.filter((g) => {
    const matchName = g.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchStatus =
      filterStatus === "All" || g.status === filterStatus;

    return matchName && matchStatus;
  });

  return (
    <div className="space-y-8">
      {/* PAGE HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Gym Management
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage gyms and their operational status
        </p>
      </div>

      {/* ADD GYM */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">
          Add New Gym
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Gym name"
            className="border rounded-md px-3 py-2 focus:ring-2 focus:ring-slate-900"
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border rounded-md px-3 py-2"
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>

          <button
            onClick={addGym}
            className="bg-slate-900 hover:bg-slate-800 text-white
                       rounded-md px-5 py-2 font-medium"
          >
            Add Gym
          </button>
        </div>
      </div>

      {/* SEARCH & FILTER */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          placeholder="Search gym by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-md px-3 py-2 w-full"
        />

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border rounded-md px-3 py-2"
        >
          <option value="All">All Status</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>

      {/* GYM LIST */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">
          Registered Gyms
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 border-b">
                <th className="pb-2">Gym Name</th>
                <th className="pb-2">Status</th>
                <th className="pb-2 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredGyms.map((gym) => (
                <tr key={gym.id} className="border-b">
                  <td className="py-3">{gym.name}</td>

                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium
                        ${
                          gym.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                    >
                      {gym.status}
                    </span>
                  </td>

                  <td className="text-right">
                    <button
                      onClick={() => setEditGym(gym)}
                      className="text-blue-600 hover:underline mr-4"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteGym(gym.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredGyms.length === 0 && (
            <p className="text-center text-slate-400 mt-4">
              No gyms found
            </p>
          )}
        </div>
      </div>

      {/* EDIT MODAL */}
      {editGym && (
        <Modal
          title="Edit Gym"
          onClose={() => setEditGym(null)}
        >
          <div className="space-y-4">
            <input
              value={editGym.name}
              onChange={(e) =>
                setEditGym({ ...editGym, name: e.target.value })
              }
              className="border rounded-md px-3 py-2 w-full"
            />

            <select
              value={editGym.status}
              onChange={(e) =>
                setEditGym({ ...editGym, status: e.target.value })
              }
              className="border rounded-md px-3 py-2 w-full"
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>

            <button
              onClick={() => {
                setGyms(
                  gyms.map((g) =>
                    g.id === editGym.id ? editGym : g
                  )
                );
                setEditGym(null);
              }}
              className="bg-slate-900 hover:bg-slate-800
                         text-white px-5 py-2 rounded-md"
            >
              Save Changes
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
