<template>
  <div v-if="nutritionData" class="results">
    <h2>Ingredients</h2>
    <table class="result-table">
      <thead>
        <tr>
          <th>Quantity</th>
          <th>Unit</th>
          <th>Food</th>
          <th>Calories</th>
          <th>Weight</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(ingredient, index) in calculatedIngredients" :key="index">
          <td>{{ ingredient.quantity }}</td>
          <td>{{ ingredient.measure }}</td>
          <td>{{ ingredient.foodMatch }}</td>
          <td>{{ ingredient.calories.toFixed(1) }} kcal</td>
          <td>{{ ingredient.weight.toFixed(1) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { NutritionData, NutritionMethods } from "../../types/Types";
export default {
  props: {
    nutritionData: Object as () => NutritionData | null,
  },
  computed: {
    calculatedIngredients(this: NutritionMethods) {
      if (!this.nutritionData) return [];

      return this.nutritionData.ingredients.map((ingredient) => ({
        quantity: ingredient.parsed[0].quantity,
        measure: ingredient.parsed[0].measure,
        foodMatch: ingredient.parsed[0].foodMatch,
        weight: parseFloat(ingredient.parsed[0].weight.toFixed(1)),
        calories: parseFloat(
          ingredient.parsed[0].nutrients.ENERC_KCAL.quantity.toFixed(1)
        ),
      }));
    },
  },
};
</script>