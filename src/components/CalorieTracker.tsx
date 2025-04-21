import { useMemo } from "react"
import type { Activity } from "../types"
import CalorieDisplay from "./CalorieDisplay"

type CalorieTrackerProps = {
    activities: Activity[]
}

export default function CalorieTracker({activities} : CalorieTrackerProps) {
  
  //Contadores
  const caloriesConsumed = useMemo(() => activities.reduce((total, activity) => activity.category === 1 ? //Reduce lo suma si es de esa categoria, si no deja el total como esta
  total + activity.calories : total, 0) , [activities]) //Cada que cambie activities se ejecuta
  const caloriesBurned = useMemo(() => activities.reduce((total, activity) => activity.category === 2 ? //Reduce lo suma si es de esa categoria, si no deja el total como esta
  total + activity.calories : total, 0) , [activities]) //Cada que cambie activities se ejecuta
  const netCalories = useMemo(() => caloriesConsumed - caloriesBurned, [activities]) //Cada que cambie caloriesConsumed o caloriesBurned se ejecuta
    
  return (
    <>
      <h2 className="text-4xl font-black text-white text-center">Resúmen de Calorias</h2>
        
        <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
            {/* //Componente reutilizable-personalizable */}
            <CalorieDisplay
                calories={caloriesConsumed}
                text="Consumidas"
            />
            <CalorieDisplay
                calories={caloriesBurned}
                text="Quemadas"
            />
            <CalorieDisplay
                calories={netCalories}
                text="Diferencia"
            />

        </div>

    </>
  )
}
