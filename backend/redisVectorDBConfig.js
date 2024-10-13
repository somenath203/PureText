import { Index } from "@upstash/vector";

import { config } from 'dotenv';

config();


// SINCE IT IS A VECTOR DATABASE AND NOT A NORMAL DATABASE THEREFORE IT WILL BE ABLE TO UNDERSTAND THE WORD
// NO MATTER HOW WE TYPE IT
export const redisIndexVectorDB = new Index({
  url: process.env.UPSTASH_VECTOR_REST_URL,
  token: process.env.UPSTASH_VECTOR_REST_TOKEN,
  cache: false
});


