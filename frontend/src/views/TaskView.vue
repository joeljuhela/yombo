<template>
  <div>
    <div>
      <h3>{{ task.description }}</h3>
      <p>{{ task.beforeText }}</p>
      <form action="post" @submit="submitTask">
        <textarea required v-model="answer" cols="30" rows="10" placeholder="how did this task make you feel?"></textarea>
        <input type="submit" value="Complete Task">
      </form>
    </div>
    <button @click="showModal = true">This is too difficult</button>
    <div class="modal" v-if="showModal">
      <h2>Do you want a lighter task?</h2>
      <form action="post" @submit="easierTask">
        <input type="submit" value="Yes please">
      </form>
      <button @click="showModal = false">Cancel</button>
    </div>
  </div>
</template>

<script>
import taskService from '@/services/tasks'

export default {
  name: 'TaskView',
  data() {
    return {
      showModal: false,
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
      this.task = task
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
    }
  }
}
</script>

<style>

</style>