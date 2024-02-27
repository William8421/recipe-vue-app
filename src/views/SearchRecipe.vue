<template>
  <div class="search-recipe-container">
    <h1>Recipe Search</h1>
    <div class="search-recipe-block">
      <form @submit.prevent="searchRecipes">
        <div class="keywords">
          <label class="keywords-label" for="searchQuery"
            >Enter a what you have eaten, like "coffee and croissant" or
            "chicken enchilada" to see how it works. We have accurate data tens
            of thousands of foods, including international dishes.</label
          >
          <div class="input-button-container">
            <input
              v-model="searchQuery"
              id="searchQuery"
              type="search"
              placeholder="Keywords"
              required
            />
            <button class="search-icon" type="submit">
              <i class="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
        </div>
        <div class="filter-buttons-container">
          <button
            class="filter-button"
            type="button"
            @click="openCloseDietModal"
          >
            Diets
          </button>
          <input
            v-model="calories"
            id="calories"
            type="number"
            placeholder="calories"
          />
          <button
            class="filter-button"
            type="button"
            @click="openCloseAllergiesModal"
          >
            Allergies
          </button>
        </div>
        <div>
          <FilterDisplay title="Diets" :items="selectedDiets" />
          <FilterDisplay title="Allergies" :items="selectedAllergies" />
        </div>
        <button class="custom-button" type="submit">Search Recipes</button>
      </form>
    </div>

    <Modal :show="showDietModal" :closeModal="openCloseDietModal">
      <h2>Diets:</h2>
      <FilterOptions :options="dietOptions" v-model="selectedDiets" />
    </Modal>

    <Modal :show="showAllergiesModal" :closeModal="openCloseAllergiesModal">
      <h2>Allergies:</h2>
      <FilterOptions :options="allergies" v-model="selectedAllergies" />
    </Modal>

    <div v-if="recipes">
      <Recipes :recipes="recipes" />
    </div>
  </div>
</template>

<script lang="ts">
// functions from the Vue framework
import { defineComponent } from "vue";
// libraries
import axios from "axios";
// types
import { Recipe } from "../types/Types";
// components for Search Recipe
import Modal from "../components/searchRecipe/Modal.vue";
import Recipes from "../components/searchRecipe/Recipe.vue";
import FilterOptions from "../components/searchRecipe/FilterOptions.vue";
import FilterDisplay from "../components/searchRecipe/FilterDisplay.vue";

export default defineComponent({
  components: {
    Modal,
    Recipes,
    FilterOptions,
    FilterDisplay,
  },
  data() {
    return {
      // Search query for recipes
      searchQuery: "",
      // Selected diet options
      selectedDiets: [] as string[],
      // Selected allergy options
      selectedAllergies: [] as string[],
      // Caloric intake filter
      calories: null as number | null,
      // Flag to show/hide diet modal
      showDietModal: false,
      // Flag to show/hide allergies modal
      showAllergiesModal: false,
      // Store recipes received from API
      recipes: null as Recipe | null,
      // List of allergy options
      allergies: [
        "celery-free",
        "crustacean-free",
        "dairy-free",
        "egg-free",
        "fish-free",
        "gluten-free",
        "lupine-free",
        "mustard-free",
        "peanut-free",
        "sesame-free",
        "shellfish-free",
        "soy-free",
        "tree-Nut-free",
        "wheat-free",
      ],
      // List of diet options
      dietOptions: [
        "alcohol-free",
        "keto-friendly",
        "kidney-friendly",
        "kosher",
        "no-sugar",
        "paleo",
        "pescatarian",
        "pork-free",
        "red-meat-free",
        "sugar-conscious",
        "vegan",
        "vegetarian",
        "balanced",
        "high-fiber",
        "high-protein",
        "low-carb",
        "low-fat",
        "low-sodium",
      ],
    };
  },
  methods: {
    // Asynchronous method to search recipes based on user input and filters
    async searchRecipes() {
      try {
        // API credentials
        const appId = process.env.VUE_APP_SEARCH_API_ID;
        const appKey = process.env.VUE_APP_SEARCH_API_KEY;

        let apiUrl = `https://api.edamam.com/search?app_id=${appId}&app_key=${appKey}&q=${this.searchQuery}`;

        const dietTerms = [
          "balanced",
          "high-fiber",
          "high-protein",
          "low-carb",
          "low-fat",
          "low-sodium",
        ];

        // Separate selectedDiets into diet and health terms
        const selectedDietTerms = this.selectedDiets.filter((diet) =>
          dietTerms.includes(diet)
        );
        const selectedHealthTerms = this.selectedDiets.filter(
          (diet) => !dietTerms.includes(diet)
        );

        // Generate URL based on the presence of diet terms
        if (selectedDietTerms.length > 0) {
          apiUrl += `&diet=${selectedDietTerms.join("&diet=")}`;
        }
        // Include health terms
        if (selectedHealthTerms.length > 0) {
          apiUrl += `&health=${selectedHealthTerms.join("&health=")}`;
        }
        // Include selected allergies
        if (this.selectedAllergies.length > 0) {
          apiUrl += `&health=${this.selectedAllergies.join("&")}`;
        }
        // Include calories filter
        if (this.calories) {
          apiUrl += `&calories=${this.calories}`;
        }

        // Make API request using await
        const response = await axios.get(apiUrl);

        // Update recipes with the response
        this.recipes = response.data.hits;
      } catch (error) {
        // Log error if there's an issue with the API request
        console.error("Error searching recipes:", error);
      }
    },
    // Toggle the display of the diet modal
    openCloseDietModal() {
      this.showDietModal = !this.showDietModal;
    },
    // Toggle the display of the allergies modal
    openCloseAllergiesModal() {
      this.showAllergiesModal = !this.showAllergiesModal;
    },
  },

  // Save recipes to local storage before leaving the route
  beforeRouteLeave(to, from, next) {
    localStorage.setItem("recipes", JSON.stringify(this.recipes));
    next();
  },
  // Load stored recipes from local storage on component creation
  created() {
    const storedData = localStorage.getItem("recipes");
    if (storedData) {
      this.recipes = JSON.parse(storedData);
    }
  },
});
</script>