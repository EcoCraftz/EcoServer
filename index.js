const express = require('express');
const cors = require('cors');
const port = process.env.PORT||4000;
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
        client.connect();
        const databaseCollection = client.db("Jute_Product").collection('example');
        const ProductCollection = client.db("Jute_Product").collection('products');
        const BookingCollection = client.db("Jute_Product").collection('bookings');
        const userCollection = client.db("Jute_Product").collection('user');
        const profileCollection = client.db("Jute_Product").collection('userProfile');
        const catagoryCollection = client.db("Jute_Product").collection('insertedCatagory');

        

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
        });
        app.get('/bookings', async (req, res) => {
            const query = {};
            const cursor = BookingCollection.find(query);
            const data=await cursor.toArray();
            res.send(data);
            console.log('data are colllecting');
        });

        app.get('/bookings/:email',async(req,res)=>{
          const email=req.params.email;
          console.log(email);
          const query={email:email};
          const bookingData= await BookingCollection.find(query).toArray();
          res.send(bookingData);
        });

        app.get('/details/:id', async(req,res)=>{
          const id=req.params.id;
          const query={_id: new ObjectId(id)};
          const result=await BookingCollection.findOne(query);
          res.send(result);
      });

        app.get('/products',async(req,res)=>{
            const query={};
            const products= await ProductCollection.find(query).toArray();
            res.send(products);
        })
        app.get('/juteProducts',async(req,res)=>{
            const query={};
            const products= await ProductCollection.find(query).sort({$natural:-1}).limit(26).toArray();
            res.send(products);
        })
        app.get('/handyProducts/:Need',async(req,res)=>{
          const need=req.params.Need;
          console.log(need);
            const query={parent:need};
            const products= await ProductCollection.find(query).limit(16).toArray();
            res.send(products);
        })
// api for getting items as catagory start
        app.get('/qproduct/:qcatagory',async(req,res)=>{
          const qcatagory=req.params.qcatagory;
          const query={catagory:qcatagory};
           const products= await ProductCollection.find(query).sort({$natural:-1}).limit(15).toArray();
            res.send(products);
        })
        app.get('/product/:catagory1',async(req,res)=>{
          const catagory1=req.params.catagory1;
          const query={catagory:catagory1};
           const products= await ProductCollection.find(query).sort({$natural:-1}).limit(3).toArray();
            res.send(products);
        })
        app.get('/product/:catagory2',async(req,res)=>{
          const catagory2=req.params.catagory2;
          const query={catagory:catagory2};
           const products= await ProductCollection.find(query).sort({$natural:-1}).limit(3).toArray();
            res.send(products);
        })
        app.get('/product/:catagory3',async(req,res)=>{
          const catagory3=req.params.catagory3;
          const query={catagory:catagory3};
           const products= await ProductCollection.find(query).sort({$natural:-1}).limit(3).toArray();
            res.send(products);
        })
        app.get('/product/:catagory4',async(req,res)=>{
          const catagory4=req.params.catagory4;
          const query={catagory:catagory4};
           const products= await ProductCollection.find(query).sort({$natural:-1}).limit(3).toArray();
            res.send(products);
        })
        app.get('/product/:catagory5',async(req,res)=>{
          const catagory5=req.params.catagory5;
          const query={catagory:catagory5};
           const products= await ProductCollection.find(query).sort({$natural:-1}).limit(3).toArray();
            res.send(products);
        })
        app.get('/product/:catagory6',async(req,res)=>{
          const catagory6=req.params.catagory6;
          const query={catagory:catagory6};
           const products= await ProductCollection.find(query).sort({$natural:-1}).limit(3).toArray();
            res.send(products);
        })
        app.get('/product/:catagory7',async(req,res)=>{
          const catagory7=req.params.catagory7;
          const query={catagory:catagory7};
           const products= await ProductCollection.find(query).sort({$natural:-1}).limit(3).toArray();
            res.send(products);
        })
        app.get('/product/:catagory8',async(req,res)=>{
          const catagory8=req.params.catagory8;
          const query={catagory:catagory8};
           const products= await ProductCollection.find(query).sort({$natural:-1}).limit(3).toArray();
            res.send(products);
        })
        app.get('/product/:catagory9',async(req,res)=>{
          const catagory9=req.params.catagory9;
          const query={catagory:catagory9};
           const products= await ProductCollection.find(query).sort({$natural:-1}).limit(3).toArray();
            res.send(products);
        })
        // api for getting items as catagory end

        app.get('/otherProducts',async(req,res)=>{
            const query={};
            const products= await ProductCollection.find(query).limit(24).toArray();
            res.send(products);
        })
        app.get('/products/:id', async(req,res)=>{
            const id=req.params.id;
            const query={_id:new ObjectId(id)};
            const result=await ProductCollection.findOne(query);
            res.send(result);

        })

            app.get('/latest',async(req,res)=>{
            const preview=await ProductCollection.find({}).sort({$natural:-1}).limit(6).toArray()
            res.send(preview);
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

          app.get('/users',async(req,res)=>{
            const filter={};
            const users= await userCollection.find(filter).toArray();
            res.send(users);
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
          });

// api for updating booking data 
app.put('/updateBooking/:id',verifyJwt,async(req,res)=>{
  const id=req.params.id;
  const filter={_id:new ObjectId(id)};
  const option={upsert:true};
  const editedData=req.body;
  const updateDoc = {
    $set: editedData
  };
  const updateBooking=await BookingCollection.updateOne(filter,updateDoc,option);
  res.send(updateBooking);
})

// api for editing image 
app.put('/updateImage/:id',verifyJwt,async(req,res)=>{
  const id=req.params.id;
  const filter={_id:new ObjectId(id)};
  const option={upsert:true};
  const editedImage=req.body;
  const updateDoc = {
    $set: editedImage
  };
  const updatedImage=await ProductCollection.updateOne(filter,updateDoc,option);
  res.send(updatedImage);
})

          // Api for Deleting   
            //Api for deleting Order
        app.delete('/deleteBooking/:id',async(req,res)=>{
          const id=req.params.id;
          const filter={_id:new ObjectId(id)};
          const removedata=await BookingCollection.deleteOne(filter);
          res.send(removedata);
        });

         //Api for delete a user
      app.delete('/users/:email',verifyJwt,async(req,res)=>{
        const email=req.params.email;
        const filter={email:email};
        const removeUser=await userCollection.deleteOne(filter);
        res.send(removeUser);
      })

      app.delete('/deleteProduct/:id',verifyJwt,async(req,res)=>{
        const id=req.params.id;
          const filter={_id:new ObjectId(id)};
          const removedData=await ProductCollection.deleteOne(filter);
          res.send(removedData);
      })


           //Api for making an user to admin
           app.put("/user/admin/:email",verifyJwt,async(req,res)=>{
            const email=req.params.email;
            const initiator=req?.decoded.email;
  
            const initiatorAccount=await userCollection.findOne({email:initiator});
            if(initiatorAccount.role==="Admin"){
              const filter={email:email};
              const updateDoc = {
                $set:{
                  role:'Admin'
                }
              };
              const result= await userCollection.updateOne(filter,updateDoc);
             return res.send(result);
            }
           else{
            return res.status(403).send({message:'Forbidden'});
           }
          });

           //Api for verify admin
      app.get('/admin/:email',verifyJwt,async(req,res)=>{
        const email=req.params.email;
        const user=await userCollection.findOne({email:email});
        const isAdmin=user.role==="Admin";
        res.send({admin:isAdmin});
      })


      //Api for inserting data in catagory DB
      app.post('/insertedCatagory',async(req,res)=>{
        const data=req.body;
        const inserted=await catagoryCollection.insertOne(data);
        res.send(inserted);
      });
      app.get('/insertedCatagory',async(req,res)=>{
        const query={};
        const products= await catagoryCollection.find(query).toArray();
        res.send(products);
    });

    app.delete('/insertedCatagory/:id',async(req,res)=>{
      const id=req.params.id;
      const filter={_id:new ObjectId(id)};
      const removedata=await catagoryCollection.deleteOne(filter);
      res.send(removedata);
    });

          

        
    } finally {
        // Ensures that the client will close when you finish/error

    }
}
run().catch(console.dir);



app.listen(port, () => {
    console.log(`EcoCrafz Server is listening on port ${port}`)
})