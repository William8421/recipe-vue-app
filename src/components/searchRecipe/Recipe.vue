<template>
  <div class="recipes">
    <h2>Recipes</h2>
    <div class="card" v-for="recipe in recipes" :key="recipe.recipe.uri">
      <div class="img-container">
        <img :src="recipe.recipe.image" :alt="recipe.recipe.label" />
      </div>
      <div class="title-health-labels">
        <h3>{{ recipe.recipe.label }}</h3>
        <div class="health-labels">
          <div
            v-for="healthLabel in recipe.recipe.healthLabels"
            :key="healthLabel"
            class="labels"
          >
            {{ healthLabel }}
          </div>
        </div>
      </div>
      <div class="card-ingredients" v-if="recipe.showIngredients">
        <h2>Ingredients</h2>
        <ul
          v-for="ingredient in recipe.recipe.ingredientLines"
          :key="ingredient"
        >
          <li>{{ ingredient }}</li>
        </ul>
        <div>{{ recipe.recipe.yield }} serving</div>
        <div>
          Calories{{ Math.round(recipe.recipe.calories / recipe.recipe.yield) }}
          kcal
        </div>
        <div v-for="digestData in recipe.recipe.digest" :key="digestData"></div>
        <div v-for="nutrient in ['Protein', 'Fat', 'Carbs']" :key="nutrient">
          <div v-if="nutrientValue(recipe, nutrient)">
            {{ nutrient }}: {{ nutrientValue(recipe, nutrient) }}g
          </div>
        </div>
      </div>
      <div class="arrow-icons" @click="toggleMoreInfo(recipe)">
        <i v-if="!recipe.showIngredients" class="fa-solid fa-angles-down"></i>
        <i v-else class="fa-solid fa-angles-up"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["recipes"],
  methods: {
    toggleMoreInfo(recipe) {
      recipe.showIngredients = !recipe.showIngredients;
    },
    nutrientValue(recipe, nutrientLabel) {
      const nutrientData = recipe.recipe.digest.find(
        (digestData) => digestData.label === nutrientLabel
      );
      return nutrientData ? Math.round(nutrientData.total) : null;
    },
  },
};
</script>