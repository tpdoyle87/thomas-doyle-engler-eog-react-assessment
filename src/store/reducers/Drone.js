import * as actions from "../actions";

const DroneLocationInitialState = {
  loading: false,
  timestamp: null,
  metric: null,
  lat: 32,
  lng: -92,
  uom: "",
  accuracy: null,
  data: {}
}

const startLoading = (state, action) => {
  return { ...state, loading: true };
};

const LocationDataRecieved = (state, action) => {
  const { data } = action.data;
  if (data === "Server communication Error") return state;
  const recentData = data[data.length - 1]
  const timestamp = recentData.timestamp;
  const lat = recentData.latitude;
  const lng = recentData.longitude;
  const metric = recentData.metric;

  return {
    ...state,
    loading: false,
    lat,
    lng,
    timestamp,
    metric,
    data: action.data
  }
}

const handlers = {
  [actions.FETCH_DRONE_LOCATION]: startLoading,
  [actions.LOCATION_DATA_RECIEVED]: LocationDataRecieved
};

export default (state = DroneLocationInitialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === "undefined") return state;
  return handler(state, action);
};
