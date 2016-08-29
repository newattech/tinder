import React, { PropTypes } from 'react';
import styles from './styles.css';
import Icon from 'components/Icon';


const styleMapping = {
  superlike: {
    marginBottom: 3,
  },
  pass: {
    left: 4,
  },
};

const Button = ({ children, type, id, hash, onClick }) => (
  <button
    className={styles[type]}
    onClick={() => {
      onClick(id, hash, type);
    }}
  >
    {children || <Icon type={type} style={styleMapping[type]} />}
  </button>);

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  type: PropTypes.string,
  id: PropTypes.string,
  hash: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default Button;


