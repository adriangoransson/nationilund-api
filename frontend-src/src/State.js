const State = {
  modalOpen: false,
  openModal() {
    console.log('Open modal');
    this.modalOpen = true;
  },
  closeModal() {
    this.modalOpen = false;
  },
};

export default State;
