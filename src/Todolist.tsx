import {FilterValuesType, TaskType, type TodolistType} from './App';
import {ChangeEvent} from 'react';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import {filterButtonsContainerSx, getListItemSx} from './Todolist.styles';
import {changeFilterAC, changeTodolistTitleAC, removeTodolistAC} from './model/todolists-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './model/tasks-reducer';
import type {RootState} from './store';


type PropsType = {
    todolist: TodolistType
}

export const Todolist = ({todolist}: PropsType) => {
    const {
        todolistId, title, filter
    } = todolist


    const dispatch = useDispatch()
    const tasks = useSelector<RootState, TaskType[]>(state => state.tasks[todolistId])
//state.tasks[todolistId] - таким способом, а не просто state.tasks мы подписываемся на изменения только тасок и при их изменении не перерисовывается все приложение, а во втором способе будет все приложение перерисовываться

    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        dispatch(changeFilterAC({filter, todolistId}))
    }

    const removeTodolistHandler = () => {
        dispatch(removeTodolistAC(todolistId))
    }

    const addTaskCallback = (title: string) => {
        dispatch(addTaskAC({title, todolistId}))
    }

    const updateTodolistHandler = (title: string) => {
        dispatch(changeTodolistTitleAC({todolistId, newTitle: title}))
    }

    const allTasks = tasks
    let tasksForTodolist = allTasks;

    if (filter === 'active') {
        tasksForTodolist = allTasks.filter(task => !task.isDone)
    }

    if (filter === 'completed') {
        tasksForTodolist = allTasks.filter(task => task.isDone)
    }

    return (
        <div>
            <div className={'todolist-title-container'}>
                <h3><EditableSpan value={title} onChange={updateTodolistHandler}/></h3>
                <IconButton onClick={removeTodolistHandler}>
                    <DeleteIcon/>
                </IconButton>
            </div>
            <AddItemForm addItem={addTaskCallback}/>
            {
                !tasksForTodolist
                    ? <p>Тасок нет</p>
                    : <List>
                        {tasksForTodolist?.map((task) => {

                            const removeTaskHandler = () => {
                                 dispatch(removeTaskAC({taskId: task.taskId, todolistId}))
                            }

							const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
								const isDone = e.currentTarget.checked
								dispatch(changeTaskStatusAC({todolistId,taskId: task.taskId, isDone}))
							}

                            const changeTaskTitleHandler = (title: string) => {
                                dispatch(changeTaskTitleAC({todolistId, taskId: task.taskId, title}))
                            }
                            return <ListItem key={task.taskId} sx={getListItemSx(task.isDone)}>
                                <div>
                                    <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
                                    <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
                                </div>
                                <IconButton onClick={removeTaskHandler}>
                                    <DeleteIcon/>
                                </IconButton>
                            </ListItem>
                        })}
                    </List>
            }
            <Box sx={filterButtonsContainerSx}>
                <Button
                    variant={filter === 'all' ? 'outlined' : 'text'}
                    color={'inherit'}
                    onClick={() => changeFilterTasksHandler('all')}>
                    All
                </Button>
                <Button
                    variant={filter === 'active' ? 'outlined' : 'text'}
                    color={'primary'}
                    onClick={() => changeFilterTasksHandler('active')}>
                    Active
                </Button>
                <Button
                    variant={filter === 'completed' ? 'outlined' : 'text'}
                    color={'secondary'}
                    onClick={() => changeFilterTasksHandler('completed')}>
                    Completed
                </Button>
            </Box>
        </div>
    )
}
