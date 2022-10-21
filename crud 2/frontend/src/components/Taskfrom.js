import { Button, Card, CardContent, CircularProgress, Grid, TextField, Typography } from '@mui/material'
import React,{useState, useEffect} from 'react';
import { useNavigate, useParams } from "react-router-dom";

function Taskfrom() {
     const [task, setTask] = useState({
        title: "",
        description: "",
     })
     const [loading, setloading ] = useState(false)
     const [editing, setediting ] = useState(false)

     const navigate = useNavigate()
     const params = useParams()

    const handelSubmit = async(e) => {
        e.preventDefault()
        try{
            setloading(true)
            const response = await fetch("http://localhost:5400/api/tasks", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(task)
            });
            const data = await response.json()
            console.log(data)
           setloading(false)
        navigate('/')
        }catch (err){
            console.error(err.message)
        }
    }

    const handleChange = (e) =>
    setTask({ ...task, [e.target.name]: e.target.value });


    const loadTask = async (id) => {
      const res = await fetch(`http://localhost:5400/api/tasks/${id}`)
      const data = await res.json()
      setTask({title: data.title , description: data.description})
      setediting(true)
    }

    useEffect(() => {
        if (params.id) {
            loadTask(params.id);
          }
        }, [params.id]);
  return (
    <Grid container direction="column" alignItems="center" justifyContent="center">
      <Grid item xs={3}>
      <Card
          sx={{ mt: 5 }}
          style={{
            backgroundColor: "#1E272E",
            padding: "1rem",
          }}
        >
         <Typography variant= "5" textAlign="center" >
         {editing ? "Update Task" : "Create Task"}
         </Typography>
         <CardContent>
            <form onSubmit={handelSubmit}>
                <TextField name="title"onChange={handleChange} value={task.title}
                 variant='filled' label='le titre :' 
                sx={{ display: 'block', margin:'.5rem 0'}}  inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}/>


                <TextField name="description" onChange={handleChange} value={task.description} 
                variant='filled' label='la description :' multiline rows={4} sx={{ display: 'block', margin:'.5rem 0'}} inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}/>
                 <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!task.title || !task.description}
              >
                {loading ? (
                  <CircularProgress color="inherit" size={25} />
                ) : (
                  "Save"
                )}
                </Button>
            </form>
         </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Taskfrom
