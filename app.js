import express from 'express';
import db from './db/db';

const app = express();

app.get('/api/investments',(req,res)=>{
  res.status(200).send({
    success:'true',
    message: 'portfolio retrieved successfully',
    portfolios: db
  })
});

const PORT = 5000;

app.listen(PORT,()=>{
  console.log(`server running on port ${PORT}`)
});