<template>
  <div>
    <div class="upleft">
      <ComboSVG @click="openStats"/>
      <p styles="font-weight: bold">{{ displayNumber }}</p>
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
  },
  data() {
    return {
      displayNumber: 0,
      interval: false
    }
  },
  ready () {
    this.displayNumber = this.number ? this.number : 0;
  },
  watch: {
    number () {
      clearInterval(this.interval);

      if(this.number == this.displayNumber) {
        return;
      }

      this.interval = window.setInterval(() => {
        if(this.displayNumber != this.number) {
          var change = (this.number - this.displayNumber) / 10;
          change = change >= 0 ? Math.ceil(change) : Math.floor(change);
          this.displayNumber = this.displayNumber + change;
        }
      }, 20);
    }
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
