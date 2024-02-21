<template>
  <div class="nutrition-analysis-container">
    <!-- form block -->
    <div class="search-block">
      <h1>Nutrition Analysis</h1>
      <form @submit.prevent="analyzeNutrition">
        <label for="ingredients">Ingredients</label>
        <textarea
          v-model="foodDescription"
          id="ingredients"
          cols="40"
          rows="15"
          required
        ></textarea>
        <button type="submit">Analyze Nutrition</button>
      </form>
    </div>

    <!-- table -->
    <NutritionTable :nutritionData="nutritionData" />

    <!-- information -->
    <div v-if="nutritionData" class="information">
      <h3>Nutrition Information</h3>
      <p><strong>Amount per serving</strong> <strong>% Daily Value</strong></p>
      <p>
        <span> <strong> Calories: </strong> </span
        ><span>{{ nutritionData.calories }}</span>
      </p>

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
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { NutritionData, NutritionMethods } from "../types/Type";
import NutritionInformation from "../components/nutritionAnalysis/NutritionInformation.vue";
import NutritionTable from "../components/nutritionAnalysis/NutritionTable.vue";
export default {
  components: { NutritionTable, NutritionInformation },
  data() {
    return {
      foodDescription: "",
      nutritionData: null as NutritionData | null,
      ingredientsDetails: [] as NutritionData[],
      ingredientsCalories: [] as number[],
    };
  },
  computed: {
    nutritionInformation(this: NutritionMethods) {
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
    analyzeNutrition(this: NutritionMethods) {
      const appId = process.env.VUE_APP_NUTRITION_API_ID;
      const appKey = process.env.VUE_APP_NUTRITION_API_KEY;

      const apiUrl = `https://api.edamam.com/api/nutrition-details?app_id=${appId}&app_key=${appKey}`;

      const ingredientsArray: string[] = this.foodDescription.split("\n");
      const filteredIngredients = ingredientsArray.filter(
        (ingredient: string) => ingredient.trim() !== ""
      );
      const requestData = {
        ingr: filteredIngredients,
      };

      axios
        .post(apiUrl, requestData)
        .then((response) => {
          this.nutritionData = response.data;

          this.ingredientsDetails = this.nutritionData.ingredients.map(
            (item) => item.parsed[0]
          );
          this.ingredientsCalories = this.ingredientsDetails.map(
            (item: any) => item.nutrients.ENERC_KCAL.quantity
          );
        })
        .catch((error) => {
          console.error("Error analyzing nutrition:", error);
        });
    },
  },
  // local storage
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