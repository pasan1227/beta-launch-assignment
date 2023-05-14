import { apiSlice } from '../api/apiSlice';

export const peopleApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPeople: builder.query({
      query: () => ({
        url: '/people',
      }),
    }),
    addNewPerson: builder.mutation({
      query: (newPerson) => ({
        url: '/people',
        method: 'POST',
        body: { ...newPerson },
      }),
    }),
    editExistingPerson: builder.mutation({
      query: ({ id, ...person }) => ({
        url: `/people/${id}`,
        method: 'PUT',
        body: { ...person },
      }),
    }),
    deleteExistingPerson: builder.mutation({
      query: ({ id }) => ({
        url: `/people/${id}`,
        method: 'DELETE',
      }),
    }),
    getPeopleByEmpType: builder.query({
      query: ({ empType }) => ({
        url: `/people/${empType}`,
      }),
    }),
  });

  export const {
    useGetAllPeopleQuery,
    useAddNewPersonMutation,
    useEditExistingPersonMutation,
    useDeleteExistingPersonMutation,
    useGetPeopleByEmpTypeQuery
  } = peopleApiSlice;
