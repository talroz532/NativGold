import React , {useState } from "react";

//creating the input for date data
function DataPicker({text = "", onDate}){
    const [date, setDate] = useState();

    return(
        <>
        <br />
        <input type= "date" onChange={e => {
            setDate(e.target.value);
            onDate(e.target.value);
        }} 
        />
        <h4>You {text} able to flight at  {date} </h4>
        
        </>

    );
}

export default DataPicker;