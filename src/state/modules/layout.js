// global layout state

// UI Widgets
const WidgetSettings = () => import('@components/widgets/rp-settings')
const WidgetWeather = () => import('@components/widgets/rp-weather')
const WidgetThemeSwitcher = () => import('@components/widgets/rp-theme-switcher')

// Dashboard Widgets
// import WidgetGoalTracker from '@components/widgets/rp-goal-tracker'
// import WidgetEnergyTracker from '@components/widgets/rp-energy-tracker'
// import WidgetUnifiedInbox from '@components/widgets/rp-unified-inbox'

const widgets = {
  widgetSettings: {
    hasEdit: false,
    availableAreas: ['ui'],
    component: WidgetSettings,
  },
  widgetThemeSwitcher: {
    hasEdit: false,
    availableAreas: ['ui'],
    component: WidgetThemeSwitcher,
  },
  widgetWeather: {
    hasEdit: true,
    availableAreas: ['ui', 'dashboard'],
    component: WidgetWeather,
    options: {
      showIcon: true,
      showText: false,
      showLocation: false,
    },
  },
}

export const state = {
  isEditMode: false,
  areas: {
    ui: {
      leftTop: {
        widgetLimit: 3,
        allowAdd: true,
        widgets: [],
      },
      leftMiddle: {
        widgetLimit: 3,
        allowAdd: true,
        widgets: [],
      },
      leftBottom: {
        widgetLimit: 3,
        allowAdd: true,
        widgets: [],
      },
      topLeft: {
        widgetLimit: 3,
        allowAdd: true,
        widgets: [
          // {
          //   canEdit: true,
          //   isEditing: false,
          //   widget: widgets.widgetWeather,
          // },
          {
            canEdit: false,
            isEditing: false,
            widget: widgets.widgetSettings,
          },
        ],
      },
      topCenter: {
        widgetLimit: 3,
        allowAdd: true,
        widgets: [],
      },
      topRight: {
        widgetLimit: 3,
        allowAdd: true,
        widgets: [],
      },
      rightTop: {
        widgetLimit: 3,
        allowAdd: true,
        widgets: [],
      },
      rightMiddle: {
        widgetLimit: 3,
        allowAdd: true,
        widgets: [],
      },
      rightBottom: {
        widgetLimit: 3,
        allowAdd: true,
        widgets: [],
      },
      bottomLeft: {
        widgetLimit: 3,
        allowAdd: true,
        widgets: [],
      },
      bottomCenter: {
        widgetLimit: 3,
        allowAdd: true,
        widgets: [],
      },
      bottomRight: {
        widgetLimit: 3,
        allowAdd: true,
        widgets: [
          // {
          //   canEdit: false,
          //   isEditing: false,
          //   widget: widgets.widgetThemeSwitcher,
          // },
        ],
      },
    },
    dashboard: [],
  },
}

export const getters = {
  // Whether edit mode is currently enabled
  isEditMode(state) {
    return state.isEditMode
  },
  getTopLeft(state) {
    return state.areas.ui.topLeft.widgets || []
  },
  getTopCenter(state) {
    return state.areas.ui.topCenter.widgets || []
  },
  getTopRight(state) {
    return state.areas.ui.topRight.widgets || []
  },
  getBottomLeft(state) {
    return state.areas.ui.bottomLeft.widgets || []
  },
  getBottomCenter(state) {
    return state.areas.ui.bottomCenter.widgets || []
  },
  getBottomRight(state) {
    return state.areas.ui.bottomRight.widgets || []
  },
}

export const mutations = {
  TOGGLE_EDIT_MODE(state, newValue) {
    state.isEditMode = newValue
  },
}

export const actions = {
  toggleEditMode({ commit, state }) {
    commit('TOGGLE_EDIT_MODE', !state.isEditMode)
  },
}
