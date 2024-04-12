import React, { useState } from 'react';
import Geogebra from 'react-geogebra';
import '../css/metodos.css';
import { Link } from 'react-router-dom';
import CustomizedTables from '../table/index'



function Index() {
    const [ecuacion, setEcuacion] = useState('');
    const [variable, setVariable] = useState('');
    const [x0, setx0] = useState('');
    const [datos, setDatos] = useState(null); 


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Ecuación:', ecuacion);
        console.log('variable:', variable);
        console.log('x0:', x0);

        fetch(`URL_DE_TU_API?ecuacion=${ecuacion}&variable=${variable}&x0=${x0}`)
        .then(response => response.json())
        .then(data => setDatos(data))
        .catch(error => console.error('Error al obtener los datos:', error));
    };

    return (
        <div  >
            <h1 style={{ textAlign: 'center' }}>Raphson</h1>
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
                    <label htmlFor="variable" style={{marginRight:'26px',marginBottom:'20px'}}>Variable:</label>
                    <input
                        type="number"
                        id="variable"
                        value={variable}
                        onChange={(e) => setVariable(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="x0" style={{marginRight:'68px',marginBottom:'20px'}} >x0:</label>
                    <input
                        type="number"
                        id="x0"
                        value={x0}
                        onChange={(e) => setx0(e.target.value)}
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
