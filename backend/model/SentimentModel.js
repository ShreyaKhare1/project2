const{model}=require("mongoose");
const {SentimentSchema}=require("../schemas/SentimentSchema");
const SentimentModel=new model("sentiment",SentimentSchema);
module.exports={SentimentModel};