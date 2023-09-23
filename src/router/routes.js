import { getRefreshTokenFromLocalstorage, getTokenFromLocalstorage, isValidToken } from 'src/utils/auth'

function isAuthenticated (to, from, next) {
  const accesToken = getTokenFromLocalstorage()
  const refreshToken = getRefreshTokenFromLocalstorage()
  if (!accesToken || !refreshToken) {
    next('/login')
    return
  }
  if (!isValidToken(accesToken)) {
    next('/login')
    return
  }
  if (accesToken) {
    next()
    return
  }
  next()
}

export const ROUTES = {
  Main: {
    staticPath: '/'
  },
  Auth: {
    staticPath: '/auth'
  },
  Login: {
    staticPath: '/login'
  },
  Logout: {
    staticPath: '/logout'
  }

}

const routes = [
  {
    path: ROUTES.Main.staticPath,
    component: () => import('layouts/MainLayout.vue'),
    children: [{
      beforeEnter: isAuthenticated,
      path: '',
      component: () => import('pages/IndexPage.vue')
    }
    ]
  },
  {
    name: 'Login',
    path: ROUTES.Login.staticPath,
    component: () => import('layouts/AuthLayout.vue'),
    children: [{
      path: '',
      component: () => import('pages/auth/Login.vue')
    }]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
