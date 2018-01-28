const State = {
  modalOpen: false,
  openModal() {
    this.modalOpen = true;
  },
  closeModal() {
    this.modalOpen = false;
  },
};

export default State;
