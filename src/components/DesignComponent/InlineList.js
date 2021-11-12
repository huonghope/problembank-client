import React, {PureComponent} from 'react';
import Theme from './Theme';
import PropTypes from 'prop-types';
import {propTypes as spacingPropTypes} from './Spacing';


class InlineList extends PureComponent {
	render() {
		const {align, children, spacingBetween, verticalAlign, distribution, contentDistribution} = this.props;
		const {unit} = Theme;
		const styles = {
			wrapper: {
				display: 'flex',
				flexDirection: 'row',
				flexWrap: 'wrap',
				justifyContent: 'flex-start',
				alignItems: 'center',
			},
			childDefault: {
				marginRight: spacingBetween * unit,
			},
			alignCenter: {
				justifyContent: 'center',
			},
			alignRight: {
				justifyContent: 'flex-end',
			},
			verticalAlignTop: {
				alignItems: 'flex-start',
			},
			verticalAlignBottom: {
				alignItems: 'flex-end',
			},
			contentDistribution: {
				justifyContent: 'space-between',
			},
			distribution: {
				width: `${(1/children.length)*100-children.length}%`,
				marginBottom: 15*unit,
			},
		};
		const computedDivStyle = {
			...styles.wrapper,
			...(align === 'center' && styles.alignCenter),
			...(align === 'right' && styles.alignRight),
			...(verticalAlign === 'top' && styles.verticalAlignTop),
			...(verticalAlign === 'bottom' && styles.verticalAlignBottom),
			...(contentDistribution && styles.contentDistribution),
		};
		const computedChildStyle = {
			...styles.childDefault,
			...(distribution && styles.distribution),
		};
		return (
			<div
				style={computedDivStyle}
			>
				{React.Children.map(children, (child) => (
					<div style={computedChildStyle}>{child}</div>
				))}
			</div>
		);
	}
}

InlineList.propTypes = {
	...spacingPropTypes,
	align: PropTypes.oneOf(['left', 'center', 'right']),
	verticalAlign: PropTypes.oneOf(['top', 'middle', 'bottom']),
	spacingBetween: PropTypes.number,
	children: PropTypes.node,
};

InlineList.defaultProps = {
	spacingBetween: 1,
};

export default InlineList;
