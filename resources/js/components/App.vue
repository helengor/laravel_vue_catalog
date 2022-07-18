<template>
<div class="container">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <router-link :to="{name: 'home'}" class="nav-link">Home</router-link>
                </li>
                <li class="nav-item" v-if="LoggedIn">
                    <router-link :to="{name: 'catalogs'}" class="nav-link">Каталог</router-link>
                </li>
            </ul>
            <div class="d-flex">
                <UserComponent></UserComponent>
            </div>
        </div>
    </div>
    </nav>
    <div>
        <ErrorComponent></ErrorComponent>
        <LoadingComponent></LoadingComponent>
        <ModalComponent></ModalComponent>
        <router-view></router-view>
    </div>
</div>

</template>

<script>
import UserComponent from "@/components/auth/User.vue";
import ErrorComponent from "@/components/addons/Error/Error.vue";
import LoadingComponent from "@/components/addons/Loading/Loading.vue";
import ModalComponent from "@/components/addons/Modal/Modal.vue";

export default {
    mounted() {
        this.$store.dispatch("auth/protection");
    },
    computed: {
        User() {
            return this.$store.getters["auth/getUser"];
        },
        LoggedIn() {
            return this.$store.getters["auth/loggedIn"];
        },
    },
    components: { UserComponent,  ErrorComponent,  LoadingComponent, ModalComponent}
}
</script>
