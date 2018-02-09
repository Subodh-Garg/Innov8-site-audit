import * as firebase from 'firebase'

export default {
  loadProjects ({commit, getters}) {
    const projectsRef = getters.ajaxProjects

    // Get all projects
    projectsRef.get()
      .then(function (querySnapshotCat) {
        querySnapshotCat.forEach(function (doc) {
          console.log(doc.id + ' => ' + JSON.stringify(doc.data()))
          const project = doc.data()
          commit('createProject', project)
        })
      })
      .catch(function (error) {
        console.log('error getting projects: ' + JSON.stringify(error))
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
