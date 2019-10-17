const mailer = require('./spec/mailer');
const iz = require('iz');
const are = require('iz/lib/are');
const validators = require('iz/lib/validators');
const _ = require('lodash');
const {encrypt, decrypt} = require('./spec/crypto');
const find = require('local-devices');

_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
iz.register(validators);

function errors(column) {
    return {
        required: '{{column}} is Required!',
        email: '{{column}} should be Email',
        multiple: 'This is terrible and you should fix it'
    };
}


Parse.Cloud.beforeLogin(async request => {
    var clientIP = request.headers['x-real-ip'];

    const {object: user} = request;
    if (user.get('is_banned')) {
        throw new Error('Access denied, you have been banned.');
    }

    if (!user.get('is_active')) {
        throw new Error('Account is InActive. Please contact Administrator');
    }


    const LoginHistory = Parse.Object.extend("LoginHistory");
    const loginHistory = new LoginHistory();
    loginHistory.set("ip", clientIP);
    loginHistory.set("user_agent", request.headers['user-agent']);
    loginHistory.set("user", user);
    loginHistory.set("request_info", request.headers);
    await loginHistory.save();


});

Parse.Cloud.beforeSave("Email", (request) => {


    const fromAddressValidation = iz(request.object.get("from_address"), errors('from_address')).email().required();
    const toAddressValidation = iz(request.object.get("to_address"), errors('to_address')).email().required();

    if (fromAddressValidation.errors.length > 0) {
        throw fromAddressValidation.errors[0];
    }
    if (toAddressValidation.errors.length > 0) {
        throw toAddressValidation.errors[0];
    }
});

Parse.Cloud.afterSave("Email", (request) => {
    const from_address = request.object.get("from_address");
    const to_address = request.object.get("to_address");
    const subject = request.object.get("subject") || 'No Subject';
    const html_content = request.object.get("html_content") || 'No HTML';
    const text_content = request.object.get("text_content") || 'No Body';
    const is_html = request.object.get("is_html") || false;
});

Parse.Cloud.job("send-email", async function () {
    let info = await mailer.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: 'bar@example.com, baz@example.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello world?</b>' // html body
    });

    console.log('Message sent: %s', info.messageId);
    return "DONE";

});

Parse.Cloud.beforeFind('ListValues', (req) => {
    let query = req.query;
    query.equalTo('is_active', true);
    return query;
});

Parse.Cloud.beforeFind('Application', (req) => {
    let query = req.query;
    query.ascending("name");
    return query;
});

Parse.Cloud.define("requestInfo", (request) => {
    const clientIP = request.headers['x-real-ip'];

    return [
        {
            type: 'IP Address',
            value: clientIP
        }
    ];
});


Parse.Cloud.define('get-local-machines', async (request) => {

    if (request.user) {
        return await find();
    }
});

Parse.Cloud.define('generateQR', async (request) => {

    const qinfo = {
        ip: request.headers['x-real-ip'],
        user_agent: request.headers['user-agent'],
        time: new Date().toString()
    };
    const enc_text = encrypt(JSON.stringify(qinfo));
    const QrLogin = Parse.Object.extend("QRLogin");
    const qrLogin = new QrLogin();
    qrLogin.set('code', enc_text);
    qrLogin.set('expiry_date', new Date());
    await qrLogin.save();

    return {
        qrcode: enc_text,
        time: qinfo.time
    };
});
