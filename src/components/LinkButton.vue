<template>
  <router-link :to="to" class="link">
    <v-btn
      block
      :color="color"
      class="my-2"
    >
      {{ label }}
    </v-btn>
  </router-link>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    to: String,
    label: String,
    color: {
      type: String,
      default: 'primary',
    },
  },
});
</script>

<style scoped>
  .link {
    text-decoration: none;
  }
</style>
