import m from 'mithril';
import isToday from 'date-fns/is_today';
import format from 'date-fns/format';
import addDays from 'date-fns/add_days';
import Pikaday from 'pikaday';
import utils from './utils';

export default {
  picker: null,
  date: new Date(),
  button: null,
  oninit(vnode) {
    if (vnode.attrs.date) {
      vnode.state.date = vnode.attrs.date;
    }
  },
  onbeforeupdate(vnode) {
    if (vnode.attrs.date && vnode.attrs.date !== vnode.state.date) {
      vnode.state.date = vnode.attrs.date;
      vnode.state.button.innerText = utils.apiDateFormat(vnode.state.date);
    }
  },
  oncreate(vnode) {
    /* global document */
    const button = document.createElement('button');
    button.innerText = utils.apiDateFormat(new Date());
    button.type = 'button';
    button.classList = 'btn btn-light has-cursor';

    vnode.state.button = button;

    vnode.dom.querySelector('#picker').appendChild(button);

    vnode.state.picker = new Pikaday({
      field: button,
      onSelect() {
        button.innerText = utils.apiDateFormat(this.getDate());
        vnode.state.date = this.getDate();
        vnode.attrs.callback(vnode.state.date);
      },
      showWeekNumber: true,
      firstDay: 1,
      yearRange: 1,
    });

    vnode.state.picker.setDate(vnode.attrs.date);
  },
  view(vnode) {
    const setDate = (newDate) => {
      vnode.state.date = newDate;
      vnode.state.picker.setDate(newDate);
    };
    const changeDate = days => addDays(vnode.state.date, days);
    const incrementDate = () => {
      setDate(changeDate(1));
    };
    const decrementDate = () => {
      setDate(changeDate(-1));
    };

    const todayFilter = (today, date) => {
      if (isToday(vnode.state.date)) {
        return today;
      }
      if (isToday(date)) {
        return 'Today';
      }
      return format(date, 'ddd Do');
    };

    return m('div.text-center', [
      m('button.btn.btn-light.has-cursor', { onclick: decrementDate }, todayFilter('Yesterday', changeDate(-1))),
      m('span#picker.mx-2.mx-sm-5'),
      m('button.btn.btn-light.has-cursor', { onclick: incrementDate }, todayFilter('Tomorrow', changeDate(1))),
    ]);
  },
};
