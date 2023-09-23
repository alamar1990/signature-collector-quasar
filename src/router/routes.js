import { getRefreshTokenFromLocalstorage, getTokenFromLocalstorage, isValidToken } from 'src/utils/auth'
import { api } from 'boot/axios'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useAuthStore } from 'stores/auth'

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
    },
    {
      beforeEnter: isValidLink,
      path: ROUTES.Sign.staticPath + '/:public_link',
      component: () => import('pages/Sign.vue')
    },
    {
      beforeEnter: isAuthenticated,
      path: ROUTES.Profile.staticPath,
      component: () => import('pages/auth/Profile.vue')
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
