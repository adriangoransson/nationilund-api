import m from 'mithril';
import Pikaday from 'pikaday';
import Events from './Events';
import State from './State';

const Picker = {
  oncreate(vnode) {
    const picker = new Pikaday({
      onSelect: () => {
        Events.selectedDate = picker.getMoment();
        Events.loadDelayed();
        vnode.attrs.select();
      },
    });

    vnode.dom.appendChild(picker.el);
  },
  view() {
    return m('div');
  },
};

export default {
  view(vnode) {
    const openClass = vnode.attrs.open ? '.open' : '';

    return m(`div.date-picker-modal${openClass}`, [
      m(`.overlay${openClass}`, { onclick: () => State.closeModal() }),
      m(`.modal${openClass}`, [
        m(Picker, { select: () => State.closeModal() }),
      ]),
    ]);
  },
};
