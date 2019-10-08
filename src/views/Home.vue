<template>
    <div>
        <v-app-bar color="indigo lighten-2">
            <v-toolbar-title class="white--text headline"><span class="font-weight-medium">MyNow</span><span class="font-weight-thin">.page</span></v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn outlined color="white" class="ml-4" @click="login">
                Login | Sign Up
            </v-btn>

        </v-app-bar>

    </div>
</template>

<script>
    export default {
        name: "Home",
        methods: {
            login: function(){
                this.$auth.loginWithRedirect();
            }
        },
        mounted: function(){
            console.log("Inside main");
            console.log("User Auth : " + this.$auth.isAuthenticated);
        }
    }
</script>

<style scoped>

</style>