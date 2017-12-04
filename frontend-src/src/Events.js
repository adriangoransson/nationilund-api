import m from 'mithril';

import Event from './Event';
import config from './config';
import utils from './utils';

const Events = {
  list: [],
  error: '',
  loading: false,

  load(date = new Date()) {
    Events.loading = true;
    let url = config.API_URL;

    if (date !== null && date.toISOString) {
      const iso = utils.apiDateFormat(date);
      const todayIso = utils.apiDateFormat(new Date());

      // date appended routes are rate limited
      if (iso !== todayIso) {
        url += `/${iso}`;
      }
    }

    const req = m.request({
      url,
      method: 'GET',
      extract(xhr, options) {
        if (xhr.status === 200) {
          return options.deserialize(xhr.responseText);
        }

        return xhr;
      },
    });

    req.then((resp) => {
      Events.loading = false;
      Events.list = resp.filter(data => data.organizer.name.match('Nation')).map(data => Event(data));
    });

    req.catch((err) => {
      Events.loading = false;
      Events.error = err.status;
    });
  },
};

export default Events;
