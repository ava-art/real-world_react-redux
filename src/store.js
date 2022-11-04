import { createStore } from "redux";
import reduser from "./reduser/reduser";
import { composeWithDevTools } from "@redux-devtools/extension";


export const store = createStore(reduser,composeWithDevTools())


