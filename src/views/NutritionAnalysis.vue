<template>
  <div class="nutrition-analysis">
    <h1>Nutrition Analysis</h1>
    <div class="nutrition-analysis-container">
      <div>
        <div class="search-block">
          <form @submit.prevent="analyzeNutrition">
            <div>
              <h3>Recipe</h3>
              <textarea
                v-model="foodDescription"
                id="ingredients"
                cols="70"
                rows="15"
                required
              >
              </textarea>
            </div>
            <button class="submit-button" type="submit">
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

<script lang="ts">
import axios from "axios";
import {
  NutritionData,
  NutritionMethods,
  NutrientInformation,
} from "../types/Types";
import NutritionInformation from "../components/nutritionAnalysis/NutritionInformation.vue";
import NutritionTable from "../components/nutritionAnalysis/NutritionTable.vue";

export default {
  components: { NutritionTable, NutritionInformation },
  data() {
    return {
      foodDescription: "",
      nutritionData: null as NutritionData | null,
    };
  },
  computed: {
    nutritionInformation(this: NutritionMethods): NutrientInformation[] {
      if (!this.nutritionData) return [];

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
        label: this.nutritionData.totalDaily[key].label,
        quantity: this.nutritionData.totalNutrients[key].quantity,
        unit: this.nutritionData.totalNutrients[key].unit,
        totalQuantity: this.nutritionData.totalDaily[key].quantity,
        totalUnit: this.nutritionData.totalDaily[key].unit,
      }));
    },
  },
  methods: {
    async analyzeNutrition(this: NutritionMethods) {
      try {
        const appId = process.env.VUE_APP_NUTRITION_API_ID;
        const appKey = process.env.VUE_APP_NUTRITION_API_KEY;
        const apiUrl = `https://api.edamam.com/api/nutrition-details?app_id=${appId}&app_key=${appKey}`;

        const ingredientsArray: string[] = this.foodDescription
          .split("\n")
          .filter((ingredient: string) => ingredient.trim() !== "");
        const requestData = { ingr: ingredientsArray };
        const response = await axios.post(apiUrl, requestData);
        this.nutritionData = response.data;
      } catch (error) {
        console.error("Error analyzing nutrition:", error);
      }
    },
  },
  beforeRouteLeave(to, from, next) {
    localStorage.setItem("nutritionData", JSON.stringify(this.nutritionData));
    next();
  },
  created() {
    const storedData = localStorage.getItem("nutritionData");
    if (storedData) {
      this.nutritionData = JSON.parse(storedData);
    }
  },
};
</script>
