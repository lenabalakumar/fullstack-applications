import { createSlice, PayloadAction, nanoid, current } from "@reduxjs/toolkit";

type TodoCategory = string[];
type TodoItem = {
  todoItemID: string;
  todoItem: string;
  todoStatus: boolean;
  todoCategory: string;
  todoCreatedTime: Date;
  todoCompletedTime: Date | undefined;
};
type TodoItems = TodoItem[];

interface TodoState {
  todoCategory: TodoCategory;
  todoItems: TodoItems;
}

const initialState: TodoState = {
  todoCategory: [],
  todoItems: [],
};

const todoSlice = createSlice({
  name: "todoSlice",
  initialState: initialState,
  reducers: {
    createTodo: {
      reducer: (state, action: PayloadAction<TodoItem>) => {
        const ifCategoryExist = state.todoCategory.indexOf(
          action.payload.todoCategory
        );
        if (ifCategoryExist === -1) {
          state.todoCategory.push(action.payload.todoCategory);
        }
        state.todoItems.push(action.payload);
        console.log("hi", current(state));
      },
      prepare: (todo: string, todoCategory: string): { payload: TodoItem } => {
        return {
          payload: {
            todoItemID: nanoid(),
            todoItem: todo,
            todoStatus: false,
            todoCategory: todoCategory,
            todoCreatedTime: new Date(),
            todoCompletedTime: undefined,
          },
        };
      },
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todoToMarkCompelete = state.todoItems.findIndex(
        (item) => item.todoItemID === action.payload
      );
      state.todoItems[todoToMarkCompelete].todoStatus = true;
      state.todoItems[todoToMarkCompelete].todoCompletedTime = new Date();
      console.log("hi", current(state));
    },
  },
});

export default todoSlice.reducer;
export const { createTodo, toggleTodo } = todoSlice.actions;
