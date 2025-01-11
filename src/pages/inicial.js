import React, { useContext, useState } from "react";
import Header from "../components/ui/Header";
import SearchBar from "../components/ui/SearchBar";
import Footer from "../components/ui/Footer";
import InitBody from "../components/ui/InitBody";
import ImportSteps from "../components/ui/ImportSteps";
import AboutPage from "../components/ui/AboutPage";
import Privacy from "../components/ui/Privacy";
import Terms from "../components/ui/Terms";
import { VehicleProvider, VehicleContext } from "../context/VehicleContext";
import { HeaderProvider, HeaderContext } from "../context/HeaderContext";

const InitContent = ({ currentPage }) => {
  const { vehicleData } = useContext(VehicleContext); // Contexto dentro do VehicleProvider
  const { activeButton } = useContext(HeaderContext); // Contexto dentro do HeaderProvider

  if (currentPage === "Privacy") {
    return <Privacy />;
  }

  if (currentPage === "Terms") {
    return <Terms />;
  }

  return (
    <>
      {activeButton === "Inicio" && <SearchBar />}
      {/* Renderização condicional baseada no botão ativo */}
      {activeButton === "Inicio" && (vehicleData ? <InitBody /> : <ImportSteps />)}
      {activeButton === "Sobre" && <AboutPage />}
    </>
  );
};

const InitPage = () => {
  const [currentPage, setCurrentPage] = useState("Inicio");

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderProvider>
        <Header setCurrentPage={setCurrentPage} currentPage={currentPage} />
        <VehicleProvider>
          <InitContent currentPage={currentPage} />
        </VehicleProvider>
      </HeaderProvider>
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default InitPage;
