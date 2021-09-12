import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {Fragment, useEffect, useState} from "react";
import {addToDO, pushToDO, setLoadingFalse, setLoadingTrue} from "./redux/actions/actionCreators";

const TodosForm = ({onSubmit}) =>{

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) return;
    try{
      await onSubmit (title, description);
      setTitle('');
      setDescription('');
    } catch (e) {
      console.log(e)
    }
  }
  
  return <form onSubmit={handleSubmit}>
    <input type="text" placeholder="todo title" value={title} onChange={({target: {value}}) => setTitle(value)}/>
    <br/>
    <br/>
    <input type="text" placeholder="todo description" value={description} onChange={({target: {value}}) => setDescription(value)}/>
    <br/>
    <button type="submit" disabled={!title || !description}>Add todo</button>
  </form>

};

const TodosList = ({todos, isLoading}) =>{
  if (isLoading) return <h3>Loading...</h3>
  return (
      <div>
        {
          todos.map(todo => (
              <Fragment key={todo.id}>
                <div>{todo.title}</div>
                <div>{todo.description}</div>
                <div>Created at: {new Date(todo.createdAt).toDateString()}</div>
                <hr/>
              </Fragment>
          ))}
      </div>
  )
}

function App() {

  const {todos, todosLoading} = useSelector(store => store.todosReducer);
  const dispatch = useDispatch();

  const fetchTodos = async () => {
    try {
      dispatch(setLoadingTrue())
      const response = await fetch('http://localhost:8888/get-todos');
      const data = await response.json();

      dispatch(addToDO(data))
    } catch (e) {
      console.log(e)
    } finally {
      dispatch(setLoadingFalse())
    }
  }

  useEffect(() => {
    fetchTodos();
  }, [])

  const onTodoCreate = async (title, description) => {
    if (!title || !description) return;

    const response = await fetch('http://localhost:8888/create-todo', {
      method: 'POST',
      body: JSON.stringify({title, description}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json();
    dispatch(pushToDO(data))
  }

  return (
    <div className="App">
      <TodosForm onSubmit={onTodoCreate}/>
      <TodosList todos={todos} isLoading={todosLoading}/>

    </div>
  );
}

export default App;
