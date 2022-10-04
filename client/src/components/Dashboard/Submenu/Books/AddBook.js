import { Table, Button } from "react-bootstrap"
import Navbar from "../../../Navbars/Navbar"
import SideNavbar from "../../../Navbars/SideNavbar"
import { Row, Col } from 'react-bootstrap'
import { useState } from "react"
import axios from "axios"
import style from '../../../../moduleCSS/EditBook.module.css'
// import style2 from '../../../../moduleCSS/Admin.module.css'
import { useCookies } from 'react-cookie'

export default function AddBook() {

    const [cookie] = useCookies(['username'])

    const [book, setbook] = useState({
        name: "", author: "", cost: "", quantity: "", discount:""
    })

    const handleInputs = (e) => {
        let name = e.target.name
        let value = e.target.value
        setbook({ ...book, [name]: value })
    }

    const [imgFile, setimgFile] = useState(null)

    const formData = new FormData()
    formData.append('bookImage', imgFile)

    const handleImageInput = (e) =>{
        setimgFile(e.target.files[0])
    }

    const handleFormData = async (e) => {
        e.preventDefault()
        axios.post('http://localhost:8001/addBook', {
            bookD: book
        }, { headers: { 'contentType': "multipart/form-data" } })
            .then(function (res) {
                alert(res.data)
            })
            .catch(function (error) {
                console.log(error)
            })

        axios.post('http://localhost:8001/uploadBookImage', formData, { headers: { 'contentType': "multipart/form-data" } } )
        setbook({name: "", author: "", cost: "", quantity: "", discount:""})
    }

    return (
        <>
            <Row>
                <Col>
                    <SideNavbar />
                </Col>
                <Col xl={9}>
                    <Navbar page="Student" placeholder="Book ID or Name"/>
                    <div className="mainContentContainer">
                        <h2>Welcome, {cookie.username} </h2>
                        <h6 style={{ color: "grey" }}>Add New Book</h6>
                        <div className={style.totalCards}>
                            <div className={style.tcard}>
                            </div>
                        </div>
                        <form className={style.bookForm} onSubmit={handleFormData} encType="multipart/form-data" >
                            <Table bordered>
                                <tbody>
                                    <tr>
                                        <td>
                                            <label htmlFor="title">Title</label>
                                        </td>
                                        <td>
                                            <input type="text" onChange={handleInputs} name="name" value={book.name} placeholder="Enter Title" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label htmlFor="author">Author</label>
                                        </td>
                                        <td>
                                            <input type="text" onChange={handleInputs} name="author" value={book.author} placeholder="Enter Author Name" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label htmlFor="cost">Cost</label>
                                        </td>
                                        <td>
                                            <input type="number" style={{width: "50%", borderRight: "1px solid rgb(210, 210, 210)"}} onChange={handleInputs} name="cost" value={book.cost} placeholder="Enter Cost" />
                                            <input type="number" style={{width: "50%"}} onChange={handleInputs} name="discount" value={book.discount} placeholder="Enter Discount" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label htmlFor="quantity">Quantity</label>
                                        </td>
                                        <td>
                                            <input type="number" onChange={handleInputs} name="quantity" value={book.quantity} placeholder="Enter Inventory" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label htmlFor="quantity">Image</label>
                                        </td>
                                        <td>
                                            <input type="file" onChange={handleImageInput} name="bookImage" placeholder="Upload Image" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                        </td>
                                        <td>
                                            <Button style={{ backgroundColor: "#18AEFA ", border: "none" }} type="submit">Update or Insert</Button>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </form>
                    </div>
                </Col>
            </Row>
        </>
    )
}