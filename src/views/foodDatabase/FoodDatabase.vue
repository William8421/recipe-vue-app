<template>
  <div class="food-database-container">
    <h2>Food Database</h2>
    <form @submit.prevent="searchFood">
      <input
        v-model="foodQuery"
        id="foodQuery"
        type="text"
        placeholder="Food"
        required
      />
      <button class="custom-button" type="submit">Search</button>
    </form>

    <div v-if="foodData" class="food-results-container">
      <h3>Food Information</h3>
      <div class="food-results">
        <div
          v-for="(data, index) in foodData"
          :key="index"
          class="food-card"
          @click="navigateToFoodDetails(data.food.foodId)"
        >
          <h3>{{ data.food.label }}</h3>
          <div class="food-card-body">
            <div class="card-information">
              <div>
                <strong>Calories:</strong>
                <span>{{ Math.round(data.food.nutrients.ENERC_KCAL) }}</span>
              </div>
              <div class="brand">
                <span>{{ data.food.brand }}</span>
              </div>
            </div>
          </div>
        </div>
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
import { FoodData } from "../../types/Types";

export default defineComponent({
  data() {
    return {
      // Query for searching food
      foodQuery: "",
      // Array to store food data
      foodData: [] as FoodData[],
    };
  },
  methods: {
    // Asynchronous method to search for food based on user input
    async searchFood() {
      try {
        // API credentials
        const apiId = process.env.VUE_APP_FOOD_DATABASE_API_ID;
        const apiKey = process.env.VUE_APP_FOOD_DATABASE_API_KEY;
        const apiUrl = `https://api.edamam.com/api/food-database/v2/parser?app_key=${apiKey}&app_id=${apiId}&ingr=${encodeURIComponent(
          this.foodQuery
        )}`;
        // Make API request using await
        const response = await axios.get(apiUrl);
        // Update foodData with the response
        this.foodData = response.data.hints;
        // Save foodData to local storage
        localStorage.setItem("foodData", JSON.stringify(this.foodData));
      } catch (error) {
        // Log error if there's an issue with the API request
        console.error("Error searching food:", error);
      }
    },
    // Method to navigate to food details page
    navigateToFoodDetails(foodId: string) {
      this.$router.push({ name: "FoodDetails", params: { foodId: foodId } });
    },
  },
  created() {
    // Load stored food data from local storage on component creation
    const storedData = localStorage.getItem("foodData");
    if (storedData) {
      this.foodData = JSON.parse(storedData);
    }
  },
});
</script>
