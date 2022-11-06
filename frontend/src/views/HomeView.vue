<template>
  <div>
    <div class="upleft">
      <ComboSVG @click="openStats"/>
      <p styles="font-weight: bold">{{ yomboCombo }}</p>
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
import yomboService from '@/services/yombo'
import yomboSVG from '@/assets/svgs/yombo.vue'
import ComboSVG from '@/assets/svgs/combo.vue'
import TaskButton from '@/components/TaskButton.vue'


export default {
  name: 'HomeView',
  components: {
    yomboSVG,
    ComboSVG,
    TaskButton,
  },
  data() {
    return {
      yomboCombo: null
    }
  },
  async mounted() {
    const statistics = await yomboService.getStatistics()
    this.yomboCombo = statistics.yombocombo
  },
  methods: {
    openStats: function () {
      this.$router.push({name: 'stats'})
    }
  }
}
</script>

<style>
    .upleft {
      display: flex;
      text-align: left;
      padding: 30px;
      align-items: center;
      align-content: center;
    }
    .centered {
        margin: 110px auto;
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
