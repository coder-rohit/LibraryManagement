import { Table, Button } from "react-bootstrap"
import Navbar from "../../../Navbars/Navbar"
import SideNavbar from "../../../Navbars/SideNavbar"
import { Row, Col } from 'react-bootstrap'
import { useState } from "react"
import axios from "axios"
import style from '../../../../moduleCSS/EditBook.module.css'
// import style2 from '../../../../moduleCSS/Admin.module.css'
import { useCookies } from 'react-cookie'

export default function Addstudent() {

    const [cookie] = useCookies(['username'])

    const [student, setStudent] = useState({
        name: "", username: "", address: ""
    })

    const handleInputs = (e) => {
        // e.preventDefault()
        let name = e.target.name
        let value = e.target.value
        setStudent({ ...student, [name]: value })
    }

    const handleFormData = async (e) => {
        e.preventDefault()
        console.log(student)
        axios.post('http://localhost:8001/addStudent', {
            studentD: student
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
                        <h6 style={{ color: "grey" }}>Add New Student</h6>
                        <div className={style.totalCards}>
                            <div className={style.tcard}>
                            </div>
                        </div>
                        <form className={style.bookForm} onSubmit={handleFormData}>
                            <Table bordered>
                                <tbody>
                                    <tr>
                                        <td>
                                            <label htmlFor="title">Name</label>
                                        </td>
                                        <td>
                                            <input type="text" onChange={handleInputs} name="name" value={student.name} placeholder="Enter Title" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label htmlFor="author">Username</label>
                                        </td>
                                        <td>
                                            <input type="text" onChange={handleInputs} name="username" value={student.username} placeholder="Enter Username Name" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label htmlFor="cost">Address</label>
                                        </td>
                                        <td>
                                            <input type="text" onChange={handleInputs} name="address" value={student.address} placeholder="Enter Address" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                        </td>
                                        <td>
                                            <Button style={{backgroundColor: "#18AEFA ", border: "none"}} type="submit">Submit</Button>
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