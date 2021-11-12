import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function Notification({showMessage, message, warning}) {
	return (
		showMessage && (
			<div className="overlay">
				<div className={`wrapper ${ warning && warning}`}>
					<div className="spacing">
						<span>{message}</span>
					</div>
				</div>
			</div>


		));
}

const Wrapper = styled.div`
.overlay {
    position: 'absolute';
    bottom: 0;
    right: 0;
    margin: 4 * 4;
    .wrapper {
      boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.14)';
      borderRadius: 4;
      backgroundColor: '#009688';
      paddingTop: 8;
      paddingBottom:  8;
      paddingRight:  8;
      paddingLeft: 8;
      marginBottom:  8;
      .warning {
        backgroundColor: '#e51c23';
      }
    }
  }
  `;
export default Notification;
