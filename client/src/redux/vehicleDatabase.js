import axios from 'axios';

function setVehicleDatabase(vehicleDatabase) {
    return {
        type: "SET_VEHICLE_DATABASE",
        vehicleDatabase
    }
}

export function getVehicles() {
    return dispatch => {
        axios.get('http://localhost:5800/vehicle')
            .then(res => {
                dispatch(setVehicleDatabase(res.data))
            }).catch(err => console.log(err))
    }
}

export function getVehicle(id) {
    return dispatch => {
        axios.get(`http://localhost:5800/vehicle/:${id}`).then(res => {
            dispatch(setVehicleDatabase(res.data))
        }).catch(err => console.log(err))
    }
}

export function addVehicle(vehicle) {
    return dispatch => {
        axios.post('http://localhost:5800/vehicle', vehicle).then(res => {
            dispatch(getVehicles())
        }).catch(err => console.log(err))
    }
}

export default function reducer(vehicleDatabase = [], action) {
    switch(action.type) {
        case "SET_VEHICLE_DATABASE":
            return action.vehicleDatabase
        default: 
            return vehicleDatabase
    }
}