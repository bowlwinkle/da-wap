import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducer.js';

let debug = (window.location.hostname === "localhost");
let middleWare = {};

if (debug){
	middleWare = compose((window.devToolsExtension ? window.devToolsExtension() : f => f));
}

let store = createStore(
  reducer,
  middleWare
);

export default store;
