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
          :field="field"
          @start-game="startGame"
          @game-over="stopGame(false)"
          @reveal-cell="updateScore"
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
import { mapState, mapActions } from 'vuex';

import GameField from '@/components/GameField.vue';
import GameOverDialog from '@/components/GameEndDialog.vue';
import GameActionTypes from '@/store/modules/game/action-types';
import LeaderboardActionTypes from '@/store/modules/leaderboard/action-types';
import { Cell, CellState, CellValue } from '@/store/modules/game/types';

interface GameState {
  gameStarted: boolean;
  secondsRemaining: number;
  intervalHandle: number;

  win: boolean;
  endOfGameDialogVisible: boolean;
}

export default Vue.extend({
  name: 'game',
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

      field: [],
      unrevealedCells: 0,
    };
  },
  computed: {
    ...mapState('game', ['score']),
    ...mapState('settings', ['currentGameMode']),
    endOfGameTitle() {
      return this.win ? 'Победа!' : 'Вы проиграли :(';
    },
    allCellsRevealed() {
      return this.unrevealedCells === this.currentGameMode.bombsNum;
    },
  },
  methods: {
    ...mapActions('game', {
      revealEmptyCell: GameActionTypes.OPEN_EMPTY_CELL,
      addScoreForBombs: GameActionTypes.ADD_POINTS_FOR_BOMBS,
      resetScore: GameActionTypes.RESET_SCORE,
    }),
    ...mapActions('leaderboard', {
      addResultToLeaderboard: LeaderboardActionTypes.ADD_RESULT,
    }),
    updateScore(cellValue: CellValue) {
      this.unrevealedCells -= 1;

      this.revealEmptyCell();

      if (this.allCellsRevealed) {
        this.addScoreForBombs();
        this.stopGame(true);
      }
    },
    newGame() {
      this.resetScore();

      this.endOfGameDialogVisible = false;

      this.secondsRemaining = this.currentGameMode.time;
      this.unrevealedCells = this.currentGameMode.fieldSize ** 2;

      this.generateField();
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

      this.addResultToLeaderboard(this.score);
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
    generateField() {
      const { fieldSize, bombsNum } = this.currentGameMode;

      const field = new Array(fieldSize).fill(0).map(() => new Array(fieldSize).fill(0).map(() => ({
        state: CellState.Closed,
        value: CellValue.Empty,
      }))) as Cell[][];

      let bombsRemaining = bombsNum;
      while (bombsRemaining > 0) {
        const x = Math.trunc(Math.random() * fieldSize);
        const y = Math.trunc(Math.random() * fieldSize);

        if (field[y][x].value === CellValue.Empty) {
          field[y][x].value = CellValue.Bomb;
          bombsRemaining -= 1;
        }
      }

      for (let y = 0; y < fieldSize; y += 1) {
        for (let x = 0; x < fieldSize; x += 1) {
          if (field[y][x].value === CellValue.Bomb) {
            // eslint-disable-next-line no-continue
            continue;
          }

          // for each cell calculate near bombs num
          let nearBombsNum = 0;
          for (let yInc = -1; yInc <= 1; yInc += 1) {
            for (let xInc = -1; xInc <= 1; xInc += 1) {
              // не выходим за границу
              if (x + xInc < 0 || x + xInc > fieldSize) {
                // eslint-disable-next-line no-continue
                continue;
              }

              if (y + yInc < 0 || y + yInc > fieldSize) {
                // eslint-disable-next-line no-continue
                continue;
              }

              if (field[y + yInc] && field[y + yInc][x + xInc]
                && field[y + yInc][x + xInc].value === CellValue.Bomb) {
                nearBombsNum += 1;
              }
            }
          }

          field[y][x].bombsNear = nearBombsNum;
        }
      }

      this.field = field;
    },
  },
  created() {
    this.newGame();
  },
});
</script>
