'use client'; // Essa diretiva transforma o componente em um Client Component
import { useEffect, useState } from 'react';

import Link from 'next/link';

const Menu = () => {
  return (
    //          <ul className='nav_s1'>
//          <ul className='navbar navbar-expand-lg navbar-light bg-light'>

          <ul className='nav nav-tabs nav_s1'>
            <li className='nav-item'><Link href="/">Home</Link></li>
            <li className='nav-item'><Link href="/client">Cliente</Link></li>
            <li className='nav-item'><Link href="/uf">UF</Link></li>
            <li className='nav-item'><Link href="/type_installation">Tipo Instalação</Link></li>
            <li className='nav-item'><Link href="/equipament">Equipamento</Link></li>
            <li className='nav-item'><Link href="/project">Projeto</Link></li>
          </ul>
  );
};

export default Menu;
