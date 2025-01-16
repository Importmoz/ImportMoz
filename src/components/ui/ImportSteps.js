import React, { useState, useEffect } from "react";

const ImportSteps = () => {
  const [activeStep, setActiveStep] = useState(null); // Estado para rastrear o card ativo
  const [isZoomEnabled, setIsZoomEnabled] = useState(true); // Estado para verificar se o zoom está habilitado

  // Função para verificar a largura da tela
  const checkScreenSize = () => {
    setIsZoomEnabled(window.innerWidth >= 768); // Habilita zoom apenas em telas maiores que 768px
  };

  useEffect(() => {
    checkScreenSize(); // Verifica o tamanho da tela ao carregar
    window.addEventListener("resize", checkScreenSize); // Adiciona um evento de resize
    return () => {
      window.removeEventListener("resize", checkScreenSize); // Remove o evento ao desmontar
    };
  }, []);

  const steps = [
    {
      number: 1,
      scr: require("../../utils/img/1.webp"),
      title: "Acesse e Copie o Link",
      description:
        "Visite a página oficial do fornecedor (Ex. BeForward, Sbtjapan), selecione o veículo desejado e copie a URL.",
    },
    {
      number: 2,
      scr: require("../../utils/img/2.webp"),
      title: "Cole no ImportMoz",
      description:
        "Retorne à página do ImportMoz e cole o link copiado, de seguida clique em pesquisar ou no ícone de pesquisa.",
    },
    {
      number: 3,
      scr: require("../../utils/img/3.webp"),
      title: "Verifique os Custos",
      description:
        "Após a verificação, a plataforma mostrará uma estimativa detalhada dos custos de importação do veículo.",
    },
  ];

  // Card Component
  const Card = ({ step, onClick }) => {
    return (
      <div
        onClick={() => isZoomEnabled && onClick(step)} // Apenas abre o modal se o zoom estiver habilitado
        className={`relative rounded-lg border border-gray-200 bg-white text-gray-950 shadow-sm p-2 hover:shadow-lg transition-all duration-300 transform cursor-pointer group ${
          isZoomEnabled ? "hover:scale-105" : ""
        }`}
      >
        <div className="flex flex-col items-start space-y-2">
          {/* Step Number and Title */}
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-xl font-bold text-white">{step.number}</span>
            </div>
            <h3 className="text-xl font-semibold">{step.title}</h3>
          </div>

          {/* Content */}
          <div className="flex-grow">
            <p className="text-gray-600">{step.description}</p>
          </div>

          {/* Image Placeholder */}
          <div className="flex-shrink-0 w-full bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={step.scr}
              alt={`Step ${step.number}`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Botão de dica ao passar o mouse */}
        {isZoomEnabled && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-blue-600 text-lg font-bold">
              Clique para ampliar
            </span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="rounded-lg pt-28 mb-8 relative">
      <p className="text-center text-lg mb-8">
        Obtenha custos de desembaraço aduaneiro pela internet de forma{" "}
        <span className="font-bold">fácil</span>,{" "}
        <span className="font-bold">rápida</span>,{" "}
        <span className="font-bold">ilimitada</span>, e o melhor de tudo:{" "}
        <span className="font-bold">100% gratuito</span>!
      </p>

      {/* Grid de Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        {steps.map((step) => (
          <Card
            key={step.number}
            step={step}
            onClick={setActiveStep} // Definir o card ativo ao clicar
          />
        ))}
      </div>

      {/* Modal de Zoom */}
      {activeStep && isZoomEnabled && (
        <div
          onClick={() => setActiveStep(null)} // Fechar ao clicar fora
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div
            onClick={(e) => e.stopPropagation()} // Prevenir o fechamento ao clicar no modal
            className="bg-white rounded-lg p-6 shadow-2xl transform scale-100"
            style={{
              width: "50%", // Aumenta a largura para 40% maior
              height: "100%", // Aumenta a altura para 40% maior
              maxWidth: "90vw", // Limita a largura máxima ao tamanho da viewport
              maxHeight: "90vh", // Limita a altura máxima ao tamanho da viewport
            }}
          >
            <div className="flex flex-col items-start space-y-4">
              {/* Step Number */}
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    {activeStep.number}
                  </span>
                </div>
                <h3 className="text-2xl font-bold">{activeStep.title}</h3>
              </div>

              {/* Description */}
              <p className="text-lg text-gray-600">{activeStep.description}</p>

              {/* Image */}
              <div className="w-full bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={activeStep.scr}
                  alt={`Step ${activeStep.number}`}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImportSteps;
