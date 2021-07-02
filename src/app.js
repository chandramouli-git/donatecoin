var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
let port=process.env.PORT || 3000;
var $ = jQuery = require('jquery')(window);

var bodyp=require('body-parser');
var express= require('express');
var app=express();
app.set('view engine','ejs');
app.use('/asset',express.static(__dirname+'/js'));
var jsonParser = bodyp.json();
list1=[];
Arr1=[];
list2=[];
Arr2=[];
log={};
app.get('/',function(req,res)
{
    res.render('Register',{arr1:log});
});
app.post('/',jsonParser,function(req,res)
{
    connection.query(sq,[[req.body.id,req.body.username,req.body.password]]);
    connection.query(sql2,function(error,result)
    {
        console.log(result);
        log=result;
    });
});
app.get('/main',function(req,res)
{
    res.render('main');
});

app.post('/main',function(req,res)
{
    res.render('main');
});

app.get('/donate.html',function(req,res)
{
    res.render('donate');

});
app.get('/index',function(req,res)
{
    res.render('index');

});
app.post('/check',jsonParser,function(req,res)
{ 
    console.log(req.body.val);
    if(req.body.val=="1")
    {
     list1.push(req.body.id);
    Arr1.push(req.body.amt);
    }
    else{
        list2.push(req.body.id);
        Arr2.push(req.body.amt);
    }
    connection.query(sql,[["mouli",req.body.id]]);
})
app.get('/check/:data',function(req,res)
{
    if(req.params.data==":1")
    {
    res.render('check',{arr:list1,arr1:Arr1}); 
    console.log(req.params.data);
    }
    else{
        res.render('check',{arr:list2,arr1:Arr2}); 
        console.log(req.params.data);
    }
})



app.listen(port);



var mysql=require('mysql');
const { data } = require("jquery");

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'donatecoin'
});

var sql='Insert into transaction values("1",?)';
var sq='Insert into registerDetails values(?)';
var sql2="select * from registerDetails";
var sql1="select * from transaction";






