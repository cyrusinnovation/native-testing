export default class MockStore {
  constructor(state = {}) {
    this.dispatchedActions = [];
    this.listeners = [];
    this.state = state;
  }

  getState() {
    return this.state;
  }

  dispatch(action) {
    this.dispatchedActions.push(action);
  }

  subscribe(listener){
    this.listeners.push(listener)
  }

  actionsDispatched() {
    return this.dispatchedActions;
  }

  getListeners(){
    return this.listeners;
  }
}

