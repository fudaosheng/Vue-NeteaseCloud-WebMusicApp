<template>
    <div>
        <Button @click="success">Display success prompt</Button>
    <Button @click="warning">Display warning prompt</Button>
    <Button @click="error">Display error prompt</Button>
    </div>
</template>
<script>
    export default {
        methods: {
            success () {
                this.$Message.success('This is a success tip');
            },
            warning () {
                this.$Message.warning('This is a warning tip');
            },
            error () {
                this.$Message.error('This is an error tip');
            }
        }
    }
</script>
