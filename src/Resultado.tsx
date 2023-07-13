import { calculatorResults } from "./App";

export default function Resultado (data: calculatorResults) {
    return (
        <div>
            <h3>{data.hp}</h3>
            <p>Dado de golpe: d{data.dado}</p>
            <p>Modificador de CON: {data.con}</p>
            <p>HP a nivel 1: {data.hpInicial}</p>
            <p>HP en los siguientes niveles: {data.hpSiguienteNivel}</p>
        </div>
    )
}