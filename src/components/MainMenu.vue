<template>
  <v-sheet
    rounded
    elevation="1"
  >
    <v-col class="px-16">
      <link-button
        to="/game"
        label="Новая игра"
      />

      <link-button
        to="/settings"
        label="Настройки"
      />

      <link-button
        to="/leaderboard"
        label="Результаты"
      />
    </v-col>
  </v-sheet>
</template>

<script lang="ts">
import Vue from 'vue';

import LinkButton from '@/components/LinkButton.vue';

export default Vue.extend({
  components: {
    LinkButton,
  },
});
</script>

<style scoped>

</style>
