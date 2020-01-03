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
    Paper,
    FormControl,
    Box,
    Typography

} from '@material-ui/core'


const client = axios.create({
    baseURL: 'https://minhastarefas-api.herokuapp.com',
    headers: {'x-tenant-id': localStorage.getItem('_user.mail')}
})

const useStyles = makeStyles(theme => ({
    root: {},
    row: {
      height: '42px',
      display: 'flex',
      alignItems: 'center',
      marginTop: theme.spacing(1)
    },
    spacer: {
      flexGrow: 1
    },
    importButton: {
      marginRight: theme.spacing(1)
    },
    exportButton: {
      marginRight: theme.spacing(1)
    },
    searchInput: {
      marginRight: theme.spacing(1)
    }
  }));


class Todos extends React.Component{

    state = {
        todos : [],
        descricao: '',
        invalid: true
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
            <Typography variant="h1">Tarefas</Typography>
            <Grid container spacing={4} component={Paper}>
                <Grid item>
                    <FormControl>
                        <TextField value={this.state.descricao} 
                                fullWidth={true} 
                                label="Descrição"
                                onChange={e => this.setState({descricao: e.target.value})} />
                    </FormControl>
                </Grid>
                <Grid item md={2}>
                    <Button disabled={this.state.invalid} variant="contained" color="primary" onClick={this.adicionar}>Adicionar</Button>
                </Grid>
            </Grid>
            <Paper>
                <Grid container className={useStyles.content}>
                    <Grid item  md={12}>
                        <Paper>
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
                        </Paper>

                    </Grid>
                </Grid>
            </Paper>
            </>
        )
    }
}

export default Todos;