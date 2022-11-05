<template>
<div>
<p v-if="errors.length">
<b>Please correct the following error(s):</b>
<ul>
  <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
</ul>
</p>
<form @submit="register" method="post">
  <input v-model="form.username" placeholder="username" type="text"/>
  <input v-model="form.passwordInput1" placeholder="password" type="password">
  <input v-model="form.passwordInput2" placeholder="password (again)" type="password">
  <input type="submit" value="Register"/>
</form>
</div>
</template>

<script>
import userService from '@/services/users'

export default {
  name: 'RegisterView',
  data() {
    return {
      form: {
        username: '',
        passwordInput1: '',
        passwordInput2: ''
      },
      errors: []
    }
  },
  methods: {
    validatePassword: function () {
      if (this.passwordInput1 === this.passwordInput2) {
        return true
      } else {
        return false
      }
  },
  register: async function(e) {
      e.preventDefault()
      if (this.validatePassword()) {
        try {
          const res = await userService.register({
            yomboNick: this.form.username,
            password: this.form.passwordInput1
          })
          this.$router.push({ name:'home', params: {accessToken: res.accessToken } })
        } catch(error) {
          this.errors.push(error)
        }
      } else {
        this.errors.push('Passwords do not match!')
      }
    }
  }
}
</script>

<style>

</style>
