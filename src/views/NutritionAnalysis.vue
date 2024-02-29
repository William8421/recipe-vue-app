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

        <Modal
          :show="error"
          :closeModal="closeErrorModal"
          header="Error"
          close="Close"
        >
          <ErrorModal :message="errorMessage" />
        </Modal>

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
// functions from the Vue framework
import { defineComponent } from "vue";
// libraries
import axios from "axios";
// types
import { NutritionData, NutritionMethods } from "../types/Types";
// components for nutrition analysis
import NutritionInformation from "../components/nutritionAnalysis/NutritionInformation.vue";
import NutritionTable from "../components/nutritionAnalysis/NutritionTable.vue";
import Modal from "../components/searchRecipe/Modal.vue";
import ErrorModal from "../components/ErrorModal.vue";

export default defineComponent({
  components: { NutritionTable, NutritionInformation, Modal, ErrorModal },
  data() {
    return {
      foodDescription: "",
      nutritionData: null as NutritionData | null,
      errorMessage: "",
      error: false as boolean,
    };
  },
  computed: {
    // Computed property to extract relevant nutrition information
    nutritionInformation(this: NutritionMethods) {
      if (!this.nutritionData) return [];
      // Selected nutrient keys for display
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
      // Map selected nutrient keys to structured data
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
    // Asynchronous method to analyze nutrition based on provided food description
    async analyzeNutrition(this: NutritionMethods) {
      try {
        // API credentials
        const appId = process.env.VUE_APP_NUTRITION_API_ID;
        const appKey = process.env.VUE_APP_NUTRITION_API_KEY;
        const apiUrl = `https://api.edamam.com/api/nutrition-details?app_id=${appId}&app_key=${appKey}`;

        // Split and filter input into an array of ingredients
        const ingredientsArray: string[] = this.foodDescription
          .split("\n")
          .filter((ingredient: string) => ingredient.trim() !== "");
        const requestData = { ingr: ingredientsArray };

        // Make API request using await
        const response = await axios.post(apiUrl, requestData);

        // Update nutrition data with the response
        this.nutritionData = response.data;

        this.error = false;
      } catch (error) {
        // Log error if there's an issue with the API request
        console.error("Error analyzing nutrition:", error);
        this.error = true;
        this.errorMessage =
          "We cannot calculate the nutrition for some ingredients. Please check the ingredient spelling or if you have entered a quantities for the ingredients.";
      }
    },
    closeErrorModal() {
      this.error = false;
    },
  },
  beforeRouteLeave(to, from, next) {
    // Save nutrition data to local storage before leaving the route
    localStorage.setItem("nutritionData", JSON.stringify(this.nutritionData));
    next();
  },
  created() {
    // Load stored nutrition data from local storage on component creation
    const storedData = localStorage.getItem("nutritionData");
    if (storedData) {
      this.nutritionData = JSON.parse(storedData);
    }
  },
});
</script>