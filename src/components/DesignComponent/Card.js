import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Theme from './Theme';
import Spacing, {propTypes as spacingPropTypes} from './Spacing';

class Card extends PureComponent {
	render() {
		const {children, ...spacingProps} = this.props;
		const {color, unit, depth} = Theme;
		const styles = {
			wrapper: {
				...depth.level1,
				borderRadius: unit,
				backgroundColor: color.white,
				display: 'flex',
				overflow: 'hidden',
				marginBottom: unit * 4,
			},
		};
		return (
			<div style={styles.wrapper}>
				<Spacing {...spacingProps}>
					{children}
				</Spacing>
			</div>
		);
	}
}

Card.propTypes = {
	...spacingPropTypes,

	children: PropTypes.node,
};

export default Card;
