import m from 'mithril';
import Events from './Events';
import DateBar from './DateBar';

const View = {
  filter: true,
  oninit: Events.load,
  view(vnode) {
    let data = Events.list;

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
    }

    const loadingIndicator = m.trust('<div class="loader loader--style3" title="2"> <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="40px" height="40px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve"> <path fill="#000" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"> <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite"/> </path> </svg> </div>');

    return m('div', [
      m(DateBar),
      m('.events.container', [
        Events.loading ? loadingIndicator : [
          data.map(event => m(event)),
        ],
      ]),
    ]);
  },
};

/* global document */
const root = document.querySelector('#events-list');
m.mount(root, View);
