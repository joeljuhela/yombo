<template>
  <div>
    <div class="upleft">
      <ComboSVG />
    </div>
    <TaskButton category="CONTACT" x="180px" y="60px" />
    <div class="centered">
      <yomboSVG/>
    </div>
    <TaskButton category="COLLABORATE" x="50px" y="620px" />
    <TaskButton category="CONSIDER" x="360px" y="590px" />
  </div>
</template>

<script>
import yomboSVG from '@/assets/svgs/yombo.vue'
import ComboSVG from '@/assets/svgs/combo.vue'
import TaskButton from '@/components/TaskButton.vue'

export default {
  name: 'HomeView',
  components: {
    yomboSVG,
    ComboSVG,
    TaskButton,
  }
}
</script>

<style>
    .upleft {
      text-align: left;
      padding:30px;
    }
    .centered {
        margin: 160px auto;
        animation-iteration-count: infinite;
        animation-name: updown;
        animation-duration: 3s;
        animation-timing-function: ease-in-out;
    }

    @keyframes updown {
        0% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(30px);
        }
        100% {
            transform: translateY(0);
        }

    }
</style>
