<template>
  <p>
    <!-- label -->
    <span>
      <strong>
        {{ label }}
      </strong>
      <!-- total Nutrients -->
      {{ quantity.toFixed(1) }}
      {{ unit }}
    </span>
    <!-- total daily -->
    <span>
      {{ Math.round(totalQuantity) }}
      {{ totalUnit }}
    </span>
  </p>
</template>

<script>
export default {
  props: [
    "label",
    "quantity",
    "unit",
    "totalQuantity",
    "totalUnit",
    "nutritionData",
  ],
};
</script>