export const schedules2Dates = () => {
    let dates = [];
    Schedules.map(({ date }) => { dates.push(new Date(date)); });
    return dates;
}

export const date2String = date => {
    let string = false;

    if(date instanceof Date)
        string = date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();

    return string;
}