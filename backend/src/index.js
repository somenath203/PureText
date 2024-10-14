import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { env } from 'hono/adapter';
import { Index } from "@upstash/vector";
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';


export const runtime = "edge";


const app = new Hono();


const semanticCharacterSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 25,
  separators: [" "], 
  chunkOverlap: 12
});


app.use('/*', cors());


const splitInputTextByUserIntoWords = (textOfUser) => {

  return textOfUser.split(/\s/); 

}


const splitTextIntoSemantics = async (textOfUser) => {

  if(textOfUser.split(/\s/).length === 1) {

    return [];

  }

  const documents = await semanticCharacterSplitter.createDocuments([textOfUser]);

  const chunks = documents.map((chunk) => chunk.pageContent); 

  return chunks;

}


app.get('/', (c) => {
  
  return c.json({
    success: true,
    message: "Welcome to the PureText API. This API allows you to analyze and detect the toxicity level of any given sentence, helping to identify inappropriate or harmful language."
  }, { status: 200 });

});


app.post('/check-text-toxicity', async (c) => {

  try {


    const body = await c.req.json();

    let { inputMessageByUserFromFrontend } = body;


    if(!inputMessageByUserFromFrontend) {

      return c.json({
        error: 'message input from user is required'
      }, { status: 400 });

    }


    if (inputMessageByUserFromFrontend.split(/\s/).length > 35 || inputMessageByUserFromFrontend.length > 1000) {

      return c.json({
        SUCCESS: false,
        error: 'Due to temporary cloudflare limits, a text can only be up to 35 words or 1000 characters.',
      }, { status: 413 });

    }

    const { UPSTASH_VECTOR_REST_URL, UPSTASH_VECTOR_REST_TOKEN } = env(c);
    
  
    const redisIndexVectorDB = new Index({
      url: UPSTASH_VECTOR_REST_URL,
      token: UPSTASH_VECTOR_REST_TOKEN,
      cache: false
    });
    

    const [ wordChunks, semanticChunks ] = await Promise.all([

      splitInputTextByUserIntoWords(inputMessageByUserFromFrontend),

      splitTextIntoSemantics(inputMessageByUserFromFrontend)

    ]);


    const wordsThatAreFlaggedAsProfanity = new Set(); 


    const resFromVectorDB = await Promise.all([

      ...wordChunks.map(async (wordChunk) => {

        const [ vector ] = await redisIndexVectorDB.query({
          topK: 1,
          data: wordChunk,
          includeMetadata: true
        });
        

        if(vector && vector.score > 0.95) {

          wordsThatAreFlaggedAsProfanity.add({ 
            text: vector?.metadata?.text, 
            score: vector?.score 
          });

        }

        return { score: 0 };

      }),

      ...semanticChunks.map(async (semanticChunk) => {

        const [ vector ] = await redisIndexVectorDB.query({
          topK: 1,
          data: semanticChunk,
          includeMetadata: true
        });
        

        if(vector && vector.score > 0.86) {

          wordsThatAreFlaggedAsProfanity.add({ 
            text: vector?.metadata?.text, 
            score: vector?.score 
          });

        }

        return vector;

      })

    ]);

    if(wordsThatAreFlaggedAsProfanity.size > 0) {


      const profanityScoreAndTextSort = Array.from(wordsThatAreFlaggedAsProfanity).sort((a, b) => {

        return a.score > b.score ? -1 : 1;

      })[0];

      return c.json({
        isProfanity: true,
        score: profanityScoreAndTextSort?.score,
      }, { status: 200 });

    } else {

      const mostProfainedChunk = resFromVectorDB.sort((a, b) => a.score > b.score ? -1 : 1)[0];

      return c.json({
        isProfanity: false,
        score: mostProfainedChunk?.score
      }, { status: 200 });

    }

    
  } catch (error) {
    
    console.error(error);

    return c.json(error?.message || 'Internal Server Error', { status: 500 });
    
  }

});


export default app;
