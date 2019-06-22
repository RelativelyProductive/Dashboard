import axios from 'axios'

export const state = {
  identity: getSavedState('auth.identity'),
}

export const mutations = {
  SET_CURRENT_AUTH(state, newValue) {
    state.identity = newValue
    saveState('auth.identity', newValue)
    setDefaultAuthHeaders(state)
  },
}

export const getters = {
  // Whether the user is currently logged in.
  loggedIn(state) {
    return !!state.identity
  },
}

export const actions = {
  // This is automatically run in `src/state/store.js` when the app
  // starts, along with any other actions named `init` in other modules.
  init({ state, dispatch }) {
    setDefaultAuthHeaders(state)
    // dispatch('validate')
  },

  // Logs in the current user.
  logIn({ commit, dispatch, getters }, { user } = {}) {
    // if (getters.loggedIn) return dispatch('validate')
    commit('SET_CURRENT_AUTH', user)
  },

  // Logs out the current user.
  logOut({ commit }) {
    commit('SET_CURRENT_AUTH', null)
  },

  // Validates the current user's token and refreshes it
  // with new data from the API.
  // validate({ commit, state }) {
  //   if (!state.currentUser) return Promise.resolve(null)

  //   return null
  // },
}

// ===
// Private helpers
// ===

function getSavedState(key) {
  return JSON.parse(window.localStorage.getItem(key))
}

function saveState(key, state) {
  window.localStorage.setItem(key, JSON.stringify(state))
}

function setDefaultAuthHeaders(state) {
  axios.defaults.headers.common.Authorization = state.identity ? state.identity.token : ''
}
