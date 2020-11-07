<template>
  <div class="home">
    <v-col>
      <v-row justify="center">
        <v-col cols="2">
          <v-subheader>Очки</v-subheader>
        </v-col>
        <v-col cols="2">
          <v-text-field
            readonly
            solo
            dense
            :value="score"
            hide-details="true"
          />
        </v-col>

        <v-col cols="2">
          <v-subheader>Осталось времени</v-subheader>
        </v-col>
        <v-col cols="2">
          <v-text-field
            readonly
            solo
            dense
            :value="secondsRemaining"
            hide-details="true"
          />
        </v-col>
      </v-row>

      <v-row justify="center" no-gutters>
        <game-field
          @click="startGame"
        />
      </v-row>
    </v-col>

    <game-over-dialog
      :show="endOfGameDialogVisible"
      :score="score"
      :title="endOfGameTitle"
      @new-game="newGame"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';

import GameField from '@/components/GameField.vue';
import GameOverDialog from '@/components/GameEndDialog.vue';

interface GameState {
  gameStarted: boolean;
  secondsRemaining: number;
  intervalHandle: number;

  win: boolean;
  endOfGameDialogVisible: boolean;
}

export default Vue.extend({
  // TODO: before route leave if game started - require confirmation
  components: {
    GameField,
    GameOverDialog,
  },
  data() {
    return {
      gameStarted: false,

      secondsRemaining: 0,
      intervalHandle: 0,

      win: false,
      endOfGameDialogVisible: false,
    };
  },
  computed: {
    ...mapState('game', ['score']),
    ...mapState('settings', ['currentGameMode']),
    endOfGameTitle() {
      return this.win ? 'Победа!' : 'Вы проиграли :(';
    },
  },
  methods: {
    newGame() {
      this.endOfGameDialogVisible = false;

      this.secondsRemaining = this.currentGameMode.time;

      // TODO: generate field
      console.log('new game');
    },
    startGame() {
      if (!this.gameStarted) {
        this.gameStarted = true;
        this.startTimer();
      }
    },
    stopGame(win: boolean) {
      this.gameStarted = false;
      this.stopTimer();

      this.win = win;
      this.endOfGameDialogVisible = true;

      // TODO: add score to leaderboard
    },
    startTimer() {
      this.intervalHandle = setInterval(() => {
        this.secondsRemaining -= 1;

        if (this.secondsRemaining === 0) {
          this.stopGame(false);
        }
      }, 1000);
    },
    stopTimer() {
      if (this.intervalHandle) {
        clearInterval(this.intervalHandle);
      }
    },
  },
  mounted() {
    this.newGame();
  },
});
</script>
