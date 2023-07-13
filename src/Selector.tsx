import { ChangeEvent, useEffect, useState } from "react";
import { calculatorData, callbackFunction } from "./App";

export default function Selector ( {actualizarResultados}: callbackFunction ) {
    const [dado, setDado] = useState(0);
    const [duro, setDuro] = useState(false);
    const [nivel, setNivel] = useState(1);
    const [con, setCon] = useState (0);
    const [enanoColina, setEnanoColina] = useState(false);
    const [sangreDraconica, setSangreDraconica] = useState(false);
    const [visibleHechicero, setVisibleHechicero] = useState(false);
    const d10: Array<string> = ["guerrero", "paladin", "explorador"];
    const d8: Array<string> = ["bardo", "clerigo", "druida", "monje", "picaro", "brujo"];
    const d6: Array<string> = ["hechicero", "mago"];

    useEffect(() => {
        updateResultados();
    }, [dado, nivel, con, duro, enanoColina, sangreDraconica]);

    function handleClase (e: ChangeEvent<HTMLSelectElement>) {
        setVisibleHechicero(e.target.value.toString() === "hechicero");

        if (!visibleHechicero) {
            setSangreDraconica(false);
        }
        
        if (d10.includes(e.target.value.toString())) {
            setDado(10);
        }
        else if (d8.includes(e.target.value.toString())) {
            setDado(8);
        }
        else if (d6.includes(e.target.value.toString())) {
            setDado(6);
        }
        else {
            setDado(12);
        }
    }

    function handleNivel (e: ChangeEvent<HTMLInputElement>) {
        setNivel(parseInt(e.target.value));
    }

    function handleCon (e: ChangeEvent<HTMLInputElement>) {
        setCon(parseInt(e.target.value));
    }

    function updateResultados () {
        const nuevosDatos: calculatorData = {
            dado: dado,
            con: con,
            nivel: nivel,
            duro: duro,
            colina: enanoColina,
            draconiano: sangreDraconica && visibleHechicero
        };
        actualizarResultados(nuevosDatos);
    }

    function handleModifier (tipo: string) {
        switch (tipo) {
            case "duro": {
                setDuro(!duro);
                break;
            }
            case "colina": {
                setEnanoColina(!enanoColina);
                break;
            }
            default: {
                setSangreDraconica(!sangreDraconica);
                break;
            }
        }

        updateResultados();
    }

    return (
        <div>
            <div>
                <label htmlFor="class">Mi personaje es un </label>
                <select name="class" id="class" onChange={handleClase} defaultValue={"selectOne"}>
                    <option value={"selectOne"}>Elegi una clase</option>
                    <option value={"barbaro"}>Barbaro</option>
                    <option value={"bardo"}>Bardo</option>
                    <option value={"clerigo"}>Clerigo</option>
                    <option value={"druida"}>Druida</option>
                    <option value={"guerrero"}>Guerrero</option>
                    <option value={"monje"}>Monje</option>
                    <option value={"paladin"}>Paladin</option>
                    <option value={"explorador"}>Explorador</option>
                    <option value={"picaro"}>Picaro</option>
                    <option value={"hechicero"}>Hechicero</option>
                    <option value={"brujo"}>Brujo</option>
                    <option value={"mago"}>Mago</option>
                </select>
                <label htmlFor="level"> de nivel </label>
                <input type="number" name="level" id="level" defaultValue={nivel} min={1} max={20} onChange={handleNivel}/>
            </div>
            <div>
                <label htmlFor="con">Con un modificador de CON de </label>
                <input type="number" name="con" id="con" defaultValue={0} min={-5} max={5} onChange={handleCon}/>
            </div>
            <div>
                <label htmlFor="duro">... tiene el dote de Duro?</label>
                <input type="checkbox" name="duro" id="duro" onChange={() => handleModifier("duro")} checked={duro}/><br/>
                <label htmlFor="enano">... es un enano de colina?</label>
                <input type="checkbox" name="enano" id="enano" onChange={() => handleModifier("colina")} checked={enanoColina}/><br/>
                {
                (visibleHechicero) &&
                    <>
                        <label htmlFor="hechicero">... es un hechicero draconico?</label>
                        <input type="checkbox" name="hechicero" id="hechicero" onChange={() => handleModifier("draconica")} checked={sangreDraconica}/>
                    </>
                }
            </div>
        </div>
    );
}