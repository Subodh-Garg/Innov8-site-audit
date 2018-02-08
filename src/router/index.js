import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Pages/Login'
import ProjectsList from '@/components/Pages/ProjectsList'
import Project from '@/components/Pages/Project'
import Floor from '@/components/Pages/Floor'
import Questions from '@/components/Pages/Questions'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/projects',
      name: 'ProjectsList',
      component: ProjectsList
    },
    {
      path: '/projects/:project',
      name: 'Project',
      component: Project
    },
    {
      path: '/projects/:project/:floor',
      name: 'Floor',
      component: Floor
    },
    {
      path: '/projects/:project/:floor/questions',
      name: 'Questions',
      component: Questions
    }
  ],
  mode: 'history'
})
