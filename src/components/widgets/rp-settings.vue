<script>
import { layoutMethods, layoutComputed, userComputed } from '@state/helpers'
import store from '@state/store'

import { TogglAccountApi, DailyGoalApi, Goal } from '@src/services/rp/index.js'
import RelativelyProductiveClient from '@src/api'

var RelativelyProductiveApi = new RelativelyProductiveClient().api()
var togglAccountApi = new TogglAccountApi(RelativelyProductiveApi)
var dailyGoalApi = new DailyGoalApi(RelativelyProductiveApi)

export default {
  data: function() {
    return {
      isVisible: false,
      isAuthenticated: false,
      showGoalMenu: false,
      forms: {
        goal: {
          name: null,
          time: 30, // in minutes
          trackId: null,
          trackStyle: null,
          trackDescription: null,
        },
      },
      options: {
        trackTypes: [
          {
            value: 3,
            text: 'Description',
          },
        ],
        clients: null,
        projects: null,
        tags: null,
      },
    }
  },
  computed: {
    ...layoutComputed,
    ...userComputed,
  },
  mounted: function() {
    this.$nextTick(function() {
      // console.log(RelativelyProductiveApi)

      this.isAuthenticated = this.$auth.isAuthenticated()

      if (this.isAuthenticated && this.profile && this.profile.togglApiKey) {
        //   this.profile = this.$auth.getProfile()
        this.getGoalOptions()
      }
    })
  },
  methods: {
    ...layoutMethods,
    login(evt) {
      evt.preventDefault()
      this.$auth.login()
    },
    logOut(evt) {
      evt.preventDefault()
      this.$auth.logOut()
    },
    handleLoginEvent(data) {
      this.isAuthenticated = data.loggedIn
      // this.profile = data.profile
    },
    showGoalCreate(evt) {
      evt.preventDefault()
      this.showGoalMenu = true
    },
    closeGoalCreate(evt) {
      evt.preventDefault()
      this.showGoalMenu = false
    },
    toggle(evt) {
      evt.preventDefault()
      this.toggleEditMode()
    },
    async getGoalOptions() {
      var _clientsPromise = togglAccountApi.GetAllClients()
      var _projectsPromise = togglAccountApi.GetAllProjects()
      var _tagsPromise = togglAccountApi.GetAllTags()

      let _goalOptionsResponse = await Promise.all(
        [_clientsPromise, _projectsPromise, _tagsPromise].map((p) => p.catch((e) => e))
      ).then(function(values) {
        // console.log(values)
        return values
      })

      if (_goalOptionsResponse[0] instanceof Error) {
        // _clientsPromise has errored
      } else {
        this.options.trackTypes.push({
          value: 1,
          text: 'Client',
        })
        this.options.clients = _goalOptionsResponse[0].data.map((item) => {
          return {
            value: item.clientId,
            text: item.clientName,
          }
        })
      }

      if (_goalOptionsResponse[1] instanceof Error) {
        // _projectsPromise has errored
      } else {
        this.options.trackTypes.push({
          value: 2,
          text: 'Project',
        })

        this.options.projects = _goalOptionsResponse[1].data.map((item) => {
          return {
            value: item.projectId,
            text: item.projectName,
          }
        })
      }

      if (_goalOptionsResponse[2] instanceof Error) {
        // _tagsPromise has errored
      } else {
        this.options.trackTypes.push({
          value: 4,
          text: 'Tag',
        })
        this.options.tags = _goalOptionsResponse[2].data.map((item) => {
          return {
            value: item.tagId,
            text: item.tagName,
          }
        })
      }
    },
    refreshOptions(evt) {
      evt.preventDefault()

      if (!RelativelyProductiveApi) {
        RelativelyProductiveApi = new RelativelyProductiveClient().api({
          accessToken: this.$auth.getAccessToken(),
        })

        togglAccountApi = new TogglAccountApi(RelativelyProductiveApi)
      }

      this.getGoalOptions()
    },
    saveGoal(evt) {
      evt.preventDefault()
      // None = 0,
      // Client = 1,
      // Project = 2,
      // Task = 3,
      // Tag = 4

      let _goal = new Goal()
      _goal.goalFriendlyName = this.forms.goal.name
      _goal.dailyGoalTimeInMs = this.forms.goal.time * 60000 // convert minutes to milliseconds
      _goal.dailyGoalTrackStyle = this.forms.goal.trackStyle
      _goal.dailyGoalTogglID =
        this.forms.goal.trackStyle === 3
          ? this.forms.goal.trackDescription
          : this.forms.goal.trackId

      dailyGoalApi.Create({ value: _goal }).then(
        (response) => {
          // console.log(response)
          if (response.isOk) {
            store.dispatch('user/getUserGoals')

            this.forms.goal.name = null
            this.forms.goal.time = 30
            this.forms.goal.trackId = null
            this.forms.goal.trackDescription = null
            this.forms.goal.trackStyle = null

            this.showGoalMenu = false
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
  <div class="container widget-settings">
    <div class="menu-container">
      <span class="menu-trigger"><BaseIcon name="chevron-right"/></span>
      <ul v-if="isAuthenticated" class="menu">
        <!-- <span class="">Welcome {{ profile.given_name }}</span>
          <img class="" :src="profile.picture" /> -->
        <li v-if="profile" class="menu-item">
          <a href="#" @click="showGoalCreate($event)">Add goal</a>
        </li>
        <li class="menu-item">
          <a href="#" @click="logOut($event)">Log out</a>
        </li>
      </ul>
      <ul v-else class="menu">
        <li class="menu-item">
          <a href="#" @click="login($event)">Log in</a>
        </li>
      </ul>
    </div>
    <div v-if="showGoalMenu" class="goal-container">
      <div v-if="!options.clients && !options.projects && !options.tags" class="info-message">
        You don't have any clients, projects or tags set up in Toggl. Please set these up in Toggl
        and <a href="#" @click="refreshOptions($event)">click here to try again</a>.
      </div>
      <div v-else class="goal-add">
        <input
          v-model="forms.goal.name"
          class="goal-control"
          type="text"
          placeholder="Read every day"
          required
        />
        <span class="goal-control pl-4 pr-4">for</span>
        <input v-model="forms.goal.time" class="goal-control time" type="number" required />
        <span class="goal-control pl-1">min</span>
        <div class="goal-settings">
          Watching time entries with a
          <select v-if="options.trackTypes" v-model="forms.goal.trackStyle" required>
            <option :value="null">select type</option>
            <option v-for="option in options.trackTypes" :key="option.value" :value="option.value">
              {{ option.text.toLowerCase() }}
            </option>
          </select>
          <span v-if="forms.goal.trackStyle > 0" class="goal-control pl-4 pr-4">of</span>
          <select
            v-if="options.clients && forms.goal.trackStyle === 1"
            v-model="forms.goal.trackId"
            required
          >
            <option :value="null">select client</option>
            <option v-for="option in options.clients" :key="option.value" :value="option.value">
              {{ option.text.toLowerCase() }}
            </option>
          </select>
          <select
            v-if="options.projects && forms.goal.trackStyle === 2"
            v-model="forms.goal.trackId"
            required
          >
            <option :value="null">select project</option>
            <option v-for="option in options.projects" :key="option.value" :value="option.value">
              {{ option.text.toLowerCase() }}
            </option>
          </select>
          <select
            v-if="options.tags && forms.goal.trackStyle === 4"
            v-model="forms.goal.trackId"
            required
          >
            <option :value="null">select type</option>
            <option v-for="option in options.tags" :key="option.value" :value="option.value">
              {{ option.text.toLowerCase() }}
            </option>
          </select>
          <input
            v-if="forms.goal.trackStyle === 3"
            v-model="forms.goal.trackDescription"
            type="text"
            placeholder="task description (Case Sensitive)"
          />
        </div>
        <div class="goal-controls">
          <a href="#" class="goal-button save" @click="saveGoal($event)">Save</a>
          <a href="#" class="goal-button cancel" @click="closeGoalCreate($event)">Cancel</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* stylelint-disable selector-max-type, selector-class-pattern */

.widget-settings .menu-container {
  @apply flex flex-row flex-no-wrap relative;
}

.widget-settings .menu-container .menu {
  @apply flex self-start ml-4;

  opacity: 0;
  transition: opacity 300ms cubic-bezier(0.165, 0.63, 0.14, 0.82),
    transform 500ms cubic-bezier(0.165, 0.63, 0.14, 0.82);
  transform: rotate(0deg) translateX(-10px) translateY(0);
  transform-origin: top center;
}

.widget-settings .menu-container > .menu-trigger {
  @apply cursor-pointer;

  transition: color 300ms cubic-bezier(0.165, 0.63, 0.14, 0.82);
}

.widget-settings .menu-container:hover > .menu-trigger {
  @apply text-green-500;
}

.widget-settings .menu-container:hover > .menu {
  opacity: 1;
  transform: rotate(0deg) translateX(10px) translateY(0);
}

.widget-settings .menu-container .menu .menu-item {
  @apply pr-3 block;
}

.widget-settings .goal-add {
  @apply mt-5 ml-10;
}

.widget-settings .goal-container {
  @apply absolute;
}

.widget-settings .goal-container input {
  @apply text-lg border-black border-solid border-b-2 w-2/5 outline-none leading-snug;
}

.widget-settings .goal-control.time {
  @apply w-1/12;
}

.widget-settings .goal-settings {
  @apply text-gray-600 mt-4;
}

.widget-settings .goal-settings select,
.widget-settings .goal-settings input {
  @apply border-gray-600 border-solid border-b-2 outline-none leading-snug;
}

.widget-settings .goal-settings input {
  @apply w-3/6;
}

.widget-settings .goal-controls {
  @apply text-gray-500 mt-4;

  opacity: 0;
  transition: opacity 300ms cubic-bezier(0.165, 0.63, 0.14, 0.82),
    transform 500ms cubic-bezier(0.165, 0.63, 0.14, 0.82);
  transform: rotate(0deg) translateX(0) translateY(20px);
}

.goal-add:hover > .goal-controls {
  opacity: 1;
  transform: rotate(0deg) translateX(0) translateY(10px);
}

.widget-settings .goal-controls .goal-button {
  @apply mr-4;
}

.info-message {
  @apply text-gray-500;
}

.info-message a {
  @apply underline;
}
</style>
