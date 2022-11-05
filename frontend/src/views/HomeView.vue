<template>
  <div>
    This is the homeView
    {{ $route.params.id }}
    <div class="centered">
        <yomboSVG/>
    </div>
  </div>
</template>

<script>
import yomboSVG from '@/assets/svgs/yombo.vue'

export default {
    name: 'HomeView',
    components: {
        yomboSVG
    }
}
</script>

<style>
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