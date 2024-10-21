import type {TasksStateType, TaskType} from '../App';
import {v1} from 'uuid'
import type {AddTodolist, RemoveTodolist} from './todolists-reducer';

type ActionType = RemoveTaskAC | AddTaskAC | ChangeTaskStatusAC | ChangeTaskTitleAC | RemoveTodolist | AddTodolist


let initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE_TASK': {
            return {...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(el => el.taskId !== action.payload.taskId)
            }
        }
        case 'ADD_TASK': {
            const newTask: TaskType = {taskId: v1(), title: action.payload.title, isDone: false}
            return {...state,
                [action.payload.todolistId] : [newTask, ...state[action.payload.todolistId]]
            }
        }
        case 'CHANGE_TASK_STATUS': {
           return {...state, [action.payload.todolistId] : state[action.payload.todolistId].map(el => el.taskId === action.payload.taskId ? {...el, isDone: action.payload.isDone} : el)}
        }
        case 'CHANGE_TASK_TITLE': {
            return {...state, [action.payload.todolistId] : state[action.payload.todolistId].map(el => el.taskId === action.payload.taskId ? {...el, title: action.payload.title} : el)}
        }
        case 'ADD_TODOLIST': {
            return {...state,
                [action.payload.todolistId] : []
            }
        }
        case 'REMOVE_TODOLIST': {
            const copyState = {...state}
            delete copyState[action.payload.id]
            return copyState
        }
        default: return state
    }
}
export const removeTaskAC = (payload: {todolistId: string, taskId: string}) => {
    return {
        type: 'REMOVE_TASK',
        payload
    } as const
}

export const addTaskAC = (payload: {todolistId: string, title: string}) => {
    return {
        type: 'ADD_TASK',
        payload
    } as const
}

export const changeTaskStatusAC = (payload: {todolistId: string, taskId: string, isDone: boolean}) => {
    return {
        type: 'CHANGE_TASK_STATUS',
        payload
    } as const
}

export const changeTaskTitleAC = (payload: {todolistId: string, taskId: string, title: string}) => {
    return {
        type: 'CHANGE_TASK_TITLE',
        payload
    } as const
}



type RemoveTaskAC = ReturnType<typeof removeTaskAC>
type AddTaskAC = ReturnType<typeof addTaskAC>
type ChangeTaskStatusAC = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleAC = ReturnType<typeof changeTaskTitleAC>
