import {React} from 'react';
import { convertSecondsToHrsMins, getDifference, calculateDate, compareWithCurrentTime } from './time';
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from 'moment';

export const startsAt = (address, lat, lng, description) => {
    let src = {}
    src.address  = address;  
    src.lat =   lat
    src.lng =   lng
    //appContext.currentLocation.description not equal to null then split
    if(description != null)
    {
        src.place_name =  description.split(",")[0]
        src.tags = src.place_name
    }
    return src

}


/*
*   Async set function to store the data for a given key
*
*/

export const asyncSet = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    }
    catch (e) {
        console.log(e);
    }
}

/*
*  Async get function to get the data for a given key
*
*/

export const asyncGet = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return value;
        }
    }
    catch (e) {
        console.log(e);
    }
}

/*
*   This function is used to create the next trip object 
*
*/

export const processNextTripDetails = (response, lattitude, longitude, description) => {


    let currentTrip = []
    for(let i =0; i < response['data']['Count']; i++)
    {
        let trip = response['data']['Item']
        if(trip['dst'] != null)
      {
            let trip_id = trip['id']
            let starts_at = {}
            let start_time =  getDifference(trip['suggested_start_time'])
            let timeStatus =  compareWithCurrentTime(trip['suggested_start_time'])
            let suggested_start_time = trip['suggested_start_time']
            if(trip['src'] != null)
                starts_at = trip['src']
            else
                {
                    let src = {}
                    src.address  = trip['src_addr'] 
                    src.lat =   lattitude
                    src.lng =   longitude
                    //appContext.currentLocation.description not equal to null then split
                    if(description != null)
                    {
                        src.place_name =  description.split(",")[0]
                        src.tags = src.place_name
                    }
                    starts_at = src
                }
                
            
            let ends_at = trip['dst']
            //let duration = (parseInt(trip['estimated_duration'])/60).toFixed(2)
            let duration = convertSecondsToHrsMins(trip['estimated_duration'])
        
            // convert duration to float.

            
            let quality = '20-Bad'
            let status =  timeStatus == true ? 'ON-TIME' : 'DELAYED'
            let srcAddress = trip['src_addr']
            let medium = trip['medium'][0]
            let trip_data = {id:trip_id, starts_at:starts_at, ends_at:ends_at, start_time:start_time, duration:duration, quality:quality, status:status, timeTaken:duration, srcAddress:srcAddress,medium:medium, suggested_start_time:suggested_start_time}
            
            
            currentTrip.push(trip_data) 
        }
    }

    return currentTrip

}



const formatDate = (date) => {
    let d  = date.split(" ")[1].split(":")
    return d[0] + ":" + d[1]
}
const difference = (date1, date2) => {
    return moment(date1, "HH:mm").diff(moment(date2, "HH:mm"), 'minutes') 
}


/*
*   This function is used to process the past trip details
*/

export const processPastTripDetails = (response) => {

    let pastTrips = []
        console.log("Past trips count", response['data']['Count'] )
        for(let i = 0; i < response['data']['Count'] ; i++){

            let trip = response['data']['Items'][i]
           if( trip['trip_status'] == 'COMPLETED' || (trip['trip_status'] == 'NOT_STARTED' && trip['missed']=="True" && trip['is_deleted']== false)) 
          {
            console.log("Past trips checking")
            let date=trip['started']
            if(date == null){
                date = trip['suggested_start_time']
            }
            let start_time = formatDate(date)

            //Scheduled arrival time
            let scheduled_arrival = formatDate(trip['scheduled_arrival'])
            

            let  status = trip['trip_status']
            let  end_time = '00:00'
            let  duration = 0
            let  earlierTime = 0
            let  arrivalDate = calculateDate(trip['scheduled_arrival'])
            

            if(status == 'COMPLETED')
            {
                
                // end time 
                end_time = formatDate(trip['arrived'])
                // duration
                duration = difference(end_time, start_time)
                //Earlier time
                earlierTime = difference(scheduled_arrival, end_time)
                if(earlierTime < 0){
                    earlierTime = 0
                }
                 //arrival date
                arrivalDate = calculateDate(trip['arrived'])
            }
            else if(status == 'NOT_STARTED' && trip['is_deleted'] == false && trip['missed']=="True")
                status = 'MISSED'
    
            //feedback
            let feedback = JSON.parse(trip['trip_feedback'])
            

            pastTrips.push( {"id": trip['id'], "src_addr": trip['src_addr'].split(",")[0], "dst": trip['dst']['place_name'], "status" : status,  "start_time" : start_time, "end_time": end_time, "dst_addr": trip['dst'], "arrival_date": arrivalDate, "trip_duration": duration, "earlier_time": earlierTime, 
                             "src_lat": trip['src_lat'], "src_lon": trip['src_lon'], "dst_lat": trip['dst']['lat'], "dst_lon": trip['dst']['lon'],"feedback": feedback,
                            "trip_data":  {id:trip['id'], starts_at: startsAt(trip['src_addr'], trip['src_lat'], trip['src_lon'], trip['src_addr']), ends_at: trip['dst']}
            })

        }

        }
    return pastTrips
}
