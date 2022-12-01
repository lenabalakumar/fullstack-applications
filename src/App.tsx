import { useState } from "react";
import { createTodo, toggleTodo } from "./features/todoSlice";
import { useAppDispatch, useAppSelector } from "./store/hooks";

function App() {
  const [todoCategoryValue, setTodoCategoryValue] = useState("");
  const [todoItem, setTodoItem] = useState("");
  const dispatch = useAppDispatch();
  const { todoCategory, todoItems } = useAppSelector((state) => state.todos);

  const handleSubmit = (e: any, todoItem: string, todoCategory: string) => {
    e.preventDefault();
    dispatch(createTodo(todoItem, todoCategory));
    setTodoCategoryValue("");
    setTodoItem("");
  };

  const handleMarkComplete = (id: string) => {
    dispatch(toggleTodo(id));
  };

  return (
    <div className=" w-screen h-screen bg-slate-200">
      <div className=" w-2/3 h-full ml-auto mr-auto bg-white">
        <div className=" h-1/6 w-full flex justify-center items-center">
          <p className=" font-bold text-4xl">Todo application</p>
        </div>
        <div className="h-5/6 w-full flex">
          <div className="w-2/3 h-full">
            <h3>
              Pending todos (
              {todoItems.filter((item) => item.todoStatus === false).length})
            </h3>
            {todoCategory.map((todoCItem) => (
              <div className="">
                <div>
                  <p>{todoCItem} sdfs</p>

                  {todoItems
                    .filter((todos) => todos.todoCategory === todoCItem)
                    .filter(
                      (incompleteTodos) => incompleteTodos.todoStatus === false
                    )
                    .map((item) => (
                      <div className=" w-full flex flex-row items-center">
                        <p className="mx-2">{item.todoItem}</p>
                        <button
                          onClick={() => handleMarkComplete(item.todoItemID)}
                          className="h-8 w-40 bg-teal-300 rounded-md"
                        >
                          Mark complete
                        </button>
                        <p>{item.todoCreatedTime.toDateString()}</p>
                        <p>{item.todoCreatedTime.toTimeString()}</p>
                      </div>
                    ))}
                </div>
              </div>
            ))}
            <div>
              <p>
                Completed todos (
                {todoItems.filter((item) => item.todoStatus === true).length})
              </p>
              {todoItems
                .filter((items) => items.todoStatus === true)
                .map((completedItems) => (
                  <p>
                    {completedItems.todoItem} - {completedItems.todoCategory}
                  </p>
                ))}
            </div>
          </div>
          <div className="w-1/3 h-full flex flex-col">
            <div className="h-20 w-full flex justify-center items-center">
              <p>Create todos here</p>
            </div>
            <div className="pt-2 px-2">
              <form>
                <div className="my-5 flex w-full justify-between items-center">
                  <label>Create a category</label>
                  <input
                    type="text"
                    className="px-2 h-10 rounded-md"
                    placeholder="Category name"
                    value={todoCategoryValue}
                    onChange={(e) => {
                      setTodoCategoryValue(e.target.value);
                    }}
                  />
                </div>
                <div className="my-5 flex w-full justify-between items-center">
                  <label>What is your todo?</label>
                  <input
                    type="text"
                    className="px-2 h-10 rounded-md"
                    placeholder="Add your todo here"
                    value={todoItem}
                    onChange={(e) => setTodoItem(e.target.value)}
                  />
                </div>
                <button
                  onClick={(e) => handleSubmit(e, todoItem, todoCategoryValue)}
                  className="h-10 w-60 bg-lime-500 rounded-md disabled:bg-slate-500"
                  disabled={todoCategoryValue.length < 1 || todoItem.length < 1}
                >
                  Create a todo
                </button>
              </form>
            </div>
            <div>
              <p>created categories</p>
              {todoCategory.map((items) => (
                <div
                  className="w-40 h-8 bg-teal-300 rounded-lg hover:cursor-pointer"
                  onClick={() =>
                    setTodoCategoryValue((state) => (state = items))
                  }
                >
                  <p>{items}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
