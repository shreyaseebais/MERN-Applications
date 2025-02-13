const mongoose =require('mongoose');

mongoose.connect(process.env.CONN_STRING);

const db = mongoose.connection;

db.on('connected',()=>{
    console.log('Database connection successful !')
})
db.on('err',()=>{
    console.log('Database connection failed !')
});

module.exports = db;

