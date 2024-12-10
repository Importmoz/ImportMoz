export const CONVERSION_UNITS = {
  cm: 0.01, // centimeters to meters
  m: 1, // meters to meters
  mm: 0.001, // millimeters to meters
  km: 1000, // kilometers to meters
  in: 0.0254, // inches to meters
  ft: 0.3048, // feet to meters
};

/**
 * Valida os campos de um artigo.
 * @param {Object} article - O artigo a ser validado.
 * @returns {Object} Um objeto contendo erros de validação, se houver.
 */
export const validateArticle = (article) => {
  const { length, width, height, quantity, unit } = article;
  const errors = {};

  // Validação de campos numéricos
  const validatePositiveNumber = (value, fieldName, errorMessage) => {
    if (!value || isNaN(value) || parseFloat(value) <= 0) {
      errors[fieldName] = errorMessage;
    }
  };

  validatePositiveNumber(length, "length", "Comprimento deve ser um número positivo.");
  validatePositiveNumber(width, "width", "Largura deve ser um número positivo.");
  validatePositiveNumber(height, "height", "Altura deve ser um número positivo.");
  validatePositiveNumber(quantity, "quantity", "Quantidade deve ser um número inteiro positivo.");

  // Validação da unidade
  if (!CONVERSION_UNITS[unit]) {
    errors.unit = "Selecione uma unidade válida.";
  }

  return errors;
};

/**
 * Calcula o CBM (volume cúbico em metros) para uma lista de artigos.
 * @param {Array} articles - Lista de artigos a serem calculados.
 * @returns {Object} Um objeto contendo os artigos calculados e os totais.
 */
export const calculateCBM = (articles) => {
  let totalVolumeCalculated = 0;
  let totalQuantityCalculated = 0;

  const calculatedArticles = articles.map((article) => {
    const errors = validateArticle(article);
    if (Object.keys(errors).length > 0) {
      return { ...article, errors };
    }

    const { length, width, height, quantity, unit } = article;

    // Converte para números
    const len = parseFloat(length);
    const wid = parseFloat(width);
    const hei = parseFloat(height);
    const quan = parseInt(quantity);

    // Converte para metros
    const conversionFactor = CONVERSION_UNITS[unit];
    const lengthInMeters = len * conversionFactor;
    const widthInMeters = wid * conversionFactor;
    const heightInMeters = hei * conversionFactor;

    // Calcula o volume unitário e total
    const unitVolume = lengthInMeters * widthInMeters * heightInMeters;
    const totalCBM = unitVolume * quan;

    // Atualiza os totais
    totalVolumeCalculated += totalCBM;
    totalQuantityCalculated += quan;

    return {
      ...article,
      unitVolume: unitVolume.toFixed(2), // Volume unitário formatado
      totalCBM: totalCBM.toFixed(2), // Volume total formatado
    };
  });

  return {
    calculatedArticles,
    totals: {
      totalVolume: totalVolumeCalculated.toFixed(2), // Volume total formatado
      totalQuantity: totalQuantityCalculated, // Quantidade total
    },
  };
};