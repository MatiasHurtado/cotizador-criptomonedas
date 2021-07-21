import React from 'react';
import styled from '@emotion/styled';




const ResultadoDiv = styled.div `
    color: #F94A9B ;
    font-family: Arial, Helvetica, sans-serif;
    background-color: #FFFF;
    border-radius: 10%;
    padding: 3px 10px 3px 10px;
   
    margin-top: 20px;
   

`

const Info = styled.p `
    font-size: 20px;

    span {
        font-weight:bold;

    }

`
const Precio = styled.p `
    font-size: 30px;
    span {
        font-weight:bold;

    }

`
const Cotizacion = ({resultado}) => {


    //Verificamos si el objeto no se encuentra vacio
    if(Object.keys(resultado).length === 0) return null

    console.log(resultado)
    return (  
        <ResultadoDiv>
            <Precio>El precio es :<span>{resultado.PRICE}</span></Precio>
            <Info>El precio mas alto del dia fue :<span>{resultado.HIGHDAY}</span></Info>
            <Info>El precio mas bajo del dia fue :<span>{resultado.LOWDAY}</span></Info>
        </ResultadoDiv>
    );
}
 
export default Cotizacion;