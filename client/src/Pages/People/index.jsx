import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useDeleteExistingPersonMutation, useGetAllPeopleQuery, useGetExistingPersonByEmpTypeQuery } from '../../app/features/peopleApiSlice';
import { clearSelectedPerson, deletePerson, getPeople, getSelectedPerson } from '../../app/features/peopleSlice';
import { AddPeople, EditPeople, Header } from '../../components';


// const rows = [
//   { id: 1, displayName: 'Corey Curtis', empId: '0001', designation: 'Senior Developer', empType: 'Full Time', experience: '02 Years' },
//   { id: 2, displayName: 'Corey Curtis', empId: '0002', designation: 'Senior Developer', empType: 'Full Time', experience: '02 Years' },
//   { id: 3, displayName: 'Corey Curtis', empId: '0003', designation: 'Senior Developer', empType: 'Full Time', experience: '02 Years' },
//   { id: 4, displayName: 'Corey Curtis', empId: '0004', designation: 'Senior Developer', empType: 'Full Time', experience: '02 Years' },
//   { id: 5, displayName: 'Corey Curtis', empId: '0005', designation: 'Senior Developer', empType: 'Full Time', experience: '02 Years' },

// ];

function People() {

  const [empType, setEmpType] = useState('')
  const [open, setOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [peopleChangeCount, setPeopleChangeCount] = useState(0)

  const dispatch = useDispatch()

  const { data: people, refetch: refetchPeopleData } = useGetAllPeopleQuery({
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    refetchOnFocus: true,
  })

  const { data: peopleByEmpType} = useGetExistingPersonByEmpTypeQuery(empType)

  const [deleteExistingPerson] = useDeleteExistingPersonMutation()


  useEffect(() => {
    if (people) {
      dispatch(getPeople({ people }))
      refetchPeopleData()
    }
  }, [people, dispatch, peopleChangeCount])


  const handleChange = (event) => {
    setEmpType(event.target.value);
    console.log(empType);
  }

  const handleAddClick = () => {
    setOpen(true); // open the dialog
  };


  const handleEditClick = () => {
    setEditOpen(true); // open the dialog
  };

  const handleEditClose = () => {
    setEditOpen(false); // close the dialog
    dispatch(clearSelectedPerson())
  };

  const handleDialogClose = () => {
    setOpen(false); // close the dialog
  };

  const columns = [
    { field: 'prefferedName', headerName: 'Display Name', width: 200 },
    {
      field: 'empId',
      headerName: 'Emp ID',
      width: 150,
    },
    {
      field: 'designation',
      headerName: 'Designation',
      width: 200,
    },
    {
      field: 'empType',
      headerName: 'Emp. Type',
      type: 'number',
      width: 200,
    },
    {
      field: 'experience',
      headerName: 'Experience',
      width: 160,
    },
    {
      field: 'action',
      headerName: '',
      sortable: false,
      width: 160,
      renderCell: (params) => {
        const handleEdit = async () => {
          // logic to handle edit action
          dispatch(getSelectedPerson({ id: params.id }))
          handleEditClick()
        };

        const handleDelete = async () => {
          // logic to handle delete action
          try {
            await deleteExistingPerson({ id: params.id }).unwrap()
            setPeopleChangeCount((prev) => prev - 1)
            dispatch(deletePerson({ id: params.id }))
            refetchPeopleData()
          } catch (err) {
            console.log(err);
          }
        };

        return (
          <div className='flex gap-6'>
            <span className='text-blue-500 hover:cursor-pointer' onClick={handleEdit}>
              Edit
            </span>
            <span className='text-red-500 hover:cursor-pointer' onClick={handleDelete}>
              Delete
            </span>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Header title='People' />
      <div className='flex items-center justify-end gap-5 mt-5 pr-10'>
        <FormControl sx={{ width: '25%' }}>
          <InputLabel id="empType-lable">Employee Types</InputLabel>
          <Select
            labelId="empType-lable"
            value={empType}
            label="Employee Types"
            onChange={handleChange}
            size='small'
          >
            <MenuItem value='Full Time'>Full Time</MenuItem>
            <MenuItem value='Part Time'>Part Time</MenuItem>
            <MenuItem value='Contract Basis'>Contract Basis</MenuItem>
            <MenuItem value='Other'>Other</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" size='large' onClick={handleAddClick}>
          Add People
        </Button>
      </div>
      <Box sx={{ height: 800, width: '100%', marginTop: 2, padding: 5 }}>
        <DataGrid
          rows={peopleByEmpType?.map((person) => person) || []}
          // rows={rows}
          getRowId={(person) => person?._id}
          columns={columns}
          autoPageSize
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
        />
      </Box>
      {/* Dialog component */}
      <AddPeople open={open} handleDialogClose={handleDialogClose} refetchPeopleData={refetchPeopleData} setPeopleChangeCount={setPeopleChangeCount} />
      <EditPeople open={editOpen} handleDialogClose={handleEditClose} refetchPeopleData={refetchPeopleData} setPeopleChangeCount={setPeopleChangeCount} />
    </>
  );
}

export default People;