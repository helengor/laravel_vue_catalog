<template>
<div>
    <div class="container border-bottom">
        <h3>Каталог</h3>
        <div class="row border-top pt-2" v-for="catalog in catalogRoot">
            <div class="col-md-1 col-lg-1">
                <i class="bi bi-folder2" style="font-size: 1.5rem;"></i>
            </div>
            <div class="col-md-1 col-lg-1">
                <span>{{catalog.id}}</span>
            </div>
            <div class="col-md-3 col-lg-3">
                <router-link :to="{name: 'catalog_folder', params: {catalogId: catalog.id}}"><span>{{catalog.name}}</span></router-link>
            </div>
            <div class="col-md-2 col-lg-2">
                <span>{{catalog.created}}</span>
            </div>
            <div class="col-md-2 col-lg-2">
                <span>{{catalog.updated}}</span>
            </div>
            <div class="col-md-3 col-lg-3">
                <span v-if="catalog.user">{{catalog.user.name}}</span>
            </div>
        </div>
    </div>
</div>
</template>

<script>
    export default {
        mounted(){
            this.$store.dispatch('catalog/get_catalog_root');
        },
        computed: {
            catalogRoot() {
                return this.$store.getters["catalog/catalog_root"];
            },
        }
    }
</script>
