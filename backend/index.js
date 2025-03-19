const express=require("express")
const cors=require("cors")
const dotenv=require("dotenv")
const cookieParser=require("cookie-parser")
const { default: mongoose } = require("mongoose")
const authRouter=require("./routes/authRoutes")
const userRouter = require("./routes/userRoutes")


dotenv.config();

const app=express();

const PORT=process.env.PORT || 3000;
app.use(express.json())
app.use(cors("credentials:true"))
app.use(cookieParser())

const database=async()=>{
    await mongoose.connect(process.env.MONGO_URL)
    .then(()=>console.log("Connected to MongoDB"))
    .catch(err=>console.log(err))
}




app.get("/",(req,res)=>{
    res.send("Hi There")
}
)
app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)


app.listen(PORT,()=>{
    console.log(`lochost:${PORT}`);
    database()
})