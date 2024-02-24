<template>
  <div class="nutrition-analysis">
    <h1>Nutrition Analysis</h1>
    <div class="nutrition-analysis-container">
      <div class="search-table-container">
        <div class="search-block">
          <form @submit.prevent="analyzeNutrition">
            <div>
              <h3>Recipe</h3>
              <textarea
                v-model="foodDescription"
                id="ingredients"
                cols="70"
                rows="15"
                placeholder="1 cup rice,
10 oz chickpeas"
                required
              >
              </textarea>
            </div>
            <button class="custom-button" type="submit">
              Analyze Nutrition
            </button>
          </form>
        </div>

        <NutritionTable v-if="nutritionData" :nutritionData="nutritionData" />
      </div>

      <div v-if="nutritionData" class="information">
        <h2>Nutrition Information</h2>
        <h3>Amount per serving</h3>
        <div class="information-header">
          <h3>Calories:</h3>
          <h3>{{ nutritionData.calories }}</h3>
        </div>

        <NutritionInformation
          v-for="(nutrient, key) in nutritionInformation"
          :key="key"
          :label="nutrient.label"
          :quantity="nutrient.quantity"
          :unit="nutrient.unit"
          :totalQuantity="nutrient.totalQuantity"
          :totalUnit="nutrient.totalUnit"
          :nutritionData="nutritionData"
        />
        <p>*Percent Daily Values are based on a 2000 calorie diet</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref, computed, onMounted } from "vue";
import {
  NutritionData,
  NutritionMethods,
  NutrientInformation,
} from "../types/Types";

import NutritionInformation from "../components/nutritionAnalysis/NutritionInformation.vue";
import NutritionTable from "../components/nutritionAnalysis/NutritionTable.vue";

const foodDescription = ref("");
const nutritionData = ref<NutritionData | null>(null);

const nutritionInformation = computed<NutrientInformation[]>(() => {
  if (!nutritionData.value) return [];

  const selectedNutrientKeys = [
    "FAT",
    "CHOLE",
    "NA",
    "CHOCDF",
    "PROCNT",
    "VITD",
    "CA",
    "FE",
    "K",
  ];

  return selectedNutrientKeys.map((key) => ({
    label: nutritionData.value!.totalDaily[key].label,
    quantity: nutritionData.value!.totalNutrients[key].quantity,
    unit: nutritionData.value!.totalNutrients[key].unit,
    totalQuantity: nutritionData.value!.totalDaily[key].quantity,
    totalUnit: nutritionData.value!.totalDaily[key].unit,
  }));
});

const analyzeNutrition = async () => {
  try {
    const appId = process.env.VUE_APP_NUTRITION_API_ID;
    const appKey = process.env.VUE_APP_NUTRITION_API_KEY;
    const apiUrl = `https://api.edamam.com/api/nutrition-details?app_id=${appId}&app_key=${appKey}`;

    const ingredientsArray: string[] = foodDescription.value
      .split("\n")
      .filter((ingredient: string) => ingredient.trim() !== "");
    const requestData = { ingr: ingredientsArray };
    const response = await axios.post(apiUrl, requestData);
    nutritionData.value = response.data;
    localStorage.setItem("nutritionData", JSON.stringify(nutritionData.value));
  } catch (error) {
    console.error("Error analyzing nutrition:", error);
  }
};

onMounted(() => {
  const savedData = localStorage.getItem("nutritionData");
  if (savedData !== null) {
    nutritionData.value = JSON.parse(savedData);
  }
});
</script>