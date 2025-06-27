import React, { useContext, useState } from 'react';
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
  mdiPound,
  mdiChevronLeft,
  mdiChevronRight
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
    if (typeof value === 'object' && value !== null) {
      return (
        <div key={key} className="mb-4">
          <h3 className="text-lg font-semibold mb-2">{key}</h3>
          <div className="pl-4">{renderCosts(value)}</div>
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

// Loader Component
const ImageLoader = () => (
  <div className="flex items-center justify-center w-full h-64 bg-gray-100 rounded-lg">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-600"></div>
  </div>
);

const VehicleDetails = () => {
  const { vehicleData } = useContext(VehicleContext);
  const [modalImageIndex, setModalImageIndex] = useState(null);
  const [isImageLoading, setIsImageLoading] = useState(true);

  if (!vehicleData || !vehicleData.Detalhes) {
    return <div className="text-center text-gray-500">Nenhum dado de veículo disponível</div>;
  }

  const { Detalhes, Despesas } = vehicleData;

  // Use imageLinks for all images, with fallback if empty
  const imageLinks = Detalhes.imageLinks && Array.isArray(Detalhes.imageLinks) && Detalhes.imageLinks.length > 0
    ? Detalhes.imageLinks
    : ['https://via.placeholder.com/600x400'];

  const mainImage = imageLinks[0];
  const thumbnailImages = imageLinks.slice(1, 5); // Up to 4 thumbnails

  // Validate Despesas structure
  const despesas = Despesas && Despesas.Aduaneiro && Despesas.Terceiros ? {
    "Compra & Transporte": Despesas.Aduaneiro.Aduaneiros?.Custos?.cifMetical || '0',
    "Direitos": Despesas.Aduaneiro.Aduaneiros?.Custos?.direitos || '0',
    "Imp. Especifico": Despesas.Aduaneiro.Aduaneiros?.Custos?.ice || '0',
    "Imp. Acrescentado": Despesas.Aduaneiro.Aduaneiros?.Custos?.iva || '0',
    "SerÇ. Aduaneiros": Despesas.Aduaneiro.TSA || '0',
    "Tit. Propriedade": Despesas.Terceiros.Inatro?.Titulo_de_Propriedade || '0',
    "SerÇ. Kudumba": Despesas.Terceiros.Kudumba || '0',
    "SerÇ. Agente": Despesas.Terceiros.Documentos || '0',
    "SerÇ. MCnet": Despesas.Aduaneiro.MCnet || '0',
    "SerÇ. INATRO": Despesas.Terceiros.Inatro?.Matricula || '0',
    "Maputo Car": Despesas.Terceiros.Maputo_Car || '0',
    "Taxa de Radiodifusão": Despesas.Aduaneiro.Taxa_de_Radiodifusão || '0',
    'Total': Despesas.Aduaneiro.Aduaneiros?.Custos?.Total || '0',
  } : {};

  const total = despesas.Total && despesas['Compra & Transporte']
    ? (parseFloat(despesas.Total.replace(/,/g, '')) + parseFloat(despesas['Compra & Transporte'].replace(/,/g, ''))).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })
    : '0.00';

  const openModal = (index) => {
    setIsImageLoading(true);
    setModalImageIndex(index);
  };

  const closeModal = () => {
    setModalImageIndex(null);
    setIsImageLoading(true);
  };

  const handleNextImage = () => {
    setIsImageLoading(true);
    setModalImageIndex((prevIndex) => (prevIndex + 1) % imageLinks.length);
  };

  const handlePrevImage = () => {
    setIsImageLoading(true);
    setModalImageIndex((prevIndex) => (prevIndex - 1 + imageLinks.length) % imageLinks.length);
  };

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  return (
    <>
      <div className="grid md:grid-cols-3 gap-8 pt-28">
        {/* Left Column - Main Image and Thumbnails */}
        <div className="w-full md:w-auto">
          <h2 className="text-xl font-semibold mb-2 text-center text-gray-500">
            {Detalhes.carName || 'Veículo'}
          </h2>
          <div className="mb-6 w-full md:w-auto">
            <img
              src={mainImage}
              alt="Main Vehicle"
              className="w-full rounded-lg cursor-pointer"
              onClick={() => openModal(0)}
            />
            {thumbnailImages.length > 0 && (
              <div className="grid grid-cols-4 gap-2 mt-4">
                {thumbnailImages.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Vehicle thumbnail ${index + 1}`}
                    className="w-full h-20 object-cover rounded-lg cursor-pointer"
                    onClick={() => openModal(index + 1)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Middle Column - Vehicle Details */}
        <Card className="bg-gray-50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-center gap-2 text-xl font-bold text-gray-500">
              <Icon path={mdiCurrencyUsd} size={1} className="text-cyan-600" />
              USD {Detalhes.cif || 'N/A'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <DetailRow
              label="Vehicle Type"
              value={Detalhes.tipo || 'N/A'}
              iconPath={mdiCar}
            />
            <DetailRow
              label="Year"
              value={Detalhes.ano || 'N/A'}
              iconPath={mdiCalendar}
            />
            <DetailRow
              label="Engine Size"
              value={Detalhes.motorCc ? `${Detalhes.motorCc}cc` : 'N/A'}
              iconPath={mdiEngine}
            />
            <DetailRow
              label="Fuel Type"
              value={Detalhes.combustivel || 'N/A'}
              iconPath={mdiGasStation}
            />
            <DetailRow
              label="Seats"
              value={Detalhes.assentos || 'N/A'}
              iconPath={mdiCarSeat}
            />
            <DetailRow
              label="Doors"
              value={Detalhes.portas || 'N/A'}
              iconPath={mdiCarDoor}
            />
            <div className="mt-4 pt-2 flex items-center justify-center gap-2 text-sm text-gray-500 border-t border-gray-200 font-semibold text-xl text-gray-400">
              <Icon path={mdiPound} size={1} />
              Reference: {Detalhes.referencia || 'N/A'}
            </div>
          </CardContent>
        </Card>

        {/* Right Column - Costs */}
        <Card className="bg-gray-50">
          <div className="p-4 rounded-lg">
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

      {/* Modal for Image Popup */}
      {modalImageIndex !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleOutsideClick}
        >
          <div className="relative bg-white rounded-lg p-4 max-w-3xl w-full">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 z-10"
              onClick={closeModal}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="relative">
              {isImageLoading && <ImageLoader />}
              <img
                src={imageLinks[modalImageIndex]}
                alt={`Vehicle ${modalImageIndex + 1}`}
                className={`w-full h-auto rounded-lg ${isImageLoading ? 'hidden' : 'block'}`}
                onLoad={handleImageLoad}
              />
              {imageLinks.length > 1 && (
                <>
                  <button
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white bg-gray-800 bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 z-10"
                    onClick={handlePrevImage}
                  >
                    <Icon path={mdiChevronLeft} size={1} />
                  </button>
                  <button
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white bg-gray-800 bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 z-10"
                    onClick={handleNextImage}
                  >
                    <Icon path={mdiChevronRight} size={1} />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VehicleDetails;