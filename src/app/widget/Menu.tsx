'use client'; // Essa diretiva transforma o componente em um Client Component
import { useEffect, useState } from 'react';

import Link from 'next/link';
//import "./styles/styles.scss";
const Menu = () => {
  return (
    //          <ul className='nav_s1'>
//      <nav className="navbar navbar-expand-lg navbar-light bg-light"> 
//          <ul className='nav nav-tabs nav_s1'>
      <nav className="nav_s1">
         <ul className="nav_s1">
            <li className='nav-item nav_l1'><Link className="btn btn-primary btnMenu" href="/">Home</Link></li>
            <li className='nav-item nav_l1'><Link className="btn btn-primary btnMenu" href="/client">Cliente</Link></li>
            <li className='nav-item nav_l1'><Link className="btn btn-primary btnMenu" href="/uf">UF</Link></li>
            <li className='nav-item nav_l1'><Link className="btn btn-primary btnMenu" href="/type_installation">Tipo Instalação</Link></li>
            <li className='nav-item nav_l1'><Link className="btn btn-primary btnMenu" href="/equipament">Equipamento</Link></li>
            <li className='nav-item nav_l1'><Link className="btn btn-primary btnMenu" href="/project">Projeto</Link></li>
          </ul>
      </nav>
  );
};

export default Menu;
