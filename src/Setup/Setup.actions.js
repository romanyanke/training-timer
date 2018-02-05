import { createAction, handleAction } from 'redux-actions'

export const saveParameters = createAction('SAVE_PARAMETERS')

const localStorageKey = 'kate.training.params'
const defaultParams = {
  trainingTime: 60,
  restTime: 30,
  repeat: 3,
}
const getStoredParams = () => {
  try {
    return JSON.parse(localStorage[localStorageKey])
  } catch (e) {
    return defaultParams
  }
}

const reducer = handleAction(
  saveParameters,
  (state, { payload }) => {
    localStorage[localStorageKey] = JSON.stringify(payload)
    return payload
  },
  getStoredParams(),
)

export default reducer
