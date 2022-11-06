<template>
  <div class="frame">
    <div>
      <h3>{{ task.description }}</h3>
      <p>{{ task.beforeText }}</p>
      <form action="post" @submit="submitTask">
        <textarea required v-model="answer" cols="30" rows="10" placeholder="how did this task make you feel?"></textarea>
        <input type="submit" value="Complete Task" style="margin-top: 10px;">
      </form>
    </div>
    <form action="post" @submit="easierTask">
      <input type="submit" value="This is too difficult for me right now">
    </form>
    <div>
      <button @click="backHome">
        Back
      </button>
    </div>
  </div>
</template>

<script>
import taskService from '@/services/tasks'

export default {
  name: 'TaskView',
  data() {
    return {
      task: Object,
      answer: '',
      category: ''
    }
  },
  async mounted() {
    this.category = this.$route.params.category
    const task = await taskService.getDailyTask(this.category)
    this.task = task
  },
  methods: {
    easierTask: async function (e) {
      e.preventDefault()
      const task = await taskService.getDailyTask(this.category, this.task.points)
      if (!task) {
        this.task= {
          description: 'No easier task available :(',
          beforeText: 'Maybe checkout a different category'
        }
      } else {
        this.task = task
      }
    },
    submitTask: async function (e) {
      e.preventDefault()
      const res = await taskService.createSubmission(
        this.task.id,
        true,
        this.answer
      )
      if (res.createdAt) {
        this.$router.push({name: 'home'})
      } else {
        console.log('did not work')
      }
    },
    backHome: function() {
      this.$router.push({name: 'home'})
    }
  }
}
</script>

<style>
  .frame {
    margin: 20px;
  }
</style>