import * as firebase from 'firebase'

export default {
  loadProjects ({commit, getters}) {
    // Get all projects
    const projectsRef = getters.ajaxProjects
    projectsRef.get()
      .then(function (querySnapshotProjects) {
        querySnapshotProjects.forEach(function (doc) {
          console.log(doc.id + ' => ' + JSON.stringify(doc.data()))
          const project = doc.data()
          commit('createProject', project)
        })
      })
      .catch(function (error) {
        console.log('error getting projects: ' + JSON.stringify(error))
      })
  },
  loadProjectFloors ({commit, getters}, projectName) {
    // Get a single project based on project Name
    console.log('payload: ' + projectName)
    const projectRef = getters.ajaxProject(projectName)
    const projectFloorsRef = getters.ajaxFloors(projectName)

    projectRef.get()
      .then(docProject => {
        if (docProject.exists) {
          const project = docProject.data()
          commit('createProject', project)

          projectFloorsRef.get()
            .then(function (querySnapshotFloors) {
              querySnapshotFloors.forEach(function (doc) {
                console.log(doc.id + ' => ' + JSON.stringify(doc.data()))
                const projectFloor = doc.data()
                projectFloor.projectName = project.name
                commit('createProjectFloor', projectFloor)
              })
            })
            .catch(error => {
              console.log('error getting floors', error)
            })
        } else {
          console.log('No project data available')
        }
      })
      .catch(error => {
        console.log('error getting individual project: ' + JSON.stringify(error))
      })
  },
  createProject ({commit, getters}, payload) {
    // upload to firebase and store it
    return new Promise(function (resolve, reject) {
      const projectsRef = getters.ajaxProject(payload.name)
      const dateAdded = new Date()
      // getters.user.uid
      const user = {
        uid: '7bIFKSRr8Ly9z7M4CODI',
        image: 'https://imgur.com/I80W1Q0.png',
        name: 'Subodh Garg'
      }
      payload.dateAdded = dateAdded
      payload.user = user
      projectsRef.set({
        created_on: payload.dateAdded,
        name: payload.name,
        location: payload.location,
        pin: payload.pin,
        user: user
      })
        .then(function (docProjectRef) {
          console.log('project successfully created.')
          commit('createProject', payload) // create project local vuex store
          resolve(payload)
        })
        .catch(function (error) {
          console.log('error creating project: ' + JSON.stringify(error))
          reject(error)
        })
    })
  },
  createFloor ({commit, getters}, payload) {
    // upload to firebase and store it
    return new Promise(function (resolve, reject) {
      const floorsRef = getters.ajaxFloor(payload.projectName, payload.floor_no)
      const dateAdded = new Date()
      payload.dateAdded = dateAdded
      payload.completed = 0
      payload.in_progress = 0
      payload.not_initiated = 15
      payload.total_questions = 15
      floorsRef.set({
        created_on: payload.dateAdded,
        floor_no: payload.floor_no,
        completed: payload.completed,
        in_progress: payload.in_progress,
        not_initiated: payload.not_initiated,
        total_questions: payload.total_questions
      })
        .then(function (docProjectRef) {
          console.log('floor successfully created.')
          commit('createFloor', payload) // create project local vuex store
          resolve(payload)
        })
        .catch(function (error) {
          console.log('error creating floor: ' + JSON.stringify(error))
          reject(error)
        })
    })
  },
  signIn ({commit}, payload) {
    commit('clearError')
    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(function (result) {
        console.log('successfully signed in')
        // uid: result.user.uid
        const user = {
          uid: '7bIFKSRr8Ly9z7M4CODI',
          name: 'Subodh Garg',
          image: 'https://imgur.com/I80W1Q0.png'
        }
        commit('setUser', user)
      })
      .catch(function (error) {
        // Handle Errors here.
        // var errorMessage = error.message
        console.log('error signing up via Email, error: ' + JSON.stringify(error))
        commit('setError', error)
      })
  },
  autoSignIn ({commit}, payload) {
    const user = {
      uid: payload.uid,
      name: 'Subodh Garg',
      image: 'https://imgur.com/I80W1Q0.png'
    }
    commit('setUser', user)
  }
}
