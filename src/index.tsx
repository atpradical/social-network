import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SamuraiJSApp from './App';
import {HashRouter} from "react-router-dom";
import {store} from "./redux/redux-store";
import {Provider} from "react-redux";


const rerenderEntireTree = () => {
    ReactDOM.render(
            <HashRouter>
                <Provider store={store}>
                    {/*<App />*/}
                    <SamuraiJSApp />
                </Provider>
            </HashRouter>,
        document.getElementById('root')
    );
}
rerenderEntireTree()

store.subscribe(() => {
    rerenderEntireTree()
})