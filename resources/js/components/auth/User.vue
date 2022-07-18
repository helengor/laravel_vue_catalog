<template>
    <div v-if="LoggedIn" class="dropdown">
        <span class="dropdown-toggle" id="dropdownUserMenu" data-bs-toggle="dropdown" aria-expanded="false" role="button">{{User.name}}</span>
        <ul class="dropdown-menu" aria-labelledby="dropdownUserMenu">
            <li><span class="dropdown-item" @click="userLogout" role="button">Выйти</span></li>
        </ul>
    </div>
    <div v-else>
        <span @click="login" class="p-1" title="Войти" style="cursor:pointer;font-size: 1.5rem;"><i class="bi bi-person-fill"></i></span>
        <span @click="register" class="p-1" title="Зарегистрироваться" style="cursor:pointer;font-size: 1.5rem;"><i class="bi bi-person-plus-fill"></i></span>
    </div>

    <div class="modal fade" ref="userLoginModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
            <div class="modal-header align-top">
                <h5 class="modal-title" id="userLoginModalLabel">
                    Введите логин и пароль. <br>
                    Если вы еще не зарегистрированы, то воспользуйтесь кнопкой "Зарегистрироваться"
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModalLogin" style="align-self:flex-start"></button>
            </div>
            <div class="modal-body">

                <div>
                    <label for="NewElementName" class="form-label">Логин</label>
                    <input type="text" class="form-control" id="userLoginInput" placeholder="Логин" v-model="user_form.login">
                </div>
                <div>
                    <label for="NewElementName" class="form-label">Пароль</label>
                    <input type="password" class="form-control" id="userPasswordInput" placeholder="***" v-model="user_form.password">
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="userLogin">Войти</button>
            </div>
            </div>
        </div>
    </div>

    <div class="modal fade" ref="userRegisterModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
            <div class="modal-header align-top">
                <h5 class="modal-title" id="userRegisterModalLabel">
                    Регистрация <br>
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModalLogin" style="align-self:flex-start"></button>
            </div>
            <div class="modal-body">
                <div>
                    <label for="userRegisterNameInput" class="form-label">Имя</label>
                    <input type="text" class="form-control" id="userRegisterNameInput" placeholder="Имя" v-model="user_form.reg_name">
                </div>
                <div>
                    <label for="userRegisterLoginInput" class="form-label">Логин</label>
                    <input type="text" class="form-control" id="userRegisterLoginInput" placeholder="Логин" v-model="user_form.reg_login">
                </div>
                <div>
                    <label for="userRegisterPasswordInput" class="form-label">Пароль</label>
                    <input type="password" class="form-control" id="userRegisterPasswordInput" placeholder="***" v-model="user_form.reg_password">
                </div>
                <div>
                    <label for="userRegisterPasswordRepeatInput" class="form-label">Повторите пароль</label>
                    <input type="password" class="form-control" id="userRegisterPasswordRepeatInput" placeholder="***" v-model="user_form.reg_repeat_password">
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="userRegister">Зарегистрироваться</button>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Modal } from 'bootstrap'
const user_form_default = {
                login:               '',
                password:            '',
                reg_name:            '',
                reg_login:           '',
                reg_password:        '',
                reg_repeat_password: ''
            };
export default {
    data: () => ({
        modals: {login: null, register: null},
        user_form: {...user_form_default},
    }),
    mounted() {
        this.modals.login = new Modal(this.$refs.userLoginModal);
        this.modals.register = new Modal(this.$refs.userRegisterModal);
    },
    computed: {
        User() {
            return this.$store.getters["auth/getUser"];
        },
        LoggedIn() {
            return this.$store.getters["auth/loggedIn"];
        },
    },
    methods: {
        closeModalLogin(){
            this.modals.login.hide();
            this.user_form = {...user_form_default};
        },

        closeModalRegister(){
            this.modals.register.hide();
            this.user_form = {...user_form_default};
        },
        userLogin(){
            this.$store.dispatch("auth/login", {email: this.user_form.login, password: this.user_form.password});
            this.closeModalLogin();
        },
        userLogout(){
            this.$store.dispatch("auth/logout");
        },
        userRegister(){
            this.$store.dispatch("auth/registration", {email: this.user_form.reg_login, password: this.user_form.reg_password, name: this.user_form.reg_name, password_confirmation: this.user_form.reg_repeat_password});
            this.closeModalRegister();
        },
        login(){
            this.modals.login.show();
        },
        register(){
            this.modals.register.show();
        },
    },
}
</script>
