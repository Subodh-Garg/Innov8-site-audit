<template>

  <v-container style="margin: 0; padding: 16px;">

    <!-- Project-Floor Heading -->
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="grey--text">Project Name : {{ project }}</h1>
        <h1 class="grey--text">Floor Number : {{ floor }}</h1>
      </v-flex>
    </v-layout>

  </v-container>

</template>

<script>
export default {
  props: ['project', 'floor']
}
</script>

<style lang="css">
</style>
