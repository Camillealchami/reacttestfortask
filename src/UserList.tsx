// src/UserList.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser , faEnvelope } from '@fortawesome/free-solid-svg-icons';

interface User {
  id: number;
  name: string;
  email: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser , setNewUser ] = useState<{ name: string; email: string }>({
    name: '',
    email: '',
  });
  const [editUserId, setEditUserId] = useState<number | null>(null);
  const [editUser , setEditUser ] = useState<{ name: string; email: string }>({
    name: '',
    email: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const limit = 5; // Limit the number of users displayed

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users');
        setUsers(response.data.slice(0, limit)); // Limit the data to the first 'limit' users
      } catch (err) {
        setError('Error fetching users');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleCreate = () => {
    if (!newUser .name || !newUser .email) {
      alert("Name and email are required.");
      return;
    }
    const newUserWithId = { id: Date.now(), ...newUser  }; // Simulate an ID
    setUsers([...users, newUserWithId]); // Update the UI with the new user
    setNewUser ({ name: '', email: '' }); // Reset input fields
  };

  const handleEdit = (user: User) => {
    setEditUserId(user.id);
    setEditUser ({ name: user.name, email: user.email });
  };

  const handleUpdate = () => {
    if (!editUser .name || !editUser .email) {
      alert("Name and email are required.");
      return;
    }
    setUsers(users.map(user => (user.id === editUserId ? { ...user, ...editUser  } : user)));
    setEditUserId(null);
    setEditUser ({ name: '', email: '' }); // Reset edit fields
  };

  const handleDelete = (id: number) => {
    setUsers(users.filter(user => user.id !== id)); // Update the UI by removing the deleted user
  };

  if (isLoading) return <p className="text-center font-enter">Loading...</p>;
  if (error) return <p className="text-red-500 text-center font-enter">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-4">User  List</h1>
      
      {/* Form to Add New User */}
      <form className="mb-4" onSubmit={(e) => { e.preventDefault(); handleCreate(); }}>
        <input
          type="text"
          value={newUser .name}
          onChange={(e) => setNewUser ({ ...newUser , name: e.target.value })}
          placeholder="Enter name"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
        />
        <input
          type="email"
          value={newUser .email}
          onChange={(e) => setNewUser ({ ...newUser , email: e.target.value })}
          placeholder="Enter email"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        >
          Add User
        </button>
      </form>

      {/* User List */}
      <div className="grid grid-cols-1 md:grid -cols-2 gap-6">
        {users.map(user => (
          <div key={user.id} className="bg-white shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105">
            <h2 className="text-xl font-semibold flex items-center text-gray-800">
              <FontAwesomeIcon icon={faUser } className="text-blue-600 mr-2" />
              {user.name}
            </h2>
            <p className="text-gray-600 flex items-center">
              <FontAwesomeIcon icon={faEnvelope} className="text-gray-400 mr-2" />
              {user.email}
            </p>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleEdit(user)}
                className="bg-yellow-500 text-white py-1 px-2 rounded hover:bg-yellow-600 transition duration-200"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(user.id)}
                className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 transition duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit User Form */}
      {editUserId && (
        <div className="mt-6">
          <h2 className="text-2xl font-bold text-center">Edit User</h2>
          <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
            <input
              type="text"
              value={editUser .name}
              onChange={(e) => setEditUser ({ ...editUser , name: e.target.value })}
              placeholder="Edit name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
            />
            <input
              type="email"
              value={editUser .email}
              onChange={(e) => setEditUser ({ ...editUser , email: e.target.value })}
              placeholder="Edit email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            >
              Update User
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserList;



