<template>
<div>
        <Toolbar></Toolbar>
        <Breadcrumbs :catalogName="catalogFolder.name"></Breadcrumbs>
    <div class="container border-bottom catalog-table-view">
        <div class="row border-top pt-2" v-for="(catalog, index) in catalogFolder.childs" :key="catalog.id">
            <div class="col-md-1 col-lg-1">
                <i class="bi bi-folder2" style="font-size: 1.5rem;"></i>
            </div>
            <div class="col-md-1 col-lg-1">
                <span>{{catalog.id}}</span>
            </div>
            <div class="col-md-3 col-lg-3">
                <router-link v-if="catalogMode !== constants.CATALOG_MODE_EDIT" :to="{name: 'catalog_folder', params: {catalogId: catalog.id}}"><span class="col-name">{{catalog.name}}</span></router-link>
                <span v-else><input type="text" @blur="childItemChange({id: catalog.id, num: index, name: $event.target.value})" :value="catalog.name" class="form-control"></span>
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
        <div class="row border-top pt-2" v-for="(document, index) in catalogFolder.documents" :key="document.id">
            <div class="col-md-1 col-lg-1">
                <i class="bi bi-file-earmark-text" style="font-size: 1.5rem;"></i>
            </div>
            <div class="col-md-1 col-lg-1">
                <span>{{document.id}}</span>
            </div>
            <div class="col-md-3 col-lg-3">
                <span v-if="catalogMode !== constants.CATALOG_MODE_EDIT" class="col-name">{{document.name}}</span>
                <span v-else><input type="text" @blur="docItemChange({id: document.id, num: index, name: $event.target.value})" :value="document.name" class="form-control"></span>
            </div>
            <div class="col-md-2 col-lg-2">
                <span>{{document.created}}</span>
            </div>
            <div class="col-md-2 col-lg-2">
                <span>{{document.updated}}</span>
            </div>
            <div class="col-md-3 col-lg-3">
                <span v-if="document.user">{{document.user.name}}</span>
            </div>
        </div>
    </div>
</div>
</template>

<script>
    import Breadcrumbs from "@/components/addons/Breadcrumbs/Breadcrumbs.vue";
    import Toolbar from "@/components/catalogs/Toolbar.vue";
    import * as constants from '@/helpers/constants'

    export default {
    props: {
        catalogId: { default: 0 }
    },
    mounted() {
        this.$store.dispatch("catalog/get_catalog_folder", this.catalogId);
        Echo.channel('folder_сhange')
            .listen('FolderChange', (e) => {
                if(e.type && e.catalog){
                    switch(e.type){
                        case 'update':
                            this.$store.commit('catalog/SET_CATALOG_FOLDER_CHILD', e.catalog, { root: true });
                            break;
                        case 'store':
                            this.$store.commit('catalog/ADD_CATALOG_FOLDER_CHILD', e.catalog, { root: true });
                            break;
                    }
                }
            });
    },
    beforeRouteUpdate(to, from, next) {
        this.$store.dispatch("catalog/get_catalog_folder", to.params.catalogId);
        next();
    },
    computed: {
        catalogFolder() {
            return this.$store.getters["catalog/catalog_folder"];
        },
        catalogMode() {
            return this.$store.getters["catalog/catalog_mode"];
        },
        constants(){
            return constants;
        },
    },
    methods: {
        childItemChange(data){
            this.$store.dispatch("catalog/edit_catalog_name", data);
        },
        docItemChange(data){
            this.$store.dispatch("catalog/edit_doc_name", data);
        },
    },
    components: { Breadcrumbs, Toolbar }
}
</script>
