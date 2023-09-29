import { getRefreshTokenFromLocalstorage, getTokenFromLocalstorage, isValidToken } from 'src/utils/auth'
import { api } from 'boot/axios'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useAuthStore } from 'stores/auth'

function isAuthenticated (to, from, next) {
  const accessToken = getTokenFromLocalstorage()
  const refreshToken = getRefreshTokenFromLocalstorage()
  if (!accessToken || !refreshToken) {
    next('/login')
    return
  }
  if (!isValidToken(accessToken)) {
    next('/login')
    return
  }
  if (accessToken) {
    next()
    return
  }
  next()
}

async function isValidLink (to, from, next) {
  const authStore = useAuthStore()
  const router = useRouter()
  const $q = useQuasar()

  authStore.doLogout()

  try {
    const { data: result } = await api.post('/user/valid-link', {
      link: to.params.public_link
    })

    console.log({ result: result.valid })
    if (!result.valid) {
      router.push('/')
      $q.notify({
        color: 'negative',
        icon: 'warning',
        position: 'top',
        message: 'Link not valid'
      })
      next()
      return
    }
  } catch (e) {
    console.error(e)
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
  Profile: {
    staticPath: '/profile'
  },
  Sign: {
    staticPath: '/sign'
  },
  Login: {
    staticPath: '/login'
  },
  Register: {
    staticPath: '/register'
  },
  Logout: {
    staticPath: '/logout'
  }

}

const routes = [

  {
    name: 'Profile',
    path: ROUTES.Profile.staticPath,
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        beforeEnter: isAuthenticated,
        path: '',
        component: () => import('pages/auth/Profile.vue')
      }
    ]
  },
  {
    name: 'Main',
    path: ROUTES.Main.staticPath,
    component: () => import('layouts/SignLayout.vue'),
    children: [{
      path: '',
      component: () => import('pages/IndexPage.vue')
    }]
  },
  {
    name: 'Sign',
    path: ROUTES.Sign.staticPath + '/:public_link',
    component: () => import('layouts/SignLayout.vue'),
    children: [{
      beforeEnter: isValidLink,
      path: '',
      component: () => import('pages/Sign.vue')
    }]
  },
  {
    name: 'Auth',
    component: () => import('layouts/AuthLayout.vue'),
    children: [{
      path: ROUTES.Login.staticPath,
      component: () => import('pages/auth/Login.vue')
    },
    {
      path: ROUTES.Register.staticPath,
      component: () => import('pages/auth/Register.vue')
    }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
