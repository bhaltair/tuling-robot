#!/usr/bin/env node
const readline = require('readline');
const querystring = require('querystring');
const http = require('http');
const fs = require('fs');


const apikey = require('./config.js').apikey
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
process.stdout.write('hi' + '\n')
robot.on('line', function(input){
    if(input == "exit"){
        console.log('bye bye');
        return robot.close();
    }
    PostCode(input)
    // process.stdout.write(input + '\n')
    robot.prompt()
})

robot.on('SIGINT', function(input){
    robot.close();
})
