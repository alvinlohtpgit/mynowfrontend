<template>
    <div>
        Please wait..
    </div>
</template>

<script>
    export default {
        name: "Authcallback",
        mounted : function(){
            var self = this;

            if (this.$auth.isAuthenticated){
                console.log("User authenticated");
                // Check if the user has already a post
                const baseURI = "http://localhost:3000/posts?author=" + this.$auth.user.name;

                this.$http.get(baseURI)
                    .then(function(response){
                        if (response.data.length > 0){
                            //  Author already exist, means he has a page
                            // Redirect to his dashboard
                            self.$router.push('dashboard');
                        }
                        else{
                            // Name does not exist
                            self.$router.push('create');

                        }
                    }).catch(function (err){
                    console.log("Error : " + err);
                });
            }
            else{
                console.log("User not authenticated");
                this.$router.push('home');
            }
        }
    }
</script>

<style scoped>

</style>