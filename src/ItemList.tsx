// src/ItemList.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons';

interface Item {
  id: number;
  title: string;
  body: string; // This matches the API response
}

const ItemList: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState<{ title: string; body: string }>({
    title: '',
    body: '',
  });
  const [editItemId, setEditItemId] = useState<number | null>(null);
  const [editItem, setEditItem] = useState<{ title: string; body: string }>({
    title: '',
    body: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedItems, setExpandedItems] = useState<{ [key: number]: boolean }>({}); // Track expanded state for each item

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get<Item[]>('https://jsonplaceholder.typicode.com/posts');
        console.log(response.data); // Log the fetched data for debugging
        setItems(response.data.slice(0, 5)); // Limit the data to the first 5 items
      } catch (err) {
        setError('Error fetching items');
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleCreate = () => {
    if (!newItem.title || !newItem.body) {
      alert("Title and description are required.");
      return;
    }
    const newItemWithId = { id: Date.now(), ...newItem }; // Simulate an ID
    setItems([...items, newItemWithId]); // Update the UI with the new item
    setNewItem({ title: '', body: '' }); // Reset input fields
  };

  const handleEdit = (item: Item) => {
    setEditItemId(item.id);
    setEditItem({ title: item.title, body: item.body });
  };

  const handleUpdate = () => {
    if (!editItem.title || !editItem.body) {
      alert("Title and description are required.");
      return;
    }
    setItems(items.map(item => (item.id === editItemId ? { ...item, ...editItem } : item)));
    setEditItemId(null);
    setEditItem({ title: '', body: '' }); // Reset edit fields
  };

  const handleDelete = (id: number) => {
    setItems(items.filter(item => item.id !== id)); // Update the UI by removing the deleted item
  };

  const toggleExpand = (id: number) => {
    setExpandedItems(prev => ({ ...prev, [id]: !prev[id] })); // Toggle the expanded state for the item
  };

  if (isLoading) return <p className="text-center font-enter">Loading...</p>;
  if (error) return <p className="text-red-500 text-center font-enter">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-4">Item List</h1>
      
      {/* Form to Add New Item */}
      <form className="mb-4" onSubmit={(e) => { e.preventDefault(); handleCreate(); }}>
        <input
          type="text"
          value={newItem.title}
          onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
          placeholder="Enter title"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
        />
        <textarea
          value={newItem.body}
          onChange={(e) => setNewItem({ ...newItem, body: e.target.value })}
          placeholder="Enter description"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
        />
        <button
          type="submit"
          className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Item
        </button>
      </form>

      {/* List of Items */}
      <ul className="list-none">
        {items.map(item => (
          <li key={item.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">{item.title}</h2>
              <button onClick={() => toggleExpand(item.id)} className="text-blue-500">
                {expandedItems[item.id] ? 'Collapse' : 'Expand'}
              </button>
            </div>
            {expandedItems[item.id] && (
              <p className="text-gray-700 mt-2">{item.body}</p>
            )}
            <div className="mt-4">
              <button onClick={() => handleEdit(item)} className="text-yellow-500 mr-2">Edit</button>
              <button onClick={() => handleDelete(item.id)} className="text-red-500">Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {/* Edit Item Modal */}
      {editItemId !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Edit Item</h2>
            <input
              type="text"
              value={editItem.title}
              onChange={(e) => setEditItem({ ...editItem, title: e.target.value })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
            />
            <textarea
              value={editItem.body}
              onChange={(e) => setEditItem({ ...editItem, body: e.target.value })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
            />
            <button onClick={handleUpdate} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Update
            </button>
            <button onClick={() => setEditItemId(null)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemList;