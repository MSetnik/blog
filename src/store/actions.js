export const actions = {
  ADD_PARAGRAF: 'add paragraf',
  USER_LOGIN: 'user login',
  CLEAR_PARAGRAFS: 'clear paragrafs'
}

export const createAction = (type, payload) => {
  return {
    type,
    payload
  }
}
