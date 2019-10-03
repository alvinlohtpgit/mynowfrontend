<template>
    <div>
        <v-app-bar color="indigo lighten-2">
            <v-toolbar-title class="white--text headline"><span class="font-weight-medium">MyNow</span><span class="font-weight-thin">.page</span></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn elevation="5">
                Get your own NOW page
            </v-btn>
        </v-app-bar>
    </div>
</template>

<script>
    export default {
        name: "Viewusernow",
        data: () => {
            return{
                subdomainhost: '',
                nowcontent:''
            }
        },
        mounted: function(){
            var self = this;
            // Parse the first parameter in the hostname
            // And it should not be mynow
            let currenthostname = window.location.hostname;
            let subdomain = currenthostname.substr(0 , currenthostname.indexOf('.'));
            self.subdomainhost = subdomain;

            // Load the nowcontent
            const baseURI = "http://localhost:3000/posts?author=" + subdomain;
            this.$http.get(baseURI)
                .then(function(response){

                }).catch(function(err){
                 console.log('Error ' + err);
            });
        }
    }
</script>

<style scoped>

</style>