const {Schema}=require("mongoose");
const SentimentSchema = new mongoose.Schema({

    symbol:String,

    sentiment:String,

    confidence:Number,

    summary:String,

    updatedAt:Date

});
module.exports={SentimentSchema};