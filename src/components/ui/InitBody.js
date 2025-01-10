import React, { useContext } from 'react';
import Icon from '@mdi/react';
import { VehicleContext } from '../../context/VehicleContext';
import {
  mdiCurrencyUsd,
  mdiCar,
  mdiCalendar,
  mdiEngine,
  mdiGasStation,
  mdiCarSeat,
  mdiCarDoor,
  mdiPound
} from '@mdi/js';

// Card Components
const Card = ({ className = 'w-full md:w-auto', ...props }) => {
  return (
    <div
      className={`rounded-lg border border-gray-200 bg-white text-gray-950 shadow-sm ${className}`}
      {...props}
    />
  );
};

const CardHeader = ({ className = '', ...props }) => {
  return (
    <div
      className={`flex flex-col space-y-1.5 p-6 ${className}`}
      {...props}
    />
  );
};

const CardTitle = ({ className = '', ...props }) => {
  return (
    <h2
      className={`text-lg font-semibold ${className}`}
      {...props}
    />
  );
};

const CardContent = ({ className = '', ...props }) => {
  return (
    <div
      className={`p-6 ${className}`}
      {...props}
    />
  );
};

// Helper Components
const DetailRow = ({ label, value, iconPath }) => (
  <div className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
    <div className="flex items-center gap-3">
      <Icon path={iconPath} size={1} className="text-cyan-600" />
      <span className="text-gray-600 text-sm">{label}</span>
    </div>
    <span className="font-medium text-gray-900">{value}</span>
  </div>
);

const renderCosts = (costs) => {
  if (!costs) return null;
  return Object.entries(costs).map(([key, value]) => {
    if (typeof value === 'object') {
      return (
        <div key={key} className="mb-4">
          <h3 className="text-lg font-semibold mb-2">{key}</h3>
          <div className="pl-4">{renderCosts(value) }</div>
        </div>
      );
    }
    return (
      <div key={key} className="flex justify-between items-center h-full">
        <span className="text-gray-600">{key}:</span>
        <span className="font-semibold">{value} Mt</span>
      </div>
    );
  });
};

const VehicleDetails = () => {
  const { vehicleData } = useContext(VehicleContext);

  if (!vehicleData) {
    return null;
  }

  const { Detalhes, Despesas } = vehicleData;


  const  despesas = {
    "Compra & Transporte": Despesas.Aduaneiro.Aduaneiros.Custos.cifMetical,
    "Direitos": Despesas.Aduaneiro.Aduaneiros.Custos.direitos,
    "Imp. Especifico": Despesas.Aduaneiro.Aduaneiros.Custos.ice,
    "Imp. Acrescentado": Despesas.Aduaneiro.Aduaneiros.Custos.iva,
    "SerÇ. Aduaneiros": Despesas.Aduaneiro.TSA,
    "Tit. Propriedade": "2,450.00",
    "SerÇ. Kudumba": Despesas.Terceiros.Kudumba,
    "SerÇ. Agente":Despesas.Terceiros.Documentos,
    "SerÇ. MCnet": Despesas.Terceiros.Maputo_Car,
    "SerÇ. INATRO": Despesas.Terceiros.Inatro.Matricula,
    "Maputo Car": Despesas.Aduaneiro.TSA,
    "Taxa de Radiodifusão": "59.00",
    'Total': Despesas.Aduaneiro.Aduaneiros.Custos.Total,
  };

  const total = ( parseFloat(despesas.Total.replace(/,/g, ''))  + parseFloat(Despesas.Aduaneiro.Aduaneiros.Custos.cifMetical.replace(/,/g, ''))).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
});


  return (
    
       <div className="grid md:grid-cols-3 gap-8 pt-28  ">  
           {/* Left Column - Image and Details */}
           <div className="w-full md:w-auto">
              <h2 className="text-xl font-semibold mb-2 text-center text-gray-500">
                {Detalhes.carName}
              </h2>
              <div className="mb-6 w-full md:w-auto">
                <img
                  src={Detalhes.imageLink} // Usando o link da imagem dinamicamente
                  alt="Vehicle"
                  className="w-full rounded-lg" // Aumentei a altura da imagem
                />
  
              </div>
            </div>
  
            {/* Middle Column - Vehicle Details */}
            <Card className="bg-gray-50">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-center gap-2 text-xl font-bold text-gray-500">
                  <Icon path={mdiCurrencyUsd} size={1} className="text-cyan-600" />
                  USD {Detalhes.cif}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <DetailRow 
                  label="Vehicle Type" 
                  value={Detalhes.tipo} 
                  iconPath={mdiCar}
                />
                <DetailRow 
                  label="Year" 
                  value={Detalhes.ano} 
                  iconPath={mdiCalendar}
                />
                <DetailRow 
                  label="Engine Size" 
                  value={`${Detalhes.motorCc}cc`} 
                  iconPath={mdiEngine}
                />
                <DetailRow 
                  label="Fuel Type" 
                  value={Detalhes.combustivel} 
                  iconPath={mdiGasStation}
                />
                <DetailRow 
                  label="Seats" 
                  value={Detalhes.assentos} 
                  iconPath={mdiCarSeat}
                />
                <DetailRow 
                  label="Doors" 
                  value={Detalhes.portas} 
                  iconPath={mdiCarDoor}
                />
                <div className="mt-4 pt-2 flex items-center justify-center gap-2 text-sm text-gray-500 border-t border-gray-200  font-semibold  text-xl  text-gray-400">
                  <Icon path={mdiPound} size={1} />
                  Reference: {Detalhes.referencia}
                </div>
              </CardContent>
            </Card>
  
            {/* Right Column - Costs */}
           <Card className="bg-gray-50">
                       
                     <div className=" p-4 rounded-lg">
                       <div className="space-y-2">{renderCosts(despesas)}</div>
                       <CardHeader className="pb-2">
                         <CardTitle className="flex items-center justify-center gap-2 text-xl font-bold text-gray-500">
                           <Icon path={mdiCurrencyUsd} size={1} className="text-cyan-600" />
                           MZN {total}
                         </CardTitle>
                       </CardHeader>
                     </div>
                     
                </Card>
          </div>

  );
};

export default VehicleDetails;
