import {useState, useRef, useEffect} from 'react';
import { MdDeleteOutline } from "react-icons/md"; // delete icon


const TodoList = () => {

    // States to manage todo list, input value, and error message
    const [todoList, setTodoList] = useState(()=> {
        const savedTodos = localStorage.getItem('todos');
        return savedTodos ? JSON.parse(savedTodos) : []
    })
    const [textValue, setTextValue] = useState("")
    const [error, setError] = useState(null);

    // Ref for input field
    const inputRef = useRef(null);


    // function to handle input value change
    const textValueChange = () => {
        setTextValue(inputRef.current.value)
    }

    const today = new Date;
    const formattedDate = today.toLocaleDateString('en-IN', {
       day:"numeric", month:"short"
        
    })

    // function to add new tod to the list
    const addTodo = (todo) => {
        const newTodo = {id: Date.now(), textValue: todo, date: formattedDate};
        if(todo === "") {
            setError("Todo cannot be empty");
            return; 
        } 
        setTodoList([...todoList, newTodo])
        setTextValue("");
        setError(null);
    }

    // add todo on enter key press
    const handleKeyDown = (e) => {
        if(e.key === "Enter") {
            addTodo(textValue)
        }
        console.log(e.key);
    };


    // set the local storage when new todo is added
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todoList));
    }, [todoList])
        

    // to handle the delete todo button
    const removeTodo = (id) => {
        const newTodoList = todoList.filter((item) => item.id !== id);
        setTodoList(newTodoList);
    }

    return(
        <div className="flex flex-col items-center justify-center mt-10">

            <h1 className="text-lg font-bold">Todo List Component</h1>

            <div className="flex gap-3 mt-5 w-[600px] m-auto items-center justify-center">

                <input 
                type="text" 
                ref={inputRef} 
                onChange={textValueChange}
                onKeyDown = {handleKeyDown}
                className='border outline-none rounded-lg px-2 w-[70%] h-10' 
                value={textValue} 
                placeholder='Add your todo'/>
                

                <button onClick={() => addTodo(textValue)} className='bg-orange-500 h-10 px-4 rounded-lg text-white cursor-pointer'>Add Todo</button>

            </div>

            {/* {To Display Error} */}
            <div className="">
                {error && <p className="">{error}</p>}
            </div>

            {/* // to display the todo list */}
            <ul className="flex flex-col gap-3 mt-5 w-full max-w-md items-start w-[600px]">
                {todoList.length >0 && <p className="font-bold">Your Todos</p>}
                {todoList.map((item) => (
                    <li className="flex w-[400px] px-4 py-4 text-ellipsis rounded-lg bg-gray-200" key={item.id}> 
                        <div className="flex-grow">
                            <p className=" text-black">{item.textValue}</p>
                            <p className="text-sm text-gray-500">{item.date}</p>
                        </div>
                        <div className="h-[100%]">
                            <div className="cursor-pointer text-ms px-2 py-2 bg-orange-500 text-white flex justify-center items-center rounded-lg" onClick={()=> removeTodo(item.id)}><MdDeleteOutline />
                        </div>
                        </div>
                    </li>
                ))}
            </ul>

        </div>
    )
}

export default TodoList;