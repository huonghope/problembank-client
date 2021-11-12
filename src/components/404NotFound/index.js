import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function NotFound(props) {
	return (
		<Wrapper>
			<span>접근 권한</span>이 없습니다.
		</Wrapper>
	);
}
const Wrapper = styled.div`
    height: 50vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    color: black;
    span{
        color: rgb(9, 113, 241);
        padding: 0px 5px;
    }
`;
export default NotFound;

