const sqlite3 = require('sqlite3').verbose()
const { dirname, join } = require('path');

class DatabaseManager{

    constructor(app) {

        this.app = app
        this.db = this.connectDB( join(__dirname, '..', 'db.sqlite' ))

        

    }

    connectDB( dbPath ) {
        return new sqlite3.Database( dbPath, err => {

            if (err) {
              console.error(err.message)
              throw err
            } else {
                this.setGETRequests( this.app )
                console.log('Connected to the SQLite database.')  
            }
            
        })
    }

    setGETRequests( app ){

        app.get( "/api/tasks", (req, res, next) => {

            let sql = 'select * from tasks'
            this.db.all( sql, [], (err, rows) => {

                if (err) {
                  res.status(400).json({ "error": err.message });
                  return;
                }

                res.json({
                    "message": "success",
                    "data": rows
                })
              });

        })
    
    }



}

module.exports = DatabaseManager    