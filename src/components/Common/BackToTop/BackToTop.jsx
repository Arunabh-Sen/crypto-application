import React from 'react'
import './styles.css'
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import { motion } from 'framer-motion';

const BackToTop = () => {

    let mybutton = document.getElementById("myBtn");

    window.onscroll = function () { scrollFunction() };

    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            mybutton.style.display = "flex";
        } else {
            mybutton.style.display = "none";
        }
    }

    function topFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    return (
        <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
            className='back-to-top-btn' id='myBtn' onClick={() => topFunction()}>
            <ArrowUpwardRoundedIcon style={{ color: "var(--blue)" }} />
        </motion.div>
    )
}

export default BackToTop