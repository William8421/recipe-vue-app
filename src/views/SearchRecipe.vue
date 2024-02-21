<template>
  <div class="search-recipe-container">
    <h1>Recipe Search</h1>
    <!-- search form -->
    <form @submit.prevent="searchRecipes">
      <div>
        <label for="searchQuery">Keywords</label>
        <input v-model="searchQuery" id="searchQuery" type="text" required />
      </div>
      <div>
        <button type="button" @click="openCloseDietModal">Diets</button>
        <button type="button" @click="openCloseAllergiesModal">
          Allergies
        </button>
        <!-- <label for="calories">Calories</label> -->
        <input
          v-model="Calories"
          id="calories"
          type="number"
          placeholder="calories"
        />
      </div>

      <button type="submit">Search Recipes</button>
    </form>

    <!-- Diet Modal using Modal component -->
    <Modal :show="showDietModal" :closeModal="openCloseDietModal">
      <h2>Diets:</h2>
      <div class="filters-modal">
        <div v-for="dietOption in dietOptions" :key="dietOption">
          <div class="check-box">
            <input
              type="checkbox"
              :id="dietOption"
              :value="dietOption"
              v-model="selectedDiets"
            />
            <label :for="dietOption">{{ dietOption }}</label>
          </div>
        </div>
      </div>
    </Modal>

    <!-- Allergies Modal using Modal component -->
    <Modal :show="showAllergiesModal" :closeModal="openCloseAllergiesModal">
      <h2>Allergies:</h2>
      <div class="filters-modal">
        <div v-for="allergy in allergies" :key="allergy">
          <div class="check-box">
            <input
              type="checkbox"
              :id="allergy"
              :value="allergy"
              v-model="selectedAllergies"
            />
            <label :for="allergy">{{ allergy }}</label>
          </div>
        </div>
      </div>
    </Modal>

    <div v-if="selectedDiets.length != 0">
      <h4>Diets:</h4>
      <div v-for="diet in selectedDiets" :key="diet">
        <li>{{ diet }}</li>
      </div>
    </div>
    <div v-if="selectedAllergies.length != 0">
      <h4>Allergies:</h4>
      <div v-for="allergy in selectedAllergies" :key="allergy">
        <li>{{ allergy }}</li>
      </div>
    </div>

    <!-- recipe -->
    <div v-if="recipes">
      <Recipes :recipes="recipes" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Recipe } from "../types/Type";
import axios from "axios";
import Modal from "../components/searchRecipe/Modal.vue";
import Recipes from "../components/searchRecipe/Recipe.vue";

export default defineComponent({
  components: {
    Modal,
    Recipes,
  },
  data() {
    return {
      searchQuery: "",
      selectedDiets: [] as string[],
      selectedAllergies: [] as string[],
      calories: null as number | null,
      showDietModal: false,
      showAllergiesModal: false,
      recipes: null as Recipe | null,
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
    searchRecipes() {
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

      if (this.selectedAllergies.length > 0) {
        apiUrl += `&health=${this.selectedAllergies.join("&")}`;
      }
      if (this.calories) {
        apiUrl += `&calories=${this.calories}`;
      }

      axios
        .get(apiUrl)
        .then((response) => {
          this.recipes = response.data.hits;
        })
        .catch((error) => {
          console.error("Error searching recipes:", error);
        });
    },

    openCloseDietModal() {
      this.showDietModal = !this.showDietModal;
    },
    openCloseAllergiesModal() {
      this.showAllergiesModal = !this.showAllergiesModal;
    },
  },

  // local storage
  beforeRouteLeave(to, from, next) {
    localStorage.setItem("recipes", JSON.stringify(this.recipes));
    next();
  },
  created() {
    const storedData = localStorage.getItem("recipes");
    if (storedData) {
      this.recipes = JSON.parse(storedData);
    }
  },
});
</script>