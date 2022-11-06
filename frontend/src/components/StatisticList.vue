<script>
export default {
  name: 'TaskButton',
  props: ['stats'],
  components: [
  ],
}
</script>

<style>
#stat-list {
  display: grid;
  grid-template-columns: 2fr 1fr;
}
</style>

<template>
  <div id="stat-list">
    <strong>YOMBOCOMBO</strong>
    <span>{{ stats.yombocombo }} days <em v-if=stats.comboAtRisk>(at risk!)</em></span>

    <strong>Total tasks completed</strong>
    <span>{{ stats.numberOfSucceededTasks }}</span>

    <strong>Contact tasks done</strong>
    <span>{{ stats.succeededTasksByCategory.CONTACT }}</span>
    <strong>Collaborate tasks done</strong>
    <span>{{ stats.succeededTasksByCategory.COLLABORATE }}</span>
    <strong>Consider tasks done</strong>
    <span>{{ stats.succeededTasksByCategory.CONSIDER }}</span>

    <strong>Words typed in answers</strong>
    <span>{{ stats.numberOfAnswerWords }}</span>

    <strong>Task completion ratio</strong>
    <span>{{ stats.percentSucceeded }}%</span>
  </div>
</template>
