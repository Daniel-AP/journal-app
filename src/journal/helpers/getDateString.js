export const getDateString = (time) => {

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    const retrievedTime = new Date(time);

    const retrievedMonth = months[retrievedTime.getMonth()];
    const retrievedDate = retrievedTime.getDate();
    const retrievedYear = retrievedTime.getFullYear();

    return `${ retrievedMonth } ${ retrievedDate }, ${ retrievedYear }`;

}