class dbRequestManager{

    constructor( app, db ){
        this.app = app
        this.db = db

        let today = new Date().toISOString().slice(0,10)
        this.taskDefaults = {
            name: 'Unnamed',
            description: '-',
            tags: '-',
            priority: 0,
            due: today,
            created: today,
            recur_interval: 0,

         }
         this.taskParams = Object.keys(this.taskDefaults)

    }

    setRequests(){
        this.setGETRequests()
        this.setPOSTRequests()
    }

    setGETRequests(){

        let app = this.app

        app.get( "/api/tasks", (req, res) => {
            let query = 'SELECT * FROM tasks'
            this.dbAll(res, query)
        });

        app.get('/api/tasks/today', (req, res) => {
            let query = `SELECT * FROM tasks WHERE date(due) = date('now');`;
            this.dbAll(res, query)
        });
    
    }

    dbAll( res, query ){
        this.db.all( query, [], (err, rows) => {
            if (err) 
              return res.status(400).json({ "error": err.message });
            
            res.json({
                "message": "success",
                "data": rows
            })
          });
    }

    setPOSTRequests(){

        let app = this.app
        

        app.post('/api/tasks/new', (req, res) => {

             let data = req.body
             let today = new Date().toISOString().slice(0,10)

             let taskTags = data.tags.join(',')
             let dataTaskIsArr = Array.isArray(data.tags)

             let newTask = {
                ...this.taskDefaults,
                due: today,
                created: today,
                ...data,
                tags: data.tags && dataTaskIsArr ? taskTags : '-',
             }
             newTask = this.taskParams.reduce( ( acc, el ) => { 
                let nObj = acc
                nObj["$"+el] =newTask[el]
                return nObj
            }, {} )
    
             let paramsRef = this.taskParams.map( el => "$"+el ).join(', ')

             let sql = `INSERT INTO tasks(${ this.taskParams.join(', ') }) VALUES (${paramsRef})`
             this.db.run(sql, newTask, err => {
                if (err) 
                  return console.error(err.message);
              });
             
        })

    }
}

module.exports = dbRequestManager