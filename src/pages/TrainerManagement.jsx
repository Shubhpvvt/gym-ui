import { useState } from "react";
import Modal from "../components/Modal";

export default function TrainerManagement() {
  const [trainers, setTrainers] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul@gym.com",
      specialization: "Weight Training",
      status: "Active",
    },
    {
      id: 2,
      name: "Anita Verma",
      email: "anita@gym.com",
      specialization: "Yoga",
      status: "Inactive",
    },
  ]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    specialization: "",
    status: "Active",
  });

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [editTrainer, setEditTrainer] = useState(null);

  // ADD TRAINER
  const addTrainer = () => {
    if (!form.name || !form.email) return;

    setTrainers([
      ...trainers,
      { id: Date.now(), ...form },
    ]);

    setForm({
      name: "",
      email: "",
      specialization: "",
      status: "Active",
    });
  };

  // DELETE TRAINER
  const deleteTrainer = (id) => {
    setTrainers(trainers.filter((t) => t.id !== id));
  };

  // SEARCH + FILTER
  const filteredTrainers = trainers.filter((t) => {
    const matchText =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.email.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      filterStatus === "All" || t.status === filterStatus;

    return matchText && matchStatus;
  });

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Trainer Management
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage trainers and their availability
        </p>
      </div>

      {/* ADD TRAINER */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">
          Add Trainer
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
          <input
            placeholder="Full name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            className="border rounded-md px-3 py-2"
          />

          <input
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            className="border rounded-md px-3 py-2"
          />

          <input
            placeholder="Specialization"
            value={form.specialization}
            onChange={(e) =>
              setForm({
                ...form,
                specialization: e.target.value,
              })
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
            onClick={addTrainer}
            className="bg-slate-900 hover:bg-slate-800
                       text-white rounded-md px-5 py-2"
          >
            Add Trainer
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

      {/* TRAINER LIST */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">
          Registered Trainers
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-slate-500">
                <th>Name</th>
                <th>Email</th>
                <th>Specialization</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredTrainers.map((trainer) => (
                <tr key={trainer.id} className="border-b">
                  <td className="py-3">{trainer.name}</td>
                  <td>{trainer.email}</td>
                  <td>{trainer.specialization}</td>
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium
                        ${
                          trainer.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                    >
                      {trainer.status}
                    </span>
                  </td>
                  <td className="text-right">
                    <button
                      onClick={() => setEditTrainer(trainer)}
                      className="text-blue-600 hover:underline mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTrainer(trainer.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredTrainers.length === 0 && (
            <p className="text-center text-slate-400 mt-4">
              No trainers found
            </p>
          )}
        </div>
      </div>

      {/* EDIT MODAL */}
      {editTrainer && (
        <Modal
          title="Edit Trainer"
          onClose={() => setEditTrainer(null)}
        >
          <div className="space-y-4">
            <input
              value={editTrainer.name}
              onChange={(e) =>
                setEditTrainer({
                  ...editTrainer,
                  name: e.target.value,
                })
              }
              className="border rounded-md px-3 py-2 w-full"
            />

            <input
              value={editTrainer.email}
              onChange={(e) =>
                setEditTrainer({
                  ...editTrainer,
                  email: e.target.value,
                })
              }
              className="border rounded-md px-3 py-2 w-full"
            />

            <input
              value={editTrainer.specialization}
              onChange={(e) =>
                setEditTrainer({
                  ...editTrainer,
                  specialization: e.target.value,
                })
              }
              className="border rounded-md px-3 py-2 w-full"
            />

            <select
              value={editTrainer.status}
              onChange={(e) =>
                setEditTrainer({
                  ...editTrainer,
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
                setTrainers(
                  trainers.map((t) =>
                    t.id === editTrainer.id ? editTrainer : t
                  )
                );
                setEditTrainer(null);
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
