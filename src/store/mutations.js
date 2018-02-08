export default {
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
  setAuthentication (state) {
    state.isAuthenticated = true
  },
  setError (state, payload) {
    state.error = payload
  },
  clearError (state, payload) {
    state.error = null
  }
}
