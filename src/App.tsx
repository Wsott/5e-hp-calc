import { useState } from 'react'
import './App.css'
import Selector from './Selector'
import Resultado from './Resultado'
import estilo from "./estilo.module.css";

export interface calculatorData {
  dado: number;
  con: number;
  nivel: number;
  duro: boolean;
  colina: boolean;
  draconiano: boolean;
}

export interface calculatorResults {
  hp: number;
  dado: number;
  con: number;
  hpInicial: number;
  hpSiguienteNivel: number;
}

export interface callbackFunction {
  actualizarResultados: (datos: calculatorData) => void;
}

function App() {
  const [datos, setDatos] = useState<calculatorResults>();
  
  function actualizarDatos (datos: calculatorData) {
    
    const vidaInicial: number = datos.con + datos.dado;
    let vidaNivel: number = vidaInicial + (Math.floor((datos.dado / 2) + 1 + datos.con) * (datos.nivel - 1))
    vidaNivel += (datos.duro)? datos.nivel * 2: 0;
    vidaNivel += (datos.colina)? datos.nivel : 0;
    vidaNivel += (datos.draconiano)? datos.nivel : 0;
    let vidaSiguiente: number = Math.floor((datos.dado / 2) + 1 + datos.con);
    vidaSiguiente += (datos.duro)? 2: 0;
    vidaSiguiente += (datos.colina)? 1 : 0;
    vidaSiguiente += (datos.draconiano)? 1 : 0;
    
    const nuevosDatos: calculatorResults = {
      hp: vidaNivel,
      dado: datos.dado,
      con: datos.con,
      hpInicial: vidaInicial,
      hpSiguienteNivel: vidaSiguiente//Math.floor((datos.dado / 2) + 1 + datos.con) 
    };

    setDatos(nuevosDatos);
  }

  return (
    <div className={estilo.container}>
      <p className={estilo.titulo}>Calculadora de vida para D&D 5e</p>
      <Selector actualizarResultados={actualizarDatos}/>
      {(datos)? 
      <Resultado hp={datos.hp} dado={datos.dado} con={datos.con} hpInicial={datos.hpInicial} hpSiguienteNivel={datos.hpSiguienteNivel}/> 
      : 
      <Resultado hp={0} dado={0} con={0} hpInicial={0} hpSiguienteNivel={0}/>}
    </div>
  )
}

export default App
