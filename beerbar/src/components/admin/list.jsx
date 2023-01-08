import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Skeleton from '@mui/material/Skeleton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ListaProductos from './ListaProductos';
import { NavLink } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import { NavLink } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import axios from 'axios';


// function generate(element, carta, props) {
//   return carta.map((value) =>
//     React.cloneElement(element, {
//       key: 1,
//       nombre: 'nombre pepe'
//     }),
//   );
// }


const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function InteractiveList({props, nombre}) {
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  const [carta, setcarta] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    fetch("http://localhost:3005/api/productos")
      .then((response) => response.json())
      .then((valores) => {
        setcarta(valores.result);
        setTimeout(() => {
          setLoading(false)
        }, 2000);
      })
      .catch(error => console.log(error))
  }, [loading])
  // console.log(carta);
  
  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={dense}
              onChange={(event) => setDense(event.target.checked)}
            />
          }
          label="Enable dense"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={secondary}
              onChange={(event) => setSecondary(event.target.checked)}
            />
          }
          label="Enable secondary text"
        />
      </FormGroup>
      <div className='btn-Crear'>
        <NavLink to="/admin/producto/crear"><button>Añadir Producto</button></NavLink>
      </div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Listado de Productos
          </Typography>
          <Demo>
            {loading ?
              <div>
                <Skeleton />
                <Skeleton animation="wave" />
                <Skeleton animation={false} />
              </div>

              :
              <List dense={dense}>
              {carta.map(value => (
              <ListaProductos
              id={value.id}
              link={`/admin/produco/detail/${value.id}`}
              to={`/admin/producto/editar/${value.id}`}
              nombre={value.nombre}
              detalle={value.detalle}
              secondary={secondary}
              />
              )
              )}
              </List>
            }
          </Demo>
        </Grid>
      </Grid>
    </Box>
  );
}