import {exampleBodyObject4, ExampleBodyObject} from './mockData';

// Suppose you want to get all the input in the body
const getBodyInput = (body: ExampleBodyObject) => {
  // To get the input
  // Need to check whether the value is null or undefined for all the input
  // If one of the value is null or undefined then return error messages
  if (!body.stringArr) {
    return Error('No stringArr');
  }
  if (!body.email) {
    throw Error('No email');
  }
  if (!body.name) {
    throw Error('No name');
  }
  if (!body.date) {
    throw Error('No date');
  }
  // Return the input;
  return body;
};

getBodyInput(exampleBodyObject4);
