const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')

const port = process.env.PORT || 4000

//Getting our Json data : 
let content
fs.readFile('./reference.json',(err,data)=>{
    if(err){
        throw err 
    }
    else {
        return content = JSON.parse(data) 
    }
})

//getting the Mediacollection resource : 
let collection
fs.readFile('./collections.json',(err,data)=>{
    if(err){
        throw err 
    }
    else {
        return collection = JSON.parse(data) 
    }
})

// endpoints : 

        //test : 

//app.get('/database/name',(re,res)=>{ 
  //  res.json(content.resources.collections.model.properties)    

//})
// For the collection resource : 2 endpoints : (A) GET ON The RESOURCE ITSELF  & (B) 1 on the element .1 ednpoint : Delete on the element as well :)

// (A) Get request on the Resource itself: 

app.get('/data/collection',(req,res)=>{
    res.json(collection)
}) 


//(B) Get request on one specefic element  (!!!By id!!!):
app.get('/data/collection/:id',(req,res)=>{
        var id = req.params.id
        if (id <= collection.media_collection.length ) {

            res.json(collection.media_collection[id-1])
        }
        else {
            res.status(404).json('Data Not Found')
        }
})

//(C): Delete request on a specefic element : 

app.delete('/data/Delete/:id',(req,res)=>{
    const id = req.params.id 
    const deleted = collection.media_collection.find(media_collection => media_collection.id === id )
    if (deleted) {
        collectiction.media_collection.filter(collection.media_collection , media_collection.id !== id )
        res.send("item deleted ! ")
    } else {
        res.send('the data you are looking for does not exist')
    }
})


// For the renders resource : 2 endpoints (A) on the resource , (B) on a specefic element :  

// Loading the data : 

let render
fs.readFile('./renders.json',(err,data)=>{
    if(err){
        throw err 
    }
    else {
        return render = JSON.parse(data) 
    }
})

//(A) :

app.get('/data/render',(req,res)=>{
    res.json(render)
}) 

//(B) :

app.get('/data/render/:id',(req,res)=>{
    var id = req.params.id
    if(id!=0){
        if (id <= render.render.length ) {

            res.json(render.render[id-1])
        }
        else {
            res.status(404).json('Data Not Found')
        }
    }
    else {
        res.status(500).json('Internal server error')
    }
})


app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})