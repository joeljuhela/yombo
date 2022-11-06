<template>
  <div>
    <h2>Your social muscle exercise log</h2>
    <button @click="goBack">back</button>
    <div v-if="submissions">
      <div class="submission-card" v-for="submission in submissions" :key="submission.id">
        <h3>{{ submission.Task.beforeText }}</h3>
        <div class="submission-table">
          <strong>Category</strong>
          <span>{{ submission.Task.category.toLowerCase() }}</span>
          <strong>Status</strong>
          <span>{{ submission.succeeded ? 'completed' : 'gave up' }}</span>
          <strong>Time</strong>
          <span>{{ (new Date(submission.createdAt)).toLocaleString() }}</span>
          <strong>Points</strong>
          <span>{{ submission.Task.points }} <span v-if="!submission.succeeded">(0 points awarded)</span></span>
          <strong>Your answer</strong>
          <span>{{ submission.answerText }}</span>
          <strong>Tip</strong>
          <span>{{ submission.Task.tips }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import yomboService from '../services/yombo.js'
export default {
  name: 'HomeView',
  components: {
  },
  methods: {
    goBack: function () {
      this.$router.push({name: 'stats'})
    }
  },
  data() {
    return {
      submissions: null,
    }
  },
  async mounted() {
    this.submissions = await yomboService.getSubmissions()
  },
}
</script>

<style>
.submission-card {
  text-align: left;
  border-radius: 0.8rem;
  background-color: #FFFFFF55;
  padding: 1rem 2rem;
  margin: 1rem auto;
  max-width: 95%;
}
.submission-card h3 {
  text-align: center;
}
.submission-table {
  display: grid;
  grid-template-columns: 1fr 2fr;
}
</style>
