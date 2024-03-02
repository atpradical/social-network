import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {store} from './redux/redux-store'
import {storeOld} from './redux/store'
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {StateType} from "./redux/store";

const rerenderEntireTree = (state: StateType) => {
    ReactDOM.render(
        <BrowserRouter>
            <App state={storeOld.getState()} dispatch={storeOld.dispatch.bind(storeOld)} store={storeOld}/>
        </BrowserRouter>,
        document.getElementById('root')
    );
}
rerenderEntireTree(store.getState())

storeOld.subscribe(()=>{
    let state = store.getState()
    rerenderEntireTree(state)
})