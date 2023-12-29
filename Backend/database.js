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
              return console.log(err.message)
            }

            this.setGETRequests( this.app )
            console.log('Connected to the SQLite database.')  
            
            
        })
    }

    setGETRequests( app ){

        app.get( "/api/tasks", (req, res, next) => {

            let query = 'SELECT * FROM tasks'
            this.db.all( query, [], (err, rows) => {

                if (err) {
                  return res.status(400).json({ "error": err.message });
                }

                res.json({
                    "message": "success",
                    "data": rows
                })

              });

        });

        app.get('/api/tasks/today', (req,res) => {

            let query = `SELECT * FROM tasks WHERE date(due) = date('now');`;

            this.db.all(query, [], (err, rows) => {
                if(err) 
                {
                    return res.status(400).json({"error":err.message});
                }

                res.json({
                    "message": "success",
                    "data": rows
                });
            })
            
        });
    
    }




}

module.exports = DatabaseManager    