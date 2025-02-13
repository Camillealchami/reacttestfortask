// src/App.tsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faEnvelope, faUsers, faBars } from '@fortawesome/free-solid-svg-icons';
import UserList from './UserList.tsx'; // Ensure the correct path to your UserList component
import ItemList from './ItemList.tsx'; // Ensure the correct path to your ItemList component

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('home'); // State to manage the current view

  // Function to handle navigation clicks
  const handleNavigation = (view: string) => {
    setCurrentView(view);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-800 text-white"> {/* Main container */}
      <header className="flex items-center justify-between bg-gray-900 p-4"> {/* Header styling */}
        <div className="text-2xl font-bold">ReactTC</div> {/* Text-based logo */}
        <nav className="flex-grow flex justify-center space-x-4"> {/* Centered navigation */}
          <a href="#" onClick={() => handleNavigation('home')} className="flex flex-col items-center">
            <FontAwesomeIcon icon={faHome} className="text-2xl" />
            <span>Home</span>
          </a>
          <a href="#" onClick={() => handleNavigation('messages')} className="flex flex-col items-center">
            <FontAwesomeIcon icon={faEnvelope} className="text-2xl" />
            <span>Messages</span>
          </a>
          <a href="#" onClick={() => handleNavigation('people')} className="flex flex-col items-center">
            <FontAwesomeIcon icon={faUsers} className="text-2xl" />
            <span>People</span>
          </a>
        </nav>
        <button className="md:hidden"> {/* Burger icon for mobile */}
          <FontAwesomeIcon icon={faBars} className="text-white" />
        </button>
      </header>
      <div className="flex-grow overflow-y-auto p-4"> {/* Allow scrolling */}
        {currentView === 'home' && (
          <>
            <UserList />
            <ItemList />
          </>
        )}
        {currentView === 'messages' && <ItemList />}
        {currentView === 'people' && <UserList />}
      </div>
      <footer className="mt-4 text-center">
        <a
          className="text-blue-400 hover:underline"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </footer>
    </div>
  );
};

export default App;