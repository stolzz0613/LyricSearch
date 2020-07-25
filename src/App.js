import React, { Fragment, useState, useEffect } from 'react';
import Formulario from "./components/Formulario";
import Cancion from "./components/Cancion";
import Info from "./components/Info";
import axios from "axios";

function App() {

  const [busquedaLetra, setBusquedaLetra] = useState({});
  const [letra, setLetra] = useState("");
  const [info, setInfo] = useState([]);
  const [errorText, setErrorText] = useState("")
  const [error, setError] = useState(false);

  useEffect(() => {
    if (Object.keys(busquedaLetra).length === 0) return;
    const consultarApiLetra = async () => {
      const { artista, cancion } = busquedaLetra
      const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`
      const url2 = `https://theaudiodb.com/api/v1/json/1/search.php?s=${artista}`

      axios.all([
        axios.get(url),
        axios.get(url2)
      ])
        .then(response => {
          setLetra(response[0].data.lyrics);
          setInfo(response[1].data.artists[0]);
        })
        .catch(err => {
          setError(true);
          setErrorText("No se encontro información");
          setLetra("");
          setInfo([]);
        })
    }
    consultarApiLetra()

  }, [busquedaLetra ]);

  return (
    <Fragment>
      <Formulario
        error={error}
        setError={setError}
        setBusquedaLetra={setBusquedaLetra}
        errorText={errorText}
        setErrorText={setErrorText}
      />

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <Info
              info={info}
            />
          </div>
          <div className="col-md-6 mt-4">
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
