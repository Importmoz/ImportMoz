import React from 'react';

const ImportMozPage = () => {
  return (
    <div className="bg-gray-50 ">
      {/* Main Content */}
      <main className="flex flex-col items-center justify-center min-h-screen py-2">
        <div className="w-full px-4">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-center mb-6">Nunca foi tão Fácil</h1>
            <p className="text-center text-lg mb-12">
              Obter todas as estimativas de custo de desembaraço aduaneiro pela internet, de forma <span className="font-bold">fácil</span>, <span className="font-bold">rápida</span>, <span className="font-bold">ilimitada</span> e melhor que tudo <span className="font-bold">100% gratuito</span>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <section className="text-center">
                <h2 className="text-2xl font-bold mb-4">Quem Sou?</h2>
                <div className="space-y-4 text-gray-700">
                  <p>O <span className="font-bold">ImportMoz</span> é uma plataforma digital com enfoque na área aduaneira e especializada na importação de viaturas. Esta plataforma tem como finalidade facilitar a obtenção de estimativas de custos para a importação de viaturas com base em um link.</p>
                </div>
              </section>

              <section className="text-center">
                <h2 className="text-2xl font-bold mb-4">Como Usar?</h2>
                <div className="space-y-4 text-gray-700">
                  <p>Tudo o que você precisa fazer é copiar e colar o link do URL do carro escolhido na caixa de pesquisa, e já está. Depois disso, faremos o resto!</p>
                </div>
              </section>

              <section className="text-center">
                <h2 className="text-2xl font-bold mb-4">Totalmente Grátis</h2>
                <div className="space-y-4 text-gray-700">
                  <p>O bom é que a ferramenta ImportMoz é totalmente gratuita, então você não precisa ter cartão de crédito ou fazer nenhum pagamento para usar os serviços de estimativa gratuitos.</p>
                </div>
              </section>

              <section className="text-center">
                <h2 className="text-2xl font-bold mb-4">Registo de Conta</h2>
                <div className="space-y-4 text-gray-700">
                  <p>O ImportMoz não condiciona o registo de uma conta para poder usar ou obter estimativas. Só acessar importmoz.com no seu navegador e já está! Contudo, para o uso de recursos pagos deverá efectuar o registo.</p>
                </div>
              </section>
            </div>

            <section className="text-center">
              <h2 className="text-2xl font-bold mb-4 pt-5">Links Suportados</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div className="p-1 border rounded-lg flex items-center justify-center">
                  <img src={require("../image/beforward.png")} alt="BeForward" className="h-16 w-100" />
                </div>
                <div className="p-1 border rounded-lg flex items-center justify-center">
                  <img src={require("../image/sbt.png")} alt="SBT" className="h-16" />
                </div>
                <div className="p-1 border rounded-lg flex items-center justify-center">
                  <img src={require("../image/trust.png")} alt="Trust" className="h-16" />
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ImportMozPage;
