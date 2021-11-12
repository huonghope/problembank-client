import React, {PureComponent} from 'react';
import Theme from './Theme';
import PropTypes from 'prop-types';

const headingTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

class Heading extends PureComponent {
	render() {
		const {
			children,
			inverse,
			level,
			onPress,
		} = this.props;

		const HeadingTag = headingTags[level - 1];
		const {color, size, lineHeight, fontWeight, unit} = Theme;

		const styles = {
			default: {
				lineHeight: lineHeight.lg,
				fontWeight: fontWeight.bold,
				...(onPress &&
              {cursor: 'pointer'}
				),
			},
			inverse: {
				color: color.white,
			},
			level1: {
				fontSize: size.h1,
				marginTop: unit * 2,
				marginBottom: unit * 4,
			},
			level2: {
				fontSize: size.h2,
				marginTop: unit * 2,
				marginBottom: unit * 4,
			},
			level3: {
				fontSize: size.h3,
				marginTop: unit * 1.5,
				marginBottom: unit * 3,
			},
			level4: {
				fontSize: size.xg,
				marginTop: unit,
				marginBottom: unit * 2,
			},
			level5: {
				fontSize: size.md,
				marginTop: unit,
				marginBottom: unit * 2,
			},
			level6: {
				fontSize: size.md,
				marginTop: unit,
				marginBottom: unit,
			},
		};

		const computedStyle = {
			...styles.default,
			...styles[`level${level}`],
			...(inverse && styles.inverse),
			...(onPress && {cursor: 'pointer'}),
		};
		return (
			<HeadingTag
				style={computedStyle}
				onClick = {onPress}
			>
				{children}
			</HeadingTag>
		);
	}
}

Heading.propTypes = {
	children: PropTypes.node.isRequired,
	dark: PropTypes.bool,
	level: PropTypes.number,
};
Heading.defaultProps = {
	level: 1,
};

export default Heading;
