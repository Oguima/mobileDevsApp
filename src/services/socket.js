import socketio from 'socket.io-client';

const socket = socketio('http://192.168.126.75:3333',
{
    autoConnect: false,
}); //endereço do back...

function subscribeToNewDevs(subscribeFunction) {
    socket.on('new-dev', subscribeFunction);
}

function connect(latitude, longitude, techs) {
    socket.io.opts.query = {
        latitude,
        longitude,
        techs,
    };

    socket.connect();

    socket.on('message' , text => {
        console.log(text);
    });
}

function disconnect() {
    if (socket.connected) {
        socket.disconnect();
    }
}

//Disponível para quem importar o socket.js ...
export {
    connect,
    disconnect,
    subscribeToNewDevs,
}