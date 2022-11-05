<template>
  <div>
    <p v-if="errors.length">
    <b>Please correct the following error(s):</b>
    <ul>
      <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
    </ul>
    </p>
    <h1>{{ this.yomboNick }} is missing you! Please login</h1>
    <form action="post" @submit="login">
      <input type="password" v-model="password">
      <input type="submit" value="Login">
    </form>
  </div>
</template>

<script>
import userService from '@/services/users'
import { mapMutations } from 'vuex'

export default {
  name: 'LoginView',
  data() {
    return {
      yomboNick: '',
      password: '', 
      accessToken: '',
      errors: []
    }
  },
  methods: {
    ...mapMutations(["setUser", "setToken"]),
    login: async function(e) {
      e.preventDefault()
      console.log(this.accessToken)
      console.log('test')
      try {
        const authToken = await userService.login({ accessToken: this.accessToken, password: this.password})
        if (authToken) {
          this.setUser({ username: this.yomboNick, accessToken: this.accessToken })
          this.setToken(authToken)
          this.$router.push({name:'home'})
        } else {
          this.errors.push('invalid password')
        }
      } catch(err) {
        console.log(err)
      }
    }
  },
  async mounted() {
    this.accessToken = this.$route.params.accessToken
    const yomboNick = await userService.getYomboNick(this.accessToken)
    this.yomboNick = yomboNick
    console.log(this)
  }
}
</script>

<style>

</style>