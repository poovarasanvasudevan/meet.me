require('dotenv').config();
const FtpSrv = require('ftp-srv');
const Parse = require('parse/node');

Parse.initialize(process.env.APP_ID, process.env.JS_KEY, process.env.MASTER_KEY);
Parse.serverURL = process.env.PARSE_SERVER_URL;


const ftpServer = new FtpSrv({
    url: process.env.FTP_URL || "ftp://127.0.0.1:21",
    greeting: "~~~~~~~~~ Hello World ~~~~~~~~"
});


ftpServer.on('login', async ({connection, username, password}, resolve, reject) => {
    try {
        const user = await Parse.User.logIn(username, password);
        if (user && user.get('ftp')) {
            resolve({root: require('os').homedir()});
        } else {
            reject('Unauthorized access: You dont have access to FTP');
        }
    } catch (e) {
        reject('Bad username or password');
    }
});


ftpServer.listen()
    .then(() => {
        console.log('FTP server Started');
    });
