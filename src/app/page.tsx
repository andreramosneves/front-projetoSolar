'use client'; // Essa diretiva transforma o componente em um Client Component

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link , Navigate} from 'react-router-dom';

import Client from './ClientForm'; // Componente da página inicial
import ClientList from './ClientList'; 

import UFList from './UFList'; 
import UFForm from './UFForm'; 

import TypeInstallationList from './TypeInstallationList'; 
import TypeInstallationForm from './TypeInstallationForm'; 

import EquipamentList from './EquipamentList'; 
import EquipamentForm from './EquipamentForm'; 

import ProjectForm from './ProjectForm'; 

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
            <li><Link to="/uf">UF</Link></li>
            <li><Link to="/type_installation">Tipo Instalação</Link></li>
            <li><Link to="/equipament">Equipamento</Link></li>
            <li><Link to="/equipament">Projeto</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Redirect />} />
          <Route path="/client" element={<Client />} />
          <Route path="/client_list" element={<ClientList />} />
          <Route path="/uf" element={<UFForm />} />
          <Route path="/uf_list" element={<UFList />} />
          <Route path="/type_installation" element={<TypeInstallationForm />} />
          <Route path="/type_installation_list" element={<TypeInstallationList />} />
          <Route path="/equipament" element={<EquipamentForm />} />
          <Route path="/equipament_list" element={<EquipamentList />} />
          <Route path="/project" element={<ProjectForm />} />
        </Routes>
      </Router>
    </main>
  );
};

export default App;
