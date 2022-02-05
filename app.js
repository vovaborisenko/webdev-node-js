const fs = require('fs');
const zlib = require('zlib');

const readStream = fs.createReadStream('./file.txt');
const writeStream = fs.createWriteStream('./file-copy.txt.gz');
const compressStream = zlib.createGzip();

function handleError(params) {
    console.log('Error:', params);
    readStream.destroy();
    writeStream.end('ERROR Finished writing file...')
}

readStream
    .on('error', handleError)
    .pipe(compressStream)
    .pipe(writeStream)
    .on('error', handleError);
