const express = require('express'); 
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const {fileURLToPath} = require('url');
const history = require('connect-history-api-fallback');

//Inicialización
const app = express(); 

app.set('puerto', process.env.PORT || 4000); 

//Midlewares 
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json()); //para que entienda formato json
//application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); // para que entienda formularios y los guarde en 

//Midlewares rutas vue (siempre tiene que estar debajo de las rutas)
app.use(history());
//Archivos Estáticos 

const serveStatic = require('serve-static')
const staticFileMiddleware = express.static(path.join(__dirname + '/dist'));
app.use(staticFileMiddleware);
app.get('/', function (req, res) {
  res.render(path.join(__dirname + '/dist'));
});

app.listen(3000, function () {
    console.log(path.join(__dirname + '/dist'))
  console.log('Example app listening on port 4000!');
});