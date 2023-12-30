const sqlite3 = require('sqlite3').verbose()
const { dirname, join } = require('path');
const dbRequestManager = require('./request')

class DatabaseManager{

    constructor(app) {

        this.app = app
        this.db = this.connectDB( join(__dirname, '..', 'db.sqlite' ))
        this.rqManager = new dbRequestManager( app, this.db );

    }

    connectDB( dbPath ) {
        return new sqlite3.Database( dbPath, err => {

            if (err) 
                return console.log(err.message)
        
            this.rqManager.setRequests()
            console.log('Connected to the SQLite database.')  
            
        })
    }
}

module.exports = DatabaseManager    