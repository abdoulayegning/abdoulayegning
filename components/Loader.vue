<template>
    <div>
        <div v-if="loading">
            <p>Loading...</p>
        </div>
    </div>
</template>

<script>
//NEXT : Then, you update your nuxt.config.js to tell Nuxt to use your component:
export default {
     data() {
        return {
            loading: false
        }
     },

     methods: {
        start() {
        this.loading = true
        },
        finish() {
            this.loading = false
        }
     },
}
</script>