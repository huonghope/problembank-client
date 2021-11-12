import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import styled from 'styled-components';
import {useEffect} from 'react';
import WrapperLoading from '../../../../components/WrapperLoading';

function AnswerComponent({answers, onClickAnswer, submitResult, resultSubmit, id, submitted}) {
	const [choice, setChoice] = useState(null);
	const [result, setResult] = useState();
	useEffect(() => {
		setResult(submitResult);
	}, [submitResult, answers]);

	useEffect(() => {
		const filter = resultSubmit.filter((problem) => Number(problem.problemId) === Number(id));
		if (filter.length !== 0) {
			const {answer, result} = filter[0];
			setChoice(answer.idx);
			setResult(result);
		} else {
			setChoice(null);
		}
	}, [answers]);
	useEffect(() => {
		if (submitted === 0 || submitted === 1 || submitted === 2 || submitted === 3) {
			setChoice(submitted);
		}
	}, [submitted]);

	const handleOnClick = (idx, answerId) => {
		if (idx === choice)
		{
			onClickAnswer(null);
			setChoice(null);
			return;
		}
		setChoice(idx);
		onClickAnswer(answerId, idx);
	};
	return (
		<>
			{
				answers.map((answer, idx) => (
					<Wrapper style={choice === idx ? {borderColor: '#1FA67A'} : {}} onClick={() => handleOnClick(idx, answer.id)}>
						<p style={choice === idx ? {background: '#1FA67A'} : {}} >{idx + 1}. </p>
						<pre className="prettyprint">
							<code className = "language-java" dangerouslySetInnerHTML={{
								__html: answer.answer_content,
							}}>
							</code>
						</pre>
					</Wrapper>
				))
			}
			{ result !== null &&
                <WrapperAnswerContainer
                	result = {result}
                	resultSubmit={resultSubmit}
                />
			}
		</>

	);
}
const WrapperAnswerContainer = ({result, resultSubmit}) => {
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 1000);
		return () => {
			setLoading(true);
		};
	}, [result, resultSubmit]);

	return <WrapperAnswer>
		{
			loading ?
				<WrapperLoading type={'bars'} color={'black'} /> :
				<p>답변 제출 결과: {result === 'true' ? '맞습니다.' : '틀립니다.'}</p>
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
const Wrapper = styled.div`
    p{
        font-weight: bold;
    }
    .active-choice{
        
    }
    cursor: pointer;
    margin-bottom: 25px;
    border: 3px solid #ccc;
`;
export default AnswerComponent;

