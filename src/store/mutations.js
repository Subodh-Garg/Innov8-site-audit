import Vue from 'vue'

export default {
  createProject (state, payload) {
    const projectItem = {
      created_on: payload.created_on,
      name: payload.name,
      location: payload.location,
      pin: payload.pin,
      user: payload.user,
      floors: {}
    }
    const projectName = payload.name
    Vue.set(state.projects, projectName, projectItem)
    // console.log('state.projects: ' + JSON.stringify(state.projects))
  },
  createFloor (state, payload) {
    const floorItem = {
      created_on: payload.dateAdded,
      floor_no: payload.floor_no,
      completed: payload.completed,
      in_progress: payload.in_progress,
      not_initiated: payload.not_initiated,
      total_questions: payload.total_questions,
      rooms: {}
    }
    let projectFloors = state.projects[payload.projectName].floors
    const projectFloorNo = payload.floor_no
    Vue.set(projectFloors, projectFloorNo, floorItem)
    state.projects = Object.assign({}, state.projects)
  },
  createProjectFloor (state, payload) {
    console.log('payload in createProjectFloor: ' + JSON.stringify(payload))
    const projectFloorItem = {
      floor_no: payload.floor_no,
      completed: payload.completed,
      in_progress: payload.in_progress,
      not_initiated: payload.not_initiated,
      total_questions: payload.total_questions
    }
    let projectFloors = state.projects[payload.projectName].floors
    const projectFloorNo = payload.floor_no
    Vue.set(projectFloors, projectFloorNo, projectFloorItem)
    console.log('floor mutation called')
    state.projects = Object.assign({}, state.projects)
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
