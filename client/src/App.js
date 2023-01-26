import './App.css';
import OutputBox from './OutputBox';
import React, { useState } from 'react';
import * as functions from "./functions.js"
import axios from 'axios'

function App() {
  //define state variables
  const [cargo, setCargo] = useState('');
  const [acceleration, setAcceleration] = useState('');
  const [takeoff_time, setTakeOffTime] = useState('');
  const [takeoff_distance, setTakeOffDistance] = useState('');
  const [excess_cargo, setExcessCargo] = useState('');
  const [date, setDate] = useState();
  const [message, setMessage] = useState('');


  //send the data to /insert-data in order to store it in the db
  const insertData = (
    newTakeOffTime,
    newTakeOffDistance,
    newExcessCargo,
    cargo
  ) => {
    axios
      .post("http://localhost:3001/insert-data", {
        takeoff_time: newTakeOffTime.toString(),
        takeoff_distance: newTakeOffDistance.toString(),
        excess_cargo: newExcessCargo.toString(),
        cargo: cargo.toString(),
      })
      .then(() => {
        console.log("success");
      })
      .catch((error) => {
        console.error(error);
      });
  };




  //get the cargo data
  //return if the input is valid 
  const validInput = (cargo) => {
    
    if (cargo < 0 || isNaN(cargo)) {
      alert("invalid input!");
      return false;
    }
    else {
      return true;
    }

  }
  
 //A function that centralizes the actions
 const handleData = () => {
  if (validInput(cargo)) {
    //update the variables every time it change
    const newAcceleration = functions.getAcceleration(cargo);
    const newTakeOffTime = functions.getTakeOffTime(cargo);
    const newTakeOffDistance = functions.getTakeOffDistance(cargo);
    const newExcessCargo = functions.getExcessCargo(cargo);

    setAcceleration(newAcceleration);
    setTakeOffTime(newTakeOffTime);
    setTakeOffDistance(newTakeOffDistance);
    setExcessCargo(newExcessCargo);

    //call the insert function
    insertData(newTakeOffTime, newTakeOffDistance, newExcessCargo, cargo);
  }
};

 //asynchronous func to handle the date data
const handleDate = async () => {
  try { //make a post request to send date data to the back-end
    const response = await axios.post("http://localhost:3001/date-picker", { date });
    setMessage(response.data); //set the changed value to the current variable
  }catch(error){ //trying to catch errors
    console.log(error);
  }
  
}


//prints to the web the data
  return (
    <div className='App'>
      <div className='data'>

    <h1>Shimshon physics calculator</h1>
    <label>Enter cargo weight:</label>
    <input type="number"  value={cargo} onChange={ (event) => {setCargo(event.target.valueAsNumber)}}/>

    <button onClick={handleData}>Send data</button>

    <OutputBox text={`Acceleration: ${acceleration}`} />
    <OutputBox text={`Takeoff Time: ${takeoff_time}`} />
    <OutputBox text={`Takeoff Distance: ${takeoff_distance}`} />
    <OutputBox text={`Excess Cargo: ${excess_cargo}`} />
    

    
    <br />
    <label>Enter flight date:</label>
    <input type= "date" value={date} onChange={(event) => { setDate(event.target.value) }} />
    <button onClick={handleDate}>Send date</button>

    <OutputBox text={`you ${ message } able to filght`} />
      </div>
    </div>
  );
}

export default App;


/*
  console.log(acceleration + " " + typeof acceleration);
  console.log(takeoff_time + " " + typeof takeoff_time);
  console.log(takeoff_distance + " " + typeof takeoff_distance);
  console.log(excess_cargo + " " + typeof excess_cargo);
  console.log(cargo + " " + typeof cargo);
*/

