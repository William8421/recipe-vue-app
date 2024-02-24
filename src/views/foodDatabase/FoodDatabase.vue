<template>
  <div class="food-database-container">
    <h2>Food Database Search</h2>
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
            <!-- <div v-if="data.food.image" class="food-image-container">
              <img :src="data.food.image" :alt="data.food.label" />
            </div>
            <div v-else class="food-image-container">
              <div class="empty-image"></div>
            </div> -->
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
import { defineComponent } from "vue";
import axios from "axios";
import { FoodData } from "../../types/Types";

export default defineComponent({
  data() {
    return {
      foodQuery: "",
      foodData: [] as FoodData[],
    };
  },
  methods: {
    async searchFood() {
      try {
        const apiId = process.env.VUE_APP_FOOD_DATABASE_API_ID;
        const apiKey = process.env.VUE_APP_FOOD_DATABASE_API_KEY;
        const apiUrl = `https://api.edamam.com/api/food-database/v2/parser?app_key=${apiKey}&app_id=${apiId}&ingr=${encodeURIComponent(
          this.foodQuery
        )}`;

        const response = await axios.get(apiUrl);
        this.foodData = response.data.hints;
        console.log(this.foodData);
        localStorage.setItem("foodData", JSON.stringify(this.foodData));
      } catch (error) {
        console.error("Error searching food:", error);
      }
    },
    navigateToFoodDetails(foodId: string) {
      this.$router.push({ name: "FoodDetails", params: { foodId: foodId } });
    },
  },
  created() {
    const storedData = localStorage.getItem("foodData");
    if (storedData) {
      this.foodData = JSON.parse(storedData);
    }
  },
});
</script>
