#! /usr/bin/node

let arg = new Map()
if (process.argv.length > 2) {
    process.argv.slice(2).forEach(x => {
        if (x.includes('=')) {
            let [key, val] = x.split('=')
            if (key) {
                key = key.replace('--', '').toLowerCase()
                key = key.replace('-', '')
            }
            arg.set(key, val)
        } else {
            x = x.replace('--', '').toLowerCase()
            x = x.replace('-', '')
            x = x.toLowerCase();
            arg.set(x, null)
        }
    })
}
if (arg.has('help') || (!arg.get('curr') || !arg.get('new'))) {
    console.log('HELP');
    console.log('## This Script is user to rename all the fine in given dir ##');
    console.log('use the following argument to this script to be work properly');
    console.log('--curr=<string to be replace>');
    console.log('--new=<string which be replace>');
    return;
}
const fs = require('fs');
const path = require('path');
rename(path.resolve())

function rename(path1) {
    fs.readdir(path1, (err, data) => {
        if (err) return;
        data.forEach(x => {
            let newName = x.replace(arg.get('curr'), arg.get('new'))
            fs.rename(path.join(path1, x), path.join(path1, newName), (err, data) => {
                if (err) return
                rename(path.join(path1, newName))
            })
        })
    })
}

