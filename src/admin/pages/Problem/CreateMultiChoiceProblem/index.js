import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import DashboardLayout from '../../../layout/DashboardLayout';
import CKEditor from 'ckeditor4-react';
import {Component} from 'react';
import {getCategories} from '../../../_actions/problemAction';
import AdminProblemAPI from '../../../../apis/admin/problem';
import './style.scss';
import {useDispatch} from 'react-redux';
import DisplayCategories from '../../../components/DisplayCategories';
import WrapperLoading from '../../../../components/WrapperLoading';
import NotFound from '../../../../components/404NotFound';

function CreateMultiChoiceProblem(props) {
	const [title, setTitle] = useState('');
	const [answer, setAnswers] = useState([{content: ''}]);
	const [content, setContent] = useState('');
	const [category, setCategory] = useState('6'); // !확인필요함
	const [level, setLevel] = useState('하');
	const [isAnswer, setIsAnswer] = useState(null);
	const [loading, setLoading] = useState(true);

	const dispatch = useDispatch();
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		dispatch(getCategories()).then((response) => {
			const {data} = response.payload;
			// let childCategories = data.filter(elm => Number(elm.parent_id) === 1)
			setCategories(data);
		});
		handleAddAnswer();
		setTimeout(() => {
			setLoading(false);
		}, 500);
	}, []);

	const handleAnswer = (idx, type, data) => {
		const _answer = Object.assign([], answer);
		_answer[idx][type] = data;
		setAnswers(_answer);
	};

	const handleAddAnswer = () => {
		const _answer = Object.assign([], answer);
		for (let i=0; i < 3; i++) {
			_answer.push({content: ''});
		}
		setAnswers(_answer);
	};

	const handleRemoveAnswer = () => {
		const _answer = Object.assign([], answer);
		_answer.splice(0, 4);
		setAnswers(_answer);
	};

	const handleSubmitProblem = async () => {
		if ( !level || !title || !content || !answer || !category || !isAnswer) {
			alert('입력값을 확인해주세요');
			return;
		}
		for (let i=0; i < answer.length; i++) {
			if (!answer[i].content) {
				alert((i+1) + '번째 문항을 확인해주세요');
				return;
			}
		}
		try {
			alert('문제가 추가되었습니다.');
			let problem = {level, title, category, content, answer};
			const response = await AdminProblemAPI.insertMultiChoiceProblems(problem);
			const {result, message, data} = response;
			if (result) {
				alert(message);
				setTitle('');
				setContent('');
				setLevel('하');
				handleRemoveAnswer();
				setAnswers([
					{content: ''}, {content: ''}, {content: ''}, {content: ''},

				]);
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
			<p style={{marginBottom: '20px'}}><i className="fa fa-check-square-o"></i> 객관식 문제 등록</p>
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
							onChange={(e) => setContent(e.editor.getData())}
						/>
					</div>
					<div className="problem-info__content--category">
						<label>카테고리</label>
						<div>
							<DisplayCategories
								categories = {categories}
								selectedCategory={(id) => setCategory(id)}
							/>
						</div>
					</div>
				</div>
			</div>

			<div className="problem-info">
				<div className="problem-info__title">답안 정보<span style={{color: 'red'}}>*</span></div>
				<div className="problem-info__content--testcase">
					<div className="list-testcase">
						<p>※객관식 4가지 문항를 입력해주세요.</p>
						<br/>
					</div>
					<div className="list-testcase">
						<Answer answer={answer}
							handleAnswer={handleAnswer}
							removeAnswer={handleRemoveAnswer}
							addAnswer={handleAddAnswer}
							handleIsAnswer={handleIsAnswer}
						/>
					</div>
				</div>
			</div>

			<div className="problem-info__btn--insert">
				<button onClick={() => handleSubmitProblem()} >문제 등록하기</button>
			</div>
		</DashboardLayout>
	);
}

function Answer({answer, handleAnswer, addAnswer, removeAnswer, handleIsAnswer}) {
	return (
		<>
			{answer.map(({content}, idx) => {
				return (
					<>
						<div className="wrapper-input">
							<div>
								<label>{idx +1}번 문항</label>
								<div className="wrapper-answer">
									<input className="input-answer" type="input" value={content} onChange={(e) => handleAnswer(idx, 'content', e.target.value)} name="content" />
									<input className="input-checkanswer" type="radio" onChange={() => handleIsAnswer(idx + 1)} name="radio"/>
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
		</>
	);
}


export default CreateMultiChoiceProblem;

