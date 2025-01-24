import React from 'react'
import "./styles.css"
import AnchorTemporaryDrawer from './Drawer'
import Button from '../../Button/Button'
import { Link } from 'react-router-dom'


const Header = () => {
    return <div className='navbar'>
        <h1 className='logo'>CryptoTracker<span style={{ color: "var(--blue)" }}>.</span></h1>
        <div className='links'>
            <Link to="/">
                <p className='link'>Home</p>
            </Link>
            <Link to="/compare">
                <p className='link'>Compare</p>
            </Link>
            <Link to="/dashboard">
                <Button text={"Dashboard"}
                    outlined={false}
                    onClick={() => console.log("Btn clicked")} />
            </Link>
        </div>
        <div className="mobile-drawer">
            <AnchorTemporaryDrawer />
        </div>
    </div>
}

export default Header