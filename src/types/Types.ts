interface Nutrient {
  label: string;
  quantity: number;
  unit: string;
}

interface Ingredient {
  text: string;
  parsed: Array<{
    quantity: number;
    measure: string;
    foodMatch: string;
    weight: number;
    nutrients: Record<string, Nutrient>;
  }>;
}

interface TotalDaily {
  [key: string]: Nutrient;
}

interface TotalNutrients {
  [key: string]: Nutrient;
}

// nutritionAnalysis
export interface NutritionData {
  calories: number;
  yield: number;
  totalWeight: number;
  ingredients: Ingredient[];
  totalDaily: TotalDaily;
  totalNutrients: TotalNutrients;
}

export interface NutritionMethods {
  analyzeNutrition(): void;
  foodDescription: string;
  nutritionData: NutritionData;
  ingredientsDetails: Array<{}>;
  ingredientsCalories: Array<number>;
  totalDaily: TotalDaily;
  totalNutrients: TotalNutrients;
  modelValue: string[];
  error: boolean;
  errorMessage: string;
}
export interface NutrientInformation {
  label: string;
  quantity: number;
  unit: string;
  totalQuantity: number;
  totalUnit: string;
}

// searchRecipe

export interface Digest {
  daily: number;
  label: string;
  total: number;
}

export interface Recipe {
  calories: number;
  digest: Digest[];
  healthLabels: string[];
  image: string;
  ingredientLines: string[];
  label: string;
  yield: number;
  showIngredients: boolean;
  recipe: Recipe;
}

export interface FilterOptionsProps {
  options: string[];
  modelValue: string[];
}

// Food Database

export interface FoodDataNutrient {
  CHOCDF: number;
  ENERC_KCAL: number;
  Fat: number;
  FIBTG: number;
  PROCNT: number;
}
export interface FoodData {
  knownAs: string;
  brand: string;
  image: string;
  ENERC_KCAL: number;
}
