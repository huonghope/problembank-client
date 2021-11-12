import React, {PureComponent} from 'react';
import Theme from './Theme';
import PropTypes from 'prop-types';

class Input extends PureComponent {
	constructor(props) {
		super(props);
		this.setRef = this.setRef.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange(e) {
		const {name, onChange, type} = this.props;
		if (onChange) {
			switch (type) {
			case 'checkbox':
				onChange(name, e.target.checked);
				break;
			default:
				onChange(name, e.target.value);
				break;
			}
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
			errorMessage,
			label,
			value,
			name,
			type,
			large,
			xlarge,
			small,
			xsmall,
			height,
			width,
			placeholder,
			checked,
		} = this.props;
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
			input: {
				'marginTop': 2,
				'fontSize': size.md,
				'lineHeight': lineHeight.md,
				'padding': unit * 1.5,
				'border': 1,
				'borderColor': color.fadeBlack,
				'borderStyle': 'solid',
				'borderRadius': 4,
				'outline': 0,
				':focus': {
					boxShadow: '0 0 0px 2px rgba(0, 0, 0, 0.3)',
				},
			},
			width: {
				width: width* unit,
			},
			height: {
				heigth: height * unit,
			},
			xlarge: {
				fontSize: size.xg,
			},
			large: {
				fontSize: size.lg,
			},
			small: {
				fontSize: size.sm,
				padding: unit,
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
		const computedInputStyle = {
			...styles.input,
			...(width && styles.width),
			...(height && styles.height),
			...(errorMessage && styles.error),
			...(xsmall && styles.xsmall),
			...(small && styles.small),
			...(large && styles.large),
			...(xlarge && styles.xlarge),
		};
		return (
			<fieldset style={styles.wrapper}>
				<label
					htmlFor={`input_${name}`}
					style={computedLabelStyle}
				>
					{errorMessage || label}
				</label>
				<input
					style={computedInputStyle}
					id={`input_${name}`}
					ref={this.setRef}
					type={type}
					onChange={this.handleChange}
					value={value}
					checked={checked}
					placeholder={placeholder}
				/>
			</fieldset>
		);
	}
}

Input.propTypes = {
	type: PropTypes.oneOf(['text', 'number', 'price', 'checkbox']),
	name: PropTypes.string.isRequired,
	value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	errorMessage: PropTypes.string,
	label: PropTypes.string,
	onChange: PropTypes.func,
	autoFocus: PropTypes.bool,
	placeholder: PropTypes.string,
};

Input.defaultProps = {
	onChange: () => {},
	autoFocus: false,
	placeholder: '',
};

export default Input;
