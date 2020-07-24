import React, { Fragment, useState, useEffect } from 'react';
import Formulario from "./components/Formulario";
import axios from "axios";

function App() {

  const [busquedaLetra, setBusquedaLetra] = useState({});
  const [letra, setLetra] = useState("")

  useEffect(() => {
    if (Object.keys(busquedaLetra).length === 0) return;
    const consultarApiLetra = async () => {
      const { artista, cancion } = busquedaLetra
      const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`
      await axios
        .get(url)
        .then(response => {
          const lyrics = response.data.lyrics;
          setLetra(lyrics);
        })
    }
    consultarApiLetra()
  }, [busquedaLetra, letra]);

  return (
    <Fragment>
      <Formulario
        setBusquedaLetra={setBusquedaLetra}
      />
    </Fragment>
  );
}

export default App;
