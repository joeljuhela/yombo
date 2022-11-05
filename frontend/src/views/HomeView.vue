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
    }
</style>