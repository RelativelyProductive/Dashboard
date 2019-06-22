import { mapState, mapGetters, mapActions } from 'vuex'

export const authComputed = {
  ...mapState('auth', {
    currentUser: (state) => state.currentUser,
  }),
  ...mapGetters('auth', ['loggedIn']),
}

export const authMethods = mapActions('auth', ['logIn', 'logOut'])

export const layoutComputed = mapState('layout', {
  isEditMode: (state) => state.isEditMode,
})

export const layoutGetters = mapGetters('layout', ['getTopLeft'])

export const layoutMethods = mapActions('layout', ['toggleEditMode'])

export const userComputed = mapState('user', {
  profile: (state) => state.profile,
  goals: (state) => state.goals,
})
