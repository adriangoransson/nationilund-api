import m from 'mithril';
import Events from './Events';

const View = {
  filter: true,
  oninit: Events.load,
  view(vnode) {
    let data = Events.list;
    let showMore;

    if (Events.loading) {
      return m('div.text-center', 'Loading...');
    }

    if (Events.error) {
      return m('.alert.alert-danger', Events.error);
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

    return (
      m(
        'div',
        showMore,
        data.map(event => m(event)),
      )
    );
  },
};

/* global document */
const root = document.querySelector('#events-list');
m.mount(root, View);
