
const kue = require('kue');

const queue = kue.createQueue();

module.exports = queue;

// // Setup the documentation of redis 
// // npm install kue

// /*
// --------------------How Kue work?---------------------------------------------------------------------------
// Kue will create jobs on backend by use Redis to store data. by using Redis make pull data from queue is easier
// and faster than pull from memory temp like Array or Object. after pull data from Redis. Kue will process by single 
// task or parallel task. depends on setting how many queue you want to process at same time. after queue process if 
// Kue found some task fail. Kue will attempt one time. you can also setting how much time you want to attempt. also
// these information will show on Kue dashboard.----------------------------------------------------------------
// */