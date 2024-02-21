<template>
  <div class="food-database-container">
    <h2>Food Database Search</h2>
    <form @submit.prevent="searchFood">
      <label for="foodQuery">Food:</label>
      <input v-model="foodQuery" id="foodQuery" type="text" required />

      <button type="submit">Search Food</button>
    </form>

    <div v-if="foodData" class="food-information">
      <h3>Food Information</h3>
      <div v-for="(data, index) in foodData" :key="index" class="food-card">
        <router-link
          :to="{ name: 'FoodDetails', params: { foodId: data.food.foodId } }"
        >
          <h3>{{ data.food.label }}</h3>
        </router-link>
        <div v-if="data.food.image" class="food-image-container">
          <img :src="data.food.image" :alt="data.food.label" />
        </div>
        <p>Calories: {{ data.food.nutrients.ENERC_KCAL }}</p>
        <p>{{ data.food.brand }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import { FoodData } from "../../types/Type";

export default defineComponent({
  data() {
    return {
      foodQuery: "",
      foodData: [] as FoodData[],
    };
  },
  methods: {
    searchFood() {
      const apiId = process.env.VUE_APP_FOOD_DATABASE_API_ID;
      const apiKey = process.env.VUE_APP_FOOD_DATABASE_API_KEY;

      const apiUrl = `https://api.edamam.com/api/food-database/v2/parser?app_key=${apiKey}&app_id=${apiId}&ingr=${encodeURIComponent(
        this.foodQuery
      )}`;

      axios
        .get(apiUrl)
        .then((response) => {
          this.foodData = response.data.hints;
        })
        .catch((error) => {
          console.error("Error searching food:", error);
        });
    },
  },
  // local storage
  beforeRouteLeave(to, from, next) {
    localStorage.setItem("foodData", JSON.stringify(this.foodData));
    next();
  },
  created() {
    const storedData = localStorage.getItem("foodData");
    if (storedData) {
      this.foodData = JSON.parse(storedData);
    }
  },
});
</script>
