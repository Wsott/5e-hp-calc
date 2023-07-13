import { calculatorResults } from "./App";
import estilo from "./estilo.module.css";

export default function Resultado (data: calculatorResults) {
    return (
        <div className={estilo.containerResultado}>
            <p className={estilo.hp}>{data.hp}</p>
            <p className={estilo.negrita}>Dado de golpe: <span>d{data.dado}</span></p>
            <p className={estilo.negrita}>Modificador de CON: <span>{data.con}</span></p>
            <p className={estilo.negrita}>HP a nivel 1: <span>{data.hpInicial}</span></p>
            <p className={estilo.negrita}>HP en los siguientes niveles: <span>+{data.hpSiguienteNivel}</span></p>
        </div>
    )
}