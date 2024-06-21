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
      if (!state.connections.has(con1)) {
        state.connections.set(con1, []);
      }
      state.connections.get(con1).push(con2);
    },
    removeConnection: (con1) => {
      state.connections.delete(con1);
    },
    removeConnectionValue: (value) => {
      for (let [key, values] of state.connections) {
        const newValues = values.filter((val) => val.pipeId !== value);
        if (newValues.length === 0) {
          state.connections.delete(key);
        } else {
          state.connections.set(key, newValues);
        }
      }
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
