const express = require('express'); //Library we gonna used to the server

const cors = require('cors');


const app = express(); // aplication
// Cuando se presiona enter a cualquier pagina web, se ejecuta un get request

app.use(cors()); // this line adds the cors headers to avoid errors
app.use(json());// to process incoming JSON files
app.get('/',(req, res) => { // Request and response of the Dynamic server
// app es el servidor
res.json({
    message: 'Response to your Request :333'
});

});

// Create a route that is waiting for the incoming data
// when the server receives a POST request on  /mews
app.post('/mews', (req,res) =>{
    console.log(req.body);
});

app.listen(5000, ()=>{// servidor escuchando por el puerto 5000
    console.log('Listening on http://localhost:5000');
});