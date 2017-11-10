import m from 'mithril';

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

function Event(data) {
  const dateStart = new Date(data.date.start);
  const dateEnd = new Date(data.date.end);

  let { started, ongoing } = diffTime(dateStart, dateEnd);

  // Collapse initially if we are past the event start
  const collapsed = started && !ongoing;

  return {
    collapsed,
    started,
    ongoing,
    data,

    view(vnode) {
      const event = vnode.state.data;
      let cardTitle = '';
      let cardBody = null;

      // Check if the event has started or ended on every redraw
      ({ started, ongoing } = diffTime(dateStart, dateEnd));

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
              ` ${formatHours(dateStart)} - ${formatHours(dateEnd)}`,
            ),
          ),
          cardBody,
        )
      );
    },
  };
}

export default Event;
