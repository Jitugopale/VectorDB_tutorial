import { getEmbedding } from "../services/openai.js";
import { ensureCollection, insertToQdrant } from "../services/qdrant.js";

const sampleDocs = [
  { id: 1, title: 'Hydration', content: 'Drinking enough water daily supports digestion, energy levels, and overall health.' },
  { id: 2, title: 'Exercise', content: 'Regular physical activity improves immunity, cardiovascular health, and mental well-being.' },
  { id: 3, title: 'Sleep', content: 'Adults need 7-9 hours of quality sleep for recovery, memory, and strong immunity.' },
  { id: 4, title: 'Balanced Diet', content: 'Eating a mix of fruits, vegetables, proteins, and whole grains supports body functions.' },
  { id: 5, title: 'Stress Management', content: 'Meditation, deep breathing, or hobbies help reduce stress and improve focus.' },
  { id: 6, title: 'Mental Health', content: 'Talking to loved ones or professionals can support emotional well-being.' },
  { id: 7, title: 'Hygiene', content: 'Washing hands and maintaining cleanliness helps prevent infections and diseases.' },
  { id: 8, title: 'Regular Checkups', content: 'Annual health checkups can detect issues early and improve treatment outcomes.' },
  { id: 9, title: 'Posture', content: 'Maintaining good posture reduces back pain and improves breathing efficiency.' },
  { id: 10, title: 'Healthy Habits', content: 'Avoid smoking, limit alcohol, and eat mindfully to protect long-term health.' },
];

await ensureCollection('healthInfo');

for (const doc of sampleDocs){
    const vector = await getEmbedding(doc.content);
    await insertToQdrant('healthInfo',doc.id,vector,doc)
}

console.log("Seed data completed in Qdrant.");
