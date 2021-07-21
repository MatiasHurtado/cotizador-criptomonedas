import React,{useState,useEffect} from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import imagen from './cryptomonedas.png'
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';


const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width:992px){
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top:5rem;

`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #FFFFFF;
  text-align: left;
  font-weight:700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 50px;
  
  &::after{
    content:'';
    width: 250px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
  }
`;


function App() {

  const [moneda,guardarMoneda] = useState('');
  const [criptomoneda,guardarCripto]= useState('');
  const [resultado,guardarResultado] = useState({});
  const [cargando,guardarCargando] = useState(false);

  useEffect (() =>{

    // Evitamos la ejecucion la primera vez
    if(moneda ==='') return
     
    console.log('cotizando....');

    const cotizarCriptomoneda = async () => {

        //Consultar la api para obtener la cotizacion
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`

      const resultado= await axios.get(url)
      //Guardar cargando
      guardarCargando(true)


      //Ocultar el spinner y mostrar el resultado

      setTimeout (() =>{

        //Cambiar el estado de cargando 
        guardarCargando(false);

        //Guardar cotizacion
        guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda])
      },3000)
     
    }
    cotizarCriptomoneda();
  },[moneda,criptomoneda])


  //Mostrar spinner o resultado

  const componente = (cargando) ? <Spinner/> : <Cotizacion resultado={resultado} />


  return (
    
    <Contenedor>
      <div>
        <Imagen
          src={imagen}
          alt="Imagen Crypto"
        />

      </div>
      <div>
        <Heading>Cotiza Cripto monedas Al instante</Heading>
        <Formulario
          guardarMoneda={guardarMoneda}
          guardarCripto={guardarCripto}
        />
       {componente}
      </div>
    </Contenedor>
  );
}

export default App;
