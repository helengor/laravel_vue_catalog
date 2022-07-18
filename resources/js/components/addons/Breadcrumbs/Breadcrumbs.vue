<template>
    <div>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb fs-4">
                <li class="breadcrumb-item"><router-link :to="{name: 'catalogs'}"><span>Каталог</span></router-link></li>
                <li class="breadcrumb-item" v-for="breadcrumb in breadcrumbs"><router-link :to="{name: 'catalog_folder', params: {catalogId: breadcrumb.id}}"><span>{{breadcrumb.name}}</span></router-link></li>
                <li class="breadcrumb-item text-dark" aria-current="page"><span>{{catalogName}}</span></li>
            </ol>
        </nav>
    </div>
</template>

<script>
    export default {
    props: {
        catalogName: { default: '' }
    },
    beforeRouteUpdate(to, from, next) {
        this.$store.dispatch("catalog/get_catalog_folder", to.params.catalogId);
        next();
    },
    computed: {
        breadcrumbs() {
            return this.$store.getters["breadcrumbs/breadcrumbs"];
        },
    }
}
</script>
