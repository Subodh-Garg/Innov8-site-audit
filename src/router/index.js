import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Pages/Login'
import ProjectsList from '@/components/Pages/ProjectsList'
import Project from '@/components/Pages/Project'
import Floor from '@/components/Pages/Floor'
import Questions from '@/components/Pages/Questions'
import AuthGuard from './auth-guard'

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
      component: ProjectsList,
      beforeEnter: AuthGuard
    },
    {
      path: '/projects/:project',
      name: 'Project',
      component: Project,
      beforeEnter: AuthGuard,
      props: true
    },
    {
      path: '/projects/:project/:floor',
      name: 'Floor',
      component: Floor,
      beforeEnter: AuthGuard,
      props: true
    },
    {
      path: '/projects/:project/:floor/questions',
      name: 'Questions',
      component: Questions,
      beforeEnter: AuthGuard,
      props: true
    }
  ],
  mode: 'history'
})
