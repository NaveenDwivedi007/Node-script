#! /usr/bin/node

let arg = new Map()
if (process.argv.length > 2) {
    process.argv.slice(2).forEach(x => {
        x = x.replace('--', '').toLowerCase()
        x = x.replace('-', '')
        if (x.includes('=')) {
            const [key, val] = x.split('=')
            arg.set(key, val)
        } else {
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
        if (err) return
        data.forEach(x => {
            let newName = x.replace(arg.get('curr'), arg.get('new'))
            if (x.includes(arg.get('curr'))) {
                fs.rename(path.join(path1, x), path.join(path1, newName), (err, data) => {
                    if (err) return
                    rename(path.join(path1, newName))
                })
            }
        })
    })
}

