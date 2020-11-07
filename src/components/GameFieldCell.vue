<template>
  <v-btn
    dark
    tile
    icon
    outlined
    elevation="1"
    :color="color"
    x-small
    @click="handleCellClick"
  >
    <v-icon dark>
      {{ icon }}
    </v-icon>
  </v-btn>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { CellValue } from '@/store/modules/game/types';

export default Vue.extend({
  props: {
    value: {
      type: Number as PropType<CellValue>,
    },
  },
  data() {
    return {
      opened: true,
    };
  },
  computed: {
    icon() {
      if (this.value === 42) {
        return 'mdi-hexagon-outline';
      }

      if (this.opened) {
        return this.value === CellValue.Bomb ? 'mdi-bomb' : '';
      }

      return '';
    },
    color() {
      if (this.opened) {
        return this.value === CellValue.Bomb ? 'error' : 'secondary';
      }

      return 'white';
    },
  },
  methods: {
    handleCellClick() {
      this.$emit('click');
    },
  },
});
</script>

<style scoped>

</style>
