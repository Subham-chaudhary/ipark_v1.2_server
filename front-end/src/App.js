import React, { useState } from 'react';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  const handleHomeClick = () => {
    setActiveTab('home');
    console.log('Home tab clicked!');
  };

  const handleAdminClick = () => {
    setActiveTab('admin');
    console.log('Admin tab clicked!');
  };

  const handleUserClick = () => {
    setActiveTab('user');
    console.log('User tab clicked!');
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Online Parking System</h1>
        <nav className="tabs">
          <button onClick={handleHomeClick} className={activeTab === 'home'? 'active' : ''}>Home</button>
          <button onClick={handleAdminClick} className={activeTab === 'admin'? 'active' : ''}>Admin</button>
          <button onClick={handleUserClick} className={activeTab === 'user'? 'active' : ''}>User</button>
        </nav>
      </header>

      <main className="content">
        {activeTab === 'home' && (
          <section className="home-content">
            <h2>Welcome to Online Parking System</h2>
          </section>
        )}
        {activeTab === 'admin' && (
          <section className="admin-content">
            {/* Add your admin content here */}
          </section>
        )}
        {activeTab === 'user' && (
          <section className="user-content">
            {/* Add your user content here */}
          </section>
        )}
      </main>
    </div>
  );
}

export default App;