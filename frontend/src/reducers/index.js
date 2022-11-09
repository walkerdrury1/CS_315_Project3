import { combineReducers } from "redux";
import pageReducer from "./pageReducer";
import comboReducer from "./comboReducer";
import itemReducer from "./itemReducer";
import totalReducer from "./totalReducer";
export default combineReducers({
    page: pageReducer,
    combo: comboReducer,
    items: itemReducer,
    total: totalReducer
});
