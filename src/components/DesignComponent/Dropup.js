import React, {PureComponent} from 'react';
import Theme from './Theme';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class Dropup extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {display: false};
		this.changeDrop = this.changeDrop.bind(this);
	}
	changeDrop() {
		const {display} = this.state;
		this.setState({display: !display});
	}
	render() {
		const {
			children,
			icon,
			text,
		} = this.props;
		const {color} = Theme;
		const Wrapper = styled.div`
    .dropbtn {
    background-color: ${color.contest};
    border-radius: 4px;
    color: white;
    padding: 12px 16px;
    font-size: 16px;
    border: none;
    }
    .dropup {
    position: relative;
    display: inline-block;
    }

    .dropup-content {
    display: ${this.state.display? 'block': 'none'};
    position: absolute;
    bottom: 50px;
    background-color: #f1f1f1;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    }

    .dropup-content button {
    color: black;
    border: none;
    width: 100%;
    text-align: left;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    }

    .dropup-content button:hover {
        background-color: #ddd;
    }


    `;
		return (
			<Wrapper>
				<div className='dropup'>
					<button className='dropbtn' onClick={()=>this.changeDrop()}>
						<i className={icon&&icon}></i> {text&&text}
					</button>
					<div className='dropup-content'>
						{children}
					</div>
				</div>
			</Wrapper>

		);
	}
}

Dropup.propTypes = {
	children: PropTypes.node.isRequired,
	text: PropTypes.string,
	icon: PropTypes.string,
};
Dropup.defaultProps = {
	onPress: () => {},
	text: '',
	icon: '',
};


export default Dropup;
