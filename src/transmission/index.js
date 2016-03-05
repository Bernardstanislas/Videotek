import Transmission from './transmission';

const rpc = new Transmission({
    host: 'transmission.meowtsetung.com',
    port: 80
});

rpc.sessionStats()
.then(console.log.bind(console));

export const addUrl = rpc.addUrl.bind(rpc);
