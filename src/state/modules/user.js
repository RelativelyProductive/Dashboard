import { UsersApi, DailyGoalApi } from '@src/services/rp/index.js'
import RelativelyProductiveClient from '@src/api'

export const state = {
  profile: null,
  goals: [],
}

export const getters = {
  getUser(state) {
    return state
  },
}

export const mutations = {
  SET_USER(state, user) {
    state.profile = user
  },
  SET_GOALS(state, goals) {
    state.goals = goals
  },
}

export const actions = {
  getUserProfile({ commit, state, rootState }) {
    let RelativelyProductiveApi = new RelativelyProductiveClient().api()
    var usersApi = new UsersApi(RelativelyProductiveApi)

    // 1. Check if we already have the user as a current user.
    const { profile } = state

    if (profile) {
      return Promise.resolve(profile)
    }

    // 2. Fetch the user from the API and cache it in case
    return usersApi.GetSelf().then(
      (response) => {
        commit('SET_USER', response.data)
        return Promise.resolve(response.data)
      },
      (error) => {
        // console.error(error)
        return Promise.reject(error)
      }
    )

    // // 1. Check if we already have the user as a current user.
    // const { currentUser } = rootState.auth
    // if (currentUser && currentUser.username === username) {
    //   return Promise.resolve(currentUser)
    // }
    // // 2. Check if we've already fetched and cached the user.
    // const matchedUser = state.cached.find((user) => user.username === username)
    // if (matchedUser) {
    //   return Promise.resolve(currentUser)
    // }
    // // 3. Fetch the user from the API and cache it in case
    // //    we need it again in the future.
    // return axios.get(`/api/users/${username}`).then((response) => {
    //   const user = response.data
    //   commit('CACHE_USER', user)
    //   return user
    // })
  },
  getUserGoals({ commit, state, rootState }) {
    let RelativelyProductiveApi = new RelativelyProductiveClient().api()
    var dailyGoalApi = new DailyGoalApi(RelativelyProductiveApi)
    // 1. Check if we already have the user as a current user.
    // const { goals } = state

    // if (goals && goals.length > 0) {
    //   return Promise.resolve(goals)
    // }

    // 2. Fetch the user from the API and cache it in case
    return dailyGoalApi.GetGoalResults().then(
      (response) => {
        commit('SET_GOALS', response.data)
        return Promise.resolve(response.data)
      },
      (error) => {
        // console.error(error)
        return Promise.reject(error)
      }
    )
  },
}
