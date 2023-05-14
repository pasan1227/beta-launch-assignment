import { createSlice } from '@reduxjs/toolkit';

const peopleSlice = createSlice({
  name: 'people',
  initialState: {
    person: {},
    people: [],
  },
  reducers: {
    getPeople: (state, action) => {
      const { people } = action.payload;
      state.people = people;
    },
    addPerson: (state, action) => {
      const { person } = action.payload;
      state.people.push(person);
    },
    editPerson: (state, action) => {
      const { person } = action.payload;
      const index = state.people.findIndex((p) => p._id === person._id);
      state.people[index] = person;
    },
    deletePerson: (state, action) => {
      const { id } = action.payload;
      console.log(id);
      console.log(state.people);
      state.people = state.people.filter((person) => person._id !== id);
      console.log(state.people);
    },
    getSelectedPerson: (state, action) => {
      const { id } = action.payload;
      state.person = state.people.find((person) => person._id === id);
    },
    clearSelectedPerson: (state) => {
      state.person = {};
    },
  },
});

export const {
  getPeople,
  addPerson,
  editPerson,
  deletePerson,
  getSelectedPerson,
  clearSelectedPerson,
} = peopleSlice.actions;
export default peopleSlice.reducer;
