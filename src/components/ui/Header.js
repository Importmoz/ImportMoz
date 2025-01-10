import React, { useContext } from 'react';
import { HeaderContext } from '../../context/HeaderContext';

const Header = () => {
  const { activeButton, setActiveButton } = useContext(HeaderContext);

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-cyan-700 text-2xl font-semibold">Import</span>
          <span className="text-orange-400 text-3xl font-semibold">Moz</span>
        </div>
        <div className="flex gap-2">
          <button
            className={`${
              activeButton === "Inicio" ? "bg-cyan-500 text-white font-bold" : "bg-cyan-200 text-cyan-700"
            } w-20 rounded-md p-2 transition duration-300`}
            onClick={() => setActiveButton("Inicio")}
          >
            Inicio
          </button>
          <button
            className={`${
              activeButton === "Sobre" ? "bg-cyan-500 text-white font-bold" : "bg-cyan-200 text-cyan-700"
            } w-20 rounded-md p-2 transition duration-300`}
            onClick={() => setActiveButton("Sobre")}
          >
            Sobre
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
