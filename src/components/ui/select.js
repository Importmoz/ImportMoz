import React, { useState } from 'react';

// Contexto para compartilhar estado entre componentes
const SelectContext = React.createContext();

export const Select = ({ children, className, onValueChange, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  const contextValue = {
    isOpen,
    setIsOpen,
    selectedValue,
    setSelectedValue,
    onValueChange, // Adiciona a função onValueChange ao contexto
  };

  return (
    <div className={`relative ${className}`} {...props}>
      <SelectContext.Provider value={contextValue}>
        {children}
      </SelectContext.Provider>
    </div>
  );
};

export const SelectTrigger = ({ children, className, ...props }) => {
  const { isOpen, setIsOpen, selectedValue } = React.useContext(SelectContext);

  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className={`w-full px-3 py-2 border rounded-md text-left flex justify-between items-center ${className}`}
      {...props}
    >
      {selectedValue || children}
      <span>⏷</span>
    </button>
  );
};

export const SelectValue = ({ placeholder }) => {
  const { selectedValue } = React.useContext(SelectContext);
  return selectedValue || placeholder;
};

export const SelectContent = ({ children, className, ...props }) => {
  const { isOpen } = React.useContext(SelectContext);

  if (!isOpen) return null;

  return (
    <div 
      className={`absolute z-10 w-full border rounded-md shadow-lg bg-white mt-1 ${className}`} 
      {...props}
    >
      {children}
    </div>
  );
};

export const SelectItem = ({ value, children, className, ...props }) => {
  const { setSelectedValue, setIsOpen, onValueChange } = React.useContext(SelectContext);

  const handleSelect = () => {
    setSelectedValue(value);
    setIsOpen(false);

    // Chama a função onValueChange se fornecida
    if (onValueChange) {
      onValueChange(value);
    }
  };

  return (
    <div 
      onClick={handleSelect}
      className={`px-3 py-2 hover:bg-gray-100 cursor-pointer ${className}`}
      {...props}
    >
      {children || value}
    </div>
  );
};