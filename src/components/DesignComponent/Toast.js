import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Theme from './Theme';
import Spacing from './Spacing';
import Text from './Text';

class Toast extends PureComponent {
	render() {
		const {message, warning} = this.props;
		const {depth, unit, color} = Theme;
		const styles = {
			overlay: {
				position: 'fixed',
				bottom: 7*unit,
				right: 0,
				margin: unit * 4,
			},
			wrapper: {
				...depth.level1,
				borderRadius: unit,
				backgroundColor: color.secondary,
				paddingTop: unit * 2,
				paddingBottom: unit * 2,
				paddingRight: unit * 4,
				paddingLeft: unit * 4,
				marginBottom: unit * 4,
			},
			warning: {
				backgroundColor: color.error,
			},
		};
		const computedStyle = {
			...styles.wrapper,
			...(warning && {...styles.warning}),
		};
		return (
			<div style={styles.overlay}>
				<div style={computedStyle}>
					<Spacing vertical={4} horizontal={8}>
						<Text inverse bold>
							{message}
						</Text>
					</Spacing>
				</div>
			</div>
		);
	}
}

Toast.propTypes = {
	warning: PropTypes.bool,
	message: PropTypes.string,
};

export default Toast;
