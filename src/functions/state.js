export const appState = (() => {
  let state = {
    beenPaused: false,
    connections: new Map([]),
    pipes: new Map([]),
  };

  return {
    getState: () => state,
    setBeenPaused: (beenPaused) => (state.beenPaused = beenPaused),
    addConnection: (con1, con2) => {
      state.connections.set(con1, con2);
    },
    removeConnection: (con1) => {
      state.connections.delete(con1);
    },
    getConnection: (con1) => {
      return state.connections.get(con1);
    },
    addPipe: (pipeId, pipeName) => {
      state.pipes.set(pipeId, pipeName);
    },
    removePipe: (pipeId) => {
      state.pipes.delete(pipeId);
    },
    getPipe: (pipeId) => {
      return state.pipes.get(pipeId);
    },
  };
})();
