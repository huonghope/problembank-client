import React, {useEffect, useRef, useState} from 'react';
import './style.scss';
import {ControlledEditor} from '@monaco-editor/react';
import {useDispatch, useSelector} from 'react-redux';
import queryString from 'query-string';
import projectsAPI from '../../../../apis/admin/problem';
import problemsBank from '../../../../apis/problemsBank';
import WrapperLoading from '../../../../components/WrapperLoading';
import DetailProblemLayout from '../../../../layouts/DetailProblemLayout';
import {getShortProblems} from '../../../../admin/_actions/problemAction';
import io from 'socket.io-client';
import AnswerComponent from './AnswerComponent';
let moment = require('moment');

function DetailProblem(props) {
	const [problems, setProblems] = useState([]);
	const [problem, setProblem] = useState({});
	const {shortProblems} = useSelector((state) => state.problemAdmin);

	const [language, setLanguage] = useState('c');
	const [submit, setSubmit] = useState(false);
	const [theme, setTheme] = useState('white');

	const dispatch = useDispatch();

	const [loading, setLoading] = useState(true);
	const [loadingSubmit, setLoadingSubmit] = useState(false);

	const {id} = queryString.parse(props.location.search);
	const [answer, setAnswer] = useState(null);
	const [submitResult, setSubmitResult] = useState(null);
	const [submitted, setSubmitted] = useState(null);

	useEffect(() => {
		if (!id && !Number.isInteger(id)) {
			props.history.push('/');
		}
		if (shortProblems) {
			setLoading(true);
			const {data} = shortProblems;
			const [problem] = data.filter((element) =>Number(element.id) === Number(id));
			setProblems(data);
			setProblem(problem);
			setAnswer(null);
			setSubmitResult(null);
			setTimeout(() => {
				setLoading(false);
			}, 200);


			(async () => {
				let params = {
					problemId: id,
				};
				const response = await problemsBank.getStatusShortansProblem(params);
				const {data} = response;
				if (data) {
					const {content, answer_status} = data;
					setSubmitResult(answer_status);
					setSubmitted(content);
				} else {
					setSubmitResult(null);
					setSubmitted(null);
				}
			})();
		} else {
			dispatch(getShortProblems()).then((response) => {
				setLoading(true);
				const {data} = response.payload;
				const [problem] = data.filter((element) =>Number(element.id) === Number(id));
				setProblem(problem);
				setProblems(data);
				setAnswer(null);
				setSubmitResult(null);
				setTimeout(() => {
					setLoading(false);
				}, 200);


				(async () => {
					let params = {
						problemId: id,
					};
					const response = await problemsBank.getStatusShortansProblem(params);
					const {data} = response;
					if (data) {
						const {content, answer_status} = data;
						setSubmitResult(answer_status);
						setSubmitted(content);
					} else {
						setSubmitResult(null);
						setSubmitted(null);
					}
				})();
			});
		}
	}, [id]);
	// submit content editor & problem
	const onSubmit = async () => {
		try {
			setLoadingSubmit(true);
			let params = {
				answer,
				problemId: id,
			};
			const res = await problemsBank.submitShortans(params);
			setTimeout(() => {
				setLoadingSubmit(false);
				const {data} = res;
				console.log(data >= 0.7 ? true : false);
				setSubmitResult(data >= 0.7 ? true : false);
			}, 1000);
		} catch (error) {
			alert('서버 문제로 인한 오류입니다. 잠시 후 다시 시도해주세요.');
			console.log(error);
		}
	};
	const handleProblemToList = async (id) => {
		try {
			const params = {
				problemId: id,
				problemType: 3,
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
											<p>문제</p>
											<div className="problem__infor--desc__wrapper">
												<pre className="prettyprint">
													<code className = "language-java" dangerouslySetInnerHTML={{
														__html: problem.content,
													}}>
													</code>
												</pre>
											</div>
										</div>
									</div>
								</>
						}
					</div>
					<div className="tab__footer">
						<div className="review__listproblem">
							<span onClick={() => props.history.push('/shortans')}><i className="fa fa-list"></i>&nbsp;Problem</span>
						</div>
						<div className="pre-next-problem">
							{
								problems.length !== 0 ?
									<>
										<button onClick={() => props.history.push(`/shortans/view?id=${indexOf !== -1 ? problems[indexOf - 1].id : 1}`)} disabled={problem.id === problems[0].id} >Prev</button>&nbsp;
										<span>{problem.id}/{problems.length + 1}</span>&nbsp;
										<button onClick={() => props.history.push(`/shortans/view?id=${indexOf !== -1 ? problems[indexOf + 1].id : 1}`)} disabled={problem.id === problems[problems.length-1].id}>Next</button>
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
						{
							loadingSubmit ?
								<div className="wrapper__editor--submit">
									<WrapperLoading type={'bars'} color={'black'} />
								</div> : ''
						}
						<div className="wrapper__editor--content">
							<AnswerComponent
								handleChange={(data) => setAnswer(data)}
								submitResult={submitResult}
								submitted={submitted}
								id={id}
							/>
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

