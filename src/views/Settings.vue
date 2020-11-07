<template>
  <div>
    <v-row justify="center">
      <v-card
        elevation="2"
        min-width="400"
        max-width="500"
      >
        <v-card-title>
          <span class="headline">Уровень сложности</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-radio-group v-model="gameModeName">
              <v-radio
                v-for="gm in gameModes"
                :key="gm.name"
                :label="gm.label"
                :value="gm.name"
                :disabled="gm.disabled"
              />
            </v-radio-group>

            <settings-custom-game-mode-form v-if="showGameModeCustomizationForm"/>
          </v-container>
        </v-card-text>
      </v-card>
    </v-row>

    <v-row justify="center" class="mt-5">
      <!-- TODO: сброс стратистики-->
      <v-btn color="error" @click="resetLeaderboard">
        Сброс статистики
      </v-btn>
    </v-row>

    <v-row justify="center" class="mt-5">
      <link-button
        to="/"
        label="Выход в меню"
        color="secondary"
      />
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import gameModes from '@/config';
import { GAME_MODE_CUSTOM } from '@/store/modules/settings/types';
import SettingsCustomGameModeForm from '@/components/SettingsCustomGameModeForm.vue';
import SettingsMutationTypes from '@/store/modules/settings/mutation-types';
import LeaderboardMutationTypes from '@/store/modules/leaderboard/mutation-types';
import LinkButton from '@/components/LinkButton.vue';

export default Vue.extend({
  components: {
    SettingsCustomGameModeForm,
    LinkButton,
  },
  data() {
    return {
      gameModes,
      GAME_MODE_CUSTOM,
    };
  },
  computed: {
    gameModeName: {
      get(): string {
        return this.$store.state.settings.currentGameMode.name;
      },
      set(value: string) {
        this.$store.commit(`settings/${SettingsMutationTypes.CHANGE_GAME_MODE}`, value);
      },
    },
    showGameModeCustomizationForm(): boolean {
      return this.gameModeName === GAME_MODE_CUSTOM;
    },
  },
  methods: {
    resetLeaderboard() {
      this.$store.commit(`leaderboard/${LeaderboardMutationTypes.RESET}`);
    },
  },
});
</script>

<style scoped>

</style>
