<template>
  <v-card>
    <v-card-title>
      Меню
    </v-card-title>

    <v-card-text>
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
    </v-card-text>
  </v-card>
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
