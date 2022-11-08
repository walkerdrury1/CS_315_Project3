import { combineReducers } from "redux";
import pageReducer from "./pageReducer";
import comboReducer from "./comboReducer";
import entreeCountReducer from "./countReducer";
export default combineReducers({
    page: pageReducer,
    combo: comboReducer,
    entreeCount: entreeCountReducer,
    //sideCount: sideCountReducer
});
