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
              <span>{{ Math.round(foodData.nutrients.ENERC_KCAL) }}</span>
            </div>
            <div>
              <strong>Fat:</strong>
              <span>{{ Math.round(foodData.nutrients.FAT) }} g</span>
            </div>
            <div>
              <strong>Carbs:</strong>
              <span>{{ Math.round(foodData.nutrients.CHOCDF) }} g</span>
            </div>
            <div>
              <strong>Protein:</strong>
              <span>{{ Math.round(foodData.nutrients.PROCNT) }} g</span>
            </div>
            <div class="brand">
              <span>{{ foodData.brand }}</span>
            </div>
          </div>
        </div>
      </div>
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
    try {
      const foodId = this.$route.params.foodId;
      const apiId = process.env.VUE_APP_FOOD_DATABASE_API_ID;
      const apiKey = process.env.VUE_APP_FOOD_DATABASE_API_KEY;

      const response = await axios.get(
        `https://api.edamam.com/api/food-database/v2/parser?app_key=${apiKey}&app_id=${apiId}&ingr=${encodeURIComponent(
          foodId
        )}`
      );

      this.foodData = response.data.hints[0].food;
      console.log(this.foodData);
    } catch (error) {
      console.error("Error fetching food details:", error);
    }
  },
};
</script>

<style>
</style>
