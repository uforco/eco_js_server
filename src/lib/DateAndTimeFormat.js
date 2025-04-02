
export default async function DateAndTimeFormat (){
    const date = new Date();
    // Format the date to "Sun, Mar 24, 2022, 3:18 PM"
    const options = {
        weekday: 'short', // "Sun"
        year: 'numeric', // "2022"
        month: 'short', // "Mar"
        day: 'numeric', // "24"
        hour: '2-digit', // "3"
        minute: '2-digit', // "18"
        hour12: true // "PM"
    };
    // Get formatted date string
    const formattedDate = date.toLocaleString('en-US', options);
    return formattedDate
};