<template>
  <div class="food-details-container">
    <h1>Details</h1>
    <div v-if="foodData" class="food-details-card">
      <div v-if="foodData.image" class="food-details-image-container">
        <img :src="foodData.image" :alt="foodData.knownAs" />
      </div>
      <p><strong>Known As:</strong> {{ foodData.knownAs }}</p>
      <p><strong>Calories:</strong> {{ foodData.nutrients.ENERC_KCAL }}</p>
      <p><strong>Fat:</strong> {{ foodData.nutrients.FAT }} g</p>
      <p><strong>Carbs:</strong> {{ foodData.nutrients.CHOCDF }} g</p>
      <p><strong>Protein:</strong> {{ foodData.nutrients.PROCNT }} g</p>
      <p v-if="foodData.brand"><strong>Brand:</strong> {{ foodData.brand }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      foodData: null,
    };
  },
  async mounted() {
    const foodId = this.$route.params.foodId;
    const apiId = process.env.VUE_APP_FOOD_DATABASE_API_ID;
    const apiKey = process.env.VUE_APP_FOOD_DATABASE_API_KEY;

    try {
      const response = await axios.get(
        `https://api.edamam.com/api/food-database/v2/parser?app_key=${apiKey}&app_id=${apiId}&ingr=${encodeURIComponent(
          foodId
        )}`
      );

      this.foodData = response.data.hints[0].food;
    } catch (error) {
      console.error("Error fetching food details:", error);
    }
  },
};
</script>

<style>
</style>
