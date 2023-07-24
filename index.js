const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 4000;
require('dotenv').config();
const jwt = require('jsonwebtoken');

const app = express();

// middleware
app.use(cors());
app.use(express.json());



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.USER}:${process.env.DB_PASS}@cluster0.sc0zrcq.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

//JWT verify function
const verifyJwt=(req,res,next)=>{
    const authHeader=req.headers.authorization;
    if(!authHeader){
      return res.status(401).send({message:'UnAuthorized Access'});
    }
    const token=authHeader.split(' ')[1];
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, function(err, decoded) {
      if(err){
        return res.status(403).send({message:'Forbidden Access'});
      }
      req.decoded=decoded;
       next();
    });
  }

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        const databaseCollection = client.db("Jute_Product").collection('example');
        const ProductCollection = client.db("Jute_Product").collection('products');
        const BookingCollection = client.db("Jute_Product").collection('bookings');
        const userCollection = client.db("Jute_Product").collection('user');
        const profileCollection = client.db("Jute_Product").collection('userProfile');

        app.get('/bookings', async (req, res) => {
            const query = {};
            const cursor = BookingCollection.find(query);
            const data=await cursor.toArray();
            res.send(data);
            console.log('data are colllecting');
        })

        app.post('/add',async(req,res)=>{
            const data=req.body;
            const addData= await databaseCollection.insertOne(data);
            res.send(addData);
        })

        app.post('/products',async(req,res)=>{
            const product=req.body;
            const result=await ProductCollection.insertOne(product);
            res.send(result);
        })
        app.post('/bookings',async(req,res)=>{
            const booking=req.body;
            const result=await BookingCollection.insertOne(booking);
            res.send(result);
        })

        app.get('/products',async(req,res)=>{
            const query={};
            const products= await ProductCollection.find(query).toArray();
            res.send(products);
        })
        app.get('/products/:id', async(req,res)=>{
            const id=req.params.id;
            const query={_id:new ObjectId(id)};
            const result=await ProductCollection.findOne(query);
            res.send(result);

        })
       

        app.get('/other/:catagory',async(req,res)=>{
            const catagory=req.params.catagory;
            const query={catagory};
            const otherData=await ProductCollection.find(query).toArray();
            res.send(otherData);
        })
//Api for upsert login data into user db
        app.put("/user/:email",async(req,res)=>{
            const email=req.params.email;
            const filter={email:email};
            const options={upsert:true};
            const user=req.body;
            const updateDoc = {
              $set: user
            };
            const result= await userCollection.updateOne(filter,updateDoc,options);
            const token = jwt.sign({email:email},process.env.ACCESS_TOKEN_SECRET,{ expiresIn: '7d' });
            res.send({result,token});
          });

           //Api for inserting profile into db
        app.post('/profile',async(req,res)=>{
            const data=req.body;
            const profile=await profileCollection.insertOne(data);
            res.send(profile);
          });

          app.get('/profile/:email',async(req,res)=>{
            const email=req.params.email;
            const filter={email:email};
            const myprofile=await profileCollection.findOne(filter);
            res.send(myprofile);
          })

           //Api for updating profile into db
        app.put('/profile/:email',verifyJwt,async(req,res)=>{
            const email=req.params.email;
            const filter={email:email};
            const option={upsert:true};
            const data=req.body;
            const updateDoc = {
              $set: data
            };
            const updateProfile=await profileCollection.updateOne(filter,updateDoc,option);
            res.send(updateProfile);
          })

        
    } finally {
        // Ensures that the client will close when you finish/error

    }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('Hello From Client Server')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})