export interface ExampleObjectData {
  id: string;
  adyen?: {
    transactionId: string;
    terminalId?: string;
  };
}

export const exampleObjectData1: ExampleObjectData = {
  id: '1',
  adyen: {
    transactionId: '1',
    terminalId: '1',
  },
};

export const exampleObjectData2: ExampleObjectData = {
  id: '1',
};

export const exampleObjectData3: ExampleObjectData = {
  id: '1',
  adyen: {
    transactionId: '1',
  },
};
