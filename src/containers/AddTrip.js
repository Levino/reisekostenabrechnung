import React from 'react'
import { connect } from 'react-redux'
import { addTrip } from '../actions'

let AddTrip = ({ dispatch }) => {
  let input

  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        if (!input.value.trim()) {
          return
        }
        dispatch(addTrip(input.value))
        input.value = ''
      }}>
        <input ref={node => {
          input = node
        }} />
        <button type="submit">
          Add Trip
        </button>
      </form>
    </div>
  )
}
AddTrip = connect()(AddTrip)

export default AddTrip