import React from 'react';
import * as Notifications from "expo-notifications";

export async function schedulePushNotification(body, data) {
    const id  =  await Notifications.scheduleNotificationAsync({
      content: {
        title: "Please Rate your previous trip",
        body: body,
        data: { data: data },
      },
      trigger: { seconds : 60 },
    }).then((id) => {
      console.log("Notification scheduled for the user to rate last trip: ", id);
    });
    return id
}


export async function cancelNotification(notifId){
    await Notifications.cancelScheduledNotificationAsync(notifId);
  }