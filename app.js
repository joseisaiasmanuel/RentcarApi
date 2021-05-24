var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var clientsRouter = require('./src/routes/clientes_router');
var viaturasRouter = require('./src/routes/viaturas_router');
var reservasRouter = require('./src/routes/reservas_router');
const api = require('./services/api');





var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/cliente', clientsRouter);
app.use('/api/viatura', viaturasRouter);
app.use('/api/reserva', reservasRouter);



app.get('/api/cars', async(req, res) => {
    try {
        const { data } = await api.get('/cars')

        res.send(data)


    } catch (error) {
        res.send({ error: error.message })
    }
})

// metodo para buscar uma api externa

app.get('/api/carros', async (req,res)=>{
    try {
        const {data} = await api.get('/api/carros');
        return res.send({foto: data.foto});

    }catch(error){
    res.send({error:error.message});
    }
}  );



module.exports = app;