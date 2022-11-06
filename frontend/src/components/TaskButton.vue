<script>
export default {
  name: 'TaskButton',
  props: ['category', 'x', 'y'],
  components: [
  ],
  computed: {
    cssProps() {
      return {
        '--x': this.$props.x,
        '--y': this.$props.y,
      }
    }
  },
  data() {
    return {
      Collaborate: require(`../assets/svgs/Categories/${this.$props.category}.svg`)
    }
  }
}
</script>

<style>
.task-button {
  position: absolute;
  border: none;
  border-radius: 100%;
  width: 3rem;
  height: 3rem;
  top: var(--y);
  left: var(--x);
  transition: 0.5s;
}

.task-button:hover {
  transform: rotate(30deg);
  transition: 0.5s;
}
</style>

<template>
  <div class="task-button" :style="cssProps">
    <img :src="Collaborate" class="button-svg"/>
  </div>
</template>
