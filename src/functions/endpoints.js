const endpointLeft = {
  endpoint: ["Dot", { radius: 4 }],
  anchor: ["LeftMiddle"],
  isTarget: true,
  connectionType: "flow",
  paintStyle: { fill: "black" },
};
const endpointRight = {
  endpoint: ["Dot", { radius: 4 }],
  anchor: ["RightMiddle"],
  isSource: true,
  connectionType: "flow",
  paintStyle: { fill: "black" },
};
const severalEndpointsLeft = {
  endpoint: ["Dot", { radius: 4 }],
  anchor: ["LeftMiddle"],
  isTarget: true,
  connectionType: "flow",
  paintStyle: { fill: "black" },
  maxConnections: 5,
};
const severalEndpointsRight = {
  endpoint: ["Dot", { radius: 4 }],
  anchor: ["RightMiddle"],
  isSource: true,
  connectionType: "flow",
  paintStyle: { fill: "black" },
  maxConnections: 5,
};

export const createEndpoints = (instance, id, type) => {
  switch (type) {
    case "Start":
      instance.addEndpoint(id, endpointRight);
      break;
    case "End":
      instance.addEndpoint(id, endpointLeft);
      break;
    case "Distributor":
      instance.addEndpoint(id, severalEndpointsRight);
      instance.addEndpoint(id, endpointLeft);
      break;
    case "Collector":
      instance.addEndpoint(id, severalEndpointsLeft);
      instance.addEndpoint(id, endpointRight);
      break;
    case "Default":
      instance.addEndpoint(id, endpointRight);
      instance.addEndpoint(id, endpointLeft);
      break;
    default:
      instance.addEndpoint(id, endpointRight);
      instance.addEndpoint(id, endpointLeft);
      break;
  }
};
