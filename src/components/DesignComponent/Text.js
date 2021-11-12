import React, {PureComponent} from 'react';
import Theme from './Theme';
import PropTypes from 'prop-types';
import {FaDeviantart} from 'react-icons/fa';

class Text extends PureComponent {
	render() {
		const {
			children,
			bold,
			light,
			large,
			xlarge,
			small,
			xsmall,
			primary,
			secondary,
			inverse,
			fade,
		} = this.props;
		const {color, size, lineHeight, fontWeight} = Theme;
		const styles = {
			default: {
				color: color.default,
				fontSize: size.md,
				lineHeight: lineHeight.md,
				fontWeight: fontWeight.normal,
			},
			xlarge: {
				fontSize: size.xg,
				lineHeight: lineHeight.xg,
			},
			large: {
				fontSize: size.lg,
				lineHeight: lineHeight.lg,
			},
			small: {
				fontSize: size.sm,
				lineHeight: lineHeight.sm,
			},
			xsmall: {
				fontSize: size.xs,
				lineHeight: lineHeight.xs,
			},
			primary: {
				color: color.primary,
			},
			secondary: {
				color: color.secondary,
			},
			light: {
				fontWeight: fontWeight.light,
			},
			bold: {
				fontWeight: fontWeight.bold,
			},
			inverse: {
				color: color.white,
			},
			fade: {
				color: color.fadeBlack,
			},
		};
		const computedStyle ={
			...styles.default,
			...(xsmall && styles.xsmall),
			...(small && styles.small),
			...(large && styles.large),
			...(xlarge && styles.xlarge),
			...(secondary && styles.secondary),
			...(primary && styles.primary),
			...(bold && styles.bold),
			...(light && styles.light),
			...(inverse && styles.inverse),
			...(fade && styles.fade),
		};
		return (
			<span
				style={computedStyle}
			>
				{children}
			</span>
		);
	}
}

Text.propTypes = {
	children: PropTypes.node.isRequired,
	bold: PropTypes.bool,
	light: PropTypes.bool,
	xsmall: PropTypes.bool,
	small: PropTypes.bool,
	large: PropTypes.bool,
	xlarge: PropTypes.bool,
	secondary: PropTypes.bool,
	primary: PropTypes.bool,
	inverse: PropTypes.bool,
};

export default Text;
