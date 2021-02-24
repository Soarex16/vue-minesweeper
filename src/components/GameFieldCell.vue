<template>
  <v-btn
    dark
    tile
    icon
    outlined
    elevation="1"
    :color="color"
    x-small
    @click="revealCell"
  >
    <v-icon dark v-if="showIcon">
      {{ icon }}
    </v-icon>
    <span v-else-if="opened">
      {{ cell.bombsNear }}
    </span>
  </v-btn>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';

import { Cell, CellState, CellValue } from '@/store/modules/game/types';

export default Vue.extend({
  props: {
    cell: {
      type: Object as PropType<Cell>,
    },
  },
  computed: {
    opened() {
      return this.cell.state === CellState.Opened;
    },
    // показывать иконку бомбы или число бомб рядом
    showIcon() {
      // если бомба и ячейка открыта
      return (this.cell?.value === CellValue.Bomb && this.cell.state === CellState.Opened)
      // или рядом нет бомб (чтобы отображать пустую ячейку)
      || this.cell?.bombsNear === 0;
    },
    icon() {
      switch (this.cell.state) {
        case CellState.Closed:
          return '';
        case CellState.Opened:
          return this.cell.value === CellValue.Bomb ? 'mdi-bomb' : '';
        default:
          return '';
      }
    },
    color() {
      if (this.opened) {
        return this.cell.value === CellValue.Bomb ? 'error' : 'secondary';
      }

      return 'gray';
    },
  },
  methods: {
    revealCell() {
      if (this.cell.state === CellState.Opened) {
        return;
      }
      this.$emit('reveal');
    },
  },
});
</script>
