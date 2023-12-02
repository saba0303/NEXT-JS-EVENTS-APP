import { createContext, useReducer } from "react";

const Context = createContext()
export default Context

const initialState = {
    visibility: false,
    status: '',
    message: '',
    title: ''
}
function reducer(state, action) {
    switch (action.task) {
        case 'APPEAR': {
            return {
                ...state,
                visibility: true,
                status: action.status,
                message: action.message,
                title: action.title
            }
        }
        case 'DISAPPEAR': {
            return initialState
        }
    }
    return state
}

export const Provider = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    function appear(title, status, message) {
        dispatch({ task: 'APPEAR', title, status, message })
    }
    function disappear() {
        dispatch({ task: "DISAPPEAR" })
    }
    return <Context.Provider value={{ state, appear, disappear }}>
        {props.children}
    </Context.Provider >
}
