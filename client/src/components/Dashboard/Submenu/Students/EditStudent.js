import { Table, Button } from "react-bootstrap"
import Navbar from "../../../Navbars/Navbar"
import SideNavbar from "../../../Navbars/SideNavbar"
import { Row, Col } from 'react-bootstrap'
import { useState } from "react"
import axios from "axios"
import style from '../../../../moduleCSS/EditBook.module.css'
import { useCookies } from 'react-cookie'

export default function Editstudent() {

    const [cookie] = useCookies(['username'])

    const [student, setStudent] = useState({
        sno: "", name: "", username: "", address: ""
    })
    
    const handleInputs = (e) => {
        // e.preventDefault()
        let name = e.target.name
        let value = e.target.value
        setStudent({ ...student, [name]: value })
    }

    const searchByBID = async (e) => {
        setStudent({ ...student, sno: e.target.value})
        await axios.post("http://localhost:8001/searchStudentByID", {
            sno: e.target.value
        })
        .then(function (response) {
            (response.data[0]) && setStudent({ ...student, sno: e.target.value, name: response.data[0].name, username: response.data[0].username, address: response.data[0].address})
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const UpdateData = async (e) => {
        e.preventDefault()
        axios.post('http://localhost:8001/updateStudentData', {
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
                    <Navbar page="Student"  placeholder="Student ID or Name"/>
                    <div className="mainContentContainer">
                        <h2>Welcome, {cookie.username} </h2>
                        <h6 style={{ color: "grey" }}>Edit student ID and it's details will pop up in inputs</h6>
                        <div className={style.totalCards}>
                            <div className={style.tcard}>
                            </div>
                        </div>
                        <form className={style.bookForm} onSubmit={UpdateData}>
                            <Table bordered>
                                <tbody>
                                    <tr>
                                        <td>
                                            <label htmlFor="bid">Student ID</label>

                                        </td>
                                        <td>
                                            <input type="number" onChange={searchByBID} name="sno" value={student.sno} placeholder="Enter to get corresponding student deltails" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label htmlFor="title">Name</label>
                                        </td>
                                        <td>
                                            <input type="text" onChange={handleInputs} name="name" value={student.name} placeholder="Name" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label htmlFor="author">Username</label>
                                        </td>
                                        <td>
                                            <input type="text" onChange={handleInputs} name="username" value={student.username} placeholder="Username" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label htmlFor="cost">Address</label>
                                        </td>
                                        <td>
                                            <input type="text" onChange={handleInputs} name="address" value={student.address} placeholder="Address" />
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