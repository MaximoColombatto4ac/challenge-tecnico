import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [contador, setContador] = useState(0);
  const [maximo, setMaximo] = useState(0)
  const [jugando, setJugando] = useState(false);
  const [count, setCount] = useState(-1); 
  const [tiempo, setTiempo] = useState(5);

  useEffect(() => {
    let interval: NodeJS.Timer;
    if (!jugando && count > 0) {
      interval = setInterval(() => {
        setCount(prevCount => prevCount - 1);
      }, 1000);
    } else if (count === 0 && !jugando) {
      setJugando(true)
      setTiempo(5);
    }
    return () => clearInterval(interval);
  }, [count]);

  useEffect(() => {
    let interval: NodeJS.Timer;
    if (jugando && tiempo > 0) {
      interval = setInterval(() => {
        setTiempo(prevTiempo => prevTiempo - 1);
      }, 1000);
    } else if (tiempo === 0) {
      if (maximo < contador) {
        setMaximo(contador);
      }
      setJugando(false);
    }
    return () => clearInterval(interval);
  }, [tiempo, jugando]);

  function empezar() {
    setContador(0);
    setCount(3);
  }

  return (
    <div>
      <h1>Juego Contador</h1>
      <h2>maximo puntaje : {maximo}</h2>
      <h3>{contador}</h3>
      <button onClick={empezar}>Empezar!</button>
      <button 
        onClick={() => setContador(contador + 1)} 
        disabled={!jugando}
      >
        click!!
      </button>
      {
        !jugando && count > 0 && <p> empieza en: {count}</p>
      }
      <p>Tiempo: {tiempo} segundos</p>
    </div>
  );
}

export default App;
