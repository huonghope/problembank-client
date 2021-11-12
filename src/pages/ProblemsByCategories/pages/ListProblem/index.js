import React, {Component, useState} from 'react';
import {FaEdit} from 'react-icons/fa';
// import Search from '../../../../components/Search';
// import Loading from '../../../../components/Loading';
import './style.scss';
import qs from 'query-string';
import Loading from 'react-loading';
import Editor from '@monaco-editor/react';
import SampleCode from '../../../../constansts/SampleCode';

import IO from 'socket.io-client';
import Alert from '../../../../components/Alert/Alert';


import projectsAPI from '../../../../apis/projects';
import ProblemDisplayTable from '../../components/ProblemDisplayTable';
import Search from '../../../../components/Search';
import WrapperLoading from '../../../../components/WrapperLoading';
let moment = require('moment');
export default class ListProblem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			problems: [],
			loading: true,
			singleProblem: {},
			displayProblem: !this.props.displayList,
			resultProblems: [],
			countDisplayProblem: 15,
			currentPage: 0,
		};
	}
	getProblemsByTagId = async (childTagId) => {
	  let {listTutorials} = this.props;
	  let child = '';
	  for (let i = 0; i < listTutorials.length; i++) {
	    const {childTag} = listTutorials[i];
	    child = childTag.filter((element) => element.id === parseInt(childTagId));
	    if (child.length !== 0) {
	      const problems = child[0].problems;
	      this.setState(() => {
	        return {problems, loading: false};
	      });
	    }
	  }
	}
	componentDidMount() {
	  let {problems, handleClickTag} = this.props;
	  console.log(problems);
	  const {tagid} = qs.parse(this.props.location.search);
	  if (tagid) {
	    handleClickTag(tagid);
	  }
	  this.setState(() => {
	    return {
	      problems,
	      loading: false,
	    };
	  });
	}

	static getDerivedStateFromProps(nextProps, currentState) {
	  if (nextProps.problems !== currentState.problems) {
	    const sliceProblems = nextProps.problems.slice(0, Number(currentState.countDisplayProblem));
	    return {
	      resultProblems: sliceProblems,
	      problems: nextProps.problems,
	      displayProblem: false,
	    };
	  }
	  return null;
	}
	handleDetailsProblem = (id) => {
	  const {problems} = this.state;
	  const problem = problems.filter((element) => element.id === id)[0];
	  this.setState(() => {
	    return {
	      singleProblem: problem,
	      displayProblem: true,
	    };
	  });
	}
	handlePrevProblems = (id) => {
	  const {problems} = this.state;
	  let problem = problems.filter((element) => element.id === id);
	  let index = problems.findIndex((item) => item.id === problem[0].id);
	  if ((index - 1) === -1)
	    {return;}
	  let prevProblem = problems[index - 1];
	  this.setState({
	    singleProblem: prevProblem,
	  });
	}
	handleNextProblems = (id) => {
	  const {problems} = this.state;
	  let problem = problems.filter((element) => element.id === id);
	  let index = problems.findIndex((item) => item.id === problem[0].id);
	  if ((index + 1) === problems.length)
	    {return;}
	  let nextProblem = problems[index + 1];
	  this.setState({
	    singleProblem: nextProblem,
	  });
	}
	handleChangeDisplayPro = (e) => {
	  const {problems} = this.state;
	  this.setState({loading: true});
	  const countValue = e.target.value;

	  const sliceProblems = problems.slice(0, Number(countValue));

	  setTimeout(() => {
	    this.setState({loading: false});
	  }
	  , 1000);
	  this.setState({
	    resultProblems: sliceProblems,
	    countDisplayProblem: Number(countValue),
	  });
	}


	handleSetResultProblem = (data) => {
	  this.setState({loading: true});
	  const sliceProblems = data.slice(0, Number(this.state.countDisplayProblem));
	  setTimeout(() => {
	    this.setState({loading: false, resultProblems: sliceProblems, problems: data});
	  }, 250);
	}


	handlePrevProblem = () => {
	  const {currentPage, problems, countDisplayProblem} = this.state;
	  let prevPage = currentPage - 1;
	  const sliceProblems = problems.slice(prevPage * countDisplayProblem, currentPage * countDisplayProblem);
	  this.setState({
	    currentPage: prevPage,
	    resultProblems: sliceProblems,
	  });
	}

	handleNextProblem = () => {
	  const {currentPage, problems, countDisplayProblem} = this.state;
	  let nextPage = currentPage + 1;
	  const sliceProblems = problems.slice(nextPage * countDisplayProblem, (nextPage * countDisplayProblem) + countDisplayProblem);
	  this.setState({
	    currentPage: nextPage,
	    resultProblems: sliceProblems,
	  });
	}
	handleNumberPage = (idx) => {
	  const {problems, countDisplayProblem} = this.state;
	  const sliceProblems = problems.slice(idx * countDisplayProblem, (idx * countDisplayProblem) + countDisplayProblem);

	  this.setState({
	    currentPage: idx,
	    resultProblems: sliceProblems,
	  });
	}
	calCountPage = () => {
	  const {currentPage, problems, countDisplayProblem} = this.state;
	  let totalPage = problems.length / countDisplayProblem;
	  let result = new Array();
	  for (let i = 0; i < totalPage; i++) {
	    result.push(<span onClick={() => this.handleNumberPage(i)} style={currentPage === i ? {fontSize: '20px'} : {}}> {i + 1} </span>);
	  }
	  return result;
	}
	render() {
	  let {loading, countDisplayProblem, resultProblems, currentPage} = this.state;
	  let {problems} = this.props;
	  return (
	    <div className="list__problems--wrappers">
	      <div className="list__problems--content">
	        <h3>
	          <i className="fa fa-th-large" aria-hidden="true"></i> 모든 문제
	        </h3>
	        <div className="list__problems--search">
	          <Search
	            problems={problems}
	            setResultProblem={(data) => this.handleSetResultProblem(data)}
	          />
	        </div>
	        {
						loading ? <WrapperLoading type={'bars'} color={'black'} /> :
							resultProblems.length !== 0 ?
								<>
								  <ProblemDisplayTable
								    problems={resultProblems}
								    problemType={this.props.problemType}
								    currentPage={currentPage}
								    countDisplayProblem={countDisplayProblem}
								  />
								  <div className="row-selector">
								    <select className="form-control" onChange={this.handleChangeDisplayPro} value={countDisplayProblem}>
								      <option value="20">15</option>
								      <option value="30">30</option>
								      <option value="50">50</option>
								      <option value="100">100</option>
								    </select>
								    <span className="sort-caret">
											문제수
								    </span>
								    <div>
								      <button onClick={() => this.handlePrevProblem()} disabled={currentPage === 0}> {'<<'} </button>
								      {
								        this.calCountPage()
								      }
								      <button onClick={() => this.handleNextProblem()} disabled={(problems.length / countDisplayProblem) !== 1 ? currentPage >= ((problems.length / countDisplayProblem) - 1) : true}> {'>>'} </button>
								    </div>
								  </div>
								</>								:
								<div style={{
								  textAlign: 'center',
								  marginTop: '10rem',
								  fontSize: '2rem',
								}}>문제가 추가 될 예정입니다</div>
	        }
	      </div>
	    </div>
	  );
	}
}
function DetailProblem({problems, problem, handlePrevProblems, handleNextProblems}) {
	let category = '';
	switch (problem.category) {
	case 'C/C++':
		category = 'c';
		break;
	case 'JAVA':
		category = 'java';
	case 'Python':
		category = 'Python';
	default:
		category = 'cpp';
		break;
	}
	const options = {
		selectOnLineNumbers: true,
	};
	const [editorContent, setEditorContent] = useState(SampleCode['c']);
	const [submit, setSubmit] = useState(false);
	const [language, setLanguage] = useState('c');

	function getSimpleCode(language) {
		let simpleCode = SampleCode[language];
		return simpleCode;
	}

	function handleChangeContent(content) {
		setEditorContent(content);
		let editor = localStorage.getItem('editor');
		editor = editor ? JSON.parse(editor) : {};
		editor['editorContent'] = content;
		localStorage.setItem('editor', JSON.stringify(editor));
	}

	function handleLanguage(event) {
		let language = event.target.value;
		let simpleCode = getSimpleCode(language);

		setLanguage(language);
		setEditorContent(simpleCode);

		let valueEditor = {
			language: language,
			editorContent: simpleCode,
		};
		// 풀고 있는 코드를 localStore 저장함
		localStorage.setItem('editor', JSON.stringify(valueEditor));
	}

	// !Socket exchange
	async function handleAnswerSubmit() {
		setSubmit(true);

		const problemId = qs.parse(window.location.search).id;
		const IO_URL = process.env.REACT_APP_SERVER_API + '/projects';

		const params = {
			sourceCode: editorContent,
			language,
			problemId: Number(problemId),
		};

		const response = await projectsAPI.compile(params);
		const {data} = response;
		alert(`체점 결과 ${data.correctCount} / ${data.count}`);
		// 	setSubmit(false);
		// const socket = IO(IO_URL);
		// socket.emit("projects", {
		// 	sourceCode: editorContent, language, problemId: Number(problemId)
		// });

		// socket.on("result", (data) => {
		// 	alert(`체점 결과 ${data.correctCount} / ${data.count}`);
		// 	setSubmit(false);
		// });

		let timeOutSubmit = function() {
			setSubmit(false);
			alert('서버오류입니다. 잠시 후 다시 시도해주세요.');
		};
		setTimeout(timeOutSubmit, 3000);
		// Alert({
		//     title : "제출하시겠습니까?",
		//     btns : [
		//         {
		//             text: "예", onClick: () => {
		//                 try {
		// 					setSubmit(true);


		//                     // const problemId = qs.parse(window.location.search).id;
		//                     // const IO_URL = process.env.REACT_APP_API_IDE_URL + "/problems";
		//                     // const socket = IO(IO_URL);

		//                     // socket.emit("problems", {
		//                     //     sourceCode: editorContent, language, problemId: Number(problemId)
		//                     // });

		//                     // socket.on("result", (data) => {
		//                     //     alert(`체점 결과 ${data.correctCount} / ${data.count}`);
		// 					// 	setSubmit(false);
		// 					// });

		// 					var timeOutSubmit = function(){
		// 						setSubmit(false);
		// 						alert("서버오류입니다. 잠시 후 다시 시도해주세요.");
		// 					};
		// 					setTimeout(timeOutSubmit, 3000);

		//                 } catch (error) {
		// 					alert("서버오류입니다. 잠시 후 다시 시도해주세요.");
		//                     console.log(error);
		//                 }

		//             }
		//         },{
		//             text: "아니오", onClick: () => {}
		//         }
		//     ]
		// })
	}

	return (
		<div className="problem__detail">
			<div className="nextTop">
				<button onClick={() => handlePrevProblems(problem.id)} disabled={problem.id === problems[0].id}>앞 문제</button>
				<button onClick={() => handleNextProblems(problem.id)} disabled={problem.id === problems[problems.length - 1].id}>뒤 문제</button>
			</div>
			<div className="problem__detail--name">
				<span>{problem.id}.{problem.name}</span>
				{/* <button to = "#"  className = "btn btn_primary" onClick = {() => this.handleDisplayEditor()}>프로젝트 생성</button> */}
			</div>
			<div className="problem__detail--content">
				<div className="define border-btm">
					<h3>문제</h3>
					<p>
						{problem.content}
					</p>
				</div>
				<div className="problem_input border-btm">
					<h3>입력</h3>
					<p>
						{problem.input}
					</p>
				</div>
				<div className="problem_output border-btm">
					<h3>출력</h3>
					<p>
						{problem.output}
					</p>
				</div>
				<div className="problem-example">
					<div className="example_input">
						<h3 >입력 예제 1</h3><br />
						<textarea className="form-control" cols="55" rows="12" disabled value={problem.input_example}>
						</textarea>
					</div>
					<div className="example_output">
						<h3 >출력 예제 1</h3><br />
						<textarea className="form-control" cols="55" rows="12" disabled value={problem.output_example}>
						</textarea>
					</div>
				</div>
			</div>
			<div className="problem__detail--editor">
				<Editor
					width="100%"
					height="100%"
					theme="dark"
					language={category}
					value={SampleCode[category]}
					onChange={handleChangeContent}
					// editorDidMount={handleEditorDidMount}
					// loading={<Loading />}
				/>
				<div className="option__submit">
					<button style={{background: 'blue', color: 'white'}} onClick={() => handleAnswerSubmit()}>채점</button>
					<button style={{background: 'yellow', color: 'black'}}>리셋</button>
				</div>
			</div>
		</div>
	);
}
