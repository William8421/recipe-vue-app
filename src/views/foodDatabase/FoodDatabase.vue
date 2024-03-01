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
    <Modal
      :show="error"
      :closeModal="closeErrorModal"
      header="Error!"
      close="Close"
    >
      <ErrorModal :message="errorMessage" />
    </Modal>
    <h3>Sample Searches</h3>
    <div class="sample-searches-container">
      <div v-for="sample in sampleSearches" :key="sample">
        <div @click="callSampleSearch(sample)" class="sample">
          {{ sample }},
        </div>
      </div>
    </div>

    <div v-if="foodData">
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

import Modal from "../../components/searchRecipe/Modal.vue";
import ErrorModal from "../../components/ErrorModal.vue";

export default defineComponent({
  components: { Modal, ErrorModal },
  data() {
    return {
      // Query for searching food
      foodQuery: "",
      // Array to store food data
      foodData: [] as FoodData[],
      // Flag to show error
      error: false,
      // Customized error message
      errorMessage: "",
      // sample searches
      sampleSearches: [
        "Burger King",
        "chicken wings",
        "potato chips",
        "Starbucks cake",
        "oatmeal",
        "fried eggs",
        "blueberry pancakes",
        "Pizza Hut",
        "low fat milk",
      ],
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
        this.error = false;
        if (response.data.hints.length === 0) {
          this.error = true;
          this.errorMessage = `We couldn't find any matches for "${this.foodQuery}" Double check your
      search for any typos or spelling errors - or try a different search term.`;
        }
        console.log(this.foodData);

        // Save foodData to local storage
        localStorage.setItem("foodData", JSON.stringify(this.foodData));
      } catch (error) {
        // Log error if there's an issue with the API request
        console.error("Error searching food:", error);
      }
    },
    // Method to initiate a food search using a sample query
    callSampleSearch(sample: string) {
      this.foodQuery = sample;
      this.searchFood();
    },
    // Method to navigate to food details page
    navigateToFoodDetails(foodId: string) {
      this.$router.push({ name: "FoodDetails", params: { foodId: foodId } });
    },
    closeErrorModal() {
      this.error = false;
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
