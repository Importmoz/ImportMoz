import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { PlusCircle } from "lucide-react";
import ArticleForm from "./components/ArticleForm"; // Certifique-se de que o caminho está correto
import { calculateCBM, validateArticle } from "./utils/calculateCBM";

const CBMCalculator = () => {
  const [calculationType, setCalculationType] = useState("single");
  const [articles, setArticles] = useState([
    {
      id: 1,
      description: "",
      unit: "cm",
      length: "",
      width: "",
      height: "",
      quantity: "",
      errors: {},
    },
  ]);

  const [totals, setTotals] = useState({
    totalVolume: 0,
    totalQuantity: 0,
  });

  const resetArticles = () => {
    setArticles([
      {
        id: 1,
        description: "",
        unit: "cm",
        length: "",
        width: "",
        height: "",
        quantity: "",
        errors: {},
      },
    ]);
    setTotals({ totalVolume: 0, totalQuantity: 0 });
  };

  const addArticle = () => {
    setArticles((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        description: "",
        unit: "cm",
        length: "",
        width: "",
        height: "",
        quantity: "",
        errors: {},
      },
    ]);
  };

  const removeArticle = (id) => {
    setArticles((prev) => prev.filter((article) => article.id !== id));
  };

  const handleInputChange = (id, e) => {
    const { name, value } = e.target;

    setArticles((prev) =>
      prev.map((article) =>
        article.id === id ? { ...article, [name]: value, errors: {} } : article
      )
    );
  };

  const handleUnitChange = (id, value) => {
    setArticles((prev) =>
      prev.map((article) => {
        if (article.id === id) {
          return { ...article, unit: value, errors: {} };
        }
        return article;
      })
    );
  };

  const handleCalculateCBM = () => {
    const { calculatedArticles, totals } = calculateCBM(articles);
    setArticles(calculatedArticles);
    setTotals(totals);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto mt-8 light-mint-bg">
      <CardHeader>
        <CardTitle className="content">Calculadora CBM</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 flex justify-center">
          <Button
            variant={calculationType === "single" ? "solid" : "outline"}
            className={`px-6 ${
              calculationType === "single"
                ? "bg-green-500 text-white"
                : "bg-white text-gray-700"
            }`}
            onClick={() => {
              setCalculationType("single");
              resetArticles();
            }}
            aria-label="Selecionar cálculo único"
          >
            Único
          </Button>
          <Button
            variant={calculationType === "multiple" ? "solid" : "outline"}
            className={`ml-4 px-6 ${
              calculationType === "multiple"
                ? "bg-green-500 text-white"
                : "bg-white text-gray-700"
            }`}
            onClick={() => {
              setCalculationType("multiple");
              resetArticles();
            }}
            aria-label="Selecionar cálculo múltiplo"
          >
            Múltiplo
          </Button>
        </div>

        {calculationType === "single" ? (
          <ArticleForm
            article={articles[0]}
            handleInputChange={handleInputChange}
            handleUnitChange={handleUnitChange}
          />
        ) : (
          <>
            {articles.map((article) => (
              <ArticleForm
                key={article.id}
                article={article}
                handleInputChange={handleInputChange}
                handleUnitChange={handleUnitChange}
                removeArticle={removeArticle}
              />
            ))}
            {calculationType === "multiple" && (
              <div className="flex justify-between items-center mt-4">
                <Button
                  variant="outline"
                  onClick={addArticle}
                  className="flex items-center"
                  aria-label="Adicionar novo artigo"
                >
                  <PlusCircle className="mr-2" size={20} /> Adicionar Artigo
                </Button>
              </div>
            )}
          </>
        )}

        <div className="mt-4 flex justify-end">
          <Button
            onClick={handleCalculateCBM}
            className="px-8"
            aria-label="Calcular CBM"
          >
            Calcular CBM
          </Button>
        </div>

        {totals.totalVolume > 0 && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-bold mb-2">Totais</h3>
            <p>
              CBM Total: <strong>{totals.totalVolume} m³/cbm</strong>
            </p>
            <p>
              Quantidade Total: <strong>{totals.totalQuantity} Pacotes</strong>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CBMCalculator;
