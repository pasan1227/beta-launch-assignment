/* eslint-disable react/prop-types */
import CloseIcon from '@mui/icons-material/Close';
import { Button, Dialog, IconButton, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAddNewPersonMutation } from '../../app/features/peopleApiSlice';
import { addPerson } from '../../app/features/peopleSlice';
import Header from "../Header";

const AddPeople = ({ open, handleDialogClose, refetchPeopleData, setPeopleChangeCount }) => {

  const [fullName, setFullName] = useState('')
  const [nameWithInitials, setNameWithInitials] = useState('')
  const [prefferedName, setPrefferedName] = useState('')
  const [gender, setGender] = useState('Male')
  const [dob, setDob] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [designation, setDesignation] = useState('')
  const [empType, setEmpType] = useState('Full Time')
  const [joinedDate, setJoinedDate] = useState('')
  const [experience, setExperience] = useState('')
  const [salary, setSalary] = useState(1000)
  const [personalNotes, setPersonalNotes] = useState('')

  const [addNewPerson] = useAddNewPersonMutation()
  const dispatch = useDispatch()

  // console.log(fullName, nameWithInitials, prefferedName, gender, dob, email, mobile, designation, empType, joinedDate, experience, 'salary:' + salary, personalNotes);
  // console.log(typeof (salary))

  const handleAddPeople = async () => {
    // logic to handle add people action
    try {
      const personData = await addNewPerson({ fullName, nameWithInitials, prefferedName, gender, dob, email, mobile, designation, empType, joinedDate, experience, salary, personalNotes }).unwrap()
      dispatch(addPerson({ person: personData }))
      setPeopleChangeCount((prev) => prev + 1)
      refetchPeopleData()
      handleDialogClose()
      setFullName('')
      setNameWithInitials('')
      setPrefferedName('')
      setGender('')
      setDob('')
      setEmail('')
      setMobile('')
      setDesignation('')
      setEmpType('Full Time')
      setJoinedDate('')
      setExperience('')
      setSalary(1000)
      setPersonalNotes('')
    } catch (err) {
      console.log(err);
    }
    console.log('Adding people');
  }

  return (
    <Dialog open={open} onClose={handleDialogClose} sx={{ height: 1200, width: 1200 }}>
      <div className="flex items-center">
        <Header title='Add People' />
        <div className='flex justify-end'>
          <IconButton onClick={handleDialogClose}>
            <CloseIcon />
          </IconButton>
        </div>
      </div>
      <div className="flex flex-wrap justify-between gap-1 p-5">
        <div className="w-full">
          <InputLabel
            labelid="emp-no-lable">
            Full Name*
          </InputLabel>
          <TextField
            fullWidth
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
      </div>
      <div className="flex gap-10 p-5">
        <div>
          <InputLabel
            labelid="emp-no-lable">
            Name with initials*
          </InputLabel>
          <TextField
            value={nameWithInitials}
            onChange={(e) => setNameWithInitials(e.target.value)}
          />
        </div>
        <div>
          <InputLabel
            labelid="emp-no-lable">
            Preferred / Display Name*
          </InputLabel>
          <TextField
            value={prefferedName}
            onChange={(e) => setPrefferedName(e.target.value)}
          />
        </div>
      </div>
      <div className="flex gap-10 p-5">
        <div>
          <InputLabel
            labelid="gender-lable">
            Gender
          </InputLabel>
          <Select labelid="gender-lable" id="gender-lable" fullWidth defaultValue='Male' value={gender} onChange={(e) => setGender(e.target.value)}>
            <MenuItem value='Male'>Male</MenuItem>
            <MenuItem value='Female'>Female</MenuItem>
            <MenuItem value='Other'>Other</MenuItem>
          </Select>
        </div>
        <div>
          <InputLabel
            labelid="emp-no-lable">
            Date of birth
          </InputLabel>
          <TextField
            type='date'
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </div>
      </div>
      <div className="flex gap-10 p-5">
        <div>
          <InputLabel
            labelid="emp-no-lable">
            Email
          </InputLabel>
          <TextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <InputLabel
            labelid="emp-no-lable">
            Mobile Number
          </InputLabel>
          <TextField
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>
      </div>
      <div className="flex gap-10 p-5">
        <div>
          <InputLabel
            labelid="emp-no-lable">
            Designation
          </InputLabel>
          <TextField
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
          />
        </div>
        <div>
          <InputLabel
            labelid="empType-lable">
            Employee Type
          </InputLabel>
          <Select labelId="empType-lable" fullWidth defaultValue='01 Year' value={empType} onChange={(e) => setEmpType(e.target.value)}>
            <MenuItem value='Full Time'>Full Time</MenuItem>
            <MenuItem value='Part Time'>Part Time</MenuItem>
            <MenuItem value='Contract Basis'>Contract Basis</MenuItem>
            <MenuItem value='Other'>Other</MenuItem>
          </Select>
        </div>
      </div>
      <div className="flex gap-10 p-5">
        <div>
          <InputLabel
            labelid="emp-no-lable">
            Joined Date
          </InputLabel>
          <TextField
            type='date'
            value={joinedDate}
            onChange={(e) => setJoinedDate(e.target.value)}
          />
        </div>
        <div>
          <InputLabel
            labelid="exp-lable">
            Experience
          </InputLabel>
          <Select labelId="exp-lable" fullWidth defaultValue='03 Years' value={experience} onChange={(e) => setExperience(e.target.value)}>
            <MenuItem value='01 Year'>01 Year</MenuItem>
            <MenuItem value='02 Year'>02 Year</MenuItem>
            <MenuItem value='03 Year'>03 Year</MenuItem>
          </Select>
        </div>
      </div>
      <div className="flex p-5">
        <div>
          <InputLabel
            labelid="emp-no-lable">
            Salary
          </InputLabel>
          <TextField
            placeholder='450,000.00'
            value={Number(salary)}
            onChange={(e) => setSalary(Number(e.target.value))}
          />
        </div>
      </div>
      <div className="flex flex-wrap justify-between gap-1">
        <div className="w-full p-5">
          <InputLabel
            labelid="emp-no-lable">
            Personal Notes
          </InputLabel>
          <TextField
            fullWidth
            placeholder='Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis commodi, cum veritatis eos .'
            value={personalNotes}
            onChange={(e) => setPersonalNotes(e.target.value)}
          />
        </div>
      </div>
      <div className='flex justify-end p-3 gap-3'>
        <Button onClick={handleDialogClose}>Cancel</Button>
        <Button variant='contained' color='primary' onClick={handleAddPeople}>Add People</Button>
      </div>
    </Dialog>
  );
};

export default AddPeople;