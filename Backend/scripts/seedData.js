import { getEmbedding } from "../services/openai.js";
import { ensureCollection, insertToQdrant } from "../services/qdrant.js";

const sampleDocs = [
  {
    id: 1,
    title: "Hydration",
    content:
      "Drinking enough water daily supports digestion, energy levels, and overall health.",
  },
  {
    id: 2,
    title: "Exercise",
    content:
      "Regular physical activity improves immunity, cardiovascular health, and mental well-being.",
  },
  {
    id: 3,
    title: "Sleep",
    content:
      "Adults need 7-9 hours of quality sleep for recovery, memory, and strong immunity.",
  },
  {
    id: 4,
    title: "Balanced Diet",
    content:
      "Eating a mix of fruits, vegetables, proteins, and whole grains supports body functions.",
  },
  {
    id: 5,
    title: "Stress Management",
    content:
      "Meditation, deep breathing, or hobbies help reduce stress and improve focus.",
  },
  {
    id: 6,
    title: "Mental Health",
    content:
      "Talking to loved ones or professionals can support emotional well-being.",
  },
  {
    id: 7,
    title: "Hygiene",
    content:
      "Washing hands and maintaining cleanliness helps prevent infections and diseases.",
  },
  {
    id: 8,
    title: "Regular Checkups",
    content:
      "Annual health checkups can detect issues early and improve treatment outcomes.",
  },
  {
    id: 9,
    title: "Posture",
    content:
      "Maintaining good posture reduces back pain and improves breathing efficiency.",
  },
  {
    id: 10,
    title: "Healthy Habits",
    content:
      "Avoid smoking, limit alcohol, and eat mindfully to protect long-term health.",
  },
];

const productDocs = [
  {
    id: 101,
    title: "Multivitamin Tablets",
    content:
      "Daily multivitamin supplement that supports immunity, bone health, and energy levels.",
  },
  {
    id: 102,
    title: "Blood Pressure Monitor",
    content: "Digital device for checking and tracking blood pressure at home.",
  },
  {
    id: 103,
    title: "Glucose Test Strips",
    content: "Strips for measuring blood sugar levels, used with a glucometer.",
  },
  {
    id: 104,
    title: "Omega-3 Capsules",
    content: "Fish oil supplement that supports heart and brain health.",
  },
  {
    id: 105,
    title: "Protein Powder",
    content: "Whey protein supplement for muscle recovery and strength.",
  },
  {
    id: 106,
    title: "Herbal Green Tea",
    content: "Natural green tea that boosts metabolism and aids digestion.",
  },
  {
    id: 107,
    title: "Air Purifier",
    content:
      "Home air purifier to reduce dust, allergens, and improve breathing.",
  },
  {
    id: 108,
    title: "Fitness Tracker",
    content: "Wearable device to monitor steps, heart rate, and sleep quality.",
  },
  {
    id: 109,
    title: "Vitamin D3 Drops",
    content:
      "Supplement that helps strengthen bones and improve calcium absorption.",
  },
  {
    id: 110,
    title: "Health Insurance Plan",
    content:
      "Comprehensive insurance plan covering hospitalization and major treatments.",
  },
];

async function seedData() {
  // health info
  await ensureCollection("healthInfo");
  for (const doc of sampleDocs) {
    const vector = await getEmbedding(doc.content);
    await insertToQdrant("healthInfo", doc.id, vector, doc);
  }

  // health products
  await ensureCollection("healthProducts");
  for (const doc of productDocs) {
    const vector = await getEmbedding(doc.content);
    await insertToQdrant("healthProducts", doc.id, vector, doc);
  }
  console.log("seed data completed in Qdrant");
}

await seedData();
