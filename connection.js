const monoose = require('mongoose');

async function connectMongoDb(url) {
    return monoose.connect(url);
}


module.exports = {
    connectMongoDb
}