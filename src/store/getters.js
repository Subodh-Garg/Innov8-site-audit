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
  projectFloors (state) {
    return (projectName) => {
      const projectFloorsItem = []
      console.log('state.projects: ' + JSON.stringify(state.projects))
      // TODO: change all JSON.parse(JSON.stringify) -> lodash.deepClone
      if (state.projects[projectName] !== undefined) {
        console.log('if')
        const projectFloors = JSON.parse(JSON.stringify(state.projects[projectName].floors))
        // loop through all projects and get project detials
        Object.keys(projectFloors).forEach(key => {
          projectFloorsItem.push({
            floor_no: projectFloors[key].floor_no,
            completed: projectFloors[key].completed,
            in_progress: projectFloors[key].in_progress,
            not_initiated: projectFloors[key].not_initiated,
            total_questions: projectFloors[key].total_questions
          })
        })
      } else {
        console.log('else')
      }
      console.log('projectFloorsItem: ' + JSON.stringify(projectFloorsItem))
      return projectFloorsItem
    }
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
  ajaxFloors (state) {
    return (projectName) => {
      return state.firebasedb.collection('projects').doc(projectName).collection('floors')
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
