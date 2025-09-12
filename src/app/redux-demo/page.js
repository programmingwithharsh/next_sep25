'use client'
import { createSlice, configureStore } from '@reduxjs/toolkit'
import { Provider, useSelector, useDispatch } from 'react-redux'
import { createAction, createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit'

// Redux Slice
const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 0,
        history: []
    },
    reducers: {
        increment: (state) => {
            state.value += 1
            state.history.push(`Incremented to ${state.value}`)
        },
        decrement: (state) => {
            state.value -= 1
            state.history.push(`Decremented to ${state.value}`)
        },
        reset: (state) => {
            state.value = 0
            state.history.push('Reset to 0')
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
            state.history.push(`Added ${action.payload}, now ${state.value}`)
        },
        // Note added by listener/effects
        addNote: (state, action) => {
            state.history.push(`[Listener] ${action.payload}`)
        }
    }
})

// Export actions using ES6
export const { increment, decrement, reset, incrementByAmount, addNote } = counterSlice.actions

// Custom event action (to simulate external events)
export const externalEvent = createAction('counter/externalEvent')

// Listener middleware setup
const listenerMiddleware = createListenerMiddleware()

// Listener 1: react to increment/decrement synchronously
listenerMiddleware.startListening({
    matcher: isAnyOf(increment, decrement),
    effect: async (action, api) => {
        const state = api.getState()
        const newValue = state.counter.value
        api.dispatch(addNote(`Saw ${action.type.split('/')[1]} -> value: ${newValue}`))
    }
})

// Listener 2: async effect when big increments happen
listenerMiddleware.startListening({
    actionCreator: incrementByAmount,
    effect: async (action, api) => {
        if (action.payload >= 5) {
            await new Promise((r) => setTimeout(r, 500))
            api.dispatch(addNote(`Big add of ${action.payload} processed after delay`))
        }
    }
})

// Listener 3: handle custom external event
listenerMiddleware.startListening({
    actionCreator: externalEvent,
    effect: async (action, api) => {
        api.dispatch(addNote(`External event: ${action.payload || 'no payload'}`))
    }
})

// Create store
const store = configureStore({
    reducer: {
        counter: counterSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(listenerMiddleware.middleware)
})

// Counter Component
function Counter() {
    const count = useSelector((state) => state.counter.value) // get value from state
    const history = useSelector((state) => state.counter.history) // get value from state
    const dispatch = useDispatch()

    return (
        <div className="container mt-4">
            <h1>Redux Toolkit Demo</h1>
            <p>Simple counter with Redux state management</p>

            {/* Counter Display */}
            <div className="card mb-4">
                <div className="card-body text-center">
                    <h2>Count: {count}</h2>
                    <div className="btn-group">
                        <button
                            onClick={() => dispatch(decrement())}
                            className="btn btn-danger"
                        >
                            -1
                        </button>
                        <button
                            onClick={() => dispatch(reset())}
                            className="btn btn-secondary"
                        >
                            Reset
                        </button>
                        <button
                            onClick={() => dispatch(increment())}
                            className="btn btn-success"
                        >
                            +1
                        </button>
                    </div>
                    <div className="mt-2">
                        <button
                            onClick={() => dispatch(incrementByAmount(5))}
                            className="btn btn-info me-2"
                        >
                            +5
                        </button>
                        <button
                            onClick={() => dispatch(incrementByAmount(-3))}
                            className="btn btn-warning"
                        >
                            -3
                        </button>
                    </div>

                    {/* Listener/Effect/Event demo controls */}
                    <div className="mt-3">
                        <button
                            className="btn btn-outline-primary me-2"
                            onClick={() => dispatch(increment())}
                        >
                            Trigger Listener (increment)
                        </button>
                        <button
                            className="btn btn-outline-success me-2"
                            onClick={() => dispatch(incrementByAmount(6))}
                        >
                            Trigger Async Effect (+6)
                        </button>
                        <button
                            className="btn btn-outline-dark"
                            onClick={() => dispatch(externalEvent('custom:ping'))}
                        >
                            Dispatch Custom Event
                        </button>
                    </div>
                </div>
            </div>

            {/* History */}
            <div className="card">
                <div className="card-body">
                    <h5>Action History</h5>
                    <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                        {history.map((item, index) => (
                            <div key={index} className="p-2 border-bottom">
                                {index + 1}. {item}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Code Examples */}
            <div className="mt-4">
                <h4>Redux Toolkit Code Examples:</h4>
                <div className="row">
                    <div className="col-md-6">
                        <h5>Create Slice</h5>
                        <pre className="bg-light p-3">
                            {`const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    }
  }
})

export const { increment, decrement } = counterSlice.actions`}
                        </pre>
                    </div>
                    <div className="col-md-6">
                        <h5>Use in Component</h5>
                        <pre className="bg-light p-3">
                            {`function Counter() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()
  
  return (
    <div>
      <span>{count}</span>
      <button onClick={() => dispatch(increment())}>
        +1
      </button>
    </div>
  )
}`}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Main Component with Provider
export default function ReduxDemo() {
    return (
        <Provider store={store}>
            <Counter />
        </Provider>
    )
}
