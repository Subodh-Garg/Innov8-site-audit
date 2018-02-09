import Vue from 'vue'

export default {
  createProject (state, payload) {
    const projectItem = {
      created_on: payload.created_on,
      name: payload.name,
      location: payload.location,
      pin: payload.pin,
      user: payload.user
    }
    const projectName = payload.name
    Vue.set(state.projects, projectName, projectItem)
    // console.log('state.categories: ' + JSON.stringify(state.categories))
  },
  setFirebasedb (state, payload) {
    state.firebasedb = payload
  },
  setIsDesktop (state) {
    if (window.matchMedia('(max-width: 768px)').matches) {
      // Mobile
      state.isDesktop = false
    } else {
      // Desktop
      state.isDesktop = true
    }
  },
  setUser (state, payload) {
    state.user = payload
    if (state.user !== null && state.user !== undefined) {
      state.isAuthenticated = true
    } else {
      state.isAuthenticated = false
    }
  },
  // setAuthentication (state) {
  //   state.isAuthenticated = true
  // },
  setError (state, payload) {
    state.error = payload
  },
  clearError (state, payload) {
    state.error = null
  }
}
