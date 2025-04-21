import { Activity } from '../types'

export type ActivityActions = 
    { type: 'save-activity', payload: { newActivity: Activity}} |  //Type que describe lo que pasa en el reducer de abajo
    { type: 'set-activeId', payload: { id: Activity['id']}} |
    { type: 'delete-activity', payload: { id: Activity['id']}} |
    { type: 'restart-app'}
    //Payload: datos que se van a agregar al state - Genera un nuevo objeto de tipo activity

export type ActivityState = { //Type que describe el estado inicial
    activities: Activity[]
    activeId: Activity['id']
}

export const localStorageActivities = () : Activity[] => {
    const activities = localStorage.getItem('activities')
    return activities ? JSON.parse(activities) : [] //JSON.parse convierte a objeto las actividades previas, si no hay nada inicializa un []
}

export const initialState : ActivityState = {
    activities: localStorageActivities(),
    activeId: ''
}

export const activityReducer = (//Reducer es el que conecta a ambos
        state: ActivityState = initialState,
        action: ActivityActions
    ) => { 
    if(action.type === 'save-activity') {
        //Este codigo maneja la lógica para actualizar el state
        let updatedActivities : Activity[]= []

        if(state.activeId) {
            updatedActivities= state.activities.map( activity => activity.id === state.activeId ? action.payload.
                newActivity : activity
            ) //Iterar sobre las actividades para saber cual es la que tiene active Id y pasarle el nuevo payload           
        } else{
            updatedActivities= [...state.activities, action.payload.newActivity]
        }
        
        return {
            ...state, //Tomar una copia del estado actual
            activities: updatedActivities,
            activeId: ''
        //(1. Para no perder las actividades anteriores 2. Agregar la nueva actividad)  
        }
    }

    if(action.type === 'set-activeId') {
        return {
            ...state,
            activeId: action.payload.id //Toma copia del state y actualiza el activeId
        }
    }

    if(action.type === 'delete-activity') {
        return {
            ...state,
            activities: state.activities.filter
            ( activity => activity.id !== action.payload.id), //Diferentes a las que le mandemos como payload
        }
    }

    if(action.type === 'restart-app') {
        return {
            activities: [],
            activeId: ''
        }   
    }

    return state
}   