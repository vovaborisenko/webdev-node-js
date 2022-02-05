const EventEmitter = require('events');

class Logger extends EventEmitter {
    log = (data) => {
        console.log(data);
        this.emit('some_event', {id: 1, text: 'Event emit test text'})
    }
}

module.exports = Logger;
