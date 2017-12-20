import m from 'mithril';
import moment from 'moment';
import 'moment/locale/sv';
import Events from './Events';
import DatePickerModal from './DatePickerModal';
import State from './State';

export default {
  selectedDate: moment(),
  setDate(date) {
    Events.selectedDate = date;
    Events.loadDelayed();
  },
  formatDate(date) {
    if (date.isSame(moment(), 'day')) {
      return 'Idag';
    }

    if (date.isSame(moment().subtract(1, 'days'), 'day')) {
      return 'Igår';
    }

    if (date.isSame(moment().subtract(2, 'days'), 'day')) {
      return 'Förrgår';
    }

    if (date.isSame(moment().add(1, 'days'), 'day')) {
      return 'Imorgon';
    }

    const diff = date.diff(moment(), 'days');
    if (diff < 6 && diff > 0) {
      date.locale('sv');
      return date.format('dddd');
    }

    return date.format('DD MMM');
  },
  view() {
    const previousDate = Events.selectedDate.clone().subtract(1, 'days');
    const nextDate = Events.selectedDate.clone().add(1, 'days');

    return m('.date-bar', [
      m('.container', [
        m(
          'a.date-picker-button',
          { onclick: () => State.openModal() },
          m('img', { src: 'assets/images/calendar.svg' }),
        ),
        m(DatePickerModal, { open: State.modalOpen }),
        m('.date-navigation', [
          m('.link-wrapper', [
            m('a.date.previous-date', { onclick: () => this.setDate(previousDate) }, this.formatDate(previousDate)),
            m('a.date.current-date', this.formatDate(Events.selectedDate)),
            m('a.date.next-date', { onclick: () => this.setDate(nextDate) }, this.formatDate(nextDate)),
          ]),
        ]),
      ]),
    ]);
  },
};
