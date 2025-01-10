import React, { useContext } from "react";
import Header from "../components/ui/Header";
import SearchBar from "../components/ui/SearchBar";
import Footer from "../components/ui/Footer";
import InitBody from "../components/ui/InitBody";
import ImportSteps from "../components/ui/ImportSteps";
import AboutPage from "../components/ui/AboutPage";
import { VehicleProvider, VehicleContext } from "../context/VehicleContext";
import { HeaderProvider, HeaderContext } from "../context/HeaderContext";

const InitContent = () => {
  const { vehicleData } = useContext(VehicleContext); // Contexto dentro do VehicleProvider
  const { activeButton } = useContext(HeaderContext); // Contexto dentro do HeaderProvider

  return (
    <>
      {activeButton === "Inicio" && <SearchBar />}
      {/* Renderização condicional baseada no botão ativo */}
      {activeButton === "Inicio" && (vehicleData ? <InitBody /> : <ImportSteps />)}
      {activeButton === "Sobre" && < AboutPage />}
    </>
  );
};

const InitPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderProvider>
        <Header />
        <VehicleProvider>
          <InitContent />
        </VehicleProvider>
      </HeaderProvider>
      <Footer />
    </div>
  );
};

export default InitPage;
