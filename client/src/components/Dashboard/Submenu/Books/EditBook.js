import { Table, Button } from "react-bootstrap"
import Navbar from "../../../Navbars/Navbar"
import SideNavbar from "../../../Navbars/SideNavbar"
import { Row, Col } from 'react-bootstrap'
import { useState } from "react"
import axios from "axios"
import style from '../../../../moduleCSS/EditBook.module.css'
// import style2 from '../../../../moduleCSS/Admin.module.css'
import { useCookies } from 'react-cookie'

export default function EditBook() {

    const [cookie] = useCookies(['username'])

    const [book, setbook] = useState({
        bid: "", name: "", author: "", cost: "", quantity: ""
    })

    const handleInputs = (e) => {
        // e.preventDefault()
        let name = e.target.name
        let value = e.target.value
        setbook({ ...book, [name]: value })
    }


    const searchByBID = async (e) => {
        setbook({ ...book, bid: e.target.value})
        await axios.post("http://localhost:8001/searchBookByID", {
            bid: e.target.value
        })
            .then(function (response) {
                setbook({ ...book, bid: e.target.value, name: response.data[0].name, author: response.data[0].author, cost: response.data[0].cost, quantity: response.data[0].quantity, })
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const UpdateData = async (e) => {
        e.preventDefault()
        axios.post('http://localhost:8001/updateBookData', {
            bookD: book
        })
            .then(function (res) {
                alert(res.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    return (
        <>
            <Row>
                <Col>
                    <SideNavbar />
                </Col>
                <Col xl={9}>
                    <Navbar page="Student" />
                    <div className="mainContentContainer">
                        <h2>Welcome, {cookie.username} </h2>
                        <h6 style={{ color: "grey" }}>Edit Book ID and it's details will pop up in inputs</h6>
                        <div className={style.totalCards}>
                            <div className={style.tcard}>
                            </div>
                        </div>
                        <form className={style.bookForm} onSubmit={UpdateData}>
                            <Table bordered>
                                <tbody>
                                    <tr>
                                        <td>
                                            <label htmlFor="bid">Book ID</label>

                                        </td>
                                        <td>
                                            <input type="number" onChange={searchByBID} name="bid" value={book.id} placeholder="Enter to get corresponding book deltails" />
                                        </td>
                                    </tr>
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
                                            <input type="number" onChange={handleInputs} name="cost" value={book.cost} placeholder="Enter Cost" />
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
                                        </td>
                                        <td>
                                            <Button style={{ backgroundColor: "#18AEFA ", border: "none" }} type="submit">Update Data</Button>
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