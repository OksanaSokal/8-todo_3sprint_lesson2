// import {v1} from 'uuid';
// import type {TodolistType} from '../App';
// import {
//     addTodolistAC,
//     changeFilterAC,
//     changeTodolistTitleAC,
//     removeTodolistAC,
//     todolistsReducer
// } from './todolists-reducer';
//
// let todolistID1: string
// let todolistID2: string
// let todolists: TodolistType[];
//
// beforeEach(()=> {
//     todolistID1 = v1()
//     todolistID2 = v1()
//
//     todolists =[
//         {id: todolistID1, title: 'What to learn', filter: 'all'},
//         {id: todolistID2, title: 'What to buy', filter: 'all'},
//     ]
// })
//
// test('remove todolist', ()=> {
//
//
//
//     let endState = todolistsReducer(todolists, removeTodolistAC(todolistID1))
//
//     expect(endState.length).toBe(1)
//     expect(endState[0].id).toBe(todolistID2)
// })
//
// test('add todolist',()=> {
//     let todolistID1 = v1()
//     let todolistID2 = v1()
//
//     let todolists: TodolistType[] =[
//         {id: todolistID1, title: 'What to learn', filter: 'all'},
//         {id: todolistID2, title: 'What to buy', filter: 'all'},
//     ]
//
//     const newTitle = 'new Todolist'
//     const endState = todolistsReducer(todolists, addTodolistAC(newTitle))
//
//     expect(endState.length).toBe(3)
//     expect(endState[0].title).toBe(newTitle)
// })
//
// test('change title', ()=> {
//     let todolistID1 = v1()
//     let todolistID2 = v1()
//
//     let todolists: TodolistType[] =[
//         {id: todolistID1, title: 'What to learn', filter: 'all'},
//         {id: todolistID2, title: 'What to buy', filter: 'all'},
//     ]
//
//     const newTitle = 'changed title'
//     const endState: TodolistType[] = todolistsReducer(todolists, changeTodolistTitleAC({todolistId: todolistID1, newTitle: newTitle}))
//
//     expect(endState[0].title).toBe(newTitle)
//     expect(endState[1].title).toBe('What to buy')
// })
//
// test('change filter',()=> {
//     let todolistID1 = v1()
//     let todolistID2 = v1()
//
//     let todolists: TodolistType[] =[
//         {id: todolistID1, title: 'What to learn', filter: 'all'},
//         {id: todolistID2, title: 'What to buy', filter: 'all'},
//         {id: todolistID2, title: 'What to buy', filter: 'active'},
//     ]
//
//     const endState: TodolistType[] = todolistsReducer(todolists, changeFilterAC({todolistId: todolistID1, filter: 'active'}))
//
//     expect(endState[2].filter).toBe('active')
// })