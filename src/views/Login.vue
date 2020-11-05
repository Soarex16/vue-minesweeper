<template>
  <v-sheet
    rounded
    elevation="1"
  >
    <v-form
      ref="loginForm"
      lazy-validation
      v-model="valid"
      @submit.prevent="submitLogin"
    >
      <v-container>
        <v-text-field
          v-model="login"
          :rules="loginValidationRules"
          label="Логин"
          append-icon="mdi-close"
          @click:append="resetLogin"
          required
        >

        </v-text-field>

        <v-btn
          block
          color="primary"
          type="submit"
          @click="submitLogin"
          :disabled="!valid"
        >
          Войти
        </v-btn>
      </v-container>
    </v-form>
  </v-sheet>
</template>

<script lang="ts">
import Vue from 'vue';
import RootActionTypes from '@/store/action-types';

export default Vue.extend({
  data() {
    return {
      valid: false,
      login: '',
      loginValidationRules: [
        (val: string) => !!val || 'Укажите логин',
      ],
    };
  },
  methods: {
    resetLogin() {
      this.login = '';
    },
    submitLogin() {
      // привести к VForm не получится, потому что он является экземпляром Vue
      (this.$refs.loginForm as Vue & { validate: () => boolean }).validate();

      if (!this.valid) {
        return;
      }

      this.$store.dispatch(RootActionTypes.LOGIN, this.login);

      const redirectFrom = this.$route.redirectedFrom || '/';
      this.$router.push(redirectFrom);
    },
  },
});
</script>

<style scoped>

</style>
