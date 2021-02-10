<template>
  <v-col>
    <v-row v-for="(row, i) in field" :key="i" justify="center">
      <game-field-cell
        v-for="(cell, j) in row"
        :key="j"
        :cell="cell"
        @reveal="revealCell(i, j)"
        @mark-cell="markCell(i, j)"
      />
    </v-row>
  </v-col>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';

import { Cell, CellState, CellValue } from '@/store/modules/game/types';

import GameFieldCell from '@/components/GameFieldCell.vue';

export default Vue.extend({
  components: {
    GameFieldCell,
  },
  props: {
    field: {
      type: Array as PropType<Cell[][]>,
    },
  },
  methods: {
    revealCell(i: number, j: number) {
      Vue.set(this.field[i][j], 'state', CellState.Opened);
      // emit event to start game
      this.$emit('start-game');

      const cellValue = this.field[i][j].value;
      if (cellValue === CellValue.Bomb) {
        this.gameOver();
      } else {
        this.$emit('reveal-cell', cellValue);
      }
    },
    markCell(i: number, j: number) {
      let newState: CellState = CellState.Closed;
      if (this.field[i][j].state === CellState.Closed) {
        newState = CellState.Marked;
      } else if (this.field[i][j].state === CellState.Marked) {
        newState = CellState.Closed;
      }

      Vue.set(this.field[i][j], 'state', newState);
      // emit event to start game
      this.$emit('start-game');
    },
    gameOver() {
      this.$emit('game-over');
    },
  },
});
</script>

<style scoped>

</style>
