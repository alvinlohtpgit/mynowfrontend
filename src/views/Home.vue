<template>
    <div>
        <Navbar/>
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