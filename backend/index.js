require("dotenv").config();
console.log('FINNHUB_API_KEY:', process.env.FINNHUB_API_KEY);
const express=require("express");
const mongoose=require("mongoose");
const body_parser=require("body-parser");
const cors=require("cors");
const PORT=process.env.PORT||3002;
const uri=process.env.MONGO_URL;
const {HoldingsModel}=require("./model/HoldingsModel.js");
const {PositionsModel}=require("./model/PositionsModel.js");
const {OrdersModel}=require("./model/OrdersModel.js");
const axios=require("axios");
const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const {UserModel} = require("./model/UserModel");
const { createSecretToken } = require("./util/SecretToken.js");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken")
const app=express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(body_parser.json());

app.get("/allHoldings",async(req,res)=>{
  // try {
  //   const allHoldings = await HoldingsModel.find({});
  //   res.json(allHoldings);
  // } catch (err) {
  //   console.error(err);
  //   res.status(500).json({ error: err.message });
  // }
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "No token found" });
    }

    const decoded = jwt.verify(token, process.env.TOKEN_KEY);

    const holdings = await HoldingsModel.find({
      userId: decoded.id,
    });

    res.json(holdings);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})
app.get("/allPositions",async(req,res)=>{
  let allPositions=await PositionsModel.find({});
  res.json(allPositions);
});
app.post("/newOrder",async(req,res)=>{
  console.log("Reached newOrder route");
  console.log(req.body);
  const token = req.cookies.token;
  // console.log("Token:", token);
  
if (!token) {
  return res.status(401).json({ message: "No token found" });
}
const decoded = jwt.verify(token, process.env.TOKEN_KEY);
  let newOrder=new OrdersModel({
    userId: decoded.id,
    name:req.body.name,
    qty:req.body.qty,
    price:req.body.price,
    mode:req.body.mode
  });
  const savedOrder = await newOrder.save();
console.log(savedOrder);
let holding = await HoldingsModel.findOne({
    userId: decoded.id,
    name: req.body.name,
});
console.log("holding.qty:", holding?.qty, typeof holding?.qty);

if (req.body.mode === "BUY") {
    if (holding) {
  const oldQty = holding.qty;
  const newQty = req.body.qty;

  const totalQty = oldQty + newQty;

  const newAverage =
    ((holding.avg * oldQty) + (req.body.price * newQty)) / totalQty;

  holding.qty = totalQty;
  holding.avg = newAverage;

  await holding.save();
}
else {
  await HoldingsModel.create({
    userId: decoded.id,
    name: req.body.name,
    qty: req.body.qty,
    avg: req.body.price,
    price: req.body.price,
    net: "+0%",
    day: "+0%",
  });
}

} else {
    // Reduce quantity or delete holding
    

  if (!holding) {
    return res.status(404).json({
      success: false,
      message: "You don't own this stock",
    });
  }

  // Check if user is trying to sell more than they own
  if (holding.qty < req.body.qty) {
    return res.status(400).json({
      success: false,
      message: "Not enough shares to sell",
    });
  }

  // Reduce quantity
  holding.qty -= Number(req.body.qty);

  // If all shares are sold, remove the holding
  if (holding.qty === 0) {
    await HoldingsModel.deleteOne({
      _id: holding._id,
    });
  } else {
    await holding.save();
  }
}

res.json({
  success: true,
  order: savedOrder,
});
});
app.get("/allOrders",async(req,res)=>{
  // let allOrders=await OrdersModel.find({});
  // res.json(allOrders);
  const token = req.cookies.token;
  // console.log("Token:", token);

if (!token) {
  return res.status(401).json({ message: "No token found" });
}
const decoded = jwt.verify(token, process.env.TOKEN_KEY);

const orders = await OrdersModel.find({
  userId: decoded.id,
});

res.json(orders);
})
// app.get("/allNews/:ticker",async(req,res)=>{
//   const ticker=req.params.ticker;
//   // let sentiment=await SentimentModel.find({ticker:ticker})
//   // if(sentiment){
//   //   res.json(sentiment);
//   // }
//   // else{
    
//   // }/
//   const { data } = await axios.get(`https://finance.yahoo.com/quote/${ticker}/news`);
//   const $ = cheerio.load(data);
//   console.log(data);
//   const headlines = [];
//   $('h3').each((i, el) => headlines.push($(el).text()));
//   return headlines.slice(0, 5);
// })

const mockHeadlinesDB = {
  AAPL: [
    "Apple beats Q3 earnings estimates on strong iPhone sales",
    "Analyst raises Apple price target to $210 citing services growth",
    "Apple faces regulatory scrutiny in EU over App Store policies"
  ],
  TSLA: [
    "Tesla deliveries miss expectations for the quarter",
    "Tesla announces price cuts across Model 3 and Model Y lineup",
    "Analyst downgrades Tesla citing margin pressure"
  ],
  NVDA: [
    "Nvidia posts record data center revenue on AI chip demand",
    "Nvidia unveils next-gen GPU architecture at industry event",
    "Nvidia stock surges after strong guidance for next quarter"
  ],
  MSFT: [
    "Microsoft Azure cloud revenue grows 30% year-over-year",
    "Microsoft announces layoffs in gaming division",
    "Microsoft integrates AI copilot across Office suite"
  ],
  DEFAULT: [
    "No major company-specific news available for this ticker today",
    "General market sentiment remains mixed amid macroeconomic uncertainty"
  ]
};

function getMockHeadlines(ticker) {
  return mockHeadlinesDB[ticker.toUpperCase()] || mockHeadlinesDB.DEFAULT;
}

async function getQuote(ticker) {
  const response = await axios.get('https://finnhub.io/api/v1/quote', {
    params: { symbol: ticker, token: process.env.FINNHUB_API_KEY }
  });

  const { c: current, pc: prevClose, h: high, l: low } = response.data;

  if (!current || current === 0) {
    throw new Error('Invalid ticker or no data available');
  }

  const percentChange = (((current - prevClose) / prevClose) * 100).toFixed(2);

  return {
    ticker,
    currentPrice: current,
    prevClose,
    percentChange,
    dayHigh: high,
    dayLow: low
  };
}

async function generateExplanation(snapshot, headlines) {
  const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });

  const prompt = `You are a financial analyst writing a brief, neutral explanation of a stock's price movement today.

Stock: ${snapshot.ticker}
Current price: $${snapshot.currentPrice}
Previous close: $${snapshot.prevClose}
Change: ${snapshot.percentChange}%
Day range: $${snapshot.dayLow} - $${snapshot.dayHigh}

Recent headlines:
${headlines.map((h, i) => `${i + 1}. ${h}`).join('\n')}

Instructions:
- Write 2-3 sentences explaining the likely reason for today's price movement.
- Reference specific headlines if they plausibly explain the move.
- If headlines don't clearly explain the move, say so honestly rather than guessing.
- Do NOT give investment advice or predictions about future price movement.
- Be factual and neutral in tone.`;

  const result = await model.generateContent(prompt);
  return result.response.text();
}

app.get("/explain/:ticker", async (req, res) => {
  const ticker = req.params.ticker.toUpperCase();

  try {
    console.log('STEP 1: Fetching Finnhub quote for', ticker);
    const snapshot = await getQuote(ticker);
    console.log('STEP 1 SUCCESS:', snapshot);

    const headlines = getMockHeadlines(ticker);

    console.log('STEP 2: Calling Gemini...');
    const explanation = await generateExplanation(snapshot, headlines);
    console.log('STEP 2 SUCCESS');

    res.json({ ...snapshot, headlines, explanation, generatedAt: new Date().toISOString() });
  } catch (err) {
    console.error('ERROR DETAILS:', err.response?.status, err.response?.data || err.message);
    res.status(500).json({ error: err.message || 'Failed to generate explanation' });
  }
});

app.get("/user", async (req, res) => {
  try {
    const token = req.cookies.token;

    const decoded = jwt.verify(token, process.env.TOKEN_KEY);

    const user = await UserModel.findById(decoded.id);

    res.json({
      username: user.username,
      email: user.email,
    });
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
});
app.post("/signup",async (req, res, next) => {
  try {
    const { email, password, username, createdAt } = req.body;
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      console.log("User exists");
       return res.status(409).json({
        success: false,
        message: "User already exists"
    });
    }
    const user = await UserModel.create({ email, password, username, createdAt });
    console.log("User:", user);
console.log("User ID:", user._id);
    const token = createSecretToken(user._id);
    console.log("Generated token:", token);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
    
  } catch (error) {
    console.error(error);
  }})
app.post("/login",async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if(!email || !password ){
      return res.json({message:'All fields are required'})
    }
    const user = await UserModel.findOne({ email });
    if(!user){
      return res.json({message:'Incorrect password or email' }) 
    }
    const auth = await bcrypt.compare(password,user.password)
    if (!auth) {
      return res.json({message:'Incorrect password or email' }) 
    }
     const token = createSecretToken(user._id);
     console.log("Generated token:", token);
     res.cookie("token", token, {
  httpOnly: false, 
  sameSite: "lax",
});
console.log(req.headers.cookie);
console.log(req.cookies);
    return res.status(201).json({ message: "User logged in successfully", success: true });
     
  } catch (error) {
    console.error(error);
  }
})
mongoose
  .connect(uri)
  .then(() => {
    console.log("✅ MongoDB Connected");

    app.listen(PORT, () => {
      console.log("App started");
    });
  })
  .catch((err) => {
    console.error("Connection Error:", err);
  });