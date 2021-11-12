import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import DashboardLayout from '../../../layout/DashboardLayout';
import CKEditor from 'ckeditor4-react';
import {Component} from 'react';
import AdminProblemAPI from '../../../../apis/admin/problem';
import './style.scss';
import {useDispatch} from 'react-redux';
import DisplayCategories from '../../../components/DisplayCategories';
import WrapperLoading from '../../../../components/WrapperLoading';
import queryString from 'query-string';
import {getCategories} from '../../../_actions/problemAction';
import NotFound from '../../../../components/404NotFound';
import {compose} from 'redux';
import styled from 'styled-components';

function EditMultiChoiceProblem(props) {
	const [output, setOutputExample] = useState('');
	const [input, setInputExample] = useState('');
	const [title, setTitle] = useState('');
	const [answer, setAnswers] = useState([{answer: ''}]);
	const [content, setContent] = useState('');
	const [category, setCategory] = useState('6'); // !확인필요함
	const [level, setLevel] = useState('하');
	const [isAnswer, setIsAnswer] = useState(null);
	const [loading, setLoading] = useState(true);
	const [problemId, setProblemId] = useState(0);

	const dispatch = useDispatch();
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		const {id} = queryString.parse(props.location.search);
		setProblemId(id);

		let fetchData = async () => {
			let params = {
				problemId: id,
			};
			dispatch(getCategories()).then((response) => {
				const {data} = response.payload;
				let childCategories = data.filter((elm) => Number(elm.parent_id) === 1);
				setCategories(data);
			});

			const res = await AdminProblemAPI.getMultiChoiceProble(params);
			console.log(res);
			const {data} = res;
			const {name, content, level, input, output, answers, category} = data;
			setTitle(name);
			setLevel(level);
			setContent(content);
			setInputExample(input);
			setOutputExample(output);
			setAnswers(answers);
			setCategories(category);
			answers.map((answer, idx )=> {
				if (answer.is_correct === 'true') {setIsAnswer(idx + 1);}
			});
		};
		fetchData();

		setTimeout(() => {
			setLoading(false);
		}, 500);
	}, []);

	const handleAnswer = (idx, type, data) => {
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
		if (!level || !title || !content || !answer || !category || !isAnswer) {
			alert('빈 칸을 채워넣어주세요');
			return;
		}
		try {
			const {id} = queryString.parse(props.location.search);
			let problem = {
				id,
				level,
				title,
				category,
				content,
				answer,
				isAnswer,
			};
			const response = await AdminProblemAPI.MultiUpdateProblem(problem);
			const {result, message, data} = response;
			if (result) {
				alert(message);
				props.history.push(`/admin/multiple`);
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
	const handleIsAnswer = (idx) => {
		setIsAnswer(idx);
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
			<p style={{marginBottom: '20px'}}><i className="fa fa-check-square-o"></i> 객관식 문제 수정</p>
			<div className="problem-info">
				<div className="problem-info__title">문제 정보<span style={{color: 'red'}}>*</span></div>
				<div className="problem-info__content">
					<div className="problem-info__content--name">
						<div>
							<label>제목</label>
							<input type="input" value={title} onChange={(e) => setTitle(e.target.value)} />
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
						<label>카테고리</label>
						<div>
							<DisplayCategories
								categories={categories}
								selectedCategory={(id) => setCategory(id)}
								enableSet={true}
							/>
						</div>
					</div>
				</div>
			</div>

			<div className="problem-info">
				<div className="problem-info__title">답안 정보<span style={{color: 'red'}}>*</span></div>
				<div className="problem-info__content--testcase">
					<div className="list-testcase">
						<div className="list-testcase">
							<span>※객관식 4가지 문항를 입력해주세요</span>
							<br/>
						</div>
						<Answer answer={answer}
							handleAnswer={handleAnswer}
							removeAnswer={handleRemoveAnswer}
							addAnswer={handleAddAnswer}
							handleIsAnswer={handleIsAnswer}
							isAnswer={isAnswer}
						/>

					</div>
				</div>
			</div>

			<div className="problem-info__btn--insert">
				<button onClick={() => handleSubmitProblem()} >문제 수정하기</button>
			</div>
		</DashboardLayout>
	);
}

function Answer({answer, handleAnswer, addAnswer, removeAnswer, handleIsAnswer, isAnswer}) {
	return (
		<AnswerComponent>
			<div>
				<div className="label">
					<p>답안 내용</p>
					<p>정답 체크</p>
				</div>
				<div className="content">
					{answer.map(({answer_content}, idx) => {
						return (
							<>
								<div className="wrapper-input">
									<div>
										<label>{idx + 0}</label>
										<div className="wrapper-answer">
											<input type="input" value={answer_content} onChange={(e) => handleAnswer(idx, 'answer_content', e.target.value)} name="content" />
											<input className="input-checkanswer" type="radio" checked={Number(isAnswer) === idx + 1} onChange={() => handleIsAnswer(idx + 1)} name="radio"/>
										</div>
									</div>
								</div>
								{/* <div key={`testcase-input-btn-${idx}`}>
                                    {idx !== 0 && <button className="btn_primary " onClick={() => { removeAnswer(idx) }}>삭제</button>}
                                    {idx === answer.length - 1 && <button className="btn_primary " onClick={() => { addAnswer() }}>추가</button>}
                                </div> */}
							</>
						);
					})}
				</div>
			</div>
		</AnswerComponent>
	);
}
const AnswerComponent = styled.div`
    .label{
        display: flex;
        width: 50%;
        justify-content: space-between;
    }
    .content{
        width: 50%;
    }

`;

export default EditMultiChoiceProblem;

