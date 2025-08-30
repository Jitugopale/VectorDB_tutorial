//create qdrant client

import {QdrantClient} from '@qdrant/js-client-rest';

export const qdrant = new QdrantClient({
  url: "http://localhost:6333",
});

//ensure collection
//This ensureCollection function ensures that a specific Qdrant collection exists in your vector database
export async function ensureCollection(collectionName) { 
  const collections = await qdrant.getCollections();
  const collectionExists = collections.collections.find(c=>c.name === collectionName)

  if(!collectionExists){
    await qdrant.createCollection(
      collectionName,
      {vectors:{
        size:1536,
        distance:'Cosine', 
      }
    })
    console.log(`Collection created successfully,${collectionName}`)
  }else{
    console.log(`Collection already exists,${collectionName}`);
  }
}

//insert collection
//This function insertToQdrant is used to insert or update a vector into a Qdrant collection
export async function insertToQdrant(collectionName,id,vector,payload) { 
  return qdrant.upsert(collectionName,{
    points:[
      {
        id,
        vector,
        payload
      }
    ]
  })

}


//search collection
//This searchQdrant function is used to perform a vector similarity search in a Qdrant collection.
export async function searchQdrant(collectionName,vector) { 
  return qdrant.search(collectionName,{
    vector,
    top:3
  })
}