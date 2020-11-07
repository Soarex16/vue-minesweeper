<template>
  <v-col>
    <v-row v-for="(row, i) in field" :key="i" justify="center">
      <game-field-cell
        v-for="(cell, j) in row"
        :key="j"
        :value="cell"
        @click="handleCellClick(i, j)"
      />
    </v-row>
  </v-col>
</template>

<script lang="ts">
import Vue from 'vue';

import { CellValue } from '@/store/modules/game/types';

import GameFieldCell from '@/components/GameFieldCell.vue';

// TODO: переделать нормально, на данный момент - это набросок
function generateField(fieldSize: number, bombsNum: number): CellValue[][] {
  const field = new Array<CellValue[]>(fieldSize);

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < fieldSize; i++) {
    field[i] = new Array(fieldSize);
    // eslint-disable-next-line no-plusplus
    for (let j = 0; j < fieldSize; j++) {
      field[i][j] = CellValue.Empty;
    }
  }

  let bombsRemaining = bombsNum;
  while (bombsRemaining > 0) {
    const x = Math.trunc(Math.random() * fieldSize);
    const y = Math.trunc(Math.random() * fieldSize);

    if (field[y][x] === CellValue.Empty) {
      field[y][x] = CellValue.Bomb;
      // eslint-disable-next-line no-plusplus
      bombsRemaining--;
    }

    console.log(x, y, bombsRemaining);
  }

  return field;
}

export default Vue.extend({
  components: {
    GameFieldCell,
  },
  props: {
    size: {
      type: Number,
      validator(value) {
        return value > 0;
      },
      default: 40,
    },
  },
  data() {
    return {
      field: generateField(10, 1),
    };
  },
  methods: {
    handleCellClick(i: number, j: number) {
      Vue.set(this.field[i], j, CellValue.Opened);
      this.$emit('click');
    },
  },
});
</script>

<style scoped>

</style>
