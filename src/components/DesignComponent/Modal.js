import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

class Modal extends PureComponent {
	render() {
		const {children} = this.props;
		const styles = {
			overlay: {
				position: 'fixed',
				zIndex: 9999,
				top: 0,
				left: 0,
				width: '100%',
				height: '100%',
				backgroundColor: 'rgba(0, 0, 0, .5)',
			},
			wrapper: {
				verticalAlign: 'middle',
			},
			container: {
				margin: '40px auto 0px',
				width: 700,
			},
		};
		return (
			<div style={styles.overlay}>
				<div style={styles.wrapper}>
					<div style={styles.container}>
						<Card vertical={2} horizontal={2}>
							{children}
						</Card>
					</div>
				</div>
			</div>
		);
	}
}

Modal.propTypes = {
	children: PropTypes.node,
};

export default Modal;
