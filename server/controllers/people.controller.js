import People from '../models/People.js';

/*
?@desc   Get all people
*@route  Get /v1/api/people
*@access Public
*/

const getPeople = async (req, res) => {
  try {
    const people = await People.find({});
    res.status(200).json(people);
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error occured while fetching people data' });
  }
};

/*
?@desc   Create new people
*@route  Post /v1/api/people
*@access Public
*/

const createPeople = async (req, res) => {
  const {
    fullName,
    nameWithInitials,
    prefferedName,
    gender,
    dob,
    email,
    mobile,
    designation,
    empType,
    joinedDate,
    experience,
    salary,
    personalNotes,
  } = req.body;

  // Generate empId
  const empCount = await People.countDocuments();
  const empId = (empCount + 1).toString().padStart(4, '0');

  // Validate input data
  if (!fullName || typeof fullName !== 'string') {
    return res
      .status(400)
      .json({ message: 'fullName is required and must be a string' });
  }
  if (!email || typeof email !== 'string' || !/\S+@\S+\.\S+/.test(email)) {
    return res
      .status(400)
      .json({ message: 'email is required and must be a valid email address' });
  }
  if (!mobile || typeof mobile !== 'string' || !/^\d{10}$/.test(mobile)) {
    return res
      .status(400)
      .json({ message: 'mobile is required and must be a 10-digit number' });
  }
  if (!salary || typeof salary !== 'number' || salary < 0) {
    return res.status(400).json({
      message: 'salary is required and must be a non-negative number',
    });
  }

  // Sanitize input data
  const sanitizedData = {
    fullName: fullName.trim(),
    empId,
    nameWithInitials: nameWithInitials ? nameWithInitials.trim() : null,
    prefferedName: prefferedName ? prefferedName.trim() : null,
    gender: gender ? gender.trim() : null,
    dob: dob ? dob.trim() : null,
    email: email.trim(),
    mobile: mobile.trim(),
    designation: designation ? designation.trim() : null,
    empType: empType ? empType.trim() : null,
    joinedDate: joinedDate ? joinedDate.trim() : null,
    experience: experience ? experience.trim() : null,
    salary,
    personalNotes: personalNotes ? personalNotes.trim() : null,
  };

  try {
    const person = await People.create(sanitizedData);
    res.status(201).json(person);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: 'Error occurred while creating new employee' });
  }
};

/*
?@desc   Edit an existing employee
*@route  PUT /v1/api/people/:id
*@access Public
*/

const editPeople = async (req, res) => {
  const {
    fullName,
    nameWithInitials,
    prefferedName,
    gender,
    dob,
    email,
    mobile,
    designation,
    empType,
    joinedDate,
    experience,
    salary,
    personalNotes,
  } = req.body;

  try {
    const person = await People.findById(req.params.id);
    if (!person) {
      res.status(404).json({ message: 'Employee not found' });
    }
    person.fullName = fullName || person.fullName;
    person.nameWithInitials = nameWithInitials || person.nameWithInitials;
    person.prefferedName = prefferedName || person.prefferedName;
    person.gender = gender || person.gender;
    person.dob = dob || person.dob;
    person.email = email || person.email;
    person.mobile = mobile || person.mobile;
    person.designation = designation || person.designation;
    person.empType = empType || person.empType;
    person.joinedDate = joinedDate || person.joinedDate;
    person.experience = experience || person.experience;
    person.salary = salary || person.salary;
    person.personalNotes = personalNotes || person.personalNotes;

    const updatedPerson = await person.save();
    res.status(200).json(updatedPerson);
  } catch (err) {
    res.status(500).json({ message: 'Error occured while updating employee' });
    console.log(err.message);
  }
};

/*
?@desc   Delete an employee
*@route  Delete /v1/api/people/:id
*@access Public
*/

const deletePeople = async (req, res) => {
  try {
    const person = await People.findById(req.params.id);
    if (!person) {
      res.status(404).json({ message: 'Employee not found' });
    }
    await person.deleteOne();
    res.status(200).json({ message: 'Employee removed' });
  } catch (err) {
    res.status(500).json({ message: 'Error occured while deleting employee' });
    console.log(err.message);
  }
};

/*
?@desc   Get people by employee type
*@route  Delete /v1/api/people/empType
*@access Public
*/

const getPeopleByEmpType = async (req, res) => {
  try {
    const people = await People.find({ empType: req.params.empType });
    res.status(200).json(people);
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error occured while fetching people data' });
  }
};

export {
  getPeople,
  createPeople,
  editPeople,
  deletePeople,
  getPeopleByEmpType,
};
