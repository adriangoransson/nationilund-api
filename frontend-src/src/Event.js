import m from 'mithril';
import utils from './utils';

function Event(data) {
  const dateStart = new Date(data.date.start);
  const dateEnd = new Date(data.date.end);

  let { started, ongoing } = utils.diffTime(dateStart, dateEnd);

  return {
    collapsed: true,
    started,
    ongoing,
    data,

    view(vnode) {
      const event = vnode.state.data;
      let cardTitle = '';
      let cardBody = null;

      // Check if the event has started or ended on every redraw
      ({ started, ongoing } = utils.diffTime(dateStart, dateEnd));

      if (vnode.state.collapsed) {
        cardTitle = 'Show';
      } else {
        cardTitle = 'Hide';
        cardBody = [
          m(
            '.card-body',
            m(
              'h6.card-subtitle.mb-2.text-muted',
              `${event.organizer.name} - ${event.location}`,
            ),
            m(
              'p.card-text[style=white-space:pre-line]',
              event.description,
            ),
          ),
        ];
      }

      const toggleCollapse = () => {
        vnode.state.collapsed = !vnode.state.collapsed;
      };

      const timeOpts = {
        class: ongoing ? 'text-danger' : 'text-muted',
      };

      const startDate = utils.formatHours(dateStart);
      const endDate = utils.formatHours(dateEnd);

      return (
        m(
          '.card.my-3',
          m(
            `.card-header.has-cursor[title=${cardTitle}]`, { onclick: toggleCollapse },
            event.summary,
            m(
              '.float-lg-right', timeOpts,
              ` ${startDate} - ${endDate}`,
            ),
          ),
          cardBody,
        )
      );
    },
  };
}

export default Event;
