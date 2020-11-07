<template>
  <v-dialog
    :value="show"
    persistent
    max-width="300"
  >
    <v-card>
      <v-card-title class="headline">
        Вы проиграли :(
      </v-card-title>

      <v-card-text>
        <v-col>
          <v-row  justify="center" class="pa-2">
            <v-text-field
              :value="scoreString"
              readonly
              solo
              dense
            />
          </v-row>

          <v-btn
            @click="handleNewGameClicked"
            block
            color="primary"
          >
            Новая игра
          </v-btn>

          <link-button
            label="Таблица лидеров"
            to="/leaderboard"
          />

          <link-button
            label="В главное меню"
            to="/"
          />
        </v-col>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';

import LinkButton from '@/components/LinkButton.vue';

export default Vue.extend({
  components: {
    LinkButton,
  },
  props: {
    title: String,
    show: Boolean,
    score: Number,
  },
  computed: {
    scoreString() {
      return `Ваш счет: ${this.score}`;
    },
  },
  methods: {
    handleNewGameClicked() {
      this.$emit('new-game');
    },
  },
});
</script>

<style scoped>

</style>
