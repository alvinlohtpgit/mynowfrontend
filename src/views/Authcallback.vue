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

            if (this.$auth.isAuthenticated){
                let pageCount = 0;
                let pageCountQuery = db.collection('pages').where('author' , '==', this.$auth.user.name).get()
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

        }
    }
</script>

<style scoped>

</style>