<template>
    <div>
        <div class="btn-toolbar mb-3 mt-3" role="toolbar" aria-label="Toolbar with button groups">
            <div class="btn-group" role="group" aria-label="First group">
                <button type="button" @click="modeEditChange" :class="[catalogMode === constants.CATALOG_MODE_EDIT ? 'bg-primary text-white' : '', ' btn btn-outline-secondary p-1']"><i class="bi bi-pencil p-1"></i></button>
                <button type="button" @click="modeNewItemChange" :class="[catalogMode === constants.CATALOG_MODE_NEW_ITEM ? 'bg-primary text-white' : '', ' btn btn-outline-secondary p-1']"><i class="bi bi-plus-lg p-1"></i></button>
            </div>
        </div>
    </div>

    <!-- Addons -->
    <div class="modal fade" ref="newElementModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="newElementModalLabel">Создать новый элемент</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModal"></button>
            </div>
            <div class="modal-body">
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="newElementType" id="newElementTypeFolder" value="folder" v-model="new_element_type">
                    <label class="form-check-label" for="newElementTypeFolder">
                        Папку
                    </label>
                    </div>
                    <div class="form-check">
                    <input class="form-check-input" type="radio" name="newElementType" id="newElementTypeDoc" value="doc" v-model="new_element_type">
                    <label class="form-check-label" for="newElementTypeDoc">
                        Документ
                    </label>
                </div>
                <div>
                    <label for="NewElementName" class="form-label">Наименование нового элемента</label>
                    <input type="text" class="form-control" id="NewElementName" placeholder="наименование" v-model="new_element_name">
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="createNew">Создать</button>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
    import * as constants from '@/helpers/constants'
    import { Modal } from 'bootstrap'
    export default {
    data: () => ({
        modal: null,
        new_element_type: null,
        new_element_name: ''
    }),
    mounted() {
        this.modal = new Modal(this.$refs.newElementModal)
    },
    computed: {
        catalogMode() {
            return this.$store.getters["catalog/catalog_mode"];
        },
        constants(){
            return constants;
        },
        catalogFolder() {
            return this.$store.getters["catalog/catalog_folder"];
        },
    },
    methods: {
        modeEditChange(){
            if(this.catalogMode !== this.constants.CATALOG_MODE_EDIT){
                this.$store.commit("catalog/SET_CATALOG_MODE", this.constants.CATALOG_MODE_EDIT)
            } else {
                this.$store.commit("catalog/SET_CATALOG_MODE_DEFAULT")
            };
        },
        modeNewItemChange(){
            if(this.catalogMode !== this.constants.CATALOG_MODE_NEW_ITEM){
                this.$store.commit('catalog/SET_CATALOG_MODE', this.constants.CATALOG_MODE_NEW_ITEM);
                this.modal.show();
            } else {
                this.$store.commit("catalog/SET_CATALOG_MODE_DEFAULT")
            };
        },
        closeModal(){
            this.modal.hide();
            this.$store.commit("catalog/SET_CATALOG_MODE_DEFAULT");
            this.new_element_type = null;
            this.new_element_name = '';
        },
        createNew(){
            if(this.new_element_type === 'folder'){
                let data = {
                    name: this.new_element_name,
                    parent_id: this.catalogFolder.id
                }
                this.$store.dispatch("catalog/new_catalog_item", data)
            }
            if(this.new_element_type === 'doc'){
                let data = {
                    name: this.new_element_name,
                    catalog_id: this.catalogFolder.id
                }
                this.$store.dispatch("catalog/new_document_item", data)
            }
            this.closeModal();
        }
    }
}
</script>
