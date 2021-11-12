import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

export default class Tutorial extends Component {
	render() {
		const {id, name, description, img} = this.props.tutorial;
		return (
			<Wrapper className="tutorial">
				<Link to = {`problemsbank/listproblems?id=${id}`} >
					<div className="img-container">
						<img width="200" height="200" src= {img} alt="turorial" />
					</div>
					<div className="tutorial-info">
						<h3>{name}</h3>
						<p>
							{description}
						</p>
					</div>
				</Link>
			</Wrapper>
		);
	}
}
const Wrapper = styled.article`
    
`;
