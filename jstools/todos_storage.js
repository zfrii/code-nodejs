// Importer les modules nécessaires
import {readFile,writeFile,stat} from 'node:fs/promises';
import { Notfounderror } from './errors.js';
const path = 'storage/todos.json';
/**
 * @typedef {Object} todo
 * @property {number} id
 * @property {string} title
 * @property {boolean} completed
 */

/**
 * @return {Promise<todo[]>}  
 */
export async function todosdata() {
    const data = await readFile(path, 'utf8');
    return JSON.parse(data);
};

/**
 * @property {string} title
 * @property {boolean} completed
 * @return {Promise<todo>}  
 */

export async function createTodo(title, completed = false) {
    const todos = await todosdata();
    todos.push({ title, completed,id: Date.now()});
      await writeFile(path,JSON.stringify(todos),null,2)
      return todos;
};

/**
 * @param {number} id
 * @return {Promise<todo | undefined>}
 */

export async function removeTodo(id) {
    let data = await todosdata();
    if (data.findIndex((todo) => todo.id === id) === -1){
        throw new Notfounderror()
    } else{
    data = data.filter((todo) =>(todo.id !== id) );
    await writeFile(path,JSON.stringify(data),null,2)
}
};
/**
 * @param {number} id
 * @param {string} title
 * @param {boolean} completed
 * @return {Promise<todo | undefined>}
 */
export async function updatetodo(id,title,completed) {
    let data = await todosdata();
    const indx = data.findIndex((todo) => todo.id === id)
    if ( indx === -1 ){
        throw new Notfounderror()
    } else {
        if(title !== undefined)     { data[indx].title = title }
        if(completed !== undefined) { data[indx].completed = completed }
    
    await writeFile(path,JSON.stringify(data),null,2)
    }
};