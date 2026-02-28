import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import API from "../../services/axios";

export type Difficulty = "Easy" | "Medium" | "Hard";

interface Assignment {
  _id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  question?: string;
  postgreSchema?: string;
}

interface AssignmentState {
  list: Assignment[];
  selected: Assignment | null;
  filter: Difficulty;
  loading: boolean;
  error: string | null;
}

export const fetchAssignmentById = createAsyncThunk(
  "assignment/fetchAssignmentById",
  async (id: string, thunkAPI) => {
    try {
      const res = await API.get(`/assignments/${id}`);
      return res.data.assignment;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

export const fetchAssignments = createAsyncThunk(
  "assignment/fetchAssignments",
  async (difficulty: Difficulty, thunkAPI) => {
    try {
      const res = await API.get(`/assignments?difficulty=${difficulty}`);
      return res.data.assignments;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  },
);

const initialState: AssignmentState = {
  list: [],
  selected: null,
  filter: "Easy",
  loading: false,
  error: null,
};

const assignmentSlice = createSlice({
  name: "assignment",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<Difficulty>) => {
      state.filter = action.payload;
    },
    setSelectedAssignment: (state, action: PayloadAction<Assignment>) => {
      state.selected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssignments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssignments.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchAssignments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchAssignmentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssignmentById.fulfilled, (state, action) => {
        state.loading = false;
        state.selected = action.payload;
      })
      .addCase(fetchAssignmentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setFilter, setSelectedAssignment } = assignmentSlice.actions;

export default assignmentSlice.reducer;
