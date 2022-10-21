import React,{useEffect, useState}from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function TaskList() {
    const [tasks, settasks] = useState([])

    const navigate = useNavigate()

    const loadTaskds = async () =>{
        const reponse = await fetch('http://localhost:5400/api/tasks')
        const data = await reponse.json()
        settasks(data)
    }

    useEffect(() => {
      loadTaskds()  
    }, [])

    const handleDelete = async (id) => {
        try{
            await fetch(`http://localhost:5400/api/tasks/${id}`, {
                method: "DELETE",
            })
            settasks(tasks.filter((task) => task.id !== id))
        }catch(err){
            console.error(err)
        }
    }
  return (
    <>
      <h1>task list</h1>
      { tasks.map((task) => (
        <Card style={{ marginBottom: ".7rem", backgroundColor: "#1e272e" }} key={task.id}>
            <CardContent style={{display: "flex", justifyContent: "space-between"}}>
                <div style={{color: 'white'}} >
                <Typography>{task.title}</Typography>
                <Typography>{task.description}</Typography>
                </div>
                 <div>
                 <Button variant='contained' color="inherit" onClick={() => navigate(`/tasks/${task.id}/edit`)}>Edit</Button> 
                 <Button variant='contained' color="warning" style={{ marginLeft: ".5rem "}} onClick={() =>handleDelete(task.id)}>delete</Button> 
                 </div>

            </CardContent>
        </Card>
      ))
      }
    </>
  )
}

export default TaskList
