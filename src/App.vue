<template>
    <div id="app">
        <el-alert
            v-show="isAlertFlag"
            title="下单成功"
            type="success"
            center
            show-icon
            @close="closeAlert">
        </el-alert>
        <div class="app-main">
            <HelloWorld />
        </div>
    </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
    name: 'app',
    components: {
        HelloWorld
    },
    computed: {
        isAlertFlag(){
            return this.$store.state.isAlertFlag
        }
    },
    methods: {
        closeAlert(){
            this.$store.dispatch('changeAlertFlag',false)
        }
    }
}
</script>

<style lang="scss">
    @import "@/assets/common.scss";
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }
</style>
