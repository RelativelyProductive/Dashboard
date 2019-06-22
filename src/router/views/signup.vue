<script>
import { UsersApi, TogglAccountApi, User } from '@src/services/rp/index.js'
import RelativelyProductiveClient from '@src/api'

let RelativelyProductiveApi = new RelativelyProductiveClient().api()
var usersApi = new UsersApi(RelativelyProductiveApi)
var togglAccountApi = new TogglAccountApi(RelativelyProductiveApi)

export default {
  page: {
    title: 'Sign up',
  },
  props: {
    user: {
      type: Object,
      required: false,
      default: null,
    },
  },
  data: function() {
    return {
      authIdentity: null,
      userSaved: false,
      userData: null,
      form: {
        firstName: null,
        lastName: null,
        email: null,
        togglApiKey: null,
        hasTogglApiKeySet: false,
        togglWorkspaceID: null,
      },
      workspaceOptions: null,
    }
  },
  created() {
    window.addEventListener('keyup', (e) => {
      if (e.key.toLowerCase() === 'enter') {
        // this.$refs.form.submit()
        this.saveUser()
      }
    })
  },
  mounted: function() {
    this.$nextTick(function() {
      this.authIdentity = this.$auth.getProfile()
      if (!this.authIdentity) this.authIdentity = this.$auth.getPersonalization()

      if (this.user) {
        this.userData = this.user
        this.form.firstName = this.user.firstName
        this.form.lastName = this.user.lastName
        this.form.email = this.user.email
        this.form.togglApiKey = this.user.togglApiKey
        this.form.hasTogglApiKeySet = !!this.user.togglApiKey
        this.form.togglWorkspaceID = this.user.togglWorkspaceID
      } else if (!this.user && this.authIdentity) {
        this.form.firstName = this.authIdentity.given_name
        this.form.lastName = this.authIdentity.family_name
        this.form.email = this.authIdentity.email
      }

      if (this.form.hasTogglApiKeySet) {
        this.getWorkspaces()
      }
    })
  },
  methods: {
    saveUserSubmit(evt) {
      evt.preventDefault()

      this.saveUser()
    },
    saveUser() {
      let _user = new User()
      _user.firstName = this.form.firstName
      _user.lastName = this.form.lastName
      _user.email = this.form.email
      _user.togglApiKey = this.form.togglApiKey
      // _user.togglWorkspaceID = this.form.togglWorkspaceID

      if (this.userSaved || (this.userData && this.userData.id)) {
        _user = User.constructFromObject(this.userData)

        _user.firstName = this.form.firstName
        _user.lastName = this.form.lastName
        _user.email = this.form.email
        if (this.form.togglApiKey !== _user.togglApiKey) _user.togglApiKey = this.form.togglApiKey
        if (this.form.togglWorkspaceID !== _user.togglWorkspaceID)
          _user.togglWorkspaceID = this.form.togglWorkspaceID

        usersApi
          .Update({
            value: _user,
          })
          .then(
            (response) => {
              // console.log(response)
              if (response.isOk) {
                // console.log('User updated')
                this.$router.push('/')
              }
            },
            (error) => {
              console.error(error)
            }
          )
      } else {
        usersApi
          .Register({
            value: _user,
          })
          .then(
            (response) => {
              // console.log(response)
              if (response.isOk) {
                // console.log('User created')
                // this.form.togglApiKey = '********************************'
                this.form.hasTogglApiKeySet = true
                this.userData = response.data
                this.userSaved = true
                this.getWorkspaces()
              }
            },
            (error) => {
              console.error(error)
            }
          )
      }
    },
    getWorkspaces() {
      togglAccountApi.GetAllWorkspaceIds().then(
        (response) => {
          // console.log(response)
          if (response.isOk) {
            this.workspaceOptions = response.data.map((item) => {
              return {
                value: item.workspaceId,
                text: item.workspaceName,
              }
            })
          }
        },
        (error) => {
          console.error(error)
        }
      )
    },
  },
}
</script>

<template>
  <div class="container mx-auto">
    <form ref="form" class="form" @submit="saveUserSubmit">
      <input
        v-model="form.firstName"
        required
        type="text"
        class="form-input"
        placeholder="First Name"
      />
      <input
        v-model="form.lastName"
        required
        type="text"
        class="form-input"
        placeholder="Last Name"
      />
      <input
        v-model="form.email"
        required
        type="text"
        class="form-input"
        placeholder="Email Address"
      />
      <input
        v-model="form.togglApiKey"
        type="text"
        class="form-input"
        placeholder="Toggl Api Key"
      />
      <select
        v-if="form.hasTogglApiKeySet && workspaceOptions"
        v-model="form.togglWorkspaceID"
        class="form-input"
        placeholder="Toggl Workspace"
        required
      >
        <option :value="null">Select a workspace</option>
        <option v-for="option in workspaceOptions" :key="option.value" :value="option.value">
          {{ option.text }}
        </option>
      </select>
      <button type="submit" class="submit">Press enter or click here to continue</button>
    </form>
  </div>
</template>

<style scoped>
/* stylelint-disable selector-max-type, selector-class-pattern */

.container {
  @apply min-h-full flex flex-col justify-center;
}

.container form {
  @apply flex flex-col items-center;
}

.form-input {
  @apply text-5xl border-black border-solid border-b-2 ml-4 w-3/6 text-left outline-none leading-snug;
}

.form-input option {
  @apply text-center;
}

.submit {
  @apply text-gray-500 text-center mt-10;

  opacity: 0;
  transition: opacity 300ms cubic-bezier(0.165, 0.63, 0.14, 0.82),
    transform 500ms cubic-bezier(0.165, 0.63, 0.14, 0.82);
  transform: rotate(0deg) translateX(0) translateY(20px);
}

.form:hover .submit {
  opacity: 1;
  transform: rotate(0deg) translateX(0) translateY(10px);
}
</style>
