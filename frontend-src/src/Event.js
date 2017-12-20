import m from 'mithril';
import utils from './utils';

function Event(data) {
  const dateStart = new Date(data.date.start);
  const dateEnd = new Date(data.date.end);

  let { started, ongoing } = utils.diffTime(dateStart, dateEnd);

  return {
    open: false,
    started,
    ongoing,
    data,

    view(vnode) {
      const event = vnode.state.data;

      ({ started, ongoing } = utils.diffTime(dateStart, dateEnd));

      const title = event.summary.toLowerCase().includes(event.organizer.name.toLowerCase()) ? event.summary : `${event.summary} | ${event.organizer.name}`;
      const description = utils.intersperse(event.description.split('\n'), m('br'));

      const startDate = utils.formatHours(dateStart);
      const endDate = utils.formatHours(dateEnd);

      const slug = utils.slugify(event.organizer.name);

      const openClass = this.open ? '.open' : '';

      return (
        m(`.single-event.${slug}${openClass}`, { onclick: () => { this.open = !this.open; } }, [
          m('.content', [
            m('p.time', `${startDate} – ${endDate}`),
            m('h1.title', title),
            m('span.plus'),
          ]),
          m('div.description', [
            m('p', description),
          ]),
        ])
      );
    },
  };
}

export default Event;
