let nextTripId = 0
export const addTrip = (title) => {
  return {
    type: 'ADD_TRIP',
    id: nextTripId++,
    title
  }
}

export const toggleTrip = (id) => {
  return {
    type: 'TOGGLE_TRIP',
    id
  }
}
