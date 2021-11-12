import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {PureComponent} from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

export default class ListTag extends PureComponent {
	constructor(prop) {
		super(prop);
		this.state={
			currentId: 0,
			loading: false,
		};
	}
    static propTypes = {
    	prop: PropTypes,
    }
    handleClick = (id, idx) => {
    	this.props.handleClickTag(id);
    	this.setState({
    		currentId: idx,
    	});
    }
    static getDerivedStateFromProps(nextProps, prevState) {
    	if (nextProps.loading !== prevState.loading) {
    		return {
    			loading: nextProps.loading,
    			currentId: 0,
    		};
    	}
    	else return null;
    }
    render() {
    	const {listtags, tutorialId} = this.props;
    	const {currentId} = this.state;
    	return (
    		<Wrapper>
    			<ul>
    				{
    					listtags.map((tag, idx) => {
    						return (
    							<li key={idx} onClick={() => this.handleClick(tag.id, idx)} className={currentId === idx ? 'active-class' : ''}>
    								<Link key={idx} to={`listproblems?id=${tutorialId}`}>{tag.name}</Link>
    							</li>
    						);
    					})
    				}
    			</ul>
    		</Wrapper>
    	);
    }
}
const Wrapper = styled.div`
    ul li{
        border-bottom: 1px solid #ccc;
        cursor: pointer;

        :hover{
            background: #282828;
            a {
                color: #fff;
            }
        }
        a{
            display: block;
            width: 100%;
            height: 100%;
            padding: 10px 0;
            text-align: center;
        }
    }
    ul li:first-child{
        margin-top: 0px;
    }
`;
ListTag.propTypes = {
	listtags: PropTypes.array,
	handleClickTag: PropTypes.func,
};
