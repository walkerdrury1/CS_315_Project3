import { combineReducers } from "redux";
import pageReducer from "./pageReducer";
import comboReducer from "./comboReducer";
import itemReducer from "./itemReducer";
export default combineReducers({
    page: pageReducer,
    combo: comboReducer,
    items: itemReducer
});
