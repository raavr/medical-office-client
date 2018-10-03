import { Observable } from 'rxjs/Observable';

export function toDate_mmddyyyy(date) {
  const dateArr = toDateArray(date);

  //swap day with month
  const dd = dateArr[0];
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
    (dd > 9 ? '' : '0') + dd,
    (mm > 9 ? '' : '0') + mm,
    date.getFullYear()
  ];
}

export function handleRequest(reqPromise) {
  return Observable.fromPromise(reqPromise)
    .map(res => res.data)
    .catch(error => Observable.throw(error));
}