import React, { useState } from 'react';
import Geogebra from 'react-geogebra';
import '../css/metodos.css';
import { Link } from 'react-router-dom';

function Index() {
    const [equation, setEquation] = useState('');
    const [variable, setVariable] = useState('');
    const [x0, setx0] = useState('');
    const [datos, setDatos] = useState(null);
    const [raiz, setRaiz] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);

        const header = {
            'Content-Type': 'application/json'
        };
        const body = {
            "equation": equation,
            "variable": variable,
            "x0": parseFloat(x0)
        };

        fetch(`https://metodosnumericos-x5vj.onrender.com/raphson`, {
            method: 'POST',
            headers: header,
            body: JSON.stringify(body)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Respuesta de red incorrecta');
                }
                return response.json();
            })
            .then(data => {
                console.log('Respuesta del servidor:', data);
                
                if (!Array.isArray(data) || data.length !== 2) {
                    console.error('La respuesta del servidor no tiene el formato esperado:', data);
                    return;
                }
            
                const raiz = data[0];
                const resultados = data[1];
            
                if (!Array.isArray(resultados)) {
                    console.error('Los datos de las iteraciones no son un array:', resultados);
                    return;
                }

                const rows = resultados.map((resultado, index) => ({
                    iteracion: resultado.iteracion,
                    xa: resultado.x0,
                    xb: resultado.x1,
                    x: resultado.x,
                    fxp: resultado['f(x)']
                }));
                setDatos(rows);
                setRaiz(raiz);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error al obtener los datos:', error);
                setLoading(false);
            });
    };

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Raphson</h1>
            <h6 style={{ marginLeft: '20px' }}>Nomenclatura para las ecuaciones: x**n = x^n</h6>
            <form onSubmit={handleSubmit} className='contenedor'>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="equation" style={{ marginRight: '20px' }}>Ecuación:</label>
                    <input
                        type="text"
                        id="equation"
                        value={equation}
                        onChange={(e) => setEquation(e.target.value)}
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="variable" style={{ marginRight: '26px', marginBottom: '20px' }}>Variable:</label>
                    <input
                        type="text"
                        id="variable"
                        value={variable}
                        onChange={(e) => setVariable(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="x0" style={{ marginRight: '68px', marginBottom: '20px' }}>x0:</label>
                    <input
                        type="number"
                        id="x0"
                        value={x0}
                        onChange={(e) => setx0(e.target.value)}
                    />
                </div>
                <button type="submit" style={{ marginTop: '20px', marginLeft: '120px' }}>Enviar</button>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <button type="submit" style={{ position: 'relative', top: '50px', marginLeft: '-80px' }}>Regresar al inicio</button>
                </Link>
            </form>

            {equation && (
                <div style={{ width: '400px', height: '400px', margin: '0 auto', marginTop: '-160px' }}>
                    <Geogebra appletName="app1" width="400" height="400" settings={{ 'mode': 'expressions', 'border': 'none' }} />
                    <Geogebra script={`f(x) = ${equation}`} />
                </div>
            )}

            {loading && <p style={{ marginTop: '20px', textAlign: 'center' }}>Cargando...</p>}
            
            {datos && (
                <div style={{ marginTop: '20px' }}>
                    <h2>Resultados:</h2>
                    <table style={{ border: '1px solid black', borderCollapse: 'collapse', margin: '0 auto' }}>
                        <thead>
                            <tr>
                                <th>Iteración</th>
                                <th>x0</th>
                                <th>x1</th>
                                <th>x</th>
                                <th>f(x)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datos.map((resultado, index) => (
                                <tr key={index}>
                                    <td>{resultado.iteracion}</td>
                                    <td>{resultado.xa}</td>
                                    <td>{resultado.xb}</td>
                                    <td>{resultado.x}</td>
                                    <td>{resultado.fxp}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {raiz && <p style={{ textAlign: 'center', marginTop: '20px' }}>Raíz: {raiz}</p>}
                </div>
            )}
        </div>
    );
}

export default Index;
