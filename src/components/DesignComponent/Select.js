import React, {PureComponent, setState, useEffect} from 'react';
import Theme from './Theme';
import PropTypes from 'prop-types';
import Option from './Option';

export {Option};

class Select extends PureComponent {
	constructor(props) {
		super(props);
		this.setRef = this.setRef.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleFocus = this.handleFocus.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
		this.state = {
			focused: false,
		};
	}
	handleFocus() {
		this.setState({focused: true});
	}
	handleBlur() {
		this.setState({focused: false});
	}
	handleChange(e) {
		const {name, onChange} = this.props;
		if (onChange) {
			onChange(name, e.target.value);
		}
	}
	componentDidMount() {
		if (this.props.autoFocus) {
			this.ref.focus();
		}
	}
	setRef(ref) {
		this.ref = ref;
	}
	render() {
		const {
			children,
			disabled,
			errorMessage,
			label,
			value,
			name,
			large,
			xlarge,
			small,
			xsmall,
		} = this.props;
		const {focused} = this.state;
		const {unit, color, size, lineHeight} = Theme;
		const styles = {
			wrapper: {
				border: 0,
				padding: 0,
				position: 'relative',
			},
			label: {
				display: 'block',
				fontSize: size.xs,
				top: 2,
				left: unit * 2,
				cursor: 'pointer',
			},
			placeholder: {
				marginTop: 2,
				border: 1,
				borderColor: color.fadeBlack,
				borderStyle: 'solid',
				borderRadius: 4,
				padding: unit * 1.5,
			},
			focus: {
				boxShadow: '0 0 0px 2px rgba(0, 0, 0, 0.3)',
			},
			xlargePadding: {
				padding: unit * 2,
			},
			largePadding: {
				padding: unit * 2,
			},
			smallPadding: {
				padding: unit - 1,
			},
			select: {
				fontSize: size.md,
				lineHeight: lineHeight.md,
				backgroundColor: color.white,
				border: 0,
				outline: 0,
				width: '100%',
			},
			xlarge: {
				fontSize: size.xg,
			},
			large: {
				fontSize: size.lg,
			},
			small: {
				fontSize: size.sm,
			},
			errorLabel: {
				color: color.error,
			},
			error: {
				borderColor: color.error,
			},
		};
		const computedLabelStyle = {
			...styles.label,
			...(errorMessage && styles.errorLabel),
		};
		const computedDivStyle = {
			...styles.placeholder,
			...(xsmall && styles.xsmallPadding),
			...(small && styles.smallPadding),
			...(large && styles.largePadding),
			...(xlarge && styles.xlargePadding),
			...(focused && styles.focus),
			...(errorMessage && styles.error),
		};
		const computedSelectStyle = {
			...styles.select,
			...(xsmall && styles.xsmall),
			...(small && styles.smallPadding),
			...(large && styles.largePadding),
			...(xlarge && styles.xlargePadding),
		};

		return (
			<fieldset style={styles.wrapper}>
				<label
					htmlFor={`input_${name}`}
					style={computedLabelStyle}
				>
					{errorMessage || label}
				</label>
				<div
					style={computedDivStyle}
				>
					<select
						style={computedSelectStyle}
						disabled={disabled}
						id={`input_${name}`}
						ref={this.setRef}
						onChange={this.handleChange}
						onFocus={this.handleFocus}
						onBlur={this.handleBlur}
						value={value}
					>
						{React.Children.map(children, (child) =>
							React.cloneElement(child, {disabled}),
						)}
					</select>
				</div>
			</fieldset>
		);
	}
}

Select.propTypes = {
	name: PropTypes.string.isRequired,
	value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	errorMessage: PropTypes.string,
	label: PropTypes.string,
	onChange: PropTypes.func,
	autoFocus: PropTypes.bool,
};

Select.defaultProps = {
	onChange: () => {},
	autoFocus: false,
};

export default Select;
