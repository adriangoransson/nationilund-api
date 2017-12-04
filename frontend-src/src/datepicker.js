import m from 'mithril';
import Pikaday from 'pikaday';
import utils from './utils';

export default {
  picker: null,
  date: null,
  oncreate(vnode) {
    /* global document */
    const button = document.createElement('button');
    button.innerText = `Today (${utils.apiDateFormat(new Date())})`;
    button.type = 'button';
    button.classList = 'btn btn-light';

    vnode.dom.appendChild(button);

    vnode.state.picker = new Pikaday({
      field: button,
      onSelect() {
        button.innerText = utils.apiDateFormat(this.getDate());
        vnode.state.date = this.getDate();
        vnode.attrs.callback(vnode.state.date);
      },
    });
  },
  view(vnode) {
    const el = vnode.attrs.el ? vnode.attrs.el : 'div';
    return m(el);
  },
};
