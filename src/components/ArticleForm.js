import React from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Trash2 } from "lucide-react";

const ArticleForm = ({ article, handleInputChange, handleUnitChange, removeArticle }) => {
  console.log(`Renderizando ArticleForm para artigo ID: ${article.id}`);
  console.log(`Valor atual da unidade: ${article.unit}`);

  return (
    <div className="mb-6 p-4 border rounded-lg relative">
      {article.id !== 1 && (
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
              onValueChange={(value) => {
                handleUnitChange(article.id, value);
              }}
            className="w-[75px]"
            aria-label="Selecionar unidade de medida"
          >
            <SelectTrigger>
              <SelectValue placeholder="cm" />
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
            <p className="text-red-500 text-sm mt-1">{article.errors.unit}</p>
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
            <p className="text-red-500 text-sm mt-1">{article.errors.length}</p>
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
            <p className="text-red-500 text-sm mt-1">{article.errors.quantity}</p>
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
            <p className="text-red-500 text-sm mt-1">{article.errors.width}</p>
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
            <p className="text-red-500 text-sm mt-1">{article.errors.height}</p>
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
  );
};

export default ArticleForm;