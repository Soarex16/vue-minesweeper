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
            <v-radio-group v-model="gameMode">
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
      <v-btn color="error">
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

import { GameMode, GAME_MODE_CUSTOM } from '@/store/modules/settings/types';

import SettingsMutationTypes from '@/store/modules/settings/mutation-types';
import gameModes from '@/config';

import SettingsCustomGameModeForm from '@/components/SettingsCustomGameModeForm.vue';
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
    gameMode: {
      get(): GameMode {
        return this.$store.state.settings.currentGameMode.name;
      },
      set(gmName: string) {
        this.$store.commit(SettingsMutationTypes.CHANGE_GAME_MODE, gmName);
      },
    },
    showGameModeCustomizationForm() {
      return this.gameMode === GAME_MODE_CUSTOM;
    },
  },
});
</script>

<style scoped>

</style>
