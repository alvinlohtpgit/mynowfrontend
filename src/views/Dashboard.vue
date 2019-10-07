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
                    Your Now Page is looking like ....
                </v-col>
            </v-row>

            <v-row>
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
                            <v-btn text color="light-blue darken-2" @click="updateUserContent">Save</v-btn>
                        </v-row>


                    </v-form>
                </v-col>
            </v-row>
        </v-container>

    </div>
</template>

<script>
    var md = require('markdown-it')({
        breaks: true
    }).enable('newline');

    export default {
        name: "Dashboard",
        data: () => {
            return{
                inEditMode: false,
                nowcontent: '',
                nowmarkdown: ''
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

                // We run the parser
                let renderedResult = md.render(this.nowmarkdown);
                // Save both the markdown raw content and the rendered content
                let saveObj = {};
                saveObj["author"] = "alvinloh";
                saveObj["content"] = renderedResult;
                saveObj['rawmarkdown'] = this.nowmarkdown;

                const baseURI = "http://localhost:3000/posts/1";
                this.$http.put(baseURI ,saveObj)
                    .then(function(response){
                        self.nowcontent = renderedResult
                        self.inEditMode = false;
                    }).catch(function(err){
                      console.log("Error : " + err);
                });
            },
        },
        mounted: function () {
            var self = this;
            // Run this when the thing loads up

            const baseURI = "http://localhost:3000/posts";
            this.$http.get(baseURI + '?author=alvinloh')
                .then(function(response){
                    self.nowcontent = response.data[0].content;
                    self.nowmarkdown = response.data[0].rawmarkdown;
                }).catch(function (err){
                    console.log("Error : " + err);
                });
        }
    }
</script>

<style scoped>

</style>