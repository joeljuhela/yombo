<template>
  <div>
    <h1>YOMBO</h1>
    <p>
    <i>Exercise Your Social Muscle</i>
    </p>

    <h2>Create your own YOMBO</h2>
    <div>
    <p v-if="errors.length">
    <b>Please correct the following error(s):</b>
    <ul>
      <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
    </ul>
    </p>
    <form @submit="register" method="post">
      <input v-model="form.username" placeholder="nickname" type="text"/>
      <input v-model="form.passwordInput1" placeholder="password" type="password">
      <input v-model="form.passwordInput2" placeholder="password (again)" type="password">
      <input type="submit" value="Register"/>
    </form>
    </div>
    <h2>Already have a YOMBO?</h2>
    <p>
    To keep your YOMBO safe, each of them is protected by both a password and a secret access token that's impossible to guess by outsiders.
    When you save your YOMBO to a bookmark, it's best to save your YOMBO's home address to a bookmark, so you can always easily find your way back.
    </p>
    <p>
    TIP: if you forgot to save your YOMBO to a bookmark, use your browser's history to find the correct address.
    And this time, be sure to bookmark!
    </p>
  </div>
</template>

<script>
import userService from '@/services/users'
import { mapMutations } from 'vuex'

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
    ...mapMutations(["setUser", "setToken"]),
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
          console.log(res.yomboNick, res.accessToken, res.authToken)
          this.setUser({ username: res.yomboNick, accessToken: res.accessToken })
          this.setToken(res.authToken)
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
