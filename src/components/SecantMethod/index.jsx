import React, { useState } from 'react';
import Geogebra from 'react-geogebra';
import '../css/metodos.css';
import { Link } from 'react-router-dom';

function Index() {
    const [ecuacion, setEcuacion] = useState('');
    const [variable, setVariable] = useState('');
    const [x0, setX0] = useState('');
    const [x1, setX1] = useState('');
    const [iterations, setIterations] = useState([]);
    const [raiz, setRaiz] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        const header = {
            'Content-Type': 'application/json'
        };
        const body = {
            "ecuacion": ecuacion,
            "variable": variable,
            "x0":  parseFloat(x0),
            "x1":  parseFloat(x1)
        };

        fetch(`https://metodosnumericos-x5vj.onrender.com/secantMethod`, {
            method: 'POST',
            headers: header,
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then(data => {
                if (data.iterations) {
                    setIterations(data.iterations);
                    setRaiz(data.result);
                } else {
                    console.error('La propiedad "iterations" no está presente en los datos recibidos:', data);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Error al obtener los datos:', error);
                setLoading(false);
            });
    };

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Secant Method</h1>
            <h6 style={{ marginLeft: '20px' }}> Nomenclatura para las ecuaciones: x**n = x^n</h6>
            <form onSubmit={handleSubmit} className='contenedor'>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="ecuacion" style={{ marginRight: '31px' }}>Ecuación:</label>
                    <input
                        type="text"
                        id="ecuacion"
                        value={ecuacion}
                        onChange={(e) => setEcuacion(e.target.value)}
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="variable" style={{ marginRight: '38px', marginBottom: '20px' }}>Variable:</label>
                    <input
                        type="text"
                        id="variable"
                        value={variable}
                        onChange={(e) => setVariable(e.target.value)}
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="x0" style={{ marginRight: '78px', marginBottom: '20px' }} >x0:</label>
                    <input
                        type="number"
                        id="x0"
                        value={x0}
                        onChange={(e) => setX0(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="x1" style={{ marginRight: '78px', marginBottom: '20px' }} >x1:</label>
                    <input
                        type="number"
                        id="x1"
                        value={x1}
                        onChange={(e) => setX1(e.target.value)}
                    />
                </div>
                <button type="submit" style={{ marginTop: '20px', marginLeft: '120px' }}>Enviar</button>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <button type="submit" style={{ position: 'relative', top: '50px', marginLeft: '-80px' }}>Regresar al inicio</button>
                </Link>
            </form>

            {ecuacion && (
                <div style={{ width: '400px', height: '400px', margin: '0 auto', marginTop: '-160px' }}>
                    <Geogebra appletName="app1" width="400" height="400" settings={{ 'mode': 'expressions', 'border': 'none' }} />
                    <Geogebra script={`f(x) = ${ecuacion}`} />
                </div>
            )}

            {/* Mostrar tabla de iteraciones */}
            {iterations.length > 0 && (
                <div style={{ marginTop: '200px' }}>
                    <h2>Iteraciones:</h2>
                    <table style={{ border: '1px solid black', borderCollapse: 'collapse', margin: '0 auto' }}>
                        <thead>
                            <tr>
                                <th>Iteración</th>
                                <th>x0</th>
                                <th>x1</th>
                                <th>f(x0)</th>
                                <th>f(x1)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {iterations.map((iteration, index) => (
                                <tr key={index}>
                                    <td>{iteration.iteracion}</td>
                                    <td>{iteration.x0}</td>
                                    <td>{iteration.x1}</td>
                                    <td>{iteration['f(x0)']}</td>
                                    <td>{iteration['f(x1)']}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Mostrar raíz */}
            {raiz && (
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <h2>Raíz:</h2>
                    <p>{raiz}</p>
                </div>
            )}

            {loading && <p style={{ marginTop: '20px', textAlign: 'center' }}>Cargando...</p>}
        </div>
    );
}

export default Index;

