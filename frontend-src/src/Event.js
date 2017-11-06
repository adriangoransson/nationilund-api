import m from 'mithril';
import moment from 'moment';

function diffTime(dateStart, dateEnd) {
  const now = moment();

  let started = false;
  let ongoing = false;
  if (now.diff(dateStart) > 0) {
    started = true;

    if (now.diff(dateEnd) < 0) {
      ongoing = true;
    }
  }

  return { started, ongoing };
}

function Event(data) {
  const dateStart = moment(data.date.start);
  const dateEnd = moment(data.date.end);

  const { started, ongoing } = diffTime(dateStart, dateEnd);

  return {
    // Collapse initially if we are past the event start
    collapsed: started && !ongoing,
    started,
    ongoing,
    data,

    view(vnode) {
      const event = vnode.state.data;
      let cardTitle = '';
      let cardBody = null;

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

      return (
        m(
          '.card.mt-3.md-3',
          m(
            `.card-header[style=cursor:pointer][title=${cardTitle}]`, { onclick: toggleCollapse },
            event.summary,
            m(
              '.float-lg-right', timeOpts,
              ` ${dateStart.format('HH:mm')} - ${dateEnd.format('HH:mm')}`,
            ),
          ),
          cardBody,
        )
      );
    },
  };
}

export default Event;
