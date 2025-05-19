import React, { useState, useEffect } from "react";
import { motion } from "framer-motion"; // Adicione esta importação para animações

const ImportSteps = () => {
  const [activeStep, setActiveStep] = useState(null);
  const [isZoomEnabled, setIsZoomEnabled] = useState(true);

  // Função para verificar a largura da tela
  const checkScreenSize = () => {
    setIsZoomEnabled(window.innerWidth >= 768);
  };

  useEffect(() => {
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const steps = [
    {
      number: 1,
      scr: require("../../utils/img/1.webp"),
      title: "Acesse e Copie o Link",
      description:
        "Visite a página oficial do fornecedor (Ex. BeForward, Sbtjapan), selecione o veículo desejado e copie a URL.",
      icon: "🔗", // Ícone para o passo 1
    },
    {
      number: 2,
      scr: require("../../utils/img/2.webp"),
      title: "Cole no ImportMoz",
      description:
        "Retorne à página do ImportMoz e cole o link copiado, de seguida clique em pesquisar ou no ícone de pesquisa.",
      icon: "🔍", // Ícone para o passo 2
    },
    {
      number: 3,
      scr: require("../../utils/img/3.webp"),
      title: "Verifique os Custos",
      description:
        "Após a verificação, a plataforma mostrará uma estimativa detalhada dos custos de importação do veículo.",
      icon: "💰", // Ícone para o passo 3
    },
  ];

  // Card Component
  const Card = ({ step, onClick }) => {
    return (
      <motion.div
        whileHover={{ y: -5 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        onClick={() => isZoomEnabled && onClick(step)}
        className={`relative rounded-xl border-0 bg-gradient-to-br from-white to-gray-50 text-gray-950 shadow-lg p-3 sm:p-4 cursor-pointer group overflow-hidden w-full ${isZoomEnabled ? "hover:shadow-xl" : ""}`}
      >
        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full opacity-10"></div>
        <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full opacity-10"></div>
        
        <div className="flex flex-col items-start space-y-3 sm:space-y-4 relative z-10">
          {/* Step Number and Title */}
          <div className="flex items-center space-x-2 sm:space-x-4 w-full">
            <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full flex items-center justify-center shadow-md">
              <span className="text-xl sm:text-2xl font-bold text-white">{step.number}</span>
            </div>
            <div className="flex-grow">
              <span className="text-xs sm:text-sm font-medium text-blue-600 uppercase tracking-wider">Passo {step.number}</span>
              <h3 className="text-lg sm:text-xl font-bold">{step.title}</h3>
            </div>
            <div className="text-2xl sm:text-3xl" aria-hidden="true">{step.icon}</div>
          </div>

          {/* Content */}
          <div className="flex-grow w-full">
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{step.description}</p>
          </div>

          {/* Image with improved styling */}
          <div className="flex-shrink-0 w-full bg-gradient-to-b from-gray-50 to-gray-100 rounded-xl overflow-hidden shadow-inner mt-2">
            <img
              src={step.scr}
              alt={`Passo ${step.number}: ${step.title}`}
              className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Botão de dica ao passar o mouse - agora com design melhorado */}
        {isZoomEnabled && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-blue-600/80 to-blue-800/80 opacity-0 group-hover:opacity-90 transition-opacity duration-300 rounded-xl">
            <span className="text-white text-base sm:text-lg font-bold px-3 py-1 sm:px-4 sm:py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg transform transition-transform duration-300 group-hover:scale-110">
              Clique para ampliar
            </span>
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <div className="rounded-xl pt-16 sm:pt-28 mb-6 sm:mb-12 relative w-full">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500 opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-purple-500 opacity-5 rounded-full blur-3xl"></div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="px-1 sm:px-0"
      >
        <h2 className="text-center text-2xl sm:text-3xl font-bold mb-2 sm:mb-3 bg-gradient-to-r from-blue-600 to-blue-800 inline-block text-transparent bg-clip-text w-full">Como Funciona</h2>
        <p className="text-center text-base sm:text-lg mb-4 sm:mb-10 max-w-3xl mx-auto px-2">
          Obtenha custos de desembaraço aduaneiro pela internet de forma{" "}
          <span className="font-bold text-blue-600">fácil</span>,{" "}
          <span className="font-bold text-blue-600">rápida</span>,{" "}
          <span className="font-bold text-blue-600">ilimitada</span>, e o melhor de tudo:{" "}
          <span className="font-bold bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text">100% gratuito</span>!
        </p>
      </motion.div>

      {/* Grid de Cards com espaçamento melhorado para mobile */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-6 px-1 sm:px-4 w-full max-w-full mx-auto">
        {steps.map((step, index) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="w-full"
          >
            <Card
              step={step}
              onClick={setActiveStep}
            />
          </motion.div>
        ))}
      </div>

      {/* Modal de Zoom com design melhorado e foco na imagem */}
      {activeStep && isZoomEnabled && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setActiveStep(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh] max-w-[90vw] w-auto"
          >
            {/* Botão de fechar */}
            <button 
              onClick={() => setActiveStep(null)}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 transition-colors duration-200 z-20"
            >
              <span className="sr-only">Fechar</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            
            {/* Imagem em tamanho grande - agora é o foco principal */}
            <div className="w-full overflow-hidden bg-black flex items-center justify-center">
              <img
                src={activeStep.scr}
                alt={`Passo ${activeStep.number}: ${activeStep.title}`}
                className="w-auto max-w-full max-h-[70vh] object-contain"
              />
            </div>
            
            {/* Informações em um painel inferior colapsável */}
            <div className="p-6 bg-white w-full">
              <div className="flex items-center space-x-4 mb-3">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full flex items-center justify-center shadow-md">
                  <span className="text-xl font-bold text-white">{activeStep.number}</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-blue-600 uppercase tracking-wider">Passo {activeStep.number}</span>
                  <h3 className="text-xl font-bold">{activeStep.title}</h3>
                </div>
                <div className="ml-auto text-3xl" aria-hidden="true">{activeStep.icon}</div>
              </div>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed mb-4">{activeStep.description}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default ImportSteps;
