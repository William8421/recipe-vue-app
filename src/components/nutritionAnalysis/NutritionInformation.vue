<template>
  <div class="values">
    <span>
      <strong>
        {{ label }}
      </strong>
      {{ Math.round(quantity) }}
      {{ unit }}
    </span>
    <span>
      <strong> {{ Math.round(totalQuantity) }}{{ totalUnit }} </strong>
    </span>
  </div>
</template>

<script lang="ts">
// functions from the Vue framework
import { defineComponent } from "vue";
// types
import { NutritionData } from "../../types/Types";
export default defineComponent({
  // Declaring component props
  props: {
    label: String,
    quantity: Number,
    unit: String,
    totalQuantity: Number,
    totalUnit: String,
    nutritionData: Object as () => NutritionData | null,
  },
});
</script>