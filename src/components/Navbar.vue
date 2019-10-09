<template>
    <v-app-bar color="indigo lighten-2">
        <v-toolbar-title class="white--text headline"><span class="font-weight-medium">MyNow</span><span class="font-weight-thin">.page</span></v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn elevation="5" v-if="navbarstatus==='nowpage'" @click="login">
            Get your own NOW page
        </v-btn>

        <div v-else-if="navbarstatus==='authenticated'">
            <v-avatar>
                <img :src="getimageurl" alt="avatar" />
            </v-avatar>
            <span class="ml-3 white--text">{{ $auth.user.name }}</span>

            <v-btn outlined color="white" class="ml-4" @click="logout">
                <v-icon left>mdi-exit-to-app</v-icon>Logout
            </v-btn>
        </div>


        <v-btn outlined color="white" class="ml-4" @click="login"  v-else>
            Login | Sign Up
        </v-btn>

    </v-app-bar>
</template>

<script>
    const gravatarUrl = require('gravatar-url');

    export default {
        name: "Navbar",
        methods: {
            logout: function(){
                this.$auth.logout();
                this.$router.push("home");
            },
            login: function(){
                this.$auth.loginWithRedirect();
            }
        },
        computed: {
            getimageurl: function(){
                const gravatarimage = gravatarUrl(this.$auth.user.name , {size:80});
                return gravatarimage;
            },
            navbarstatus: function(){
                if (window.location.pathname === '/now'){
                    return 'nowpage';
                }
                else{
                    if ((this.$auth) && (this.$auth.isAuthenticated===true)){
                        return 'authenticated';
                    }
                    else{
                        return 'nonauthenticated';
                    }
                }
            }
        }
    }
</script>

<style scoped>
</style>