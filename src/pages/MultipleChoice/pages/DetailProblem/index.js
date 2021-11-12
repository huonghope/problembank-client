import React, {useEffect, useRef, useState} from 'react';
import './style.scss';
import {ControlledEditor} from '@monaco-editor/react';
import {useDispatch, useSelector} from 'react-redux';
import queryString from 'query-string';
import projectsAPI from '../../../../apis/admin/problem';
import problemsBank from '../../../../apis/problemsBank';
import WrapperLoading from '../../../../components/WrapperLoading';
import Loading from '../../../../components/Loading/Loading';
import DetailProblemLayout from '../../../../layouts/DetailProblemLayout';
import {getMultiChoiceProblems, getShortProblems} from '../../../../admin/_actions/problemAction';
import AnswerComponent from './AnswerComponent';
import io from 'socket.io-client';
let moment = require('moment');

function DetailProblem(props) {
	const [problems, setProblems] = useState([]);
	const [problem, setProblem] = useState({});
	const {multiChoiceProblems} = useSelector((state) => state.problemAdmin);
	const [answer, setAnswer] = useState();
	const [submitResult, setSubmitResult] = useState(null);
	const [resultSubmit, setResultSubmit] = useState([]);

	const [submitted, setSubmitted] = useState(null);
	const dispatch = useDispatch();

	const [loading, setLoading] = useState(true);
	const user = useSelector((state) => state.user);


	const {id} = queryString.parse(props.location.search);
	useEffect(() => {
		if (!id && !Number.isInteger(id)) {
			props.history.push('/');
		}
		if (multiChoiceProblems) {
			setLoading(true);
			const {data} = multiChoiceProblems;
			const [problem] = data.filter((element) =>Number(element.id) === Number(id));
			if (problem) {
				setProblems(data);
				setProblem(problem);
				setSubmitResult(null);
				setTimeout(() => {
					setLoading(false);
				}, 200);

				(async () => {
					let params = {
						problemId: id,
					};
					const response = await problemsBank.getStatusMultiProblem(params);
					const {data} = response;
					if (data) {
						let idx =0;
						const {answer_id, answer_status} = data;
						problem.answers.map((item, id) => {if (item.id === answer_id) idx = id;});
						setSubmitResult(answer_status);
						setSubmitted(idx);
					} else {
						setSubmitResult(null);
						setSubmitted(null);
					}
				})();
			}
		} else {
			dispatch(getMultiChoiceProblems()).then((response) => {
				setLoading(true);
				const {data} = response.payload;
				const [problem] = data.filter((element) =>Number(element.id) === Number(id));
				if (problem) {
					setProblem(problem);
					setProblems(data);
					setSubmitResult(null);
					setTimeout(() => {
						setLoading(false);
					}, 200);

					(async () => {
						let params = {
							problemId: id,
						};
						const response = await problemsBank.getStatusMultiProblem(params);
						const {data} = response;
						if (data) {
							let idx =0;
							const {answer_id, answer_status} = data;
							problem.answers.map((item, id) => {if (item.id === answer_id) idx = id;});

							setSubmitResult(answer_status);
							setSubmitted(idx);
						} else {
							setSubmitResult(null);
							setSubmitted(null);
						}
					})();
				}
			});
		}
	}, [id]);

	const handleEditorChange = (env, value) => {
		// setContentEditor(value)
	};

	// submit content editor & problem
	const onSubmit = async () => {
		try {
			let params = {
				problemId: id,
				answerId: answer.id,
			};
			const response = await projectsAPI.submitMultiChoiceProblem(params);
			const {data} = response;
			const {is_correct} = data;

			let resultSubmitTemp = {
				problemId: id,
				answer: answer,
				result: is_correct,
			};

			let filterTemp = resultSubmit.filter((submit) => submit.problemId !== id);

			setResultSubmit([...filterTemp, resultSubmitTemp]);
			setSubmitResult(is_correct);
			// const { data } = response;
			// var timeOutSubmit = function(){
			//     alert(`체점 결과 ${data.correctCount} / ${data.count}`);
			//     setSubmit(false);
			// };
			// setTimeout(timeOutSubmit, 1000);
		} catch (error) {
			alert('서버 문제로 인한 오류입니다. 잠시 후 다시 시도해주세요.');
			console.log(error);
		}
	};
	const handleProblemToList = async (id) => {
		try {
			const params = {
				problemId: id,
				problemType: 2,
			};
			const response = await problemsBank.ProblemToMyList(params);
			let problemTemp = {...problem, like: !problem.like};
			setProblem(problemTemp);
		} catch (error) {
			alert('서버 연결 실패했습니다. 다시 시도해주세요.');
			console.log(error);
		}
	};
	const handleCopyURL = () => {
		let dummy = document.createElement('input');
		let text = window.location.href;

		document.body.appendChild(dummy);
		dummy.value = text;
		dummy.select();
		document.execCommand('copy');
		document.body.removeChild(dummy);
		alert('링크가 복사 되었습니다');
	};

	const getHeadOrBody = () =>{
		return document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0];
	};

	// Inject if not
	getHeadOrBody().appendChild(
		Object.assign(
			document.createElement('script'),
			{
				type: 'text/javascript',
				async: true,
				src: 'https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js',
			},
		),
	);
	const handleClickAnswer = (id, idx) => {
		setAnswer({id, idx});
	};
	let indexOf = 0;
	problems.map((p, idx) => {
		if (p.id === problem.id) {
			indexOf = idx;
		}
	});
	return (
		<DetailProblemLayout>
			<div className="problem__detail">
				<div className="problem__detail--content">
					<div className="tab__header">
						<ul className="tab__header--content">
							<li style={{background: 'white'}}>설명</li>
							{/* <li onClick={() => alert("현재 개발중인 기능 입니다...")}>답안</li>
                            <span>|</span> */}
							{/* <li onClick={() => alert("현재 개발중인 기능 입니다...")}>토론</li> */}
							{/* <span>|</span>
                            <li onClick={() => alert("현재 개발중인 기능 입니다...")}>Submit</li> */}
						</ul>
					</div>
					<div className="wrapper__content">
						{
							loading ? <WrapperLoading type={'bars'} color={'black'} /> :
								<>
									<h3>{problem.id}. {problem.name}</h3>
									<ul className="tab__header--task">
										<li style={{cursor: 'pointer'}} onClick={() => handleProblemToList(problem.id)}><i className="fa fa-list-alt"></i> { problem.like ? 'Remove list' : 'Add to list'}</li>
										<li style={{cursor: 'pointer'}} onClick={() => handleCopyURL()}><i className="fa fa-share-square-o"></i> Share</li>
										<li>Created: {moment(problem.created).format('YYYY-MM-DD')}</li>
										{/* <li>Language: {problem.language}</li> */}
									</ul>
									<div className="problem__infor">
										<div className="problem__infor--desc">
											{

												<>
													<p>문제</p>
													<pre className="prettyprint">
														<code className = "language-java" dangerouslySetInnerHTML={{
															__html: problem.content,
														}}>
														</code>
													</pre>
												</>
											}
										</div>
									</div>
								</>
						}
					</div>
					<div className="tab__footer">
						<div className="review__listproblem">
							<span onClick={() => props.history.push('/multiplechoice')}><i className="fa fa-list"></i>&nbsp;Problem</span>
						</div>
						<div className="pre-next-problem">
							{
								problems.length !== 0 ?
									<>
										<button onClick={() => props.history.push(`/multiplechoice/view?id=${indexOf !== -1 ? problems[indexOf - 1].id : 1}`)} disabled={problem.id === problems[0].id} >Prev</button>&nbsp;
										<span>{problem.id}/{problems.length + 1}</span>&nbsp;
										<button onClick={() => props.history.push(`/multiplechoice/view?id=${indexOf !== -1 ? problems[indexOf + 1].id : 1}`)} disabled={problem.id === problems[problems.length-1].id}>Next</button>
									</> :
									''

							}
						</div>
					</div>
				</div>
				<div className="problem__detail--vseditor">
					<div className="tab__header--editor">
						<ul>
							<li style={{background: 'white'}}>문제 답변</li>
						</ul>
					</div>
					<div className="wrapper__editor">
						<div className="wrapper__editor--content">
							{
								loading ? <WrapperLoading type={'bars'} color={'black'} /> :
									<AnswerComponent
										id={problem.id}
										resultSubmit={resultSubmit}
										answers = {problem.answers}
										onClickAnswer = {handleClickAnswer}
										submitResult = {submitResult}
										submitted={submitted}
									/>
							}

						</div>
					</div>
					<div className="tab__footer">
						<button onClick={() => onSubmit()}>제출</button>
					</div>
				</div>
			</div>
		</DetailProblemLayout>
	);
}


export default DetailProblem;

