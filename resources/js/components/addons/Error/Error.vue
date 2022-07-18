<template></template>

<script>
    export default {
    watch: {
        errored(newValue, oldValue)
        {
            if (!_.isEmpty(newValue)) {
                this.$router.push({ name: 'home' })
                this.$store.dispatch(
                    "modal/show",
                    {title: newValue.title, body: newValue.message, show: true},
                    {root: true}
                );
            }
        }
    },
    computed: {
        errored() {
            return this.$store.getters["error/errored"];
        },
    },
    methods: {
        closeModal(){
            this.modal.hide();
        },
    },
}
</script>
