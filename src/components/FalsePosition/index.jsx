import React, { useState } from 'react';
import Geogebra from 'react-geogebra';
import '../css/metodos.css';
import { Link } from 'react-router-dom';
import CustomizedTables from '../table/index'



function Index() {
    const [ecuacion, setEcuacion] = useState('');
    const [a, setA] = useState('');
    const [b, setB] = useState('');
    const [datos, setDatos] = useState(null); 

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Ecuación:', ecuacion);
        console.log('a:', a);
        console.log('b:', b);
        const header = {
            'Content-Type': 'application/json'
        }
        const body = {
            "ecuacion": ecuacion,
            "a": a,
            "b": b
        }

        fetch(`https://metodosnumericos-x5vj.onrender.com/falsePosition`, {
            method: 'POST',
            headers: header,
            body: JSON.stringify(body)
        })
        .then(response => response.json())
        .then(data => { setDatos(data)
        console.log(data)})
        .catch(error => console.error('Error al obtener los datos:', error));
    };

    return (
        <div  >
            <h1 style={{ textAlign: 'center' }}>False Position</h1>
            <h6 style={{marginLeft:'20px'}}> Nomenclatura para las ecuaciones:  x**n = x^n</h6>
            <form onSubmit={handleSubmit} className='contenedor' >
                <div style={{marginBottom:'20px'}}>
                    <label htmlFor="ecuacion" style={{marginRight:'20px'}}>Ecuación:</label>
                    <input
                        type="text"
                        id="ecuacion"
                        value={ecuacion}
                        onChange={(e) => setEcuacion(e.target.value)}
                    />
                </div>
                <div style={{marginBottom:'20px'}}>
                    <label htmlFor="a" style={{marginRight:'73px',marginBottom:'20px'}}>a:</label>
                    <input
                        type="number"
                        id="a"
                        value={a}
                        onChange={(e) => setA(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="b" style={{marginRight:'73px',marginBottom:'20px'}} >b:</label>
                    <input
                        type="number"
                        id="b"
                        value={b}
                        onChange={(e) => setB(e.target.value)}
                    />
                </div>
                <button type="submit" style={{marginTop:'20px',marginLeft:'120px'}}>Enviar</button>
                <Link to="/" style={{ textDecoration: 'none' }}>

                <button type="submit" style={{position:'relative',top:'50px',marginLeft:'-80px'}}>Regresar al inicio</button>
                </Link>

            </form>
            {ecuacion && (
                <div style={{ width: '400px', height: '400px', margin: '0 auto' ,marginTop:'-160px'}}>
                    <Geogebra appletName="app1" width="400" height="400" settings={{ 'mode': 'expressions', 'border': 'none' }} />
                    <Geogebra script={`f(x) = ${ecuacion}`} />
                </div>
            )}
               {datos && <CustomizedTables rows={datos} />} 
        </div>
    );
}

export default Index;
