import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {addPost, state, StateType, subscribe, updateNewPostText} from "./redux/state";
import App from './App';
import {BrowserRouter} from "react-router-dom";

const rerenderEntireTree = (state: StateType) => {
    ReactDOM.render(
        <BrowserRouter>
            <App state={state} addPost={addPost} updateNewPostText={updateNewPostText}/>
        </BrowserRouter>,
        document.getElementById('root')
    );
}
rerenderEntireTree(state)

subscribe(rerenderEntireTree)