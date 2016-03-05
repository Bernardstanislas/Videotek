import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';
import Root from './components';
import Devtools from './components/devtools';
import './transmission';


const App = (
    <Provider store={store}>
        <div>
            <Root />
            <Devtools/>
        </div>
    </Provider>
);

ReactDom.render(App, document.getElementById('react-root'));
