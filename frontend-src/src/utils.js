function padNumber(n) {
  return (n < 10 ? '0' : '') + n;
}

function apiDateFormat(date) {
  const year = date.getFullYear();
  const month = padNumber(date.getMonth() + 1);
  const day = padNumber(date.getDate());

  return `${year}-${month}-${day}`;
}

function formatHours(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();

  hours = (hours < 10 ? '0' : '') + hours;
  minutes = (minutes < 10 ? '0' : '') + minutes;

  return `${hours}:${minutes}`;
}

function diffTime(dateStart, dateEnd) {
  const now = new Date();

  let started = false;
  let ongoing = false;

  if (now.getTime() > dateStart.getTime()) {
    started = true;

    if (now.getTime() < dateEnd.getTime()) {
      ongoing = true;
    }
  }

  return { started, ongoing };
}

export default {
  apiDateFormat,
  formatHours,
  diffTime,
};
