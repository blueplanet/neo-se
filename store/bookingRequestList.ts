import axios, { AxiosResponse } from 'axios'
import { api } from '@cityofzion/neon-js'
import { getSpaceIds, getSpace } from '~/lib/nse'


export interface BookingRequest {
}

export interface State {
  entities: {[id: string]: BookingRequest}
  entityIds: int[],
}

export const state = () => ({
  entities: {},
  entityIds: [],
})

export const mutations = {
  set(state: State, entity) {
    state.entities[entity.id] = entity
  },
  setIds(state: State, ids) {
    state.entityIds = ids
  },
  merge(state: State, entities) {
    state.entities = Object.assign({}, state.entities, entities)
  },
}

export const actions = {
  async load({commit}) {
    // const ids: string[] = await getSpaceIds()
    // commit('setIds', ids)

    // ids.forEach(id => {
    //   console.dir(id)
    //   getSpace(id).then(space => {
    //     console.dir(space)
    //     commit('set', {[id]: space})
    //   })
    // });

    const response = await axios.get('/booking-requests.json')
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
