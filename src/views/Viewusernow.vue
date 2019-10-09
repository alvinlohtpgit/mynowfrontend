<template>
    <div>
        <v-app-bar color="indigo lighten-2">
            <v-toolbar-title class="white--text headline"><span class="font-weight-medium">MyNow</span><span class="font-weight-thin">.page</span></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn elevation="5">
                Get your own NOW page
            </v-btn>
        </v-app-bar>

        <v-container class="mt-10">
            <v-row>
                <v-col cols="8">
                    <v-card>
                        <v-card-text>
                            <div v-html="nowcontent"></div>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="4">
                    <div class="d-flex justify-center">
                        <v-avatar size="250">
                            <img src="https://www.gravatar.com/avatar/b42b3e2cee3310e3e3b61a5675057488?s=250" alt="avatar" />
                        </v-avatar>
                    </div>

                    <div class="d-flex justify-center mt-7">
                        <span class="display-1 deep-orange--text text--darken-4">Alvin Loh</span>
                    </div>

                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    export default {
        name: "Viewusernow",
        data: () => {
            return{
                subdomainhost: '',
                nowcontent:'',
                authorname: 'Alvin Loh'
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
            let pageQuery = db.collection('pages').where('pageprefix', '==' , subdomain).get()
                .then(function(querySnapshot){
                   querySnapshot.forEach(function(doc){
                     self.nowcontent = doc.data().content;
                   });
                });

        }
    }
</script>

<style scoped>

</style>