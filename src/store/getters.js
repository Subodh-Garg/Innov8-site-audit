export default {
  // PROJECTS GETTER
  projects (state) {
    const projectsItems = []
    // TODO: change all JSON.parse(JSON.stringify) -> lodash.deepClone
    const projects = JSON.parse(JSON.stringify(state.projects))
    // loop through all projects and get project detials
    Object.keys(projects).forEach(key => {
      projectsItems.push({
        name: projects[key].name,
        location: projects[key].location,
        pin: projects[key].pin,
        created_on: projects[key].created_on,
        user: {
          image: projects[key].user.image,
          name: projects[key].user.name
        }
      })
    })
    console.log('projectsItems: ' + JSON.stringify(projectsItems))
    return projectsItems
  },
  isDesktop (state) {
    return state.isDesktop
  },
  user (state) {
    return state.user
  },
  isAuthenticated (state) {
    return state.isAuthenticated
  },
  error (state) {
    return state.error
  },
  // All firebase AJAX references
  ajaxProjects (state) {
    return state.firebasedb.collection('projects')
  },
  ajaxProject (state) {
    return (projectName) => {
      return state.firebasedb.collection('projects').doc(projectName)
    }
  },
  ajaxFloor (state) {
    return (projectName, floorNumber) => {
      return state.firebasedb.collection('projects').doc(projectName).collection('floors').doc(floorNumber)
    }
  },
  ajaxRooms (state) {
    return (projectName, floorNumber) => {
      return state.firebasedb.collection('projects').doc(projectName).collection('floors').doc(floorNumber).collection('rooms')
    }
  },
  ajaxRoom (state) {
    return (projectName, floorNumber, roomName) => {
      return state.firebasedb.collection('projects').doc(projectName).collection('floors').doc(floorNumber).collection('rooms').doc(roomName)
    }
  },
  ajaxQuestions (state) {
    return (projectName, floorNumber, roomName) => {
      return state.firebasedb.collection('projects').doc(projectName).collection('floors').doc(floorNumber).collection('rooms').doc(roomName).collection('questions')
    }
  },
  ajaxUser (state) {
    return (userId) => {
      return state.firebasedb.collection('users').doc(userId)
    }
  }
}
