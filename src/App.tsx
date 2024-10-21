import './App.css';
import {Todolist} from './Todolist';
import React, {useState} from 'react';
import {AddItemForm} from './AddItemForm';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import {MenuButton} from './MenuButton';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import CssBaseline from '@mui/material/CssBaseline';
import {addTodolistAC} from './model/todolists-reducer';
import {useDispatch, useSelector} from 'react-redux';
import type {RootState} from './store';

export type TaskType = {
	taskId: string
	title: string
	isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistType = {
	todolistId: string
	title: string
	filter: FilterValuesType
}

export type TasksStateType = {
	[key: string]: TaskType[]
}

type ThemeMode = 'dark' | 'light'

function App() {

	// useSelector пожписывается на изменения в стор

	const todolists = useSelector<RootState, TodolistType[]>(state => state.todolists)

	const dispatch = useDispatch()

	const [themeMode, setThemeMode] = useState<ThemeMode>('light')

	const theme = createTheme({
		palette: {
			mode: themeMode === 'light' ? 'light' : 'dark',
			primary: {
				main: '#087EA4',
			},
		},
	});

	const addTodolist = (title: string) => {
		// const action = addTodolistAC(title)
		// dispatchTodolists(action)
		// dispatchTasks(action)
		dispatch(addTodolistAC(title))
	}
	const changeModeHandler = () => {
		setThemeMode(themeMode == "light" ? "dark" : 'light')
	}
	//
	// const removeTask = (taskId: string, todolistId: string) => {
	// 	// dispatchTasks(removeTaskAC({taskId, todolistId}))
	// 	dispatch(removeTaskAC({taskId, todolistId}))
	// }
	//
	// const addTask = (title: string, todolistId: string) => {
	// 	// dispatchTasks(addTaskAC({title, todolistId}))
	// 	// dispatch(addTaskAC({title, todolistId}))
	// }
	//
	// const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
	// 	// dispatchTasks(changeTaskStatusAC({taskId, todolistId, isDone: taskStatus}))
	// 	dispatch(changeTaskStatusAC({taskId, todolistId, isDone: taskStatus}))
	// }
	//
	// const changeFilter = (filter: FilterValuesType, todolistId: string) => {
	// 	// dispatchTodolists(changeFilterAC({filter, todolistId}))
	// 	//dispatch(changeFilterAC({filter, todolistId}))
	// }
	//
	// const removeTodolist = (todolistId: string) => {
	// 	// const action = removeTodolistAC(todolistId)
	// 	// dispatchTodolists(action)
	// 	// dispatchTasks(action)
	// 	// dispatch(removeTodolistAC(todolistId))
	// }



	// const updateTask = (todolistId: string, taskId: string, title: string) => {
	// 	// dispatchTasks(changeTaskTitleAC({todolistId, taskId, title}))
	// 	dispatch(changeTaskTitleAC({todolistId, taskId, title}))
	// }
	//
	// const updateTodolist = (todolistId: string, title: string) => {
	// 	// dispatchTodolists(changeTodolistTitleAC({todolistId, newTitle: title}))
	// 	dispatch(changeTodolistTitleAC({todolistId, newTitle: title}))
	// }



	return (
		<ThemeProvider theme={theme}>
			<CssBaseline/>
			<AppBar position="static" sx={{mb: '30px'}}>
				<Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
					<IconButton color="inherit">
						<MenuIcon/>
					</IconButton>
					<div>
						<MenuButton>Login</MenuButton>
						<MenuButton>Logout</MenuButton>
						<MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
						<Switch color={'default'} onChange={changeModeHandler}/>
					</div>
				</Toolbar>
			</AppBar>
			<Container fixed>
				<Grid container sx={{mb: '30px'}}>
					<AddItemForm addItem={addTodolist}/>
				</Grid>

				<Grid container spacing={4}>
					{todolists.map((tl) => {
						return (
							<Grid key={tl.todolistId}>
								<Paper sx={{p: '0 20px 20px 20px'}}>
									<Todolist todolist={tl}/>
								</Paper>
							</Grid>
						)
					})}
				</Grid>
			</Container>
		</ThemeProvider>
	);
}

export default App;
