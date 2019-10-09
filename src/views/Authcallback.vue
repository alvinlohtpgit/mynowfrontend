<template>
    <div>
        Please wait..
    </div>
</template>

<script>
    import {db} from '../firebase';

    export default {
        name: "Authcallback",
        data() {
            return {
                pages: []
            }
        },
        mounted : function(){
            var self = this;

                // Code that will run only after the
                // entire view has been rendered
            console.log("Inside mounted");
            console.log(this.$auth);
             console.log(this.$auth.isAuthenticated);
                //console.log("Name : " + this.$auth.user.name);

            //this.$router.push('/');

/*
            if (this.$auth.isAuthenticated){
                let pageCount = 0;
                let pageCountQuery = db.collection('pages').where('author' , '==', 'alvinloh@tuaspower.com.sg').get()
                    .then( function( querySnapshot) {
                        querySnapshot.forEach(function(doc){
                            pageCount++;
                        });

                        // Check if the user has already a post
                        if (pageCount > 0){
                            self.$router.push('dashboard');
                        }
                        else{
                            // Name does not exist, so we redirect him to create a page
                            self.$router.push('create');
                        }
                    });
            }
            else{
                console.log("User not authenticated");
                this.$router.push('/');
            }
*/
        }
    }
</script>

<style scoped>

</style>