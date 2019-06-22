import auth0 from 'auth0-js'
import { EventEmitter } from 'events'
// import authConfig from '../../auth.config.json'
import store from '@state/store'

const webAuth = new auth0.WebAuth({
  domain: process.env.VUE_APP_AUTH0_DOMAIN,
  audience: process.env.VUE_APP_AUTH0_AUDIENCE,
  redirectUri: `${window.location.origin}${process.env.VUE_APP_AUTH0_REDIRECT_URI}`,
  clientID: process.env.VUE_APP_AUTH0_CLIENT_ID,
  responseType: process.env.VUE_APP_AUTH0_RESPONSE_TYPE,
  scope: process.env.VUE_APP_AUTH0_SCOPE,
})

const localStorageKey = 'auth.identity'
const localStorageKeyPersonalization = 'auth.personalization'
const loginEvent = 'loginEvent'

class AuthService extends EventEmitter {
  idToken = null
  accessToken = null
  profile = null
  tokenExpiry = null
  accessTokenExpiry = null

  login(customState) {
    webAuth.authorize({
      appState: customState,
    })
  }

  logOut() {
    localStorage.removeItem(localStorageKey)

    this.idToken = null
    this.accessToken = null
    this.tokenExpiry = null
    this.profile = null
    this.accessTokenExpiry = null

    webAuth.logout({
      returnTo: `${window.location.origin}/logout`,
      client_id: process.env.VUE_APP_AUTH0_CLIENT_ID,
    })

    this.emit(loginEvent, { loggedIn: false })
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      webAuth.parseHash((err, authResult) => {
        if (err) {
          reject(err)
        } else {
          this.localLogin(authResult)
          resolve(authResult.idToken)
        }
      })
    })
  }

  isAuthenticated() {
    let authIdentity = getSavedState(localStorageKey)
    return (
      authIdentity &&
      authIdentity.tokenExpiry > 0 &&
      new Date().getTime() < authIdentity.tokenExpiry &&
      authIdentity.loggedIn
    )
  }

  isIdTokenValid() {
    let authIdentity = getSavedState(localStorageKey)
    return (
      authIdentity &&
      authIdentity.idToken &&
      authIdentity.tokenExpiry &&
      new Date().getTime() < authIdentity.tokenExpiry
    )
  }

  isAccessTokenValid() {
    let authIdentity = getSavedState(localStorageKey)
    return (
      authIdentity &&
      authIdentity.accessToken &&
      authIdentity.accessTokenExpiry &&
      new Date().getTime() < authIdentity.accessTokenExpiry
    )
  }

  getIdToken() {
    return new Promise((resolve, reject) => {
      if (this.isIdTokenValid()) {
        // console.log('isIdTokenValid: ', this.isIdTokenValid())
        let authIdentity = getSavedState(localStorageKey)
        resolve(authIdentity.idToken)
      } else if (this.isAuthenticated()) {
        this.renewTokens().then((authResult) => {
          // console.log('authResult.idToken: ', authResult.idToken)
          resolve(authResult.idToken)
        }, reject)
      } else {
        resolve()
      }
    })
  }

  getAccessToken() {
    return new Promise((resolve, reject) => {
      if (this.isAccessTokenValid()) {
        // console.log('isAccessTokenValid: ', this.isAccessTokenValid())
        let authIdentity = getSavedState(localStorageKey)
        resolve(authIdentity.accessToken)
      } else {
        this.renewTokens().then((authResult) => {
          // console.log('authResult.accessToken: ', authResult.accessToken)
          resolve(authResult.accessToken)
        }, reject)
      }
    })
  }

  getProfile() {
    let authIdentity = getSavedState(localStorageKey)
    return authIdentity ? authIdentity.profile : null
  }

  getPersonalization() {
    let authPersonalization = getSavedState(localStorageKeyPersonalization)
    return authPersonalization ? authPersonalization.profile : null
  }

  localLogin(authResult) {
    this.idToken = authResult.idToken
    this.profile = authResult.idTokenPayload

    this.accessToken = authResult.accessToken

    // console.log('this.profile.exp: ', this.profile.exp)
    // Convert the expiry time from seconds to milliseconds,
    // required by the Date constructor
    this.tokenExpiry = this.profile.exp * 1000

    // Convert expiresIn to milliseconds and add the current time
    // (expiresIn is a relative timestamp, we want an absolute time)
    this.accessTokenExpiry = Date.now() + authResult.expiresIn * 1000

    store.dispatch('auth/logIn', { user: this.profile })

    saveState(localStorageKeyPersonalization, {
      profile: {
        given_name: this.profile.given_name,
        family_name: this.profile.family_name,
        picture: this.profile.picture,
      },
    })
    saveState(localStorageKey, {
      loggedIn: true,
      profile: {
        email: this.profile.email,
        given_name: this.profile.given_name,
        gender: this.profile.gender,
        family_name: this.profile.family_name,
        picture: this.profile.picture,
      },
      idToken: this.idToken,
      accessToken: this.accessToken,
      tokenExpiry: this.tokenExpiry,
      accessTokenExpiry: this.accessTokenExpiry,
    })

    this.emit(loginEvent, {
      loggedIn: true,
      profile: authResult.idTokenPayload,
      state: authResult.appState || {},
    })
  }

  renewTokens() {
    return new Promise((resolve, reject) => {
      let authIdentity = getSavedState(localStorageKey)
      if (authIdentity && !authIdentity.loggedIn) {
        localStorage.removeItem(localStorageKey)
        return reject(new Error('Not logged in'))
      }

      webAuth.checkSession({}, (err, authResult) => {
        if (err) {
          reject(err)
        } else {
          this.localLogin(authResult)
          resolve(authResult)
        }
      })
    })
  }
}

function getSavedState(key) {
  return JSON.parse(window.localStorage.getItem(key))
}

function saveState(key, state) {
  window.localStorage.setItem(key, JSON.stringify(state))
}

const service = new AuthService()

service.setMaxListeners(5)

export default service
