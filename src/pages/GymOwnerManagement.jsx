import { useState } from "react";
import Modal from "../components/Modal";

export default function GymOwnerManagement() {
  const [owners, setOwners] = useState([
    {
      id: 1,
      name: "Rakesh Mehta",
      email: "rakesh@gym.com",
      status: "Active",
    },
    {
      id: 2,
      name: "Sanjay Patel",
      email: "sanjay@gym.com",
      status: "Inactive",
    },
  ]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    status: "Active",
  });

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [editOwner, setEditOwner] = useState(null);

  // ADD OWNER
  const addOwner = () => {
    if (!form.name || !form.email) return;

    setOwners([
      ...owners,
      { id: Date.now(), ...form },
    ]);

    setForm({ name: "", email: "", status: "Active" });
  };

  // DELETE
  const deleteOwner = (id) => {
    setOwners(owners.filter((o) => o.id !== id));
  };

  // SEARCH + FILTER
  const filteredOwners = owners.filter((o) => {
    const matchText =
      o.name.toLowerCase().includes(search.toLowerCase()) ||
      o.email.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      filterStatus === "All" || o.status === filterStatus;

    return matchText && matchStatus;
  });

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Gym Owner Management
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage gym owners and their account status
        </p>
      </div>

      {/* ADD OWNER */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">
          Add Gym Owner
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <input
            placeholder="Full name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            className="border rounded-md px-3 py-2"
          />

          <input
            placeholder="Email address"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            className="border rounded-md px-3 py-2"
          />

          <select
            value={form.status}
            onChange={(e) =>
              setForm({ ...form, status: e.target.value })
            }
            className="border rounded-md px-3 py-2"
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>

          <button
            onClick={addOwner}
            className="bg-slate-900 hover:bg-slate-800
                       text-white rounded-md px-5 py-2"
          >
            Add Owner
          </button>
        </div>
      </div>

      {/* SEARCH + FILTER */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          placeholder="Search by name or email"
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

      {/* OWNER LIST */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">
          Registered Gym Owners
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-slate-500">
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredOwners.map((owner) => (
                <tr key={owner.id} className="border-b">
                  <td className="py-3">{owner.name}</td>
                  <td>{owner.email}</td>
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium
                        ${
                          owner.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                    >
                      {owner.status}
                    </span>
                  </td>
                  <td className="text-right">
                    <button
                      onClick={() => setEditOwner(owner)}
                      className="text-blue-600 hover:underline mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteOwner(owner.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredOwners.length === 0 && (
            <p className="text-center text-slate-400 mt-4">
              No gym owners found
            </p>
          )}
        </div>
      </div>

      {/* EDIT MODAL */}
      {editOwner && (
        <Modal
          title="Edit Gym Owner"
          onClose={() => setEditOwner(null)}
        >
          <div className="space-y-4">
            <input
              value={editOwner.name}
              onChange={(e) =>
                setEditOwner({
                  ...editOwner,
                  name: e.target.value,
                })
              }
              className="border rounded-md px-3 py-2 w-full"
            />

            <input
              value={editOwner.email}
              onChange={(e) =>
                setEditOwner({
                  ...editOwner,
                  email: e.target.value,
                })
              }
              className="border rounded-md px-3 py-2 w-full"
            />

            <select
              value={editOwner.status}
              onChange={(e) =>
                setEditOwner({
                  ...editOwner,
                  status: e.target.value,
                })
              }
              className="border rounded-md px-3 py-2 w-full"
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>

            <button
              onClick={() => {
                setOwners(
                  owners.map((o) =>
                    o.id === editOwner.id ? editOwner : o
                  )
                );
                setEditOwner(null);
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
