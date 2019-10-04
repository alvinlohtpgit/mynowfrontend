<template>
    <div>
        <v-app-bar color="indigo lighten-2">
            <v-toolbar-title class="white--text headline"><span class="font-weight-medium">MyNow</span><span class="font-weight-thin">.page</span></v-toolbar-title>

            <v-spacer></v-spacer>

            <v-avatar>
                <img src="https://www.gravatar.com/avatar/b42b3e2cee3310e3e3b61a5675057488?s=80" alt="avatar" />
            </v-avatar>
            <span class="ml-3 white--text">Alvin Loh</span>

            <v-btn outlined color="white" class="ml-4">
                <v-icon left>mdi-exit-to-app</v-icon>Logout
            </v-btn>

        </v-app-bar>

        <v-container>
            <v-row>
                <v-col cols="8" class="d-flex justify-center mx-auto">
                    <v-card class="pa-6 mt-10">
                        <v-card-title class="blue-grey--text text--darken-2">
                            How would people find your Now page?
                        </v-card-title>
                        <v-card-text>
                            <v-form>
                                <v-text-field v-model="address" label="Your Now Page Name" required></v-text-field>
                                {{ displaymessage }}
                            </v-form>
                        </v-card-text>
                        <v-card-actions v-if="showcreatebutton === true">
                            <v-spacer></v-spacer>
                            <v-btn color="info">Create my page</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    import _ from 'lodash';

    export default {
        name: 'home',
        data: () => {
            return {
                address:'',
                displaymessage: '',
                showcreatebutton: false
            }
        },
        methods: {
            checkIfExist: _.debounce( function() {
                var self = this;
                const baseURI = "http://localhost:3000/posts?author=" + this.address;

                this.$http.get(baseURI)
                    .then(function(response){
                        if (response.data.length > 0){
                            // Name already exist
                            self.displaymessage = 'Page name already taken. Please choose another';
                            self.showcreatebutton = false;
                        }
                        else{
                            // Name does not exist
                            self.displaymessage = 'Your Now page will be at https://' + self.address + '.mynow.page/now';
                            self.showcreatebutton = true;
                        }
                    }).catch(function (err){
                    console.log("Error : " + err);
                });
            } , 500)
        },
        watch: {
            address: function() {
                if((this.address.trim() != '') && (this.address.trim().length >= 5)){
                    this.checkIfExist();
                }
                else if ((this.address.trim() != '') && (this.address.trim().length < 5) && (this.address.trim().length > 0)) {
                    this.displaymessage = 'Name needs to be at least 5 characters';
                    this.showcreatebutton = false;
                }
            }
        }
    }
</script>
