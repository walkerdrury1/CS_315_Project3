import { combineReducers } from "redux";
import pageReducer from "./pageReducer";
import comboReducer from "./comboReducer";

export default combineReducers({
    page: pageReducer,
    combo: comboReducer,
});
