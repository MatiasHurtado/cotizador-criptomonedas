import React,{useEffect,useState} from 'react';
import styled from '@emotion/styled';
import useMomeda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import axios from 'axios';
import Error from './Error';


const Boton = styled.input`
    margin-top:20px ;
    font-weight:bold ;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border:none;
    width:100% ;
    border-radius: 10px;
    color:#FFF;
    transition: background-color .6s ease-in-out;

    &:hover{
        background-color:#326AC0;
        cursor:pointer;
    }

`

const Formulario = ({guardarMoneda,guardarCripto}) => {

    //State del listado de criptomonedas

    const [listacripto,guardarCriptomonedas] = useState([]);
    const [error, guardarError] =useState(false)
    const MONEDAS =[
        {codigo:'USD',nombre:'Dolar de Estados Unidos'},
        {codigo:'MXN',nombre:'Peso Mexicano'},
        {codigo:'CLP',nombre:'PESO CHILENO'},
        {codigo:'EUR',nombre:'Euro'}
    ]

    // Utilizar useMoneda
    const [moneda, SelectMoneda] = useMomeda('Elige tu Moneda','',MONEDAS);


    //Ejecutar Llamado a la Api

    useEffect(() =>{
        const consultarAPI = async () =>{
            const url='https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

            const resultado = await axios.get(url);

            guardarCriptomonedas(resultado.data.Data);
        }
        consultarAPI();
    },[]);


    
    //Utilizar useCriptomoneda
    const [criptomoneda,SelectCripto] = useCriptomoneda('Elige Tu criptomoneda','',listacripto)

    


    //Cuando el usuario hace submit

    const cotizarMoneda = e =>{
        e.preventDefault();

        //Validar si ambos campos estan llenos
        if (moneda === '' || criptomoneda ===''){
            guardarError(true)
            return;
        }
        

        //Pasar los datos al componente principal
        guardarError(false);
        guardarMoneda(moneda);
        guardarCripto(criptomoneda);



    }
    return ( 
        <form
            onSubmit={cotizarMoneda}
        >
            {error ? <Error mensaje="todos los campos son obligatorios"/> :  null}
            <SelectMoneda/>
            <SelectCripto/>
            <Boton
                type="submit"  
                value="Calcular"
            />
        </form>
    );
}
 
export default Formulario;