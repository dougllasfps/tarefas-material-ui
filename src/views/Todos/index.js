import React from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/styles';


import { 
    Table, 
    TableBody,
    TableHead,
    TableRow, 
    TableCell ,
    TextField,
    Button,
    Grid,
    Paper
} from '@material-ui/core'

const client = axios.create({
    baseURL: 'https://minhastarefas-api.herokuapp.com',
    headers: {'x-tenant-id': 'dougllasfps@gmail.com'}
})

const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(3)
    },
    content: {
      marginTop: theme.spacing(2)
    }
  }));

class Todos extends React.Component{

    state = {
        todos : [],
        descricao: '',
    }

    componentDidMount(){
        this.listar()
    }

    listar = () => {
        client.get('/tarefas')
        .then( resp => {
            this.setState({todos: resp.data})
        })
    }
    
    adicionar = () => {
        client.post('/tarefas', {
            descricao: this.state.descricao
        })
        .then( resp => {
            const todos = this.state.todos;
            todos.push(resp.data)
            this.setState({todos})
        })
    }

    render(){
        return (
            <>
                <Grid container className={useStyles.root}>
                    <Grid item md={10}>
                        <Paper elevation={3}>
                            <TextField value={this.state.descricao} style={{width: '100%'}}
                                        onChange={e => this.setState({descricao: e.target.value})} />
                        </Paper>
                    </Grid>
                    <Grid item md={2}>
                        <Button variant="contained" color="primary" onClick={this.adicionar}>Adicionar</Button>
                    </Grid>
                </Grid>
                <Grid container className={useStyles.content}>
                    <Grid item  md={12}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Descrição</TableCell>
                                    <TableCell>Categoria</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.todos.map(todo => (
                                    <TableRow key={todo.id}>
                                        <TableCell>{todo.descricao}</TableCell>
                                        <TableCell>{todo.categoria}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>
            </>
        )
    }
}

export default Todos;