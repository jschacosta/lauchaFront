<template>
  <v-container class="px-5">
      <router-view :key="$route.path"/>
  </v-container>
</template>

<script>
export default {
    name: 'Admin',
}
</script>
