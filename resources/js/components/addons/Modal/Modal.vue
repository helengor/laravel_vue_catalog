<template>
    <div class="modal fade" ref="ModalWindow" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header align-top">
                    <h5 class="modal-title" id="ModalTitle">
                        <span v-html="modalObj.title"></span>
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModal" style="align-self:flex-start"></button>
                </div>
                <div class="modal-body">
                    <div v-html="modalObj.body"></div>
                </div>
                <div class="modal-footer">
                    <button v-if="modalObj.button_ok && modalObj.button_ok.show" type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="modalObj.button_ok.callback">
                        {{modalObj.button_ok.label}}
                    </button>
                    <button v-if="modalObj.button_cancel && modalObj.button_cancel.show" type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="modalObj.button_cancel.callback">
                         {{modalObj.button_cancel.label}}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { Modal } from 'bootstrap'

    export default {
    data: () => ({
        modal: null,
    }),
    mounted() {
        this.modal = new Modal(this.$refs.ModalWindow);
    },
    watch: {
        modalObj(newValue, oldValue)
        {
            if (newValue.show) {
                this.modal.show();
            }
        }
    },
    computed: {
        modalObj() {
            return this.$store.getters["modal/modal"];
        },
    },
    methods: {
        closeModal(){
            this.modal.hide();
            this.$store.dispatch("modal/hide", null);
        },
    },
}
</script>
