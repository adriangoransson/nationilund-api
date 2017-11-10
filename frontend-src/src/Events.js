import m from 'mithril';

import Event from './Event';
import config from './config';

const Events = {
  list: [],
  error: '',
  loading: false,

  load() {
    Events.loading = true;

    const req = m.request({
      url: config.API_URL,
      method: 'GET',
    });

    req.then((resp) => {
      Events.loading = false;
      Events.list = resp.filter(data => data.organizer.name.match('Nation')).map(data => Event(data));
    });

    req.catch((err) => {
      Events.loading = false;
      Events.error = err.message;
    });
  },
};

export default Events;