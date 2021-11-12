import React, {PureComponent} from 'react';
import Theme from './Theme';
import PropTypes from 'prop-types';

class Textarea extends PureComponent {
	constructor(props) {
		super(props);
		this.setRef = this.setRef.bind(this);
		this.handleChange = this.handleChange.bind(this);
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
			name,
			maxlength,

		} = this.props;
		const {color, size, lineHeight, fontWeight} = Theme;
		const styles = {
			default: {
				resize: 'none',
				padding: '12px',
				width: '600px',
				height: '300px',
				backgroundColor: '#f8f8f8',
				borderRadius: '4px',
				fontSize: '16px',
				boxSizing: 'border-box',
			},
		};
		const computedStyle ={
			...styles.default,

		};
		return (
			<textarea
				style={computedStyle}
				ref={this.setRef}
				onChange = {this.handleChange}
				name={name}
				maxLength={maxlength}
			>
				{children}
			</textarea>
		);
	}
}

Textarea.propTypes = {
	children: PropTypes.node.isRequired,

};

export default Textarea;
