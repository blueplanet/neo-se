import axios, { AxiosResponse } from 'axios'
import { api } from '@cityofzion/neon-js'
import { getSpaceIds } from '~/lib/nse'


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
    const test = await getSpaceIds()
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
