<template>
  <div>
    <h2>
      {{ this.stats ? `Your stats with ${this.stats.yomboNick}` : 'Loading stats...' }}
    </h2>
    <StatisticList v-if="this.stats" :stats=this.stats />
    <p>
      <button @click="allSubmisions">All completed tasks</button>
    </p>
    <button @click="goHome">back</button>
  </div>
</template>

<script>
import yomboService from '../services/yombo.js'
import StatisticList from '../components/StatisticList.vue'
export default {
  name: 'HomeView',
  components: {
    StatisticList,
  },
  methods: {
    goHome: function() {
      this.$router.push({name: 'home'})
    },
    allSubmisions: function() {
      this.$router.push({name: 'submissions'})
    }
  },
  data() {
    return {
      stats: null,
    }
  },
  async mounted() {
    const stats = await yomboService.getStatistics()
    this.stats = stats
  },
}
</script>

<style scoped>
  div {
    padding-top: 30px;
  }
</style>
