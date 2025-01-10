import React from 'react';
import { ChevronRight } from 'lucide-react';

const ImportSteps = () => {
  const steps = [
    {
      number: 1,
      title: "Acesse o Site do Fornecedor",
      description: "Visite a página oficial do fornecedor (como BeForward) e selecione o veículo desejado para ver mais detalhes."
    },
    {
      number: 2,
      title: "Copie o Link do Veículo",
      description: "Na página de detalhes do veículo, copie a URL da barra de endereço ou clique com o botão direito na imagem do carro e selecione 'Copiar Link'."
    },
    {
      number: 3,
      title: "Cole no ImportMoz",
      description: "Retorne à página do ImportMoz e cole o link copiado na barra de pesquisa. Em seguida, clique no ícone de pesquisa."
    },
    {
      number: 4,
      title: "Verifique os Custos",
      description: "Após a verificação da disponibilidade, a plataforma mostrará uma estimativa detalhada dos custos de importação baseada nas especificações do veículo."
    }
  ];




  










  return (
    <div className="min-h-screen bg-gray-50 p-8 pt-28 ">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <Card className="mb-8 bg-blue-600 text-white p-8">
          <h1 className="text-3xl font-bold text-center mb-2">
            Como Verificar Custos de Importação
          </h1>
          <p className="text-xl text-center text-blue-100">
            Simples, rápido e sem custos!
          </p>
        </Card>

        {/* Steps Section */}
        <div className="space-y-6">
          {steps.map((step) => (
            <Card 
              key={step.number}
              className="p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-start space-x-6">
                {/* Step Number */}
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-white">{step.number}</span>
                </div>

                {/* Content */}
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>

                {/* Image Placeholder */}
                <div className="flex-shrink-0 w-48 h-32 bg-gray-100 rounded-lg overflow-hidden">
                  <img 
                    src="/api/placeholder/192/128" 
                    alt={`Step ${step.number}`}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Arrow Icon */}
                <ChevronRight className="flex-shrink-0 w-6 h-6 text-blue-600 mt-3" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImportSteps;