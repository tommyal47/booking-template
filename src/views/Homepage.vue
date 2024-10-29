<template>
    <h2>
        Welcome
    </h2>
</template>

<script setup>

const role = JSON.parse(localStorage.getItem('role'));
console.log(role[0]);
console.log(role[0]['permisions']['user']);
console.log(role[0]['permisions']['user']?.includes('edit'));
</script>