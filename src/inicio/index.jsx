import React from 'react';
import '../components/css/inicio.css';
import Grid from '@mui/material/Unstable_Grid2';
import { Link } from 'react-router-dom';

function index() {
    return (
        <div>
            <>
                <h1 style={{ textAlign: 'center' }}> Bienvenido!!</h1>
                <h3 style={{ textAlign: 'center' }}> ¿Qué método desea realizar?</h3>

                <div className='container'>

                    <Grid sx={{ boxShadow: '0px 1px 3px #10b7ec', height: '200px', maxWidth: '200px', alignContent: 'center', display: 'grid' ,position:'relative',left:'120px'}}>
                        <h4 style={{ textAlign: 'center' }} >Bisección</h4>
                        <Link to="/biseccion" style={{ textDecoration: 'none' }}>
                            <button className='boton'> Ir </button>
                        </Link>
                    </Grid>

                    <Grid sx={{ boxShadow: '0px 1px 3px #10b7ec', height: '200px', maxWidth: '200px', alignContent: 'center', display: 'grid',position:'relative',left:'80px' }}>
                        <h4 style={{ textAlign: 'center' }}>False Position</h4>
                        <Link to="/falseposition" style={{ textDecoration: 'none' }}>
                            <button className='boton'> Ir </button>
                        </Link>
                    </Grid>

                    <Grid sx={{ boxShadow: '0px 1px 3px #10b7ec', height: '200px', maxWidth: '200px', alignContent: 'center', display: 'grid' ,position:'relative',left:'80px'}}>
                        <h4 style={{ textAlign: 'center' }}>Raphson</h4>
                        <Link to="/raphson" style={{ textDecoration: 'none' }}>
                            <button className='boton'> Ir </button>
                        </Link>
                    </Grid>

                    <Grid sx={{ boxShadow: '0px 1px 3px #10b7ec', height: '200px', maxWidth: '200px', alignContent: 'center', display: 'grid' ,position:'relative',left:'120px'}}>
                        <h4 style={{ textAlign: 'center' }}>Secant Method</h4>
                        <Link to="/secantmethod" style={{ textDecoration: 'none' }}>
                            <button className='boton'> Ir </button>
                        </Link>
                    </Grid>
                </div>
            </>
        </div>
    )
}

export default index;
