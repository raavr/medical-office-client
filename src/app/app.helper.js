export function transformDate(date) {
    return ('0' + (date.getMonth() + 1).toString()).substr(-2) 
            + '/' 
            + ('0' + date.getDate().toString()).substr(-2) 
            + '/' 
            + date.getFullYear().toString();
}