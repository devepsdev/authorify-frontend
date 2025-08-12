import { useEffect, useState } from "react";
import Header from "../components/header";
import { useAuth } from "../context/AuthContext";
import { deleteUser, getAllUsers } from "../api/user.api";
import UserCard from "../components/UserCard";
import FormEditUser from "../components/FormEditUser";
import FormCreateUser from "../components/FormCreateUser";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const { authToken } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers(authToken);
        setUsers(data);
      } catch (error) {
        setError("Error al caragar los usuarios");
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [authToken]);

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id, authToken);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      setError("Error al borrar el usuario");
      console.error(error.message);
    }
  };

  const handleEditUser = (user) => {
    setEditUser(user);
    setShowEditForm(true);
  };

  const handleUpdate = async () => {
    try {
      const updatedData = await getAllUsers(authToken);
      setUsers(updatedData);
      setShowEditForm(false);
      setEditUser(null);
    } catch (error) {
      setError("Error al actualizar el usuario");
      console.error(error.message);
    }
  };

  const handleCreateUser = () => {
    setShowCreateForm(true);
  };

  const handleCreate = async () => {
    try {
      const updatedData = await getAllUsers(authToken);
      setUsers(updatedData);
      setShowCreateForm(false);
    } catch (error) {
      setError("Error al crear el usuario");
      console.error(error.message);
    }
  };

  const handleCancel = () => {
    setShowEditForm(false);
    setShowCreateForm(false);
    setEditUser(null);
  };

  return (
    <div>
      <Header onCreate={handleCreateUser} />
      <div className="text-info">{loading && "Cargando...💾"}</div>
      <div className="text-danger-emphasis">
        {error && "No se ha podido obtener la lista de usuarios"}
      </div>
      {showEditForm ? (
        <FormEditUser
          user={editUser}
          onUpdate={handleUpdate}
          onCancel={handleCancel}
        />
      ) : showCreateForm ? (
        <FormCreateUser onCreate={handleCreate} onCancel={handleCancel} />
      ) : (
        <div className="container-fluid">
          <div className="row row-cols-4">
            {users.length > 0
              ? users.map((user) => (
                  <UserCard
                    key={user.id}
                    user={user}
                    onDelete={handleDeleteUser}
                    onEdit={handleEditUser}
                  />
                ))
              : !loading && "No hay usuarios"}
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
