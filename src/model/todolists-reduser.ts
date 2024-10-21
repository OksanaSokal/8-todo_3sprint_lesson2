import type {FilterValuesType, TodolistType} from '../App';
import { v1 } from 'uuid'

type ActionType = RemoveTodolist | AddTodolist | ChangeTitleTodolist | ChangeFilter


export type RemoveTodolist = ReturnType<typeof removeTodolistAC>
export type AddTodolist = ReturnType<typeof addTodolistAC>
type ChangeTitleTodolist = ReturnType<typeof changeTodolistTitleAC>
type ChangeFilter = ReturnType<typeof changeFilterAC>

let todolistID1 = v1()
let todolistID2 = v1()

const initialState: TodolistType[] = [
    { id: todolistID1, title: 'What to learn', filter: 'all' },
    { id: todolistID2, title: 'What to buy', filter: 'all' },
]



export const todolistsReduser = (state: TodolistType[] = initialState, action: ActionType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE_TODOLIST': {
            return state.filter((el) => el.id !== action.payload.id)
        }
        case 'ADD_TODOLIST': {
            const newTodo: TodolistType = {id: action.payload.todolistId, title: action.payload.title, filter: 'all'}
            return [newTodo, ...state]
        }
        case 'CHANGE_TITLE': {
            return state.map((el) => el.id === action.payload.todolistId ? {...el, title: action.payload.newTitle} : el)
        }
        case 'CHANGE_FILTER': {
            return state.map(el => el.id === action.payload.todolistId ? {...el, filter: action.payload.filter} : el)
        }
        default: return state
    }
}
export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE_TODOLIST',
        payload: {
            id: todolistId
        }
    }as const
}

export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD_TODOLIST',
        payload: {
            title,
            todolistId: v1()
        }
    } as const
}

export const changeTodolistTitleAC = (payload: {todolistId: string, newTitle: string}) => {
    return {
        type: 'CHANGE_TITLE',
        payload
    } as const
}

export const changeFilterAC = (payload: {todolistId: string, filter: FilterValuesType}) => {
    return {
        type: 'CHANGE_FILTER',
        payload
    } as const
}