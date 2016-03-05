import Transmission from './transmission';

const rpc = new Transmission({
    host: 'transmission.meowtsetung.com',
    port: 80
});

export const addUrl = rpc.addUrl.bind(rpc);
