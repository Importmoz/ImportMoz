import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Trash2, PlusCircle } from "lucide-react";
import { Label } from "./components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";

// Conversion factors for different units (to meters)
const CONVERSION_UNITS = {
  cm: 0.01, // centimeters to meters
  m: 1, // meters to meters
  mm: 0.001, // millimeters to meters
  km: 1000, // kilometers to meters
  in: 0.0254, // inches to meters
  ft: 0.3048, // feet to meters
};

const CBMCalculator = () => {
  const [calculationType, setCalculationType] = useState("single");
  const [articles, setArticles] = useState([
    {
      id: 1,
      description: "",
      unit: "?", // Default unit placeholder
      length: "",
      width: "",
      height: "",
      quantity: "",
      errors: {}, // Object to store validation errors
    },
  ]);

  const [totals, setTotals] = useState({
    totalVolume: 0,
    totalQuantity: 0,
  });

  // Reset articles when calculation type changes
  const resetArticles = () => {
    setArticles([
      {
        id: 1,
        description: "",
        unit: "?", // Reset to default placeholder
        length: "",
        width: "",
        height: "",
        quantity: "",
        errors: {},
      },
    ]);
    setTotals({ totalVolume: 0, totalQuantity: 0 }); // Reset totals
  };

  const addArticle = () => {
    setArticles((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        description: "",
        unit: "?", // Default unit placeholder
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
    console.log(`Unit changed for article ${id}: ${value}`); // Debugging
    setArticles((prev) =>
      prev.map((article) =>
        article.id === id ? { ...article, unit: value, errors: {} } : article
      )
    );
  };

  const validateArticle = (article) => {
    const { length, width, height, quantity, unit } = article;
    const errors = {};

    // Validate numeric fields
    if (!length || isNaN(length) || parseFloat(length) <= 0) {
      errors.length = "Comprimento deve ser um número positivo.";
    }
    if (!width || isNaN(width) || parseFloat(width) <= 0) {
      errors.width = "Largura deve ser um número positivo.";
    }
    if (!height || isNaN(height) || parseFloat(height) <= 0) {
      errors.height = "Altura deve ser um número positivo.";
    }
    if (!quantity || isNaN(quantity) || parseInt(quantity) <= 0) {
      errors.quantity = "Quantidade deve ser um número inteiro positivo.";
    }

    // Validate unit
    if (unit === "?") {
      errors.unit = "Selecione uma unidade válida.";
    }

    return errors;
  };

  const calculateCBM = () => {
    let totalVolumeCalculated = 0;
    let totalQuantityCalculated = 0;

    const calculatedArticles = articles.map((article) => {
      const errors = validateArticle(article);
      if (Object.keys(errors).length > 0) {
        return { ...article, errors };
      }

      const { length, width, height, quantity, unit } = article;

      // Convert to numbers
      const len = parseFloat(length);
      const wid = parseFloat(width);
      const hei = parseFloat(height);
      const quan = parseInt(quantity);

      // Convert to meters
      const conversionFactor = CONVERSION_UNITS[unit];
      const lengthInMeters = len * conversionFactor;
      const widthInMeters = wid * conversionFactor;
      const heightInMeters = hei * conversionFactor;

      // Calculate CBM
      const unitVolume = lengthInMeters * widthInMeters * heightInMeters;
      const totalCBM = unitVolume * quan;

      // Update totals
      totalVolumeCalculated += totalCBM;
      totalQuantityCalculated += quan;

      return {
        ...article,
        unitVolume: unitVolume.toFixed(4),
        totalCBM: totalCBM.toFixed(4),
      };
    });

    setArticles(calculatedArticles);
    setTotals({
      totalVolume: totalVolumeCalculated.toFixed(4),
      totalQuantity: totalQuantityCalculated,
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto mt-8 light-mint-bg">
      <CardHeader>
        <CardTitle className="content">Calculadora CBM</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Calculation Type Selection */}
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
              resetArticles(); // Reset articles when switching to "single"
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
              resetArticles(); // Reset articles when switching to "multiple"
            }}
            aria-label="Selecionar cálculo múltiplo"
          >
            Múltiplo
          </Button>
        </div>

        {calculationType === "single" ? (
          <div className="p-4 border rounded-lg">
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="col-span-2">
                <Label>Descrição do Artigo</Label>
                <Input
                  type="text"
                  name="description"
                  value={articles[0].description}
                  onChange={(e) => handleInputChange(1, e)}
                  placeholder="Ex: Caixa de Papelão"
                  aria-label="Descrição do artigo"
                />
              </div>
              <div>
                <Label>Unidade</Label>
                <Select
                  value={articles[0].unit}
                  onValueChange={(value) => handleUnitChange(1, value)}
                  className="w-[75px]"
                  aria-label="Selecionar unidade de medida"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="?" />
                  </SelectTrigger>
                  <SelectContent className="w-[160px]">
                    <SelectItem value="cm">Centímetros (cm)</SelectItem>
                    <SelectItem value="m">Metros (m)</SelectItem>
                    <SelectItem value="mm">Milímetros (mm)</SelectItem>
                    <SelectItem value="km">Quilômetros (km)</SelectItem>
                    <SelectItem value="in">Polegadas (in)</SelectItem>
                    <SelectItem value="ft">Pés (ft)</SelectItem>
                  </SelectContent>
                </Select>
                {articles[0].errors.unit && (
                  <p className="text-red-500 text-sm mt-1">
                    {articles[0].errors.unit}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <Label>Comprimento</Label>
                <Input
                  type="number"
                  name="length"
                  value={articles[0].length}
                  onChange={(e) => handleInputChange(1, e)}
                  placeholder="Ex: 50"
                  className={articles[0].errors.length ? "border-red-500" : ""}
                  aria-label="Comprimento do artigo"
                />
                {articles[0].errors.length && (
                  <p className="text-red-500 text-sm mt-1">
                    {articles[0].errors.length}
                  </p>
                )}
              </div>
              <div>
                <Label>Quantidade</Label>
                <Input
                  type="number"
                  name="quantity"
                  value={articles[0].quantity}
                  onChange={(e) => handleInputChange(1, e)}
                  placeholder="Ex: 10"
                  className={articles[0].errors.quantity ? "border-red-500" : ""}
                  aria-label="Quantidade do artigo"
                />
                {articles[0].errors.quantity && (
                  <p className="text-red-500 text-sm mt-1">
                    {articles[0].errors.quantity}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Largura</Label>
                <Input
                  type="number"
                  name="width"
                  value={articles[0].width}
                  onChange={(e) => handleInputChange(1, e)}
                  placeholder="Ex: 30"
                  className={articles[0].errors.width ? "border-red-500" : ""}
                  aria-label="Largura do artigo"
                />
                {articles[0].errors.width && (
                  <p className="text-red-500 text-sm mt-1">
                    {articles[0].errors.width}
                  </p>
                )}
              </div>
              <div>
                <Label>Altura</Label>
                <Input
                  type="number"
                  name="height"
                  value={articles[0].height}
                  onChange={(e) => handleInputChange(1, e)}
                  placeholder="Ex: 20"
                  className={articles[0].errors.height ? "border-red-500" : ""}
                  aria-label="Altura do artigo"
                />
                {articles[0].errors.height && (
                  <p className="text-red-500 text-sm mt-1">
                    {articles[0].errors.height}
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <>
            {articles.map((article) => (
              <div
                key={article.id}
                className="mb-6 p-4 border rounded-lg relative"
              >
                {articles.length > 1 && (
                  <button
                    onClick={() => removeArticle(article.id)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                    aria-label="Remover artigo"
                  >
                    <Trash2 size={20} />
                  </button>
                )}
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="col-span-2">
                    <Label>Descrição do Artigo</Label>
                    <Input
                      type="text"
                      name="description"
                      value={article.description}
                      onChange={(e) => handleInputChange(article.id, e)}
                      placeholder="Ex: Caixa de Papelão"
                      aria-label="Descrição do artigo"
                    />
                  </div>
                  <div>
                    <Label>Unidade</Label>
                    <Select
                      value={article.unit}
                      onValueChange={(value) =>
                        handleUnitChange(article.id, value)
                      }
                      className="w-[75px]"
                      aria-label="Selecionar unidade de medida"
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="?" />
                      </SelectTrigger>
                      <SelectContent className="w-[160px]">
                        <SelectItem value="cm">Centímetros (cm)</SelectItem>
                        <SelectItem value="m">Metros (m)</SelectItem>
                        <SelectItem value="mm">Milímetros (mm)</SelectItem>
                        <SelectItem value="km">Quilômetros (km)</SelectItem>
                        <SelectItem value="in">Polegadas (in)</SelectItem>
                        <SelectItem value="ft">Pés (ft)</SelectItem>
                      </SelectContent>
                    </Select>
                    {article.errors.unit && (
                      <p className="text-red-500 text-sm mt-1">
                        {article.errors.unit}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <Label>Comprimento</Label>
                    <Input
                      type="number"
                      name="length"
                      value={article.length}
                      onChange={(e) => handleInputChange(article.id, e)}
                      placeholder="Ex: 50"
                      className={article.errors.length ? "border-red-500" : ""}
                      aria-label="Comprimento do artigo"
                    />
                    {article.errors.length && (
                      <p className="text-red-500 text-sm mt-1">
                        {article.errors.length}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label>Quantidade</Label>
                    <Input
                      type="number"
                      name="quantity"
                      value={article.quantity}
                      onChange={(e) => handleInputChange(article.id, e)}
                      placeholder="Ex: 10"
                      className={article.errors.quantity ? "border-red-500" : ""}
                      aria-label="Quantidade do artigo"
                    />
                    {article.errors.quantity && (
                      <p className="text-red-500 text-sm mt-1">
                        {article.errors.quantity}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Largura</Label>
                    <Input
                      type="number"
                      name="width"
                      value={article.width}
                      onChange={(e) => handleInputChange(article.id, e)}
                      placeholder="Ex: 30"
                      className={article.errors.width ? "border-red-500" : ""}
                      aria-label="Largura do artigo"
                    />
                    {article.errors.width && (
                      <p className="text-red-500 text-sm mt-1">
                        {article.errors.width}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label>Altura</Label>
                    <Input
                      type="number"
                      name="height"
                      value={article.height}
                      onChange={(e) => handleInputChange(article.id, e)}
                      placeholder="Ex: 20"
                      className={article.errors.height ? "border-red-500" : ""}
                      aria-label="Altura do artigo"
                    />
                    {article.errors.height && (
                      <p className="text-red-500 text-sm mt-1">
                        {article.errors.height}
                      </p>
                    )}
                  </div>
                </div>
                {article.totalCBM && (
                  <div className="mt-4 p-2 bg-gray-100 rounded-lg">
                    <p>
                      CBM Unitário: <strong>{article.unitVolume} m³/cbm</strong>
                    </p>
                    <p>
                      CBM Parcial: <strong>{article.totalCBM} m³/cbm</strong>
                    </p>
                  </div>
                )}
              </div>
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
          <Button onClick={calculateCBM} className="px-8" aria-label="Calcular CBM">
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