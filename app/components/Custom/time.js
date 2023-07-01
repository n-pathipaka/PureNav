import {React} from 'react';
import { useEffect, useState } from 'react';
import {View} from 'react-native';
import moment from 'moment';
import { GOOGLE_MAP_KEY } from '../../constants/GoogleApiKey';



export const formatAddress = (address) => {
    if (address == undefined)
        return "";
    else
    {
        let x = address.split(",")

        // remove space in x[2].
        x[2] = x[2].replace(/ /g, '')
        //x[4] = x[4].replace(/ /g, '')
        return x[2]+","+x[3]//+","+x[4]
    }
}

// get current time in yyyy-mm-dd hh:mm:ss format.
export const getCurrentTime = () => {
    let date = new Date();
    return moment(date).format('YYYY-MM-DD HH:mm:ss');
}

// compare with the current time and return whether it is greater or less than the current time.
export const compareWithCurrentTime = (time) => {
    let date = new Date();
    let currentTime = moment(date).format('YYYY-MM-DD HH:mm:ss');
    return moment(time).isAfter(currentTime);
}

// convert seconds to hrs:mins format.
export const convertSecondsToHrsMins = (sec) => {
    let hrs = Math.floor(sec / 3600);
    let mins = Math.floor((sec - (hrs * 3600)) / 60);
    let secs = sec - (hrs * 3600) - (mins * 60);
    if (hrs < 1) { hrs = "0" + hrs; }
    if (mins < 1) { mins = "0" + mins; }
    if (secs < 1) { secs = "0" + secs; }
    return hrs + 'h:' + mins + 'm:' + secs + 's'; 
}

// convert time tO ISO format.
export const convertTimeToISO = (time) => {
    return moment(time).format('YYYY-MM-DDTHH:mm:ss');
}

// get the difference between current time and given time in hours and minutes format.
export const getDifference = (time) => {
    let currentTime = getCurrentTime();
    //console.log("check current time ", currentTime)
    let x = moment(convertTimeToISO(time)).format("YYYY-MM-DD HH:mm:ss")
    // calculate time difference between x and current time moment in hrs and minutes.
    let diff = moment.duration(moment(x).diff(moment(currentTime)));
    return returnFormattedTime(diff);
    
}

export const getDuration = (time) => {
    let currentTime = getCurrentTime();
    //console.log("check current time ", currentTime)
    let x = moment(time).format("YYYY-MM-DD HH:mm:ss")
    // calculate time difference between x and current time moment in hrs and minutes.
    let diff = moment.duration(moment(currentTime).diff(moment(x)));
    return returnFormattedTime(diff);
}

const returnFormattedTime = (diff) => {
    let days = diff.days();
    let hours = diff.hours();
    let minutes = diff.minutes();
    let seconds = diff.seconds();
    if (days > 0) {
        return days + "d:" + hours + "h:" + minutes + "m:" + seconds + "s";
    }
    else if (hours > 0) {
        return hours + "h:" + minutes + "m:" + seconds + "s";
    }
    else if (minutes > 0) {
        return minutes + "m:" + seconds + "s";
    }
    else{
        return hours + "h:" + minutes + "m:" + seconds + "s";
    }

}


export const convertTime = (time) => {
    // append :00 to the time.
    let x = time.split(":")
    let y = x[0] + ":" + x[1] + ":00"
    // remove last three characters from y.
    
    return y;
}

export const getUniqueId = () => {
    //get current time in epoch.
    let date = new Date();
    let epoch = date.getTime();
    return epoch
}


// function that returns current date in the format DD MMM, YYYY
export const getDate = () => {
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let date = new Date();
    let day = date.getDate();
    let month = months[date.getMonth()];
    let year = date.getFullYear();
    return day + " " + month + ", " + year;
}

// function that returns street name from  latitute and longitude.
export const getStreetName = async (latitude, longitude) => {
    let url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitude + "," + longitude + "&key=AIzaSyC5nKmaprWyKGrm2zyPj7aHWPLBqFpySmw" ;
    try {
        const response = await fetch(url);
        const responseJson = await response.json();
        //console.log(responseJson.results[0].formatted_address.split(",")[0]);
        return responseJson.results[0].formatted_address.split(",")[0];
    } catch (error) {
        console.log(error);
    }
}

// function to calculate month num to month name.
export const getMonthName = (monthNum) => {
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months[monthNum];
}

// function to calculate Date to Nov 12, 2019 format.
export const calculateDate = (date) => {
    let x = date.split(" ");
    let y = x[0].split("-");
    let z = getMonthName(parseInt(y[1])-1) + " " + y[2] + ", " + y[0];

    return z;
}

















