// Import Express framework to create the backend server
const express = require("express");

// Import CORS to allow frontend (React) to access backend APIs
const cors = require("cors");

// Import Prisma Client to interact with SQLite database
const { PrismaClient } = require("@prisma/client");

// Load environment variables from .env file
require("dotenv").config();
const OpenAI = require("openai");

// (Optional) Gemini import – commented because currently using OpenAI
// const { GoogleGenerativeAI } = require("@google/generative-ai");
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Initialize Express app
const app = express();

// Initialize Prisma client (database connection)
const prisma = new PrismaClient();

// Initialize OpenAI client using API key from .env
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(cors());
app.use(express.json());

// BASIC test
app.get("/", (req, res) => {
  res.send("Backend running");
});

//FAQ CRUD APIs

// GET all FAQs from database
app.get("/faqs", async (req, res) => {
  const faqs = await prisma.fAQ.findMany();
  res.json(faqs);
});

// CREATE a new FAQ
app.post("/faqs", async (req, res) => {
  const { question, answer } = req.body;

  const faq = await prisma.fAQ.create({
    data: { question, answer },
  });

  res.json(faq);
});

// UPDATE an existing FAQ
app.put("/faqs/:id", async (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;

  const faq = await prisma.fAQ.update({
    where: { id },
    data: { question, answer },
  });

  res.json(faq);
});

// DELETE an FAQ
app.delete("/faqs/:id", async (req, res) => {
  const { id } = req.params;

  await prisma.fAQ.delete({
    where: { id },
  });

  res.json({ message: "Deleted" });
});

//AI REWRITE API
app.post("/ai/rewrite", async (req, res) => {
  try {
    const { answer } = req.body;
    if (!answer) {
      return res.status(400).json({ error: "Answer is required" });
    }

    // Call OpenAI API to rewrite the answer
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a professional customer support writer.",
        },
        {
          role: "user",
          content: `Rewrite this answer to be clearer and more professional:\n${answer}`,
        },
      ],
    });
    res.json({
      rewritten: completion.choices[0].message.content,
    });
  } catch (error) {
    //error for debugging
    console.error(error);
    res.status(500).json({ error: "AI rewrite failed" });
  }
});

//START SERVER
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
