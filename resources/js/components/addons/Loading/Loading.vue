<template>
    <div class="d-flex align-items-center position-fixed top-50 start-50 translate-middle text-primary" v-if="loading">
        <strong class="m-5">Загрузка . . .</strong>
        <div class="spinner-border ms-auto" role="status" aria-hidden="true"></div>
    </div>
</template>

<script>

    export default {
    computed: {
        loading() {
            return this.$store.getters["loading/loading"];
        },
    },
}
</script>
