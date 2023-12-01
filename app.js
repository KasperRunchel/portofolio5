//Kasper

const express = require('express');
const db = require('mysql2');

const app = express();
const port = 3000;

app.use(express.json());

const connection = db.createConnection({
    host:"localhost",
    user:"root",
    password:"Kd9qahda6p6#",
    database:"spot_port_5"
});

app.get('/spots',(req , res)=>{
    connection.query('SELECT * FROM spots',(error,results)=>{
        console.log("Virker!")
        res.send(results)
    });
});
//spot/search/1 shows spot with id 1
app.get('/spots/search/:spot_id',(req , res)=>{
    const spot_id_request = req.params.spot_id
    connection.query('SELECT * FROM spots where spot_id = ?',[spot_id_request],(error,results)=>{
        console.log("Virker!")
        res.send(results)
    });
});

//spot/search?city=klampenborg shows spot that are in klampenborg
app.get('/spots/search',(req , res)=>{
    const city_request = req.query.city
    console.log(city_request)
    connection.query('SELECT * FROM spots where city = ?',[city_request],(error,results)=>{
        console.log("Virker!")
        res.send(results)
    });
});



//user shows users
app.get('/user',(req , res)=>{
    connection.query('SELECT * FROM user',(error,results)=>{
        console.log("Virker!")
        res.send(results)
    });
});

app.get('/rating',(req , res)=>{
    connection.query('SELECT * FROM rating',(error,results)=>{
        console.log("Virker!")
        res.send(results)
    });
});


//user/1 shows user with user_id 1
app.get('/user/:user_id',(req , res)=>{
    const user_id_request = req.params.user_id
    connection.query('SELECT * FROM user where user_id = ?',[user_id_request],(error,results)=>{
        console.log("Virker!")
        res.send(results)
    });
});


//ex. post.
// {
// 	"email":"kasper@mail.dk",
// 	"password":"hejsa",
// 	"name":"Kasper"
// }
app.post('/new/user',(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;


    connection.query('insert into user (email, password, name) values (?,?,?)', [email, password, name])
    res.send("Successful POST request");
});



//ex. post.
// {
// 	"spot_address":"åbyvej 19",
// 	"city":"Skovlunde",
// 	"spot_name":"Åbyvej kartellet"
// }
app.post('/new/spot',(req,res)=>{
    const spotAddress = req.body.spot_address;
    const city = req.body.city;
    const spotName = req.body.spot_name;


    connection.query('insert into spots (spot_address, city, spot_name) values (?,?,?)', [spotAddress, city, spotName])
    res.send("Successful POST request");
});


app.listen(port, ()=>{
    console.log("Hey guys we are officially LIVE !!!!");
});