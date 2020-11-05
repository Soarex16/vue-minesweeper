<template>
  <div>
    <v-slider
      prepend-icon="mdi-clock-outline"
      thumb-label
      v-model="time"
      min="2"
      max="20"
    />

    <v-slider
      prepend-icon="mdi-grid"
      thumb-label
      v-model="fieldSize"
      min="10"
      max="75"
      step="5"
    />

    <v-slider
      prepend-icon="mdi-bomb"
      thumb-label
      v-model="bombs"
      min="10"
      :max="maxBombsNum"
      step="10"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';

import SettingsMutationTypes from '@/store/modules/settings/mutation-types';

export default Vue.extend({
  data() {
    return {
      dialog: true,
    };
  },
  computed: {
    time: {
      get(): number {
        return this.$store.state.settings.currentGameMode.time;
      },
      set(value: number) {
        this.$store.commit(SettingsMutationTypes.CHANGE_TIME, value);
      },
    },
    fieldSize: {
      get(): number {
        return this.$store.state.settings.currentGameMode.fieldSize;
      },
      set(value: number) {
        this.$store.commit(SettingsMutationTypes.CHANGE_FIELD_SIZE, value);
      },
    },
    bombs: {
      get(): number {
        return this.$store.state.settings.currentGameMode.bombs;
      },
      // TODO: баг, почему-то при смене режима игры вызывается с value=10
      set(value: number) {
        this.$store.commit(SettingsMutationTypes.CHANGE_BOMBS_NUM, value);
      },
    },
    ...mapGetters({
      maxBombsNum: 'maxBombsNum',
    }),
  },
});
</script>

<style scoped>

</style>
