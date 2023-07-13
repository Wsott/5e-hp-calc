import { useState } from 'react'
import './App.css'
import Selector from './Selector'
import Resultado from './Resultado'

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
    
    const nuevosDatos: calculatorResults = {
      hp: vidaNivel,
      dado: datos.dado,
      con: datos.con,
      hpInicial: vidaInicial,
      hpSiguienteNivel: Math.floor((datos.dado / 2) + 1 + datos.con) 
    };

    setDatos(nuevosDatos);
  }

  return (
    <>
      <h1>D&D 5e HP Calculator</h1>
      <Selector actualizarResultados={actualizarDatos}/>
      {(datos)? 
      <Resultado hp={datos.hp} dado={datos.dado} con={datos.con} hpInicial={datos.hpInicial} hpSiguienteNivel={datos.hpSiguienteNivel}/> 
      : 
      <Resultado hp={0} dado={0} con={0} hpInicial={0} hpSiguienteNivel={0}/>}
    </>
  )
}

export default App
