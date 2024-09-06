'use client'; // Essa diretiva transforma o componente em um Client Component

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link , Navigate} from 'react-router-dom';

import Client from './ClientForm'; // Componente da página inicial
import ClientList from './ClientList'; 

const Redirect: React.FC = () => {
  // Redireciona para a página principal
  return <Navigate to="/" />;
};

const App: React.FC = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Router>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/client">Cliente</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Redirect />} />
          <Route path="/client" element={<Client />} />
          <Route path="/ClientList" element={<ClientList />} />
        </Routes>
      </Router>
    </main>
  );
};

export default App;
