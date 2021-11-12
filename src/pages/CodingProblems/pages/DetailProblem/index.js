import React, {useEffect, useRef, useState} from 'react';
import './style.scss';
import {ControlledEditor} from '@monaco-editor/react';
import SampleCode from '../../../../constansts/SampleCode';
import {useDispatch, useSelector} from 'react-redux';
import queryString from 'query-string';
import {getProblemData} from '../../../../_actions/problemAction';
import projectsAPI from '../../../../apis/projects';
import problemsBank from '../../../../apis/problemsBank';
import WrapperLoading from '../../../../components/WrapperLoading';
import Loading from '../../../../components/Loading/Loading';
import DetailProblemLayout from '../../../../layouts/DetailProblemLayout';
import io from 'socket.io-client';
let moment = require('moment');
function DetailProblem(props) {
	const [problems, setProblems] = useState([]);
	const [problem, setProblem] = useState({});
	const {problemsAllData} = useSelector((state) => state.problem);

	const [language, setLanguage] = useState('c');
	const [contentEditor, setContentEditor] = useState(SampleCode['c']);
	const [submit, setSubmit] = useState(false);
	const [theme, setTheme] = useState('white');

	const [problemStatus, setProblemStatus] = useState(null);
	const dispatch = useDispatch();

	const [loading, setLoading] = useState(true);

	const {id} = queryString.parse(props.location.search);
	const user = useSelector((state) => state.user);

	useEffect(() => {
		if (!id) {
			props.history.push('/');
		}

		if (problemsAllData) {
			const {data} = problemsAllData;
			const [problem] = data.filter((element) => Number(element.id) === Number(id));
			if (problem) {
				setProblem(problem);
				setProblems(data);
				setLoading(false);
			}
		} else {
			dispatch(getProblemData()).then((response) => {
				const {data} = response.payload;
				const [problem] = data.filter((element) => Number(element.id) === Number(id));
				if (problem) {
					setProblem(problem);
					setProblems(data);
					setLoading(false);
				}
			});
		}

		(async () => {
			const {userData} = user;
			const {data} = userData;

			let params = {
				userId: data.id,
				problemId: id,
			};

			const response = await problemsBank.getStatusProblem(params);
			setProblemStatus(response.data[0]);
		})();
	}, [id]);

	const handleEditorChange = (env, value) => {
		setContentEditor(value);
	};

	// submit content editor & problem
	const onSubmit = async () => {
		try {
			setSubmit(true);

			let result = false;
			let receivedResult = false;
			let countSubmit = 0;
			let isConnected = false;

			const problemId = queryString.parse(window.location.search).id;
			// const IO_URL = process.env.REACT_APP_SERVER_SCORE_API;
			// const socket = io(IO_URL, {'connect timeout': 5000});
			// socket.on('connect', () => {
			// 	const {userData} = user;
			// 	const {data} = userData;
			// 	isConnected = true;
			// 	const params = {
			// 		userId: data.id,
			// 		sourceCode: contentEditor,
			// 		language,
			// 		problemId: Number(problemId),
			// 	};
			// 	socket.emit('problems', {params});

			// 	socket.on('result', (data) => {
			// 		result = true;
			// 		setTimeout(() => {
			// 			if (result && !receivedResult) {
			// 				receivedResult = true;
			// 				alert(`체점 결과 ${data.correctCount} / ${data.count}`);
			// 				setSubmit(false);
			// 			}
			// 		}, 1000);
			// 	});
			// });
			const params = {
					sourceCode: contentEditor,
					language,
					problemId: Number(problemId),
			};

			const response = await problemsBank.compileProblem(params);
			const { result: resResult, data : resData, message } = response;
			if(resResult && message === 'compile-successful') {
				alert(`체점 결과 ${resData.correctCount} / ${resData.count}`);
			}else if(!resResult && message === 'compile-fail'){
				alert('문제 컴파일 시 오류를 발생합니다. 코드를 확인해주세요.');
			}else{
				alert('서버 응답 오류 발생합니다.')
			}
			setSubmit(false);
			// setTimeout(() => {
			// 	if (!isConnected) {
			// 		alert('서버 문제로 인한 오류입니다. 잠시 후 다시 시도해주세요.');
			// 		setSubmit(false);
			// 	}
			// }, 10 * 1000);
		} catch (error) {
			alert('서버 문제로 인한 오류입니다. 잠시 후 다시 시도해주세요.');
			setSubmit(false);
			console.log(error);
		}
	};
	const handleProblemToList = async (id) => {
		try {
			const params = {
				problemId: id,
				problemType: 1,
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
		alert('링크가 복사 되었습니다.');
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
							<li style={{background: 'white'}} onClick={() => alert('현재 개발중인 기능 입니다...')}>설명</li>
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
									<ul className="tab__header--task" >
										<li style={{cursor: 'pointer'}} onClick={() => handleProblemToList(problem.id)}><i className="fa fa-list-alt"></i> {problem.like ? 'Remove list' : 'Add to list'}</li>
										<li style={{cursor: 'pointer'}} onClick={() => handleCopyURL()}><i className="fa fa-share-square-o"></i> Share</li>
										<li>Created: {moment(problem.created).format('YYYY-MM-DD')}</li>
										{/* <li>Processor: {processor}/5</li> */}
										{
											problemStatus ?
												<li className={`btn-status ${problemStatus.status ? 'success' : ''}`}><button>{problemStatus.status ? '맞음' : '실패'}</button></li> :
												''
										}
										{/* <li>Language: {problem.language}</li> */}
									</ul>
									<div className="problem__infor">
										<div className="problem__infor--desc">
											<p>문제</p>
											{/* <span>{problem.content}</span> */}
											<span><pre className="prettyprint" dangerouslySetInnerHTML={{__html: problem.content}}></pre></span>
										</div>
										<div className="problem__infor--input">
											<p>입력</p>
											<span>{problem.input}</span>
										</div>
										<div className="problem__infor--output">
											<p>출력</p>
											<span>{problem.output}</span>
										</div>
										<div className="problem__infor--example">
											<div className="problem__infor--example-title">
												<p>입력 예제</p>
												<p>출력 예제</p>
											</div>
											<div className="problem__infor--example-content">
												{
													problem.testcases.slice(0, 5).map((item, idx) => (
														<div>
															<span dangerouslySetInnerHTML={{__html: item.input_exp}}></span>
															<span dangerouslySetInnerHTML={{__html: item.output_exp}}></span>
														</div>
													))

												}
											</div>
										</div>
									</div>
								</>
						}
					</div>
					<div className="tab__footer">
						<div className="review__listproblem">
							<span onClick={() => props.history.push('/codeproblems')}><i className="fa fa-list"></i>&nbsp;Problem</span>
						</div>
						<div className="pre-next-problem">
							{
								problems.length !== 0 ?
									<>
										<button onClick={() => props.history.push(`/codeproblems/view?id=${indexOf !== -1 && problems[indexOf - 1].id}`)} disabled={problem.id === problems[0].id} >Prev</button>&nbsp;
										<span>{problem.id}/{problems.length + 1}</span>&nbsp;
										<button onClick={() => props.history.push(`/codeproblems/view?id=${indexOf !== -1 && problems[indexOf + 1].id}`)} disabled={problem.id === problems[problems.length - 1].id}>Next</button>
									</> :
									''

							}
						</div>
					</div>
				</div>
				<div className="problem__detail--vseditor">
					<div className="tab__header--editor">
						<ul>
							<li>
								<span>언어 </span>
								<select name="" id="" className="language" value={language} onChange={(e) => {setLanguage(e.target.value); setContentEditor(SampleCode[e.target.value]);}}>
									<option value="c">C</option>
									<option value="cpp">C++</option>
									<option value="java">Java</option>
									<option value="python">Python</option>
									{/* <option value="r">R</option> */}
								</select>
							</li>
							<li>
								{/* Problem Editor Theme */}
								{/* <span>Editor Theme for problem </span> */}
								<select name="" id="" className="language" value={theme} onChange={(e) => setTheme(e.target.value)}>
									<option value="white">White</option>
									<option value="dark">Dark</option>
								</select>
							</li>
						</ul>
					</div>
					<div className="wrapper__editor">
						{
							submit ?
								<div className="wrapper__editor--submit">
									<p>채점을 하고 있습니다. 조금만 기다려주십시오. </p>
									<WrapperLoading type={'bars'} color={'black'}/>
								</div> : ''
						}
						<ControlledEditor
							width="100%"
							height="100%"
							theme={theme}
							language={language}
							value={contentEditor}
							onChange={handleEditorChange}
							loading={<WrapperLoading />}
						/>
						<div className="tab__footer">
							{/* <button onClick={() => onSubmit()}>compile 1/5</button> */}
							<button onClick={() => onSubmit()}>Submit</button>
						</div>
					</div>
				</div>
			</div>
		</DetailProblemLayout>
	);
}


export default DetailProblem;
