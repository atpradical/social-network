import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SamuraiJSApp from './App';
import {BrowserRouter} from "react-router-dom";
import {store} from "./redux/redux-store";
import {Provider} from "react-redux";


const rerenderEntireTree = () => {
    ReactDOM.render(
            <BrowserRouter>
                <Provider store={store}>
                    {/*<App />*/}
                    <SamuraiJSApp />
                </Provider>
            </BrowserRouter>,
        document.getElementById('root')
    );
}
rerenderEntireTree()

store.subscribe(() => {
    rerenderEntireTree()
})