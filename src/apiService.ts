// src/apiService.ts
import axios from 'axios';

export interface Item {
  id: number;
  title: string;
  body: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  status: 'active' | 'completed' | 'archived';
  priority: 'low' | 'medium' | 'high';
  tags: string[]; // Array of tags
  ownerId: number; // ID of the user who created the item
  comments: string[]; // Array of comments
}

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

// Fetch items
export const fetchItems = async (): Promise<Item[]> => {
  const response = await axios.get<Item[]>(API_URL);
  return response.data.map(item => ({
    ...item,
    createdAt: new Date().toISOString(), // Set createdAt to current date for demo
    updatedAt: new Date().toISOString(), // Set updatedAt to current date for demo
    status: 'active', // Default status
    priority: 'medium', // Default priority
    tags: [], // Default empty tags
    ownerId: 1, // Default owner ID for demo
    comments: [], // Default empty comments
  }));
};

// Create item
export const createItem = async (item: Omit<Item, 'id' | 'createdAt' | 'updatedAt'>): Promise<Item> => {
  const response = await axios.post<Item>(API_URL, {
    ...item,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  return response.data;
};

// Update item
export const updateItem = async (id: number, item: Omit<Item, 'id' | 'createdAt'>): Promise<Item> => {
  const response = await axios.put<Item>(`${API_URL}/${id}`, {
    ...item,
    updatedAt: new Date().toISOString(),
  });
  return response.data;
};

// Delete item
export const deleteItem = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};