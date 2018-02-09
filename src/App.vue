<template>
  <v-app>

    <!-- Toolbar -->
    <v-toolbar dark fixed class="primary">
      <v-toolbar-side-icon @click.stop="isDrawerOpen = !isDrawerOpen"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor:pointer;">Innov8 Audit Dashboard</router-link>
      </v-toolbar-title>
    </v-toolbar>

    <!-- Main Content -->
    <main class="top-main">
      <router-view></router-view>
    </main>

  </v-app>
</template>

<script>
export default {
  data () {
    return {
      isDrawerOpen: true
    }
  }
}
</script>

<style>
  .top-main {
    padding-top: 58px;
  }
</style>
