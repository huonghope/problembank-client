import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Theme from './Theme';


class Scroll extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {width: 0, height: 0};
		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
	}

	componentDidMount() {
		this.updateWindowDimensions();
		window.addEventListener('resize', this.updateWindowDimensions);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateWindowDimensions);
	}

	updateWindowDimensions() {
		this.setState({width: window.innerWidth, height: window.innerHeight});
	}
	render() {
		const {
			children,
			top,
		} = this.props;
		const styles = {
			wrapper: {
				padding: '15px',
				width: '100%',
				height: this.state.height/2,
				overflow: 'auto',
			},
		};

		return <div style={styles.wrapper}>{children}</div>;
	}
}

export default Scroll;
