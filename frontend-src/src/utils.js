function padNumber(n) {
  return (n < 10 ? '0' : '') + n;
}

function apiDateFormat(date) {
  const offset = date.getTimezoneOffset() / 60;
  date.setHours(date.getHours() - offset);

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

function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/(ä|å)/g, 'a')
    .replace(/ö/g, 'o')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

function intersperse(arr, el) {
  const res = [];
  let i = 0;

  if (i < arr.length) {
    res.push(arr[i + 1]);
    i += 1;
  }

  while (i < arr.length) {
    res.push(el, arr[i + 1]);
    i += 1;
  }

  return res;
}

export default {
  apiDateFormat,
  formatHours,
  diffTime,
  slugify,
  intersperse,
};
