import style from '../../moduleCSS/Navbar.module.css'
import AdminAvatar from '../../images/Adminavatar.webp'
import { Row, Col, Table } from 'react-bootstrap'
import { AiOutlineSearch } from 'react-icons/ai'
import { IoIosArrowDown } from 'react-icons/io'
import { IoIosArrowUp } from 'react-icons/io'
import { IoMdNotifications } from 'react-icons/io'
import { IconContext } from "react-icons";
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import $ from 'jquery'
import { useNavigate } from "react-router-dom";


const Navbar = (props) => {

    const [cookie, removeCookie] = useCookies(['username'])
    const [hoveronAdmin, sethoveronAdmin] = useState(false)
    const [searchKeyword, setSearchKeyword] = useState("")
    const [searchResults, setSearchResults] = useState(undefined)

    const navigate = useNavigate();

    useEffect(() => {
        (cookie.username === "undefined") && navigate("/", { replace: true })
    }, [cookie.username,navigate])
    

    const searchFunction = (e) => {
        (e.target.value === "") ? setSearchResults(undefined) : hitSearchAPI(e)
        setSearchKeyword(e.target.value)
        async function hitSearchAPI(e) {
            await axios.post(`http://localhost:8001/search${props.page}`, {
                name: e.target.value
            })
                .then(function (response) {
                    setSearchResults(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    const SearchFocused = () => {
        $("#searchDIV").animate({ width: '80%' })
    }
    const SearchDeFocused = () => {
        $("#searchDIV").animate({ width: '32%' })
        setSearchResults(undefined)
    }

    return (
        <>
            <nav style={{ position: "" }}>
                <div>
                    <ul className={style.TopnavbarList}>
                        <li id='searchDIV'>
                            <div className={style.searchDiv}>
                                <input type="text" value={searchKeyword} name='search' onFocus={SearchFocused} onBlur={SearchDeFocused} onChange={(e) => searchFunction(e)} placeholder={`Type ${props.page} Name Here`} />
                                {searchResults && <div id='searchResultDIV' className={style.SearchResults}>
                                    {
                                        <Table hover bordered style={{ marginBottom: "0" }} className="animate__animated animate__fadeInUpBig">
                                            <tbody>
                                                {
                                                    (searchResults.length === 0) ? <tr>

                                                        <td style={{ textAlign: "center" }}>Sorry, no books found!</td>

                                                    </tr> : searchResults.map((book, i) => {
                                                        return (
                                                            <>
                                                                {
                                                                (book.bid) ? <tr key={book.bid}>
                                                                    <td style={{ width: "8%" }}>{book.bid}</td>
                                                                    <td>{book.name}</td>
                                                                    <td>{book.author}</td>
                                                                </tr> : <tr key={book.sno}>
                                                                    <td style={{ width: "8%" }}>{book.sno}</td>
                                                                    <td>{book.name}</td>
                                                                    <td>{book.username}</td>
                                                                    <td>{book.address}</td>
                                                                </tr>
                                                                }
                                                            </>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </Table>
                                    }
                                </div>
                                }
                                <IconContext.Provider value={{}}>
                                    <span><AiOutlineSearch /></span>
                                </IconContext.Provider>
                            </div>
                        </li>
                        <li>
                            <div className={style.userAccount} onMouseEnter={() => sethoveronAdmin(true)} onMouseLeave={() => sethoveronAdmin(false)}>
                                <IconContext.Provider value={{ className: "topNotificationIcon", size: "30px" }}>
                                    <IoMdNotifications />
                                </IconContext.Provider>
                                <span><img src={AdminAvatar} alt="admin" /></span>
                                <span onMouseEnter={() => sethoveronAdmin(true)} onMouseLeave={() => sethoveronAdmin(false)}>
                                    <IconContext.Provider value={{ className: "topAmdinArrowIcon" }}>
                                        {(hoveronAdmin === true) ? <IoIosArrowUp /> : <IoIosArrowDown />}
                                    </IconContext.Provider>
                                </span>
                                <div className={style.accountDropdown}>
                                    <ul>
                                        <li>
                                            <Row>
                                                <Col>
                                                    <span style={{ paddingRight: "0px" }}><img src={AdminAvatar} alt="admin" /></span>
                                                </Col>
                                                <Col xl={8} style={{ alignSelf: "end" }}>
                                                    <h6>{cookie.username}</h6>
                                                    <p>Administrator</p>
                                                </Col>
                                            </Row>
                                        </li>
                                        <li><Link to="/">My Profile</Link></li>
                                        <li><Link to="/">Change Password</Link></li>
                                        <li><button className={style.logoutButton} onClick={() => removeCookie(['username'])}>Logout</button></li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar
