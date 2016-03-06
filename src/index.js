import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, hashHistory} from 'react-router';
import store from './store';
import Root from './components';
import Devtools from './components/devtools';
import './transmission';
import Transmission from './components/transmission';

const App = (
    <Provider store={store}>
        <div>
            <Router history={hashHistory}>
                <Route path="/" component={Root}/>
                <Route path="/transmission" component={Transmission}/>
            </Router>
            <Devtools/>
        </div>
    </Provider>
);

ReactDom.render(App, document.getElementById('react-root'));
