import { useState } from "react";

import { User } from "../../interfaces";

import trash from "../../assets/svg/trash-white.svg";

import EditUser from "../../components/EditUser";
import DeleteUser from "../../components/DeleteUser";
import Table from "../../components/Table";
import Filter from "../../components/Filter";

function Home() {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setShowEditModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      {/* FILTERS OF USERS  */}
      <Filter />

      {/* TABLE OF USERS */}
      <Table
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        handleEdit={handleEdit}
      />

      {/* MODAL CONFIRMATION DELETE USER */}
      {showDeleteModal && (
        <DeleteUser
          closeModal={() => setShowDeleteModal(false)}
          selectedRows={selectedRows}
        />
      )}

      {/* MODAL EDIT USER */}
      {showEditModal && editingUser && (
        <EditUser
          closeModal={() => setShowEditModal(false)}
          editingUser={editingUser}
          setEditingUser={setEditingUser}
        />
      )}

      {/* MODAL COUNT USERS FOR DELETE */}
      {selectedRows.length > 0 && !showDeleteModal && !showEditModal && (
        <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 flex items-center gap-4">
          <span className="text-sm text-gray-600">
            {selectedRows.length} {selectedRows.length === 1 ? "user" : "users"}{" "}
            selected
          </span>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md flex items-center gap-2"
          >
            <img src={trash} alt="Trash" className="w-4 h-4 text-white" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
