export const getDaysArray = function(start, end) {

    let endDate = new Date(end)
    let date = new Date(start)

    const arr = [new Date(date.getTime()+ ((24) * 60 * 60 * 1000))]

    while (date < endDate) {
        date.setDate(date.getDate()+1);
        arr.push(new Date(date.getTime()+ ((24) * 60 * 60 * 1000)));
    }

    return arr;
};
