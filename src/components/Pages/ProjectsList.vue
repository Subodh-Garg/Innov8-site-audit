<template>

  <v-container style="margin: 0; padding: 16px;">
    <!-- Project List Heading -->
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="grey--text">Projects List</h1>
      </v-flex>
    </v-layout>

    <!-- Normal create new project button only if no projects in list -->
    <v-layout row v-if="isFirstProject" class="mt-5">
      <v-flex xs8 offset-xs2>
        <v-btn @click="toggleProjectDialog" block primary dark>
          Create Project
        </v-btn>
      </v-flex>
    </v-layout>

    <!-- Project list -->
    <v-layout row wrap class="mt-4">
      <v-flex xs12 sm6 md4
        v-for="project in projects"
        :key="project.name"
        >
          <v-card class="mb-4" :to="'/projects/' + project.name">
            <v-card-title primary-title>
              <div>
                <h1 class="headline blackLight--text mb-0">{{ project.name }}</h1>
                <h3 class="mt-1">{{ project.location }} - {{project.pin}}</h3>
              </div>
            </v-card-title>
            <v-layout class="pb-2" row>
              <v-avatar class="px-4">
                <img :src="project.user.image" alt="project.user.name" class="avatar-style"/>
              </v-avatar>
              <v-layout column justify-content>
                <p class="mb-0 black--text user-name">{{ project.user.name }}</p>
                <p class="mb-0 grey--text views-date">{{ project.created_on | date}}</p>
              </v-layout>
              <v-spacer></v-spacer>
              <v-icon class="px-3">delete</v-icon> <!-- TODO: Delete-->
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>

    <!-- Floating create new project button if project list is not empty -->
    <v-btn
      v-if="!isFirstProject"
      fixed
      dark
      primary
      fab
      class="float-btn"
      @click="toggleProjectDialog"
    >
      <v-icon>add</v-icon>
    </v-btn>

    <!-- Create New Project Dialog -->
    <v-dialog
      v-model="isShowDialog"
      fullscreen
      transition="dialog-bottom-transition"
    >
      <v-card>
        <!-- Dialog Bar -->
        <v-toolbar style="flex: 0 0 auto;" dark class="secondary">
          <v-toolbar-title>Create New Project</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click.native="toggleProjectDialog" dark>
            <v-icon>close</v-icon>
          </v-btn>
          <!-- <v-toolbar-items class="ma-0">
            <v-btn dark flat @click.native="toggleProjectDialog">Save</v-btn>
          </v-toolbar-items> -->
        </v-toolbar>
        <!-- Dialog Form -->
        <div class="project-form-container mt-5">
          <div class="project-form">
            <form @submit.prevent="createNewProject()">
              <v-text-field
              name="name"
              label="Name"
              v-model="name"
              type="text"
              secondary
              required
              >
              </v-text-field>
              <v-text-field
              name="location"
              label="Location"
              v-model="location"
              type="text"
              secondary
              required
              >
              </v-text-field>
              <v-text-field
              name="pin"
              label="Pin"
              v-model="pin"
              type="number"
              secondary
              required
              >
              </v-text-field>
              <v-btn type="submit" secondary dark>
                Save
              </v-btn>
            </form>
          </div>
        </div>
      </v-card>
    </v-dialog>

  </v-container>


</template>

<script>
export default {
  computed: {
    projects () {
      if (this.$store.getters.projects.length > 0) {
        this.isFirstProject = false
      } else {
        this.isFirstProject = true
      }
      return this.$store.getters.projects
    }
  },
  data () {
    return {
      isFirstProject: false,
      isShowDialog: false,

      name: '',
      location: '',
      pin: ''
    }
  },
  created () {
    console.log('created called, load projects')
    this.$store.dispatch('loadProjects')
  },
  methods: {
    toggleProjectDialog () {
      this.isShowDialog = !this.isShowDialog
    },
    createNewProject () {
      console.log('Save Button clicked')
      const newProject = {
        name: this.name,
        location: this.location,
        pin: this.pin
      }
      console.log('newProject: ' + JSON.stringify(newProject))
      this.$store.dispatch('createProject', newProject)
        .then((data) => {
          this.toggleProjectDialog()
          this.resetForm()
        })
        .catch((error) => {
          // TODO: show a default toast message to try again with error message
          console.log('error creating project: ' + error)
          // this.toggleProjectDialog()
          // this.resetForm()
        })
    },
    resetForm () {
      this.name = ''
      this.location = ''
      this.pin = ''
    }
  }
}
</script>

<style lang="css">
  .float-btn {
    top: 80vh;
    right: 5vw;
  }
  .project-form-container {
    display: flex;
    justify-content: center;
  }
  .project-form {
    text-align: center;
    width: 85%;
  }
  .avatar-style {
    width: 36px !important;
    height: auto !important;
  }
</style>
