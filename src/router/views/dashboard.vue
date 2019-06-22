<script>
import { userComputed } from '@state/helpers'

export default {
  page: {
    title: 'Dashboard',
  },
  filters: {
    dayOfWeek: function(value) {
      value = value * 1
      var weekdays = new Array(7)
      weekdays[0] = 'Sunday'
      weekdays[1] = 'Monday'
      weekdays[2] = 'Tuesday'
      weekdays[3] = 'Wednesday'
      weekdays[4] = 'Thursday'
      weekdays[5] = 'Friday'
      weekdays[6] = 'Saturday'
      return weekdays[value]
    },
  },
  data: function() {
    return {
      isAuthenticated: false,
      authIdentity: null,
    }
  },
  computed: {
    ...userComputed,
  },
  created() {
    window.addEventListener('keyup', (e) => {
      if (e.key.toLowerCase() === 'enter') {
        // console.log(e.key + ' was pressed')
      }
    })
  },
  mounted: function() {
    this.$nextTick(function() {
      this.isAuthenticated = this.$auth.isAuthenticated()
      this.authIdentity = this.$auth.getProfile()
      if (!this.authIdentity) this.authIdentity = this.$auth.getPersonalization()
    })
  },
  methods: {
    isToday(day) {
      return new Date().getDay() === day
    },
    getGoalsForDisplay() {
      var _return = []

      for (let i = 0; i < 7; i++) {
        let weekdayInt = (1 + i) % 7
        let _weekday = this.$options.filters.dayOfWeek(weekdayInt)
        _return.push({
          index: weekdayInt,
          displayName: _weekday.substring(0, 1),
          fullName: _weekday,
          goals: this.goals.map((goal) => {
            return {
              goalId: goal.goalId,
              goalFriendlyName: goal.goalFriendlyName,
              ...goal.trackedEntryDetails.find((d) => new Date(d.date).getDay() === weekdayInt),
            }
          }),
        })
      }

      return _return
    },
    goalCompletionPercentage(goals) {
      let _total = goals.length

      let _complete = goals.reduce((accumulator, goal) => {
        return accumulator + (goal.goalMet === true ? 1 : 0)
      }, 0)

      return _complete / _total
    },
  },
}
</script>

<template>
  <div :class="isAuthenticated ? 'dashboard' : 'welcome'">
    <div v-if="goals && goals.length > 0" class="goal-tracker">
      <ul class="">
        <li
          v-for="day in getGoalsForDisplay()"
          :key="day.fullName"
          :class="
            `day ${isToday(day.index) ? 'today' : ''} ${
              goalCompletionPercentage(day.goals) === 1 ? 'achieved' : 'missed'
            } ${goalCompletionPercentage(day.goals) > 0 ? 'hasItems' : ''}`
          "
        >
          <!-- {{ day.goals | goalCompletionPercentage }} -->
          <div class="results-container">
            <div v-for="goal in day.goals" :key="goal.goalId" :class="goal.goalMet ? 'result' : ''">
              <BaseIcon v-if="goal.goalMet === true" class="result-display" name="circle" />
            </div>
            <div class="result-detail">
              <div v-for="goal in day.goals" :key="goal.goalId">
                <div v-if="goal.goalMet === true">
                  <BaseIcon class="icon" name="circle" />
                  {{ Math.round(goal.goalTrackedDurationInMs / 1000 / 60) }}m |
                  {{ goal.goalFriendlyName }}
                  <!-- | {{ goal.goalTrackedDurationParsed }} -->
                </div>
              </div>
            </div>
          </div>
          <div class="display">{{ day.displayName }}</div>
        </li>
        <!-- <li
            v-for="day in goal.trackedEntryDetails"
            :key="day.date"
            :class="`test ${day.goalMet === true ? 'achieved' : 'missed'}`"
          >
            {{ new Date(day.date).getDay() | dayOfWeek }}
          </li> -->
      </ul>
    </div>
  </div>
</template>

<style scoped>
/* stylelint-disable selector-max-type, selector-class-pattern */

.welcome {
  @apply min-h-full flex items-center justify-center;
}

.dashboard {
  @apply min-h-full flex justify-end;

  /* min-height: calc(100% - 64px); */
}

.goal-tracker {
  @apply flex self-center justify-end relative;
}

.goal-tracker li.day {
  @apply flex justify-start w-24 cursor-pointer text-gray-500;
}

.goal-tracker li.day.today {
  @apply text-black;
}

.goal-tracker li.day .display {
  @apply text-4xl flex text-right leading-none;

  transition: color 300ms ease-in-out;
}

.goal-tracker li.day:hover .display {
  @apply text-black;
}

.goal-tracker li.day.achieved:hover .display {
  @apply text-green-500;
}

.goal-tracker li.day .results-container {
  @apply flex flex-wrap flex-row-reverse w-1/3 opacity-100;
}

/* .goal-tracker:hover li.day:not(:hover) {

} */

.goal-tracker li.day .results-container .result {
  @apply pl-1 m-0 leading-none;

  /* transition: opacity 300ms cubic-bezier(0.165, 0.63, 0.14, 0.82); */
}

.goal-tracker li.day.hasItems:hover .results-container .result {
  @apply opacity-0;
}

.goal-tracker li.day .results-container .result .result-display {
  font-size: 0.2rem;
}

.goal-tracker li.day .results-container .result-detail {
  @apply opacity-0 absolute;

  transition: opacity 300ms cubic-bezier(0.165, 0.63, 0.14, 0.82),
    transform 500ms cubic-bezier(0.165, 0.63, 0.14, 0.82);
  transform: rotate(0deg) translateX(-50px) translateY(0);
}

.goal-tracker li.day .results-container .result-detail .icon {
  @apply text-xs pl-1 m-0 leading-none;
}

.goal-tracker li.day.hasItems:hover .results-container .result-detail {
  @apply opacity-100;

  transform: rotate(0deg) translateX(-100px) translateY(0);
}

.name {
  @apply text-6xl border-black border-solid border-b-2 ml-4 w-2/6 text-center outline-none leading-snug;
}
</style>
