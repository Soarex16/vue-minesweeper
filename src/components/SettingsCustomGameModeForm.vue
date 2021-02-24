<template>
  <div>
    <v-slider
      prepend-icon="mdi-clock-outline"
      thumb-label
      v-model="time"
      min="2"
      max="15"
    />

    <v-slider
      prepend-icon="mdi-grid"
      thumb-label
      v-model="fieldSize"
      min="10"
      max="30"
    />

    <v-slider
      prepend-icon="mdi-bomb"
      thumb-label
      v-model="bombs"
      min="10"
      :max="maxBombsNum"
      step="5"
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
        this.$store.commit(`settings/${SettingsMutationTypes.CHANGE_TIME}`, value);
      },
    },
    fieldSize: {
      get(): number {
        return this.$store.state.settings.currentGameMode.fieldSize;
      },
      set(value: number) {
        this.$store.commit(`settings/${SettingsMutationTypes.CHANGE_FIELD_SIZE}`, value);
      },
    },
    bombs: {
      get(): number {
        return this.$store.state.settings.currentGameMode.bombsNum;
      },
      set(value: number) {
        this.$store.commit(`settings/${SettingsMutationTypes.CHANGE_BOMBS_NUM}`, value);
      },
    },
    ...mapGetters('settings', ['maxBombsNum']),
  },
});
</script>

<style scoped>

</style>
