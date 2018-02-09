<template>
  <v-container class="main-container">
    <!-- Project Heading -->
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="grey--text">Project Name : {{ project }}</h1>
      </v-flex>
    </v-layout>

    <!-- Normal create new floor button only if no floors in list -->
    <v-layout row v-if="isFirstFloor" class="mt-5">
      <v-flex xs8 offset-xs2>
        <v-btn @click="toggleFloorDialog" block primary dark>
          Create Floor
        </v-btn>
      </v-flex>
    </v-layout>

    <!-- Floating create new project button if project list is not empty -->
    <v-btn
      v-if="!isFirstFloor"
      fixed
      dark
      primary
      fab
      class="float-btn"
      @click="toggleFloorDialog"
    >
      <v-icon>add</v-icon>
    </v-btn>

    <!-- Floors list -->
    <v-layout row wrap class="mt-4">
      <v-flex xs12 sm6 md4
        v-for="floor in floors"
        :key="floor.floor_no"
        >
          <v-card class="mb-4" :to="'/projects/' + project + '/' + floor.floor_no">
            <v-card-title primary-title>
              <div>
                <h1 class="headline blackLight--text mb-0">Floor Number : {{ floor.floor_no }}</h1>
              </div>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>

      <!-- Create New Floor Dialog -->
      <v-dialog
        v-model="isShowDialog"
        max-width="500px"
      >
        <v-card>
          <!-- Dialog Bar -->
          <v-card-title>
            <h3>Create New Floor</h3>
          </v-card-title>
          <v-card-text>
            <form @submit.prevent="createNewFloor()">
              <v-text-field
              name="floor"
              label="Floor Number"
              v-model="floor_no"
              type="number"
              secondary
              required
              >
              </v-text-field>
            </form>
          </v-card-text>
        <v-card-actions>
          <v-btn color="primary" flat @click.stop="createNewFloor()">Create</v-btn>
        </v-card-actions>
        </v-card>
      </v-dialog>

  </v-container>
</template>

<script>
export default {
  props: ['project'],
  computed: {
    floors () {
      console.log('project computed called')
      if (this.$store.getters.projectFloors(this.project).length > 0) {
        this.isFirstFloor = false
      } else {
        this.isFirstFloor = true
      }
      return this.$store.getters.projectFloors(this.project)
    }
  },
  created () {
    console.log('project created called')
    this.$store.dispatch('loadProjectFloors', this.project)
  },
  data () {
    return {
      isFirstFloor: false,
      isShowDialog: false,

      floor_no: ''
    }
  },
  methods: {
    toggleFloorDialog () {
      this.isShowDialog = !this.isShowDialog
    },
    createNewFloor () {
      console.log('Create Button clicked')
      const newFloor = {
        floor_no: this.floor_no,
        projectName: this.project
      }
      console.log('newProject: ' + JSON.stringify(newFloor))
      this.$store.dispatch('createFloor', newFloor)
        .then((data) => {
          this.toggleFloorDialog()
          this.resetForm()
        })
        .catch((error) => {
          // TODO: show a default toast message to try again with error message
          console.log('error creating floor: ' + error)
          // this.toggleProjectDialog()
          // this.resetForm()
        })
    },
    resetForm () {
      this.floor_no = ''
    }
  }
}
</script>

<style>
  .main-container {
    margin: 0;
    padding: 16px;
  }
  .float-btn {
    top: 88vh;
    right: 5vw;
  }
</style>
