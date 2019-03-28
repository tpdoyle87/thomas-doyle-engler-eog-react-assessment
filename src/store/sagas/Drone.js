import { takeEvery, call, put, cancel, all } from "redux-saga/effects";
import { delay } from "redux-saga";
import API from "../api";
import * as actions from "../actions";

function* delayApiCall() {
  yield call(delay, 3000);
}

function* watchFetchDroneLocation() {
  while (true) {
    const { error, data } = yield call(
      API.findDroneLocation
    );
    if (error) {
      yield put({ type: actions.API_ERROR, code: error.code, msg: "From your drone location API" });
      yield cancel();
      return;
    }
    yield put({ type: actions.LOCATION_DATA_RECIEVED, data: data });
    yield call(delayApiCall);
  }
}

function* watchAppLoad() {
  yield all([
    takeEvery(actions.FETCH_DRONE_LOCATION, watchFetchDroneLocation),
  ]);
}

export default [watchAppLoad];
