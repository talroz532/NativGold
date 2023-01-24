const func = require('./parser.js');
const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const https = require('https');

//alows make requests from front to back end
app.use(cors());

app.use(express.json());

//connect to mysql db
const db = mysql.createConnection({
  host: process.env.MYSQL_HOST_IP,
  user: 'root',
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port : 3306
});


//create post request to get data from frontend to backend and insert it to the db
app.post('/insert-data',(req, res) =>{

  //taking the values from the frontend variables
  const takeoff_time = req.body.takeoff_time;
  const takeoff_distance = req.body.takeoff_distance;
  const excess_cargo = req.body.excess_cargo;
  const cargo = req.body.cargo;

  //inserting the data into the db
  const sqlInsert = "INSERT INTO shimshondata (takeoff_time, takeoff_distance, excess_cargo, cargo) VALUES (?, ?, ?, ?)";
  db.query(sqlInsert, [takeoff_time, takeoff_distance, excess_cargo, cargo],
     (err, result) =>{
      if(err){
        console.log(err); //prints if error
      }
      else{
        res.send("Inserted successfuly");
      }
      
  });
});





//A function to get the date data from the front end and send a response if you can fly
app.post('/date-picker',(req, res) =>{

  //taking the value date from the frontend date-picker
  const date = (req.body.date).toString();

  //set the url-api to the current date
  let url = `https://api.open-meteo.com/v1/forecast?latitude=30&longitude=35&hourly=temperature_2m&start_date=${date}&end_date=${date}`;

  //makes a GET request to the specified URL and get response from the api
  https.get(url, (response) => {

    //get the json data from the url-api 
    response.on('data', (data) => {
        let weatherData = JSON.parse(data); //parse the json file
        const temperatureString = JSON.stringify(weatherData.hourly.temperature_2m); //convert the temperature_2m to string
  
        const temperatureArr = func.parser(temperatureString); //convert the string to array of numbers
        const inRange = func.isRange(temperatureArr); //check if the temperature is between 15-30c

        //send to the front end the results
        if(inRange == true){
          res.send("are ");
        }else{
          res.send("are not ");
        }
        
    });
  });


});

//listening to the port 3001
app.listen(process.env.REACT_APP_SERVER_PORT, () =>{
console.log("server is running successfuly on port "+ process.env.REACT_APP_SERVER_PORT);
});