import { legacy_createStore as createStore, applyMiddleware } from "redux";
import reduser from "./reduser/reduser";
import thunk from 'redux-thunk'
import { composeWithDevTools } from "@redux-devtools/extension";







export const store = createStore(reduser,composeWithDevTools(applyMiddleware(thunk)))


