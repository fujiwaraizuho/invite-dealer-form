var express = require('express');
var router = express.Router();

var message_data ;//追加
const fs = require('fs');//追加
const filename = 'mydata.txt';//追加
readFromFile(filename);//追加

router.get('/',(req, res, next) => {
    var msg = '※何か書いて送信して下さい。';
    if (req.session.userName != undefined) {
        msg ="Last Message:" + req.session.userName;
    }
    var data = {
        title: 'Form Page!',
        content: msg
    };
    res.render('form', data);
})

router.post('/post', (req, res, next) => {
    var userName = req.body['userName'];
    var kana = req.body['kana'];
    var companyname = req.body['companyname'];
    var mail = req.body['mail'];
    var secondhanddealernumber = req.body['secondhanddealernumber'];
    var msg = req.body['msg'];
    var pic  = req.body['attachment_file']

    req.session.userName = userName;
    var data = {
        title: 'Form Page',
        msg: msg,
        content: "Last Message:" + req.session.userName
    }

    //追加
    var obj = {'userName': userName, 'kana': kana, 'companyname': companyname, 'mail': mail, 'secondhanddealernumber': secondhanddealernumber, 'attachment_file': pic};
    var obj_str = JSON.stringify(obj);
    console.log('add data: ' + obj_str);
    message_data.unshift(obj_str);
    saveToFile(filename);


    res.render('form', data);
})


//追加
function readFromFile(fname) {
    fs.readFile(fname, 'utf-8', (err, data) => {
        if((err) || (!data)) {
            message_data=[]
            return
        }
        message_data = data.split('\n');
    })
}


//追加
function saveToFile(filename) {
    var data_str = message_data.join('\n');
    fs.writeFile(filename, data_str, (err) => {
        if(err) { throw err}
    });
}

module.exports = router;