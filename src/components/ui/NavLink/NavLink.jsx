import styles from './NavLink.module.css'
import React from 'react'
import PropTypes from 'prop-types';


function NavLink({children, icon, active}) {
  return (
    active ? 
    ( 
      <a href="/" className={styles.link}>
        {React.createElement(icon, {type: 'primary'})}
        <p className={`text text_type_main-default ${styles.text} active`}>
        {children}
        </p>
      </a>
    ):(
      <a href="/" className={styles.link}>
        {React.createElement(icon, {type: 'secondary'})}
        <p className={`text text_type_main-default ${styles.text}`}>
        {children}
        </p>
      </a>
    )
  )
}

NavLink.propTypes = {
  children: PropTypes.string,
  icon: PropTypes.func,
  // active: PropTypes.bolean,

}



export default NavLink