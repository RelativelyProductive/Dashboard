import DashboardLayout from '@layouts/layout.vue'
import store from '@state/store'
import authService from '@utils/authService'

export default [
  {
    path: '/',
    component: DashboardLayout,
    children: [
      {
        path: 'callback',
        name: 'callback',
        component: () => lazyLoadView(import('@views/callback')),
      },
      {
        path: '/',
        name: 'dashboard',
        component: () => lazyLoadView(import('@views/dashboard')),
        meta: {
          authRequired: false,
          async beforeResolve(routeTo, routeFrom, next) {
            let _isAuthenticated = authService.isAuthenticated()
            // check if we have a locally stored profile
            // let _localProfile = authService.getProfile()
            if (_isAuthenticated) {
              // } else {
              await store
                // Try to fetch the user's information by their username
                .dispatch('user/getUserProfile')
                .then((user) => {
                  store.dispatch('user/getUserGoals').then((roles) => {
                    // console.log(roles)
                  })
                  // Add the user to the route params, so that it can
                  // be provided as a prop for the view component below.
                  routeTo.params.user = user

                  // Continue to the route.
                  next()
                })
                .catch((error) => {
                  if (error.response && error.response.status === 401) {
                    // log out/renew
                    authService
                      .renewTokens()
                      .then((/* response */) => {
                        // console.log(response)
                        // continue to dashboard
                        next()
                      })
                      .catch((error) => {
                        if (error.code === 'login_required') {
                          // authService.logOut()
                          store.dispatch('auth/logOut')
                          // continue to dashboard
                          next()
                        }
                      })
                  }

                  // If the user can not be found redirect to signup page
                  next({
                    name: 'signup',
                    params: { hasProfile: false },
                  })
                })
              // }
            } else {
              // let _personalization = authService.getPersonalization()
              // if (_personalization) {
              //   next({ name: 'login' })
              // } else {
              //   next()
              // }
              next({ name: 'login' })
            }

            // We don't have a local profile so proceed with normal signup/login flow
            next()
          },
        },
      },
      {
        path: 'login',
        name: 'login',
        component: () => lazyLoadView(import('@views/login')),
        meta: {
          authRequired: false,
          beforeResolve(routeTo, routeFrom, next) {
            let _isAuthenticated = authService.isAuthenticated()

            if (_isAuthenticated) {
              next({ name: 'dashboard' })
            }

            next()
          },
        },
      },
      {
        path: 'signup',
        name: 'signup',
        component: () => lazyLoadView(import('@views/signup')),
        meta: {
          authRequired: true,
          async beforeResolve(routeTo, routeFrom, next) {
            let _isAuthenticated = authService.isAuthenticated()
            if (_isAuthenticated) {
              // check if we have a locally stored profile
              let _localProfile = authService.getProfile()
              if (!_localProfile) {
                // next({ name: 'settings', params: { user: '_localProfile' } })
                next()
              } else {
                if (!routeTo.params.hasProfile) {
                  await store
                    // Try to fetch the user's information by their username
                    .dispatch('user/getUserProfile')
                    .then((user) => {
                      if (user && user.togglApiKey && user.togglWorkspaceID) {
                        next({ name: 'dashboard' })
                      }
                      // Add the user to the route params, so that it can
                      // be provided as a prop for the view component below.
                      routeTo.params.user = user
                      // Continue to the route.
                      // next()
                    })
                    .catch((/* error */) => {
                      // console.log(error)
                      // If the user can not be found redirect to signup page
                      // next()
                    })
                }
                next()
              }
            }

            // We don't have a local profile so proceed with normal signup/login flow
            next()
          },
        },
        props: (route) => ({ user: route.params.user }),
      },
      {
        path: 'logout',
        name: 'logout',
        component: () => lazyLoadView(import('@views/logout')),
        meta: {
          authRequired: false,
          // beforeResolve(/* routeTo, routeFrom, */ next) {
          //   // next({ name: 'logout' }) // , params: { user: _localProfile } })
          //   next()
          // },
        },
      },
      {
        path: 'settings',
        name: 'settings',
        component: () => lazyLoadView(import('@views/settings')),
        meta: {
          authRequired: true,
          // beforeResolve(routeTo, routeFrom, next) {
          //   let _localProfile = authService.getProfile()
          //   if (_localProfile) {
          //     next({ name: 'dashboard' })
          //   } else {
          //     next()
          //   }
          // },
        },
      },
      // {
      //   path: '/profile',
      //   name: 'profile',
      //   component: () => lazyLoadView(import('@views/profile')),
      //   meta: {
      //     authRequired: true,
      //   },
      //   props: (route) => ({ user: store.state.auth.identity || {} }),
      // },
      // {
      //   path: '/profile/:username',
      //   name: 'username-profile',
      //   component: () => lazyLoadView(import('@views/profile')),
      //   meta: {
      //     authRequired: true,
      //     beforeResolve(routeTo, routeFrom, next) {
      //       store
      //         // Try to fetch the user's information by their username
      //         .dispatch('users/fetchUser', {
      //           username: routeTo.params.username,
      //         })
      //         .then((user) => {
      //           // Add the user to the route params, so that it can
      //           // be provided as a prop for the view component below.
      //           routeTo.params.user = user
      //           // Continue to the route.
      //           next()
      //         })
      //         .catch(() => {
      //           // If a user with the provided username could not be
      //           // found, redirect to the 404 page.
      //           next({ name: '404', params: { resource: 'User' } })
      //         })
      //     },
      //   },
      //   // Set the user from the route params, once it's set in the
      //   // beforeResolve route guard.
      //   props: (route) => ({ user: route.params.user }),
      // },
      {
        path: '/404',
        name: '404',
        component: require('@views/_404').default,
        // Allows props to be passed to the 404 page through route
        // params, such as `resource` to define what wasn't found.
        props: true,
      },
      // Redirect any unmatched routes to the 404 page. This may
      // require some server configuration to work in production:
      // https://router.vuejs.org/en/essentials/history-mode.html#example-server-configurations
      {
        path: '*',
        redirect: (to) => {
          // the function receives the target route as the argument
          if (to.path === '/') return '/'
          // return redirect path/location here.
          else return '404'
        },
      },
    ],
  },
]

// Lazy-loads view components, but with better UX. A loading view
// will be used if the component takes a while to load, falling
// back to a timeout view in case the page fails to load. You can
// use this component to lazy-load a route with:
//
// component: () => lazyLoadView(import('@views/my-view'))
//
// NOTE: Components loaded with this strategy DO NOT have access
// to in-component guards, such as beforeRouteEnter,
// beforeRouteUpdate, and beforeRouteLeave. You must either use
// route-level guards instead or lazy-load the component directly:
//
// component: () => import('@views/my-view')
//
function lazyLoadView(AsyncView) {
  const AsyncHandler = () => ({
    component: AsyncView,
    // A component to use while the component is loading.
    loading: require('@views/_loading').default,
    // Delay before showing the loading component.
    // Default: 200 (milliseconds).
    delay: 400,
    // A fallback component in case the timeout is exceeded
    // when loading the component.
    error: require('@views/_timeout').default,
    // Time before giving up trying to load the component.
    // Default: Infinity (milliseconds).
    timeout: 10000,
  })

  return Promise.resolve({
    functional: true,
    render(h, { data, children }) {
      // Transparently pass any props or children
      // to the view component.
      return h(AsyncHandler, data, children)
    },
  })
}
