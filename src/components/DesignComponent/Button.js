import React, {PureComponent} from 'react';
import Theme from './Theme';
import PropTypes from 'prop-types';

class Button extends PureComponent {
	render() {
		const {
			children,
			disabled,
			large,
			xlarge,
			small,
			xsmall,
			primary,
			secondary,
			type,
			onPress,
			test,
			contest,
			distance,
			cancel,
		} = this.props;
		const {color, size, unit, depth, fontWeight} = Theme;
		const styles = {
			default: {
				'height': '40px',
				'width': '100px',
				'border': 1,
				'borderStyle': 'none',
				'borderRadius': unit,
				'backgroundColor': color.grayDark,
				'color': color.white,
				'fontSize': size.md,
				'fontWeight': fontWeight.bold,
				'padding': unit * 2,
				'paddingLeft': unit * 4,
				'paddingRight': unit * 4,
				'outline': 0,
				'transition': 'all 0.18s ease-in-out 0s',
				'cursor': 'pointer',
				':hover': {
					backgroundColor: color.Dark,
				},
				':focus': {
					boxShadow: '0 0 0px 2px rgba(0, 0, 0, 0.3)',
				},
			},
			xlarge: {
				fontSize: size.xg,
				padding: unit * 2.5,
			},
			large: {
				fontSize: size.lg,
				padding: unit * 2.5,
			},
			small: {
				fontSize: size.sm,
				padding: unit * 1.5,
			},
			xsmall: {
				fontSize: size.xs,
				padding: unit,
			},
			primary: {
				'borderColor': color.primary,
				'color': color.white,
				'backgroundColor': color.primary,
				':hover': {
					backgroundColor: color.primaryDark,
				},
			},
			content: {
				height: 0,
				width: 0,
			},
			secondary: {
				borderColor: color.secondary,
				color: color.secondary,
			},
			distance: {
				marginRight: unit,
			},
			test: {
				backgroundColor: color.test,
				color: color.white,
			},
			contest: {
				backgroundColor: color.contest,
				color: color.white,
			},
			cancel: {
				backgroundColor: color.grayLight,
				color: color.grayDark,
			},
			disabled: {
				'color': color.white,
				'cursor': 'default',
				'opacity': 0.5,
				'backgroundColor': color.gray,
				':hover': {
					backgroundColor: color.gray,
				},
			},
		};
		const computedStyle = {
			...styles.default,
			...(xsmall && styles.xsmall),
			...(small && styles.small),
			...(xlarge && styles.xlarge),
			...(large && styles.large),
			...(secondary && styles.secondary),
			...(primary && styles.primary),
			...(disabled && styles.disabled),
			...(test && styles.test),
			...(contest && styles.contest),
			...(distance && styles.distance),
			...(cancel && styles.cancel),
		};
		return (
			<button
				style={computedStyle}
				disabled={disabled}
				onClick={onPress}
				type={type}
			>
				{children}
			</button>
		);
	}
}

Button.propTypes = {
	children: PropTypes.node.isRequired,
	disabled: PropTypes.bool,
	xsmall: PropTypes.bool,
	small: PropTypes.bool,
	large: PropTypes.bool,
	xlarge: PropTypes.bool,
	secondary: PropTypes.bool,
	primary: PropTypes.bool,
	test: PropTypes.bool,
	contest: PropTypes.bool,
	distance: PropTypes.bool,
	type: PropTypes.string,
	onPress: PropTypes.func,
};
Button.defaultProps = {
	onPress: () => {},
	xsmall: false,
	small: false,
	large: false,
	xlarge: false,
	secondary: false,
	primary: false,
};

export default Button;
