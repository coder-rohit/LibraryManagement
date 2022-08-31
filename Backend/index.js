//returns a function reference. that function is called with express() . app is an object returned by express()
const express = require("express")
//instantiates Express and assigns app variable to it
const app = express()
//cors for Cross Origin Resource Sharing used for tranferring data between browsers and servers
const cors = require('cors')
app.use(cors())
// body-parser
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
//database connection
const dbconn = require('./databaseConn')
// dynamic collections names
const booksCollectionName = "books"
const studentsCollectionName = "students"
const adminsCollectionName = "admins"

app.get('/', (req, res) => {
    res.send('This is backend for Library Management')
})

app.post('/searchBook',async(req,res) => {
    const dataN = await searchByName(booksCollectionName,req.body.name)
    res.send(dataN)
})
app.post('/searchBookByID',async(req,res) => {
    const dataN = await searchByBID(booksCollectionName,req.body.bid)
    res.send(dataN)
})
app.post('/searchStudentByID',async(req,res) => {
    const dataN = await searchBySNO(studentsCollectionName,req.body.sno)
    
    res.send(dataN)
})
app.post('/searchStudent',async(req,res) => {
    const dataN = await searchByName(studentsCollectionName,req.body.name)
    res.send(dataN)
})

//get all books collection
app.post('/books', async (req, res) => {
    const data = await GetData(booksCollectionName)
    res.send(data)
})
app.post('/students', async (req, res) => {
    const data = await GetData(studentsCollectionName)
    res.send(data)
})

// check if username and password is correct
app.post('/users', async (req, res) => {
    const db = await dbconn(adminsCollectionName)
    const data = await db.find({ username: req.body.username, password: req.body.password }).toArray()
    const fres = data.length
    if (fres === 1) { res.send(true) } else res.send(false)
})

// get all the details needed to display on dashboard from dashboard
app.post('/dashboardData', async (req, res) => {
    const dbs = await dbconn(studentsCollectionName)
    const dbb = await dbconn(booksCollectionName)
    const dbu = await dbconn(adminsCollectionName)
    const datas = await dbs.find().sort({ $natural: -1 }).limit(3)
    const datab = await dbb.find().sort({ $natural: -1 }).limit(3)
    const datau = await dbu.findOne({ username: req.body.username })
    const booksCount = await dbb.countDocuments()
    const studentsCount = await dbs.countDocuments()
    const adminFullName = datau.fullName
    const finalData = { student: await datas.toArray(), books: await datab.toArray(), booksCount: booksCount, studentsCount: studentsCount, adminName: adminFullName }
    res.send(finalData)
})

//add books to database
app.post('/addBook', async (req, res) => {
    //defining data from request
    const dataN = req.body.bookD
    //getting collection items
    const bookData = await GetData(booksCollectionName)
    //getting number of items
    const nItems = bookData.length
    //setting autoincrement BID
    const nnItems = nItems+1
    const dataF = { bid: nnItems.toString(), name: dataN.name, author: dataN.author, cost: dataN.cost, quantity: dataN.quantity }
    //send final data to db query function
    const InsertRes = await addToDB(booksCollectionName, dataF)
    await (InsertRes === true) ? res.send(`Book Added Successfully\nUnique Book ID: ${dataF.bid}\nTitle: ${dataF.name}`) : res.send("Something went wrong")
})
//add student to database
app.post('/addStudent', async (req, res) => {
    //defining data from request
    const dataN = req.body.studentD
    //getting collection items
    const studentData = await GetData(studentsCollectionName)
    //getting number of items
    const nItems = studentData.length
    //setting autoincrement BID
    const nnItems = nItems+1
    const dataF = { sno: nnItems.toString(), name: dataN.name, username: dataN.username, address: dataN.address}
    //send final data to db query function
    const InsertRes = await addToDB(studentsCollectionName, dataF)
    await (InsertRes === true) ? res.send(`Submitted Successfully\nSerial No: ${dataF.sno}\nTitle: ${dataF.name}`) : res.send("Something went wrong")
})

app.post('/updateBookData', async (req, res) => {
    const status = await updateBookData(booksCollectionName, req.body.bookD)
    await (status.acknowledged === true && status.modifiedCount === 0) ? res.send("Nothing Changed") : (status.acknowledged === true || status.modifiedCount === 1)?res.send("Changes Saved"):res.send("Something Went Wrong")
})
app.post('/updateStudentData', async (req, res) => {
    const status = await updateStudentData(studentsCollectionName, req.body.studentD)
    await (status.acknowledged === true && status.modifiedCount === 0) ? res.send("Nothing Changed") : (status.acknowledged === true || status.modifiedCount === 1)?res.send("Changes Saved"):res.send("Something Went Wrong")
})

const searchByName = async (collectionName,searchQuery) => {
    const db = await dbconn(collectionName)
    const data = await db.find({"name": {$regex : `${searchQuery}` , $options: 'si' }}).toArray()   
    return (data)
}
const searchByBID = async (collectionName,searchQuery) => {
    const db = await dbconn(collectionName)
    const data = await db.find({"bid": {$regex : `${searchQuery}` , $options: 'si' }}).toArray()   
    return (data)
}
const searchBySNO = async (collectionName,searchQuery) => {
    const db = await dbconn(collectionName)
    const data = await db.find({"sno": {$regex : `${searchQuery}` , $options: 'si' }}).toArray() 
    return (data)
}

const GetData = async (collectionName) => {
    const db = await dbconn(collectionName)
    const data = await db.find().toArray()
    return (data)
}

async function addToDB(collectionName, dataToInsert) {
    const collectionname = await dbconn(collectionName)
    const InsertRes = await collectionname.insertOne(dataToInsert)
    return InsertRes.acknowledged
}

const updateBookData = async (collectionName, dataToInsert) => {
    const collection = await dbconn(collectionName)
    const status = await collection.updateOne(
        { "bid": dataToInsert.bid },
        {
            $set:
                { "name": dataToInsert.name, "author": dataToInsert.author, "cost": dataToInsert.cost, "quantity": dataToInsert.quantity }
        }
    )
    return status
}
const updateStudentData = async (collectionName, dataToInsert) => {
    const collection = await dbconn(collectionName)
    const status = await collection.updateOne(
        { "sno": dataToInsert.sno },
        {
            $set:
                { "name": dataToInsert.name, "username": dataToInsert.username, "address": dataToInsert.address}
        }
    )
    return status
}

app.listen(8001)