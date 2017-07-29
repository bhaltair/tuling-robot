#!usr/bin/env node
var readline = require('readline');
var querystring = require('querystring');
var http = require('http');
var fs = require('fs');


const apikey = "2c2c21b0acb74e66910f42f80a26bf59"
const url = "http://www.tuling123.com"

function PostCode(codestring) {
    // Build the post string from an object
    var post_data = querystring.stringify({
        "key": apikey,
        "info": codestring
    });

    // An object of options to indicate where to post to
    var post_options = {
        host: "www.tuling123.com",
        path: '/openapi/api',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': post_data.length
        }
    };

    // Set up the request
    var post_req = http.request(post_options, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            const msg = JSON.stringify(JSON.parse(chunk).text)
            process.stdout.write(msg + '\n')
            // console.log('Response: ' + chunk);
        });
    });

    post_req.on('error', function (e) {
        console.log('problem with request: ' + e.message)
    })

    // post the data
    post_req.write(post_data);
    post_req.end();

}



var robot = readline.createInterface(process.stdin, process.stdout);

robot.on('line', function(input){
    PostCode(input)
    // process.stdout.write(input + '\n')
    robot.prompt()
})