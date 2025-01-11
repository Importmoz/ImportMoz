import React from 'react';

const Terms = () => {
  return (
    <div className="bg-gray-50">
      <main className="flex flex-col items-center justify-center min-h-screen py-2">
        <div className="w-full px-4 pt-8  ">
         
            <h1 className="text-3xl font-bold text-center mb-6">Terms & Conditions</h1>
            <div className="prose max-w-none">
              <p className="text-center text-gray-600 mb-8">Updated at 2024-07-04</p>

              <h2 className="text-2xl font-bold mt-6 mb-4">General Terms</h2>
              <p className="text-gray-700 mb-4">
                By accessing and placing an order with Importmoz, you confirm that you are in agreement with and bound by the terms of service contained in the Terms & Conditions outlined below. These terms apply to the entire website and any email or other type of communication between you and Importmoz.
              </p>
              <p className="text-gray-700 mb-4">
                Under no circumstances shall Importmoz team be liable for any direct, indirect, special, incidental or consequential damages, including, but not limited to, loss of data or profit, arising out of the use, or the inability to use, the materials on this site, even if Importmoz team or an authorized representative has been advised of the possibility of such damages. If your use of materials from this site results in the need for servicing, repair or correction of equipment or data, you assume any costs thereof.
              </p>
              <p className="text-gray-700 mb-4">
                Importmoz will not be responsible for any outcome that may occur during the course of usage of our resources. We reserve the rights to change prices and revise the resources usage policy in any moment. This Terms & Conditions was created with Termify.
              </p>

              <h2 className="text-2xl font-bold mt-6 mb-4">License</h2>
              <p className="text-gray-700 mb-4">
                Importmoz grants you a revocable, non-exclusive, non-transferable, limited license to download, install and use the website/app strictly in accordance with the terms of this Agreement.
              </p>
              <p className="text-gray-700 mb-4">
                These Terms & Conditions are a contract between you and Importmoz (referred to in these Terms & Conditions as "Importmoz", "us", "we" or "our"), the provider of the Importmoz website and the services accessible from the Importmoz website (which are collectively referred to in these Terms & Conditions as the "Importmoz Service").
              </p>
              <p className="text-gray-700 mb-4">
                You are agreeing to be bound by these Terms & Conditions. If you do not agree to these Terms & Conditions, please do not use the Importmoz Service. In these Terms & Conditions, "you" refers both to you as an individual and to the entity you represent. If you violate any of these Terms & Conditions, we reserve the right to cancel your account or block access to your account without notice.
              </p>

              {/* Continue with the rest of the terms content */}
              {/* ... */}

              <h2 className="text-2xl font-bold mt-6 mb-4">Contact Us</h2>
              <p className="text-gray-700 mb-4">
                Don't hesitate to contact us if you have any questions.
              </p>
              <ul className="text-gray-700 mb-8">
                <li>Via Email: info@importmoz.com</li>
                <li>Via Phone Number: 824463475</li>
                <li>Via this Link: <a href="https://importmoz.com" className="text-blue-600 hover:text-blue-800">https://importmoz.com</a></li>
              </ul>
            </div>
         
        </div>
      </main>
    </div>
  );
};

export default Terms;
