import {exampleObjectData1, ExampleObjectData} from './mockData';

// Suppose you want to get the terminalId in the object
const getTerminalId = (input: ExampleObjectData) => {
  // To get the terminal id
  // Need to check whether the value is null or undefined
  if (input.adyen) {
    if (input.adyen.terminalId) {
      return input.adyen.terminalId;
    }
  }
  // Return the default value;
  return 1;
};

getTerminalId(exampleObjectData1);
