import { useState, ChangeEvent, FormEvent, Dispatch, useEffect } from "react"
import { v4 as uuidv4 } from 'uuid'
import { Activity } from "../types"
import { categories } from "../data/categories"
import { ActivityActions, ActivityState } from "../reducers/activity-reducer"

type FormProps = {
    dispatch: Dispatch<ActivityActions>, //Le pasamos las acciones
    state: ActivityState
}

const initialState : Activity = {
    id: uuidv4(), //Generamos un id único
    category: 1,    
    name: '',
    calories: 0 
}

export default function Form({dispatch, state} : FormProps) { //Extraemos para usarlo en nuestro componente
  
    const [activity, setActivity] = useState<Activity>(initialState)

    useEffect(() => { //Se ejecutará cada vez que cambie el activeId
        if(state.activeId) {
            const selectedActivity= state.activities.filter( stateActivity => stateActivity.id === state.activeId)[0] //Filter retorna arreglo, por lo tanto [0] pa que retorne un objeto
        //Trae la actividad con el id que yo presione el btn
            setActivity(selectedActivity)
    }
    }, [state.activeId])

    const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
        const isNumberField= ['category', 'calories'].includes(e.target.id)//True si el campo es category o calories
        setActivity({
            ...activity, //Tomar una copia del estado actual
            [e.target.id]: isNumberField ? +e.target.value : e.target.value //Si es number con el + lo casteamos a number
            //Actualizar el estado actual con los nuevos valores
        })
    }

    const isValidActivity = () => {
        const { name, calories } = activity
        return name.trim() !== '' && calories > 0
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        dispatch({ type: 'save-activity', payload: {newActivity: activity}}) //Enviamos la acción al reducer
        // setActivity({ category: 1, name: '', calories: 0 }) //Limpiamos el formulario
    
        setActivity({
            ...initialState,
            id: uuidv4() //Va reescribir todo lo anterior pero le paso un id nuevo
        })
    }

    return (
    <form
        className="space-y-5 bg-white shadow p-10 rounded-lg"
        onSubmit={handleSubmit}
    >

    <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className="font-bold">Categoria:</label>
        <select className="border border-slate-300 p-2 rounded-lg w-full bg-white"
        id="category"
        value={activity.category}
        onChange={handleChange}
        >
            {categories.map(category => (
                <option 
                key={category.id} 
                value={category.id}
                >
                    {category.name}
                </option>
            ))}
        </select>
    </div>

    <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name" className="font-bold">Actividad:</label>
        <input 
            id="name"
            type="text"
            className="border border-slate-300 p-2 rounded-lg w-full"
            placeholder="Ej: Comida, Jugo de Naranja, Ensalada, Pesas, Nadar"
            value={activity.name}
            onChange={handleChange}
        />
    </div>

    <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className="font-bold">Calorias:</label>
        <input 
            type="number"
            id="calories"
            className="border border-slate-300 p-2 rounded-lg w-full"
            placeholder="Calorias. Ej: 250 o 500"
            value={activity.calories}
            onChange={handleChange}
        />
    </div>

    <input type="submit"
        className="bg-gray-800 hover:bg-gray-900 w-full p-2
            font-bold uppercase text-white cursor-pointer disabled:opacity-10" 
        value={activity.category === 1 ? 'Guardar Comida' : 'Guardar Ejercicio'}
        disabled={!isValidActivity()}
    />

    </form>
  )
}
