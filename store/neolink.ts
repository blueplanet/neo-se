export const state = () => ({
  connecting: true,
  connected: false,
  isLoggedIn: false,
  address: '',
})

export const mutations = {
  setExtensionState(state, event) {
    state.connected = true
    state.isLoggedIn = event.data.result.isLoggedIn
    state.address = event.data.result.address
  },
  failExtensionState(state) {
    state.connected = false
    state.isLoggedIn = false
    state.address = ''
  },
  finish(state) {
    state.connecting = false
  }
}

export const actions = {
  checkState({state, commit}) {
    window.postMessage({ type: 'NEOLINK_GET_EXTENSION_STATUS' }, '*')
    window.addEventListener('message', (event) => {
      if (event.data && event.data.type === 'NEOLINK_GET_EXTENSION_STATUS_RESPONSE') {
        commit('setExtensionState', event)
        commit('finish')
      }
    }, false)

    // ログインチェックのタイムアウト
    const authCheckTimeoutTimer = setTimeout(() => {
      if (state.connected !== true) {
        commit('failExtensionState')
        commit('finish')
      }
    } , 3000)
  }
}

export const getters = {
}
