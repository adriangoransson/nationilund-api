function formatDate(date) {
  let month = date.getMonth() + 1;
  let day = date.getDate();

  month = (month < 10 ? '0' : '') + month;
  day = (day < 10 ? '0' : '') + day;

  return `${day}/${month}`;
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
  formatDate,
  formatHours,
  diffTime,
};
