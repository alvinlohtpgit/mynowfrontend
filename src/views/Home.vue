<template>
    <div>
        <Navbar/>

        <v-container>
            <v-row>
                <v-col cols="12" class="text-center display-2 mt-10 deep-orange--text text--darken-4">So what are you doing these days?</v-col>
            </v-row>
            <v-row>
                <v-col cols="12" class="text-center blue-grey--text text--darken-3">
                    It is just like an About page for your life and things you want to do. <br /><br/>You list out what you are doing or going to do in your personal Now page.<br /><br />
                    It helps others because people will know which direction your life is heading towards to.<br /><br />
                    It helps you because it serves as a guiding post when you have problem prioritizing tasks.
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    import Navbar from '../components/Navbar';

    export default {
        name: "Home",
        components:{
            Navbar
        },
        methods: {
        },
        mounted: function(){
            let currenthostname = window.location.hostname;
            let subdomain = currenthostname.substr(0 , currenthostname.indexOf('.'));

            if ((subdomain != 'mynow') && (window.location.hostname != 'localhost')){
                window.location.href = 'http://localhost:8080';
            }
        }
    }
</script>

<style scoped>

</style>