import m from 'mithril';
import parse from 'date-fns/parse';
import Events from './Events';
import Datepicker from './datepicker';
import utils from './utils';

const dateCallback = (date) => {
  m.route.set(`/${utils.apiDateFormat(date)}`);
};

const View = {
  filter: true,
  dateString: null,
  date: new Date(),
  fetch(vnode) {
    if (vnode.state.dateString &&
        vnode.state.dateString.match(/^\d\d\d\d-\d\d-\d\d$/)) {
      vnode.state.date = parse(vnode.state.dateString);
    } else {
      m.route.set('/');
    }
    Events.load(vnode.state.date);
    m.redraw();
  },
  oninit(vnode) {
    vnode.state.dateString = vnode.attrs.date;
    vnode.state.fetch(vnode);
  },
  onupdate(vnode) {
    if (vnode.attrs.date !== vnode.state.dateString) {
      vnode.state.dateString = vnode.attrs.date;
      vnode.state.fetch(vnode);
    }
  },
  view(vnode) {
    let data = Events.list;
    let showMore;

    if (!Events.loading) {
      if (Events.error) {
        let message = '';
        switch (Events.error) {
          case 429:
            message = 'Whoa there, buddy! You are requesting data at speeds too great for this poor service. API error: "Rate limit exceeded."';
            break;
          case 503:
            message = 'Something bad happened behind the scenes, sorry about that! API error: "Internal fetching of data failed."';
            break;
          default:
            message = `Well. Something went wrong... HTTP status code: ${Events.error}`;
            break;
        }

        return m('.alert.alert-danger', message);
      }

      if (vnode.state.filter) {
        const filteredData = data.filter(event => event.ongoing || !event.started);

        // No point in hiding if every element is hidden
        if (filteredData.length) {
          data = filteredData;
        }
      }

      const disableFilter = () => {
        vnode.state.filter = false;
      };

      const filtered = Events.list.length - data.length;
      if (filtered) {
        showMore = (
          m(
            '.card text-center.my-3',
            m(
              '.card-header[style=cursor:pointer][title=Show]',
              { onclick: disableFilter },
              `${filtered} past ${filtered > 1 ? 'events are' : 'event is'} hidden. Click to show.`,
            ),
          )
        );
      }
    }

    return m('div', [
      m(Datepicker, { date: vnode.state.date, callback: dateCallback }),
      Events.loading ? m('div.text-center.my-3', 'Loading...') : [
        showMore,
        data.map(event => m(event)),
      ],
    ]);
  },
};

/* global document */
const root = document.querySelector('#events-list');
m.route(root, `/${utils.apiDateFormat(new Date())}`, {
  '/:date': View,
});
