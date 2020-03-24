const express = require('express'); //Library we gonna used to the server
// express is a framework
const cors = require('cors');
const monk = require('monk'); // library of mongoDB 

const app = express(); // application
// Cuando se presiona enter a cualquier pagina web, se ejecuta un get request

const db = monk('localhost/twitterDB');
const twitters = db.get('twitters'); //creating a collection

app.use(cors()); // this line adds the cors headers to avoid errors
app.use(express.json());// let the server process incoming JSON files
app.get('/',(req, res) => { // Request and response of the Dynamic server
// app es el servidor
res.json({
    message: 'Response to your Request :333'
});

});

function isValidMew(twitt) // verificar si lo que se recibio tiene informacion
{
    return twitt.name && twitt.name.toString().trim() !== '' &&
     twitt.content && twitt.content.toString().trim() !== '';
}

// Create a route that is waiting for the incoming data
// when the server receives a POST request on  /mews
app.post('/mews', (req,res) =>{

    if (isValidMew(req.body))
    {
        //insert into db..
        const twitter = {
            name : req.body.name.toString(),// convert to string in order to avoid errors
            content: req.body.content.toString(),
            created: new Date()
        };
        console.log(twitter);
        twitters
            .insert(twitter)// insert twitt into the DB
            .then(createdTwitt =>{
                res.json(createdTwitt);
            });


    }else{
        res.status(422);
        res.json({
            message: "El nombre y el contenido son requeridos"
        });
    }
});

app.listen(5000, ()=>{// servidor escuchando por el puerto 5000
    console.log('Listening on http://localhost:5000');
});

// a comment