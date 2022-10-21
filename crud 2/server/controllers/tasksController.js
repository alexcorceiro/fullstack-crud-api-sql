const pool = require("../db/bd");

exports.getAllTasks= async(req, res, next) => {
  try{
        const allTask = await pool.query("SELECT * FROM task")
        res.json(allTask.rows)
  }catch(err){
    next(err)
  }
}

exports.getTasksById= async(req, res, next) => {
    const id = parseInt(req.params.id)
    try{
     const result = await pool.query("SELECT * FROM task WHERE id = $1 ", [id])

     if(result.rows.length === 0) return res.status(404).json({
        message: 'task not found'
     }, console.log('err'))
     res.json(result.rows[0])
    }catch(err){
        next(err)
    }
    
}

exports.createTask= async(req,res,next) => {
    const { title, description } = req.body;
    try{
        const result = await pool.query("INSERT INTO task (title,description) VALUES ($1,$2) RETURNING *", [title, description])

        res.json(result.rows[0])
        res.send("create task ")
    }catch(err){
        next(err)
    }
}

exports.deleteTask= async(req, res, next) => {
    const id = parseInt(req.params.id)
    try{
        const result = await pool.query('DELETE FROM task WHERE id = $1 ', [id])
        console.log(result)

         res.send('task deleted')
    }catch(err){
        next(err)
    }
    
}

exports.updateTask = async(req, res, next) => {
    const id = parseInt(req.params.id)
    const {title, description} = req.body;
    try{
      const result = await pool.query('UPDATE task SET title = $1, description = $2 WHERE id = $3 RETURNING *', [title, description, id]);

     res.send('task updated')
    }catch(err){
        next(err)
    }

}