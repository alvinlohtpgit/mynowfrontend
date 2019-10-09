<template>
    <div>
        <Navbar/>

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
                            <img :src="gravatarimage" alt="Avatar" />
                        </v-avatar>
                    </div>

                    <div class="d-flex justify-center mt-7">
                        <span class="display-1 deep-orange--text text--darken-4">{{authorname}}</span>
                    </div>
                    <div class="d-flex justify-center mt-5">
                            <span class="body-2 font-italic">Last Updated : {{lastmodifiedtag}}</span>
                    </div>

                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    import {db} from '../firebase';
    import { firebase } from "@firebase/app";
    const gravatarUrl = require('gravatar-url');
    const moment = require('moment');
    import Navbar from '../components/Navbar';

    export default {
        name: "Viewusernow",
        components:{
            Navbar
        },
        data: () => {
            return{
                subdomainhost: '',
                nowcontent:'',
                authorname: 'Alvin Loh',
                gravatarimage: '',
                lastmodifiedtag: ''
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
                     self.authorname = doc.data().pageprefix;
                     self.gravatarimage = gravatarUrl(doc.data().author , {size:250});

                     let lastModifiedTimeStamp = doc.data().lastupdated.toDate();
                     self.lastmodifiedtag = moment(lastModifiedTimeStamp).fromNow();

                   });
                });

        }
    }
</script>

<style scoped>

</style>