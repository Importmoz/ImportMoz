import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { VehicleContext } from '../../context/VehicleContext';
import LeadPopup from './LeadPopup';
import { Client, Databases, Query } from 'appwrite';
import Cookies from 'js-cookie';

// Configuração do Appwrite usando variáveis de ambiente
const client = new Client()
  .setEndpoint(process.env.REACT_APP_APPWRITE_ENDPOINT) // Usando variável de ambiente
  .setProject(process.env.REACT_APP_APPWRITE_PROJECT_ID); // Usando variável de ambiente

const databases = new Databases(client);

const SearchBar = () => {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showBlur, setShowBlur] = useState(false);
  const { setVehicleData } = useContext(VehicleContext);
  const [userCookie, setUserCookie] = useState(null);

  const isSmallScreen = window.matchMedia('(max-width: 640px)').matches;

  useEffect(() => {
    const getOrCreateUserCookie = () => {
      let cookie = Cookies.get('user_id');
      if (!cookie) {
        cookie = crypto.randomUUID();
        Cookies.set('user_id', cookie, { expires: 30 });
      }
      setUserCookie(cookie);
      return cookie;
    };
    getOrCreateUserCookie();
  }, []);

  const onChange = (e) => setValue(e.target.value);

  const handleSearchClick = async () => {
    if (!value) {
      alert('O input está vazio');
      return;
    }

    const urlPattern = /^(https:\/\/www\.beforward\.jp\/|https:\/\/sp\.beforward\.jp\/)/;
    if (!urlPattern.test(value)) {
      alert('O link deve começar com "https://www.beforward.jp/" ou "https://sp.beforward.jp/"');
      return;
    }

    setLoading(true);
    setVehicleData(null);
    try {
      const response = await axios.post('https://importmoz_api.mycloudspaces.com/beforward', { link: value });
      if (response.data?.Detalhes?.mensagem) {
        const mensagem = response.data.Detalhes.mensagem.toLowerCase();
        if (mensagem === 'vehicle sold' || mensagem === 'vehicle under offer') {
          alert(response.data.Detalhes.mensagem);
        } else {
          setVehicleData(response.data);
          localStorage.removeItem('userSubmittedData');

          const checkIfUserHasSubmitted = async () => {
            try {
              const response = await databases.listDocuments(
                process.env.REACT_APP_APPWRITE_DATABASE_ID,
                process.env.REACT_APP_APPWRITE_COLLECTION_ID,
                [Query.equal('userCookie', userCookie)]
              );

              if (response.documents.length === 0) {
                setShowPopup(true);
              }
            } catch (error) {
              console.error('Erro ao verificar envios:', error);
            }
          };
          checkIfUserHasSubmitted();
        }
      } else {
        setVehicleData(response.data);
      }
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error);
    } finally {
      setLoading(false);
      setValue('');
    }
  };

  useEffect(() => {
    if (showPopup || showBlur) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [showPopup, showBlur]);

  return (
    <div className="fixed top-14 left-0 w-full z-50 px-4 py-2 flex justify-center">
      {(showPopup || showBlur) && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"></div>
      )}
      <div className="relative top-2 w-full md:w-[95%]">
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-md focus:border-cyan-200 focus:outline-none"
          placeholder="Digite ou Cole o Link aqui"
          value={value}
          onChange={onChange}
        />
        <button
          className={`absolute right-0 top-1/2 transform -translate-y-1/2 rounded-r-md p-2 transition duration-300 ${
            loading ? 'bg-cyan-200 text-cyan-700' : 'bg-cyan-200 hover:bg-cyan-500 text-cyan-700'
          }`}
          onClick={handleSearchClick}
          disabled={loading}
        >
          {loading ? (
            <svg
              className="animate-spin h-6 w-6 text-cyan-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
          ) : (
            isSmallScreen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-cyan-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 4a7 7 0 100 14 7 7 0 000-14zM21 21l-4.35-4.35"
                />
              </svg>
            ) : (
              'Pesquisar'
            )
          )}
        </button>
      </div>
      {showPopup && (
        <LeadPopup
          onClose={() => {
            setShowPopup(false);
            localStorage.setItem('userSubmittedData', 'true');
          }}
          userCookie={userCookie}
        />
      )}
    </div>
  );
};

export default SearchBar;
