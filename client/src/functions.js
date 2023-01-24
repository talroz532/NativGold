
const aircraft_engine_power = 100000 // power of the aircraft engine (N) (F in the formula)
const aircraft_weight = 35000// weight of the aircraft and the crew members (kg)
const aircraft_speed = 140; //The speed of the plane in meters per second (m/s)
const max_mass = 42857.142; //max mass that aircraft can carry

//func 1 - gets the cargo weight
//return take off Acceleration time 
export function getAcceleration(cargo){

    let total_mass = aircraft_weight + cargo; // total mass (m in the formula)
    let acceleration = aircraft_engine_power / total_mass // (a in the formula)

    return acceleration;
}

//func 2 - gets the cargo weight
//return take off distance (x in formula)
export function getTakeOffDistance(cargo){
    let acceleration = getAcceleration(cargo);
    let takeoff_time = getTakeOffTime(cargo);
    return ( (acceleration * Math.pow(takeoff_time,2))/2 + (aircraft_speed * takeoff_time) );
}

//func 3 - gets the cargo weight
//return take off time (t in the formula)
export function getTakeOffTime(cargo){
    return (aircraft_speed/getAcceleration(cargo));
}

//func 4 -  gets the cargo weight
//return excess cargo weight
export function getExcessCargo (cargo){
    if (cargo <= max_mass)
        return 0;

    return (cargo - max_mass);
}
