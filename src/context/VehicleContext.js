import React, { createContext, useState } from 'react';

export const VehicleContext = createContext();

export const VehicleProvider = ({ children }) => {
  const [vehicleData, setVehicleData] = useState(null);

  return (
    <VehicleContext.Provider value={{ vehicleData, setVehicleData }}>
      {children}
    </VehicleContext.Provider>
  );
};