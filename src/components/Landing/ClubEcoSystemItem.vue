<template>
    <div class="card q-my-sm q-mx-md text-subtitle5">{{ name }}</div>
</template>

<script setup>
const { name } = defineProps({
    name: String
})
</script>

<style scoped>
.card{
    color: rgba(206, 185, 214, 1);
    padding: 12px 24px;
    border: 1px solid;
    border-radius: 16px;
}
</style>