import style from '../../moduleCSS/SideNavbar.module.css'
import Logo from '../../images/libraryLogoOG.png'
import { MdDashboardCustomize } from 'react-icons/md'
import { IoIosArrowDown } from 'react-icons/io'
import { ImBooks } from 'react-icons/im'
import { FaUserGraduate } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function SideNavbar() {
    return (
        <div className={style.SideNavbar}>
            <nav>
                <ul className={style.TopnavbarList}>
                    <li>
                        <img className={style.logo} src={Logo} alt="" />
                    </li>
                </ul>
            </nav>
            <div className={style.MainMenu}>
                <ul style={{ marginBottom: "0", listStyle: "none"}}>
                    <li>
                        <h6>Main Menu</h6>
                    </li>
                </ul>
                <ul className={style.MenuList}>
                    <Link to="/admin">
                        <li >
                            <MdDashboardCustomize />
                            <span>Dashboard</span>
                            {/* <span style={{marginLeft: "auto"}}><IoIosArrowDown/></span> */}
                        </li>
                    </Link>
                    <Link to="/admin">
                        <li>
                            <FaUserGraduate />
                            <span>Students</span>
                            <span style={{ marginLeft: "auto" }}><IoIosArrowDown /></span>
                        </li>
                    </Link>
                    <ul className={style.subMainMenu}>
                        <Link to="/studentHome"><li>Students List</li></Link>
                        <Link to="/editStudent"><li>Student Edit</li></Link>
                        <Link to="/addStudent"><li>Add Students</li></Link>
                    </ul>
                    <Link to="/admin">
                        <li>
                            <ImBooks />
                            <span>Books</span>
                            <span style={{ marginLeft: "auto" }}><IoIosArrowDown /></span>
                        </li>
                    </Link>
                    <ul className={style.subMainMenu}>
                        <Link to="/bookHome"><li>Books Inventory</li></Link>
                        <Link to="/editBook"><li>Book Edit</li></Link>
                        <Link to="/addBook"><li>Add New Book</li></Link>
                    </ul>                  
                </ul>
            </div>
        </div>
    )
}