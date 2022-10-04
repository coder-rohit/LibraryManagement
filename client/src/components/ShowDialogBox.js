import axios from 'axios'
import { useState, useEffect } from 'react'
import { Modal, Col, Row, Table } from 'react-bootstrap'
import style from '../moduleCSS/ShowDialogBox.module.css'
import { AiOutlineSearch } from 'react-icons/ai'
// import style from '../moduleCSS/BookHome.module.css'

export default function ShowDialogBox(props) {

    const [studentDetails, setStudentDetails] = useState(undefined)
    const [studentID, setStudentID] = useState("")
    const [studentData, setStudentData] = useState("")
    const [rentedTo, setRentedTo] = useState([])
    const [rerender, setRerender] = useState(1)     

    const addStudentToBook = async(sno) =>{
        (rentedTo) && (rentedTo.find(e => e === studentData.sno) !== studentData.sno) && rentedTo.push(sno)
        await axios.post('http://localhost:8001/updateStudentBookData',{
            rentedTo: rentedTo,
            bid: props.bookID,
            quantity: --props.bookAllDetails.quantity
        })
        .then(function(response){
            // alert(response.data)
            setRerender(rerender+1)
        })
    }

    function arrayRemove(arr, value) { 
    
        return arr.filter(function(ele){ 
            return ele !== value; 
        });
    }

    const removeStudentFromBook = async(sno) =>{
        await(rentedTo) && await setRentedTo(arrayRemove(rentedTo, sno))
        await axios.post('http://localhost:8001/updateStudentBookData',{
            rentedTo: arrayRemove(rentedTo, sno),
            bid: props.bookID,
            quantity: ++props.bookAllDetails.quantity
        })
        .then(function(response){
            // alert(response.data)
        })
        setRerender(rerender+1)
    }

    const searchStudent = async (e) => {
        e.preventDefault();
        (studentID) && await axios.post("http://localhost:8001/searchStudentByID", {
            sno: studentID
        })
            .then(function (response) {
                setStudentData(response.data[0][0])
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {
        axios.post('http://localhost:8001/searchBookByID', {
            bid: props.bookID
        })
            .then(function (response) {
                (response.data[0].rentedTo) && setRentedTo(response.data[0].rentedTo)
                if (response.data[0].rentedTo === undefined) { setStudentDetails(undefined) } else {
                    axios.post('http://localhost:8001/searchStudentByID', {
                        sno: response.data[0].rentedTo,
                        
                    })
                        .then(function (response2) {
                            setStudentDetails(response2.data)
                        })
                }
            })
    }, [props.bookID,rerender])

    return (
        <Modal centered show={props.show} onHide={props.handleCloseFunction} dialogClassName={style.dialogModal}>
            <Modal.Header closeButton>
                <Modal.Title>Book Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col>
                        <div>
                            <div className={style.CardImage}>
                                <div className={style.bid}>
                                    {props.bookAllDetails.bid}
                                </div>
                                <img src={require(`../images/bookImages/${props.bookAllDetails.image}.jpeg`)} alt="" />
                            </div>
                            <div className={style.CardDetails}>
                                <div>
                                    <h6>{props.bookAllDetails.name}</h6>
                                    <p>by {props.bookAllDetails.author}</p>
                                </div>
                                <div className={style.CardPrice}>

                                    <h5>₹{Math.round(props.bookAllDetails.cost - [(props.bookAllDetails.cost / 100) * props.bookAllDetails.discount])}</h5>
                                    <p>₹{props.bookAllDetails.cost}</p> <span className={style.discount}>({props.bookAllDetails.discount}% Off)</span>
                                </div>
                                <h5 style={{ fontSize: "16px" }}>@ ₹{Math.round(props.bookAllDetails.cost - [(props.bookAllDetails.cost / 100) * 90])}/month</h5>
                                {(props.bookAllDetails.quantity <= 5) ? <span style={{ color: "red" }}  className="animate__animated animate__flash">Left {props.bookAllDetails.quantity} only</span> : <span style={{ color: "green" }}>Copies available {props.bookAllDetails.quantity}</span>}
                            </div>
                        </div>
                    </Col>
                    <Col>
                        {(studentDetails === undefined) ? <h5>Rented By 0</h5> : <h5>Rented By {studentDetails.length}</h5>}
                        {(studentDetails) ? <Table hover className={style.rentedByTable}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    studentDetails.map((student, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>
                                                    <p>{student[0].sno}</p>
                                                </td>
                                                <td>
                                                    <p>{student[0].name}</p>
                                                </td>
                                                <td>
                                                    <button className={style.actionBTN} onClick={()=>removeStudentFromBook(student[0].sno)}>Returned</button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table> : <h6>Seems like no one rented this book</h6>}
                    </Col>
                    <Col>
                        <div className={style.AddStudentToBook}>
                            <h5>Add Students</h5>
                            <form onSubmit={(e)=>searchStudent(e)}>
                            <div>
                                <input type="text" placeholder='Enter student ID' value={studentID} onChange={(e) => setStudentID(e.target.value)} />
                                <button type="submit"><AiOutlineSearch /></button>
                            </div>
                            </form>
                            {
                                (studentData) && <Table className='mt-2' bordered style={{borderRadius: "4px"}}>
                                    <tbody>
                                        <tr>
                                            <td>ID:</td>
                                            <td>{studentData.sno}</td>
                                        </tr>
                                        <tr>
                                            <td>Name:</td>
                                            <td>{studentData.name}</td>
                                        </tr>
                                        <tr>
                                            <td>Username:</td>
                                            <td>{studentData.username}</td>
                                        </tr>
                                        <tr>
                                            <td>Address:</td>
                                            <td>{studentData.address}</td>
                                        </tr>
                                        <tr>
                                            <td>Action:</td>
                                            {(rentedTo)?<td>{(rentedTo.find(e => e === studentData.sno) !== studentData.sno)?<button className={style.actionBTN} onClick={()=>addStudentToBook(studentData.sno)}>Rent this book</button>: <span style={{color: "#ff0000", marginBottom: "0", textDecoration: "underline"}}>Rented this book already</span>}</td>:<td><button className={style.actionBTN} onClick={()=>addStudentToBook(studentData.sno)}>Rent this book</button></td>}
                                        </tr>
                                    </tbody>
                                </Table>
                            }
                        </div>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    )
}