<template>
    <div class="base-layout">
        <div class="container base-layout-container">
            <router-view/>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'BaseLayout'
    }
</script>

<style lang="scss">
    .base-layout-container {
        background: #fff;
    }
</style>


