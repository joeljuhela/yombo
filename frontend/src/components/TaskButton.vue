<script>
import CollaborateSVG from '@/assets/svgs/Collaborate.vue'

export default {
  name: 'TaskButton',
  props: ['category', 'x', 'y'],
  components: [
    CollaborateSVG,
  ],
  computed: {
    cssProps() {
      return {
        '--x': this.$props.x,
        '--y': this.$props.y,
      }
    }
  },
}
</script>

<style>
.task-button {
  position: absolute;
  background-color: red;
  border: none;
  border-radius: 100%;
  width: 3rem;
  height: 3rem;
  top: var(--y);
  left: var(--x);
}
</style>

<template>
  <div class="task-button" :style="cssProps">
    <CollaborateSVG />
  </div>
</template>
