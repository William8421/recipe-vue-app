<template>
  <div class="food-details-container">
    <div v-if="foodData" class="details-results">
      <div class="details-card">
        <h1>{{ foodData.knownAs }}</h1>
        <div class="details-card-body">
          <div v-if="foodData.image" class="details-img-container">
            <img :src="foodData.image" :alt="foodData.knownAs" />
          </div>
          <div class="details-card-information">
            <div>
              <strong>Calories:</strong>
              <span>{{ Math.round(foodNutrients.ENERC_KCAL) }}</span>
            </div>
            <div>
              <strong>Fat:</strong>
              <span>{{ Math.round(foodNutrients.FAT) }} g</span>
            </div>
            <div>
              <strong>Carbs:</strong>
              <span>{{ Math.round(foodNutrients.CHOCDF) }} g</span>
            </div>
            <div>
              <strong>Protein:</strong>
              <span>{{ Math.round(foodNutrients.PROCNT) }} g</span>
            </div>
            <div v-if="foodData.brand">
              <strong>Brand:</strong> <span>{{ foodData.brand }}</span>
            </div>
            <div v-else class="brand"></div>
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
import { FoodData, FoodDataNutrient } from "../../types/Types";

export default defineComponent({
  data() {
    return {
      // Array to store food data
      foodData: [] as FoodData[],
      foodNutrients: [] as FoodDataNutrient[],
    };
  },
  // Lifecycle hook: Executed after the component is mounted
  async mounted() {
    try {
      // Retrieve foodId parameter from the route
      const foodId = this.$route.params.foodId;
      // API credentials
      const apiId = process.env.VUE_APP_FOOD_DATABASE_API_ID;
      const apiKey = process.env.VUE_APP_FOOD_DATABASE_API_KEY;
      // Make API request to get food details based on foodId
      const response = await axios.get(
        `https://api.edamam.com/api/food-database/v2/parser?app_key=${apiKey}&app_id=${apiId}&ingr=${foodId}`
      );
      // Extract and store relevant food details from the API response
      this.foodData = response.data.hints[0].food;
      this.foodNutrients = response.data.hints[0].food.nutrients;
    } catch (error) {
      // Log error if there's an issue with the API request
      console.error("Error fetching food details:", error);
    }
  },
});
</script>
