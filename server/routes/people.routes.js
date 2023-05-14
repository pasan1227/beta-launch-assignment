import express from 'express';
import {
  createPeople,
  deletePeople,
  editPeople,
  getPeople,
  getPeopleByEmpType,
} from '../controllers/people.controller.js';

const peopleRouter = express.Router();

peopleRouter.get('/', getPeople).post('/', createPeople);
peopleRouter.get('/:id').put('/:id', editPeople).delete('/:id', deletePeople);
peopleRouter.get('/:empType', getPeopleByEmpType);

export default peopleRouter;
