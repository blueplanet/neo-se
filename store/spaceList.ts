import axios, { AxiosResponse } from 'axios'
import { api } from '@cityofzion/neon-js'

export interface Space {
}

export interface State {
  entities: {[id: string]: Space}
}

export const state = () => ({
  entities: {},
})

export const mutations = {
  set(state: State, entity) {
    state.entities[entity.id] = entity
  },
  merge(state: State, entities) {
    state.entities = Object.assign({}, state.entities, entities)
  },
}

export const actions = {
  async load({commit}) {
    const hash = '8a4e092f789b85945a7267f0367175977ae50b52'
    const test = await api.nep5.getTokenInfo('https://nse-node.ap.ngrok.io', hash)
    console.dir(test)
    const response = await axios.get('/spaces.json')
    const spaces = response.data.reduce((result, curr) => {
      result[curr.id] = curr
      return result
    }, {})
    commit('merge', spaces)
  },
}

export const getters = {
  items(state: State) {
    return Object.keys(state.entities).map(key => state.entities[key])
  }
}
