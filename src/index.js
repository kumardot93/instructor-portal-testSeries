import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Store from './redux/Store.js';
import { Provider } from 'react-redux';

window.base = '';
window.media_url = window.base + '/media/';
// window.media_url = 'https://eduhub.blob.core.windows.net/eduhub/';
window.cred = 'same-origin';

ReactDOM.render(
	<React.StrictMode>
		<Provider store={Store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
