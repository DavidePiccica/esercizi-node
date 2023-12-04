import * as fs from 'node:fs';
import { Buffer } from 'node:buffer';

const dataToWrite = "Hello world";
const newFileName = 'Hello.txt';
const data = Buffer.from(dataToWrite, 'utf-8');

fs.writeFile(newFileName, data, function (error) {
  if (error) {
    console.error('Error in compilation', error);
    return error;
  }
  console.log('File saved!');
});