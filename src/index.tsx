import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SamuraiJSApp from './App';
import {BrowserRouter, HashRouter} from "react-router-dom";
import {store} from "./redux/redux-store";
import {Provider} from "react-redux";

//todo: change surround to <HashRouter>
const rerenderEntireTree = () => {
    ReactDOM.render(
            // <BrowserRouter>
            <HashRouter>
                <Provider store={store}>
                    {/*<App />*/}
                    <SamuraiJSApp />
                </Provider>
            {/*</BrowserRouter>,*/}
            </HashRouter>,
        document.getElementById('root')
    );
}
rerenderEntireTree()

store.subscribe(() => {
    rerenderEntireTree()
})