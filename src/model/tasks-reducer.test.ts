// import {v1} from 'uuid';
// import type {TasksStateType} from '../App';
// import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './tasks-reducer';
//
// let todolistID1: string
// let todolistID2: string
// let tasks: TasksStateType
//
// beforeEach(()=> {
//     todolistID1 = v1()
//     todolistID2 = v1()
//
//     tasks = {
//         [todolistID1]: [
//             {id: '1', title: 'HTML&CSS', isDone: true},
//             {id: '2', title: 'JS', isDone: true},
//             {id: '3', title: 'ReactJS', isDone: false},
//         ],
//         [todolistID2]: [
//             {id: '1', title: 'Rest API', isDone: true},
//             {id: '2', title: 'GraphQL', isDone: false},
//             {id: '3', title: 'ReactJS', isDone: false},
//             {id: '4', title: 'ReactJS', isDone: false},
//         ],
//     }
// })
//
// test('remove task', ()=> {
//
//     const endState = tasksReducer(tasks, removeTaskAC({todolistId: todolistID1, taskId: '1'}))
//
//     expect(endState[todolistID1].length).toBe(2)
//     expect(endState[todolistID2].length).toBe(4)
// })
//
// test('add task', ()=> {
//
//     const endState = tasksReducer(tasks, addTaskAC({todolistId: todolistID1, title: 'new task'}))
//
//     expect(endState[todolistID1].length).toBe(4)
//     expect(endState[todolistID1][0].title).toBe('new task')
// })
//
// test('change Task Status', ()=> {
//
//     const endState = tasksReducer(tasks, changeTaskStatusAC({todolistId: todolistID2, taskId: '1', isDone: false}))
//
//     expect(endState[todolistID1][0].isDone).toBe(true)
//     expect(endState[todolistID2][0].isDone).toBe(false)
// })
//
// test('change Task title', ()=> {
//
//     const endState = tasksReducer(tasks, changeTaskTitleAC({todolistId: todolistID2, taskId: '1', title: 'changed task'}))
//
//
//     expect(endState[todolistID2][0].title).toBe('changed task')
// })
//
