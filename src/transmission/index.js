import Transmission from './transmission';
import {dispatch} from '../store';
import {refreshTransmissionStatus} from '../actions';

const rpc = new Transmission({
    host: 'transmission.meowtsetung.com',
    port: 80
});

export const refresh = () => rpc.active()
.then(results => results.torrents)

// // Update transmission status every 5s
// setInterval(() => {
//     rpc.sessionStats()
//     .then(status => dispatch(refreshTransmissionStatus(status)));
// }, 5000);
