import ReactDOM from 'react-dom';
import './index.css';
import {App} from './App';
import {addPost, StateType, updateNewPostText} from './redux/state'
import {BrowserRouter} from "react-router-dom";
import React from "react";


export const RerenderEntireTree = (state: StateType) => {
    ReactDOM.render(
        <BrowserRouter>
            <App state={state} addPost={addPost} updateNewPostText={updateNewPostText}/>
        </BrowserRouter>, document.getElementById('root')
    );
}
