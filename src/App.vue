<template>
  <layout>
    <router-view />
  </layout>
</template>

<script lang="ts">
import Vue from 'vue';
import Layout from '@/components/Layout.vue';

export default Vue.extend({
  components: {
    Layout,
  },
});
</script>
