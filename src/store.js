import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isAlertFlag: false
    },
    mutations: {
        //提示框触发
		CHANGE_ALERT_FLAG(state, status) {
			state.isAlertFlag = status
		},
    },
    actions: {
        //提示框触发
        changeAlertFlag({ commit }, status) {
			commit('CHANGE_ALERT_FLAG', status)
		},
    }
})
