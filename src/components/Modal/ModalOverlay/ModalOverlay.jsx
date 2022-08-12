import React from 'react'
import styles from '../Modal.module.css'
import PropTypes from 'prop-types'

function ModalOverlay({children}) {
  return (
    <div>
      {children}
    </div>
  )
}

ModalOverlay.propTypes = {
  children: PropTypes.element.isRequired
}

export default ModalOverlay