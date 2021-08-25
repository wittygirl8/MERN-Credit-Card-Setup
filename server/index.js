import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/creditcardform",{
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('DB Connected')
})

const cardSchema = new mongoose.Schema({
    card_number: Number,
    holder_name: String,
    exp_month: Number,
    exp_year: Number,
    cvv: Number
})

const Card_Credentials = new mongoose.model("Card_Credentials", cardSchema);
//Routes
app.post("/register",(req,res)=>{
    const { card_number, holder_name, exp_month, exp_year, cvv} = req.body;
    Card_Credentials.findOne({card_number: card_number}, (err, card) => {
        if(card){
            res.status(404).send({message: "Card already registered"})
        }
        else{
            const CardCredentials = new Card_Credentials({
                card_number, 
                holder_name, 
                exp_month, 
                exp_year, 
                cvv
            })
            CardCredentials.save(err => {
                if(err){
                    res.send(err);
                }else{
                    res.status(200).send({message: "Successfully Registered."});
                }
            })
        }
    })})

app.listen(4000, ()=>{
    console.log("Port is running in 4000");
})