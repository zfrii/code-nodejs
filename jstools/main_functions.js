import { createTodo, todosdata , removeTodo,updatetodo} from "./todos_storage.js";
import {text,json} from 'node:stream/consumers'
export async function index() {      
    const data = await todosdata()
    return data;
 }
 export async function create(req) {
 const newtodo = await json(req)
 return await createTodo(newtodo.title, newtodo.completed) 

 }
 export async function remove(req ,url) {
    const id = parseInt(url.searchParams.get('id'),10)
        await removeTodo(id)
    }
    export async function update(req ,url) {
        const id = parseInt(url.searchParams.get('id'),10)
        const todo = await json(req)
            await updatetodo(id,todo.title,todo.completed)
        }