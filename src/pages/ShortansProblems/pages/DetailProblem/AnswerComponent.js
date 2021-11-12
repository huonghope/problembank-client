import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import styled from 'styled-components';
import {useEffect} from 'react';
import WrapperLoading from '../../../../components/WrapperLoading';

function AnswerComponent({id, submitted, submitResult, handleChange}) {
	// const [choice, setChoice] = useState(null);
	const [result, setResult] = useState(null);
	const [answer, setAnswer] = useState('');
	useEffect(() => {
		setResult(submitResult);
		if (submitResult === null) {
			setAnswer('');
		}
	}, [id, submitResult]);

	useEffect(() => {
		if (submitted !== null) {
			setAnswer(submitted);
		}
	}, [submitted]);
	const handleChangeAnswer = (e) =>{
		setAnswer(e.target.value);
		handleChange(e.target.value);
	};
	return (
		<>
			<textarea placeholder="답변 입력하세요..." onChange={(e) => handleChangeAnswer(e)} value={answer}/>
			{
				result !== null &&
            <WrapperAnswerContainer
            	result = {result}
            />
			}
		</>
	);
}
const WrapperAnswerContainer = ({result}) => {
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 1000);
		return () => {
			setLoading(true);
		};
	}, [result]);

	return <WrapperAnswer>
		{
			loading ?
				<WrapperLoading type={'bars'} color={'black'} /> :
				<p>답변 제출 결과: {result === true ? '맞습니다.' : '틀립니다.'}</p>
		}
	</WrapperAnswer>;
};
const WrapperAnswer = styled.div`
    border: 1px solid green;
    border-radius: 20px;
    border-top: 5px solid green;
    padding: 10px;
    height: 75px;
    p{
        height: 100%;
        display: flex;
        align-items: center;
    }
`;
export default AnswerComponent;

