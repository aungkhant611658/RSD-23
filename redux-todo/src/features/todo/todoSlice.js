import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const url = "http://localhost:8888/tasks";

const initialState = {
  tasks: [],
};

export const fetchTasks = createAsyncThunk("tasks/getAll", async () => {
  // return await(await fetch(url)).json();
  const res = await fetch(url);
  return await res.json();
});

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    add: (state, action) => {
      state.tasks = [
        ...state.tasks,
        {
          _id: state.tasks[state.tasks.length - 1]._id + 1,
          subject: action.payload,
        },
      ];
    },
    del: (state, action) => {
      state.tasks = state.tasks.filter((item) => item._id !== action.payload);
    },
    toggle: (state, action) => {
      state.tasks = state.tasks.map((item) => {
        if (item._id === action.payload) item.done = !item.done;
        return item;
      });
    },
    clear: (state) => {
      state.tasks = state.tasks.filter((item) => !item.done);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
    });
  },
});

export const { add, del, toggle, clear } = todoSlice.actions;
export default todoSlice.reducer;
