const Logger = require('./logger');
const logger = new Logger();

logger.on('some_event', ({id, text}) => {
    console.log(id, text);
})

logger.log('User logged');
