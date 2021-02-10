<template>
  <v-card min-width="400">
    <v-card-title>
      Результаты
    </v-card-title>

    <v-card-text>
      <v-simple-table
        v-if="topTen.length > 0"
        fixed-header
        height="450"
      >
        <thead>
        <tr>
          <th class="text-left">
            Место
          </th>
          <th class="text-left">
            Игрок
          </th>
          <th class="text-left">
            Счет
          </th>
        </tr>
        </thead>

        <tbody>
        <tr v-for="(res, i) in topTen" :key="i">
          <td>
            {{ i + 1 }}
          </td>
          <td>
            {{ res.user }}
          </td>
          <td>
            {{ res.score }}
          </td>
        </tr>
        </tbody>
      </v-simple-table>

      <div v-else>
        Тут пусто :(
      </div>
    </v-card-text>

    <v-card-actions>
      <v-row justify="center">
        <link-button
          label="Выход в меню"
          to="/"
        />
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';

import LinkButton from '@/components/LinkButton.vue';
import { mapGetters } from 'vuex';

export default Vue.extend({
  components: {
    LinkButton,
  },
  computed: mapGetters('leaderboard', ['topTen']),
});
</script>

<style scoped>

</style>
