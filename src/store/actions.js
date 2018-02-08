import * as firebase from 'firebase'

export default {
  signIn ({commit}, payload) {
    commit('clearError')
    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(function (result) {
        // const user = {
        //   uid: result.user.uid,
        //   name: result.user.displayName
        // }
        // commit('setUser', user)
        // console.log('signed up via email, user: ' + JSON.stringify(user))
        console.log('success signin')
        commit('setAuthentication')
      })
      .catch(function (error) {
        // Handle Errors here.
        // var errorMessage = error.message
        console.log('error signing up via Email, error: ' + JSON.stringify(error))
        commit('setError', error)
      })
  }
}
