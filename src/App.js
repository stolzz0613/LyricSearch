import React, { Fragment, useState, useEffect } from 'react';
import Formulario from "./components/Formulario";
import Cancion from "./components/Cancion";
import axios from "axios";

function App() {

  const [busquedaLetra, setBusquedaLetra] = useState({});
  const [letra, setLetra] = useState("");

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
        .catch(err => {
          setLetra("No se ha encontrado la cancion")
        })
    }
    consultarApiLetra()
  }, [busquedaLetra, letra]);

  return (
    <Fragment>
      <Formulario
        setBusquedaLetra={setBusquedaLetra}
      />

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">

          </div>
          <div className="col-md-6">
            <Cancion
              letra={letra}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
