
import React from 'react';

import './App.css';

function geoPositionReducer(state, action) {
  switch (action.type) {
    case 'error': {
      return {
        ...state,
        status: 'rejected',
        error: action.error,
      }
    }
    case 'success': {
      return {
        ...state,
        status: 'resolved',
        position: action.position,
      }
    }
    case 'started': {
      return {
        ...state,
        status: 'pending',
      }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function useGeoPosition() {
  const [state, dispatch] = React.useReducer(geoPositionReducer, {
    status: 'idle',
    position: null,
    error: null,
  })

  React.useEffect(() => {
    if (!navigator.geolocation) {
      dispatch({
        type: 'error',
        error: new Error('Geolocation is not supported'),
      })
      return
    }
    dispatch({type: 'started'})
    const geoWatch = navigator.geolocation.watchPosition(
      position => dispatch({type: 'success', position}),
      error => dispatch({type: 'error', error}),
    )
    return () => navigator.geolocation.clearWatch(geoWatch)
  }, [])

  return state
}

function YourPosition() {
  const {status, position, error} = useGeoPosition()

  if (status === 'idle' || status === 'pending') {
    return <div>Loading your position...</div>
  }

  if (status === 'resolved') {
    return (
      <div>
        Lat: {position.coords.latitude}, Long: {position.coords.longitude}
      </div>
    )
  }

  if (status === 'rejected') {
    return (
      <div>
        <div>Oh no, there was a problem getting your position:</div>
        <pre>{error.message}</pre>
      </div>
    )
  }
}

function App() {
  return (
    <div className='App'>
      <YourPosition />
    </div>
  );
}

export default App;
