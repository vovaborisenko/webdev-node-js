const fs = require('fs');

fs.readFile('./test.txt', (error, data) => {
    if (error) throw error;
    
    if (!fs.existsSync('./folder')) {
        fs.mkdirSync('./folder', (error) => {
            if (error) throw error;        
        })
    }

    fs.writeFile('./folder/text2.txt', `New copy ${data}`, (error) => {
        if (error) throw error;
    })

})

setTimeout(() => {
    if (fs.existsSync('./folder/text2.txt')) {
        fs.unlink('./folder/text2.txt', () => {
            console.log('File deleted');
        })
    }
}, 4000)

setTimeout(() => {
    if (fs.existsSync('./folder')) {
        fs.rmdir('./folder', () => {
            console.log('Folder deleted');
        })
    }
}, 8000)
