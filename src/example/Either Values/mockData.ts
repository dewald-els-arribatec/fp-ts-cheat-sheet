export interface ExampleBodyObject {
  stringArr?: string[];
  email?: string;
  name?: string;
  date?: string;
}

export const exampleBodyObject1: ExampleBodyObject = {};

export const exampleBodyObject2: ExampleBodyObject = {
  stringArr: ['a', 'b'],
};

export const exampleBodyObject3: ExampleBodyObject = {
  email: 'haha@gmail.com',
  name: 'kahin',
  date: '21-10-2022',
};

export const exampleBodyObject4: ExampleBodyObject = {
  stringArr: ['a', 'b'],
  email: 'haha@gmail.com',
  name: 'kahin',
  date: '21-10-2022',
};
