export function toDate_mmddyyyy(date) {
    let dateArr = toDateArray(date);

    //swap day with month
    let dd = dateArr[0];
    dateArr[0] = dateArr[1];
    dateArr[1] = dd;

    return dateArr.join("/");
}

export function toDate_ddmmyyyy(date) {
   return toDateArray(date).join("/");
}

function toDateArray(date) {
  const mm = date.getMonth() + 1,
        dd = date.getDate();

  return [
          (dd>9 ? '' : '0') + dd,
          (mm>9 ? '' : '0') + mm,
          date.getFullYear()
         ];
}