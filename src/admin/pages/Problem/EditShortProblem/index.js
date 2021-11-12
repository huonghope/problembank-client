import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import DashboardLayout from '../../../layout/DashboardLayout';
import CKEditor from 'ckeditor4-react';
import {Component} from 'react';
import './style.scss';
import AdminProblemAPI from '../../../../apis/admin/problem';
import {useDispatch, useSelector} from 'react-redux';
import DisplayCategories from '../../../components/DisplayCategories';
import WrapperLoading from '../../../../components/WrapperLoading';
import queryString from 'query-string';
import {getCategories} from '../../../_actions/problemAction';

function EditShortChoiceProblem(props) {
	const [title, setTitle] = useState('');
	const [level, setLevel] = useState('상');
	const [content, setContent] = useState('');
	const [language, setLanguage] = useState('Python');
	const [category, setCategory] = useState('6');
	const [input, setInputExample] = useState('');
	const [output, setOutputExample] = useState('');
	const [loading, setLoading] = useState(true);
	const [answer, setAnswers] = useState([{content: ''}]);
	const [problemId, setProblemId] = useState(0);

	const [categories, setCategories] = useState([]);
	const dispatch = useDispatch();

	const problemAdmin = useSelector((state) => state.problemAdmin);
	useEffect(() => {
		const {id} = queryString.parse(props.location.search);
		setProblemId(id);

		let fetchData = async () => {
			let params = {
				problemId: id,
			};
			// dispatch(getCategories()).then(response => {
			//   const { data } = response.payload;
			//   setCategories(data)
			// })
			const res = await AdminProblemAPI.getShortProblem(params);
			const {data} = res;
			const {name, content, level, input, output, answers, category} = data;

			console.log(res);
			setTitle(name);
			setLevel(level);
			setContent(content);
			setInputExample(input);
			setOutputExample(output);
			setAnswers(answers);
			setCategories(category);
		};
		fetchData();
		setTimeout(() => {
			setLoading(false);
		}, 500);
	}, []);


	const handleAnswer = (idx, type, data) => {
		console.log(idx, type, data);
		const _answer = Object.assign([], answer);
		_answer[idx]['problem_id'] = Number(problemId);
		_answer[idx][type] = data;
		setAnswers(_answer);
	};

	const handleAddAnswer = () => {
		const _answer = Object.assign([], answer);
		_answer.push({answer_content: ''});
		setAnswers(_answer);
	};

	const handleRemoveAnswer = (idx) => {
		const _answer = Object.assign([], answer);
		_answer.splice(idx, 1);
		setAnswers(_answer);
	};

	const handleSubmitProblem = async () => {
		console.log(handleSubmitProblem);
		console.log('handleSubmitProblem');
		alert('문제가 수정되었습니다.');

		// name, language, category, tags, usage
		if (
			!title ||
      !level ||
      !language ||
      !content ||
      !category ||
      !answer
		) {
			return;
		}
		try {
			const {id} = queryString.parse(props.location.search);
			let problem = {
				id,
				title,
				level,
				category,
				language,
				content,
				answer,
			};
			const response = await AdminProblemAPI.ShortUpdatdeProblems(problem);
			const {result, message, data} = response;
			if (result) {
				alert(message);
				props.history.push('/admin/short');
				setTitle(title);
				setLevel(level);
				setContent(content);
				setInputExample('');
				setOutputExample('');
				setAnswers(answer);
			} else {
				alert(message);
			}
		} catch (error) {
			console.log(`Add problem error ${error}`);
		}
	};

	if (loading) {
		return (
			<DashboardLayout>
				<WrapperLoading type={'bars'} color={'black'} />
			</DashboardLayout>
		);
	}
	return (
		<DashboardLayout>
			<p style={{marginBottom: '20px'}}>
				<i className="fa fa-pencil-square-o"></i> 단답형 문제 수정
			</p>
			<div className="problem-info">
				<div className="problem-info__title">
          문제 정보<span style={{color: 'red'}}>*</span>
				</div>
				<div className="problem-info__content">
					<div className="problem-info__content--name">
						<div>
							<label>제목</label>
							<input
								type="input"
								id="name"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							/>
						</div>
						<div>
							<label>난이도</label>
							<select
								name="level"
								id="level"
								value={level}
								onChange={(e) => setLevel(e.target.value)}
							>
								<option value="하">하</option>
								<option value="중">중</option>
								<option value="상">상</option>
							</select>
							{
								level === '하' ?
									<>
										<i className="fa fa-star"></i>
									</> :
									level === '중' ?
										<>
											<i className="fa fa-star"></i>
											<i className="fa fa-star"></i>
											<i className="fa fa-star"></i>
										</> :
										<>
											<i className="fa fa-star"></i>
											<i className="fa fa-star"></i>
											<i className="fa fa-star"></i>
											<i className="fa fa-star"></i>
											<i className="fa fa-star"></i>
										</>
							}
						</div>
					</div>
					<div className="problem-info__content--decs">
						<div>
							<label>설명</label>
						</div>
						<CKEditor
							id="problem-desc"
							name="content"
							data={content}
							onChange={(e) => setContent(e.editor.getData())}
						/>
					</div>
					<div className="problem-info__content--category">
						{/* <label>카테고리</label>
            <DisplayCategories
              categories = {categories}
              selectedCategory={(id) => setCategory(id)}
              enableSet = {true}
            /> */}
					</div>
				</div>
			</div>
			<div className="problem-info">
				<div className="problem-info__title">
          답안 정보<span style={{color: 'red'}}>*</span>
				</div>
				<div className="problem-info__content--testcase">
					<div className="list-testcase">
						<Answer answer={answer}
							handleAnswer={handleAnswer}
							removeAnswer={handleRemoveAnswer}
							addAnswer={handleAddAnswer} />
					</div>
				</div>
			</div>
			<div className="problem-info__btn--insert">
				<button onClick={() => handleSubmitProblem()}>문제 수정하기</button>
			</div>
		</DashboardLayout>
	);
}

function Answer({answer, handleAnswer, addAnswer, removeAnswer}) {
	console.log(answer);
	return (
		<>
			{answer.map(({answer_content}, idx) => {
				return (
					<>
						<div className="wrapper-input">
							<div>
								<label>답안 내용</label>
								<input type="input" value={answer_content} onChange={(e) => handleAnswer(idx, 'answer_content', e.target.value)} name="content" />
							</div>
						</div>
						<div key={`testcase-input-btn-${idx}`}>
							{idx !== 0 && <button className="btn_primary " onClick={() => {removeAnswer(idx);}}>삭제</button>}
							{idx === answer.length - 1 && <button className="btn_primary " onClick={() => {addAnswer();}}>추가</button>}
						</div>
					</>
				);
			})}
		</>
	);
}

export default EditShortChoiceProblem;
