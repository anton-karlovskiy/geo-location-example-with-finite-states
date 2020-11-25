
import React from 'react'
import { createMachine, assign } from 'xstate'
import { useMachine } from '@xstate/react'

const updatePosition = assign({
  position: (_, event) => event.position
});

function geoService(context, event) {
  return callback => {
    if (!navigator.geolocation) {
      callback({
        type: 'error',
        error: new Error('Geolocation is not supported')
      })
      return;
    }

    const geoWatch = navigator.geolocation.watchPosition(
      // sends back to parent
      position => callback({type: 'success', position}),
      error => callback({type: 'error', error})
    );

    // disposal function
    return () => navigator.geolocation.clearWatch(geoWatch);
  }
}

// https://xstate.js.org/viz/?gist=69dde705f0db39b7860c1dc3ec6ac682
const geoMachine = createMachine(
  {
    id: 'geo',
    context: {
      error: null,
      position: null
    },
    initial: 'pending',
    // invoke a service that lasts for the lifetime
    // of this machine
    invoke: {
      src: 'geoService'
    },
    states: {
      pending: {
        initial: 'default',
        states: {
          default: {
            after: {5000: 'timeout'}
          },
          timeout: {}
        },
      },
      resolved: {},
      rejected: {}
    },
    // lives on the root node because
    // these events can transition in any state
    on: {
      success: {
        target: '.resolved',
        actions: 'updatePosition',
      },
      error: {
        target: '.rejected',
        actions: assign({
          error: (_, event) => event.error,
        }),
      },
    },
  },
  {
    actions: {updatePosition},
    services: {geoService},
  },
)

function useGeoPosition() {
  const [state] = useMachine(geoMachine)

  return {
    state,
    position: state.context.position,
    error: state.context.error,
  }
}

function YourPositionWithXstateByDavid() {
  const {state, position, error} = useGeoPosition()

  console.log(state)

  if (state.matches('pending')) {
    return (
      <div>
        Loading your position...{' '}
        {state.matches({pending: 'timeout'}) && 'Sorry it is taking so long!'}
      </div>
    )
  }

  if (state.matches('resolved')) {
    return (
      <div>
        Lat: {position.coords.latitude}, Long: {position.coords.longitude}
      </div>
    )
  }

  if (state.matches('rejected')) {
    return (
      <div>
        <div>Oh no, there was a problem getting your position:</div>
        <pre>{error.message}</pre>
      </div>
    )
  }
}

export default YourPositionWithXstateByDavid;
