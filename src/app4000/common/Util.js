
export default class Util{
    static getFormattedDate(date) {
        return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " + date.getHours() + ":" + String(date.getMinutes()).padStart(2, "0");
    }
}
