import fs from 'fs';
import csv from 'csv-parser';

import { redisIndexVectorDB } from './redisVectorDBConfig';


const parseCSVFile = async (csvFilePath) => {

  return new Promise((resolve, reject) => {

    const csvData = [];

    fs.createReadStream(csvFilePath)
      .pipe(csv({ separator: ',' }))
      .on('data', (row) => {

        csvData.push(row);

      })
      .on('error', (err) => {

        reject(err);

      })
      .on('end', () => {

        resolve(csvData);
        
      });
  });

};


const csvDataInsideRedisDatabase = async () => {

    try {
       
        const parsedCSVData = await parseCSVFile('training_data.csv');


        for (let i = 0; i < parsedCSVData.length; i += 30) {

            const sendDataToDBInChunk = parsedCSVData.slice(i, i + 30);
            // at i = 0, slicing will be from 0 to 30, at i = 1, slicing will be from 1 to 31 and so on
            // i.e. array of size 30 each

            const eachDataInChunkInTheFormOfObject = sendDataToDBInChunk.map((row, index) => ({

                // directly returning an object out of each element in the array by wrapping the callback function
                // inside paranthesis
    
                data: row.text,
                id: i + index,
                metadata: { text: row.text }
            
            }));

            
            // inserting the data inside upstach vector db
            await redisIndexVectorDB.upsert(eachDataInChunkInTheFormOfObject);

        }

        
    } catch (error) {
        
        console.log(error);
        
    }

};

csvDataInsideRedisDatabase();