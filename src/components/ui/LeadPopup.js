import React, { useState } from 'react';
import { Client, Databases, ID } from 'appwrite';

// Configuração do Appwrite
const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1') // Seu endpoint
  .setProject('6782f0c100042c18de02'); // Seu project ID

const databases = new Databases(client);

const LeadPopup = ({ onClose, userCookie }) => {
  const [contactMethod, setContactMethod] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContact = (method) => {
    setContactMethod(method);
    setFormData({ ...formData, contact: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if ((name === 'contact' && (contactMethod === 'sms' || contactMethod === 'whatsapp')) && !value.startsWith('+258')) {
      setFormData({
        ...formData,
        [name]: '+258' + value.replace(/\D/g, '').slice(0, 9)
      });
    } else if (name === 'contact' && contactMethod === 'telegram') {
      setFormData({
        ...formData,
        [name]: value.replace(/[^a-zA-Z0-9_.]/g, '')
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalFormData = {
      ...formData,
      message: formData.message.trim() || "Estou interessado em receber futuras atualizações da plataforma.",
      method: contactMethod,
      timestamp: new Date().toISOString(),
      userCookie: userCookie // Adiciona o cookie do usuário aos dados
    };

    setIsSubmitting(true);

    try {
      await databases.createDocument(
        '6782f1670015e193db81', // databaseId
        '6782f190000bfe9b1d67', // collectionId
        ID.unique(), // documentId
        finalFormData
      );

      console.log('Dados salvos com sucesso no Appwrite');
      onClose(); // Fecha o popup após o envio
    } catch (error) {
      console.error('Erro ao salvar dados no Appwrite:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 relative">
        {!contactMethod ? (
          <>
            <h2 className="text-xl font-bold mb-4">Como deseja ser contactado?</h2>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              {/* SMS */}
              <button
                onClick={() => handleContact('sms')}
                className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <span className="text-sm font-medium">SMS</span>
              </button>

              {/* WhatsApp */}
              <button
                onClick={() => handleContact('whatsapp')}
                className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-2 text-green-600 border-2 border-green-600 rounded-full p-1" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.507 14.307l-.009.075c-.266 1.178-1.424 2.024-2.597 1.77l-2.219-.491a.8.8 0 00-.889.268l-.741.965a10.384 10.384 0 01-4.662-4.662l.964-.741a.8.8 0 00.269-.889l-.491-2.22c-.252-1.174.592-2.33 1.77-2.597l.074-.009a1.03 1.03 0 01.119-.007h.059c.832 0 1.52.598 1.694 1.404l.615 2.782c.142.642.57 1.16 1.144 1.4l.188.082c.642.285 1.36.345 2.065.173l1.089-.236c.832-.18 1.404.862.941 1.587zM12 0C5.373 0 0 5.373 0 12c0 2.126.549 4.126 1.517 5.877L.517 23.25l5.373-1.757A11.91 11.91 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
                </svg>
                <span className="text-sm font-medium">WhatsApp</span>
              </button>

              {/* Telegram */}
              <button
                onClick={() => handleContact('telegram')}
                className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.022c.242-.213-.054-.333-.373-.121l-6.869 4.326-2.962-.924c-.643-.204-.658-.643.136-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                </svg>
                <span className="text-sm font-medium">Telegram</span>
              </button>

              {/* Email */}
              <button
                onClick={() => handleContact('email')}
                className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-sm font-medium">Email</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nome</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                {contactMethod === 'sms' && 'Número de Telefone'}
                {contactMethod === 'whatsapp' && 'Número do WhatsApp'}
                {contactMethod === 'telegram' && 'Username do Telegram'}
                {contactMethod === 'email' && 'Email'}
              </label>
              <input
                type={contactMethod === 'email' ? 'email' : 'text'}
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                required
                placeholder={
                  contactMethod === 'sms' || contactMethod === 'whatsapp'
                    ? '+258'
                    : contactMethod === 'telegram'
                    ? '@username'
                    : 'exemplo@dominio.com'
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Mensagem</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                rows="3"
                placeholder="Estou interessado em receber futuras atualizações da plataforma."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full px-4 py-2 text-white rounded-md transition-colors ${
                contactMethod === 'sms' ? 'bg-blue-500 hover:bg-blue-600' :
                contactMethod === 'whatsapp' ? 'bg-green-500 hover:bg-green-600' :
                contactMethod === 'telegram' ? 'bg-blue-400 hover:bg-blue-500' :
                'bg-red-500 hover:bg-red-600'
              }`}
            >
              {isSubmitting ? 'Enviando...' : 'Enviar'}
            </button>

            <button
              type="button"
              onClick={() => setContactMethod(null)}
              className="w-full px-4 py-2 mt-2 text-gray-600 hover:text-gray-800"
            >
              Voltar
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LeadPopup;
