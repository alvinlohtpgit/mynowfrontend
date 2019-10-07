<template>
    <div>
        Test
        Test
        user : {{ $auth.user.username }}
        name: {{ $auth.user.given_name }}
    </div>
</template>

<script>
    export default {
        name: "Authcallback",
        mounted : function(){
            console.log('IN callback in authcallback');
        }
    }
</script>

<style scoped>

</style>