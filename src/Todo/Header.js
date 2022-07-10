import './Header.scss'
import { Link, NavLink } from 'react-router-dom'
function Header() {
    return (
        <div class="topnav">
            <NavLink activeClassName="active1" to="/" exact>Home</NavLink>
            <NavLink activeClassName="active1" to="/todo">Todo</NavLink>
            <NavLink activeClassName="active1" to="/about">About</NavLink>
            <NavLink activeClassName="active1" to="/blog">Blog</NavLink>
            <NavLink activeClassName="active1" to="/detail/2">News</NavLink>
        </div>
    )
}
export default Header