import { createContext } from 'react'

import { actions } from './actions'

import { initialState } from './initial-state'

export const StoreContext = createContext(null)

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_PARAGRAF:
      return {
        ...state,
        paragrafs: action.payload
      }

    case actions.CLEAR_PARAGRAFS:
      return {
        ...state,
        paragrafs: action.payload
      }

    case actions.USER_LOGIN:
      return {
        ...state,
        userLoggedIn: true
      }

    default:
      return state
  }
}
