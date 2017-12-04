import m from 'mithril';
import Events from './Events';
import Datepicker from './datepicker';

const dateCallback = (date) => {
  Events.load(date);
  m.redraw();
};

const View = {
  filter: true,
  oninit: Events.load,
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
            '.card text-center',
            m(
              '.card-header[style=cursor:pointer][title=Show]',
              { onclick: disableFilter },
              `${filtered} past events are hidden. Click to show.`,
            ),
          )
        );
      }
    }

    return m('div', [
      'Currently showing... ',
      m(Datepicker, { callback: dateCallback, el: 'span' }),
      Events.loading ? m('div.text-center', 'Loading') : [
        showMore,
        data.map(event => m(event)),
      ],
    ]);
  },
};

/* global document */
const root = document.querySelector('#events-list');
m.mount(root, View);
