import { Notifications, Permissions } from 'expo';

/**
 * @description Clears the local notification
 */
export const clearActivityReminderNotification = () => {
    Notifications.cancelAllScheduledNotificationsAsync();
}

/**
 * @description Creates the notification object
 */
export const createActivityReminderNotification = () => {
    return {
        title: 'Participate in a quiz',
        body: `You haven't participated in a quiz today`,
        ios: {
            sound: true,
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: 'false',
            vibrate: true,
        },
    };
}

/**
 * @description Schedules the local notification
 */
export const setActivityReminderNotification = () => {
    Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
        if (status === 'granted') {
            Notifications.cancelAllScheduledNotificationsAsync();

            const tomorrow = new Date();
            
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(tomorrow.getHours());
            tomorrow.setMinutes(tomorrow.getMinutes());

            Notifications.scheduleLocalNotificationAsync(
                createActivityReminderNotification(),
                {
                    time: tomorrow,
                    repeat: 'day',
                }
            );
        }
    });
}
