<template>
    <div>
        <v-app-bar color="indigo lighten-2">
            <v-toolbar-title class="white--text headline"><span class="font-weight-medium">MyNow</span><span class="font-weight-thin">.page</span></v-toolbar-title>

            <v-spacer></v-spacer>

            <v-avatar>
                <img src="https://www.gravatar.com/avatar/b42b3e2cee3310e3e3b61a5675057488?s=80" alt="avatar" />
            </v-avatar>
            <span class="ml-3 white--text">{{ $auth.user.name }}</span>

            <v-btn outlined color="white" class="ml-4" @click="logout">
                <v-icon left>mdi-exit-to-app</v-icon>Logout
            </v-btn>

        </v-app-bar>

        <v-container v-if="inEditMode === false">
             <v-row>
                <v-col cols="12" class="headline blue-grey--text text--darken-2">
                    <div v-if="nowcontent===''" class="text-center mt-8">
                        Your Now page is empty.
                        <br />
                        <v-btn text color="light-blue darken-2" @click="toggleEditMode">EDIT MY NOW PAGE</v-btn>
                    </div>
                    <span v-else>
                        Your Now Page is looking like ....
                    </span>
                </v-col>
            </v-row>

            <v-row  v-if="nowcontent!=''">
                <v-col cols="9" class="mx-auto">
                    <v-card outlined>
                        <v-card-text class="blue-grey--text text--darken-3 subtitle-1">
                            <div v-html="nowcontent">
                            </div>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn text color="light-blue darken-2" @click="toggleEditMode">EDIT MY NOW PAGE</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>

        </v-container>

        <!-- Show the edit screen-->
        <v-container v-else>
            <v-row>
                <v-col cols="12" class="headline blue-grey--text text--darken-2">
                    What are you doing now ...
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="9" class="mx-auto">
                    <v-form>
                        <v-textarea filled name="nowcontent" rows="30"  rounded label="Enter your Now Content" :value="nowmarkdown" v-model="nowmarkdown"></v-textarea>

                        <v-row no-gutters class="d-flex align-end flex-column">
                            <v-progress-circular v-if="isSaving===true"
                                                 indeterminate
                                                 color="success"
                                                 size="25"
                            ></v-progress-circular>
                            <v-btn text color="light-blue darken-2" @click="updateUserContent" :disabled="isSaving===true">Save</v-btn>
                        </v-row>


                    </v-form>
                </v-col>
            </v-row>
        </v-container>

    </div>
</template>

<script>
    import {db} from '../firebase';
    import { firebase } from "@firebase/app";

    var md = require('markdown-it')({
        breaks: true
    }).enable('newline');

    export default {
        name: "Dashboard",
        data: () => {
            return{
                inEditMode: false,
                nowcontent: '',
                nowmarkdown: '',
                loadeddocid: '',
                isSaving: false
            }
        },
        methods: {
            logout:function() {
                this.$auth.logout();
                this.$router.push('home');
            },
            toggleEditMode: function(){
                this.inEditMode = !this.inEditMode;
            },
            updateUserContent: function(){
                var self = this;
                this.isSaving===true
                // We run the parser
                let renderedResult = md.render(this.nowmarkdown);
                // Save both the markdown raw content and the rendered content
                db.collection('pages').doc(this.loadeddocid).update({
                    content: renderedResult,
                    rawmarkdown: this.nowmarkdown,
                    lastupdated: firebase.firestore.Timestamp.fromDate(new Date())
                }).then(function(response){
                    self.nowcontent = renderedResult;
                    self.inEditMode = false;
                    self.isSaving = false;
                });
            },
        },
        mounted: function () {
            var self = this;
            // Run this when the thing loads up
            let loadPageContentQuery = db.collection('pages').where('author','==',this.$auth.user.name).get()
                .then(function(querySnapshot){
                    // We only have 1 result
                    querySnapshot.forEach(function(doc){
                        self.nowcontent = doc.data().content;
                        self.nowmarkdown = doc.data().rawmarkdown;
                        self.loadeddocid = doc.id;
                    });
                });

        }
    }
</script>

<style scoped>

</style>