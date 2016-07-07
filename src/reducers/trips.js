const trip = (state, action) => {
  switch (action.type) {
    case 'ADD_TRIP':
      return {
        id: action.id,
        title: action.title
      }
    case 'TOGGLE_TRIP':
      if (state.id !== action.id) {
        return state
      }

      return Object.assign({}, state, {
        completed: !state.completed
      })

    default:
      return state
  }
}

const trips = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TRIP':
      return [
        ...state,
        trip(undefined, action)
      ]
    case 'TOGGLE_TRIP':
      return state.map(t =>
        trip(t, action)
      )
    default:
      return state
  }
}

export default trips