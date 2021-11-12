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
import {Link} from 'react-router-dom';
// import NotFound from "../../../../components/404NotFound";

function EditProblem(props) {
	const [title, setTitle] = useState('');
	const [level, setLevel] = useState('하');
	const [content, setContent] = useState('');
	const [language, setLanguage] = useState('Python');
	const [category, setCategory] = useState('1');
	const [input, setInputExample] = useState('');
	const [output, setOutputExample] = useState('');
	const [loading, setLoading] = useState(true);

	const [categories, setCategories] = useState([]);
	const dispatch = useDispatch();

	const problemAdmin = useSelector((state) => state.problemAdmin);
	useEffect(() => {
		const {id} = queryString.parse(props.location.search);

		let fetchData = async () => {
			let params = {
				problemId: id,
			};
			const res = await AdminProblemAPI.getProblemById(params);
			const {data} = res;
			console.log(data);
			const {name, content, level, input, output, testcases, category} = data;
			setTitle(name);
			setLevel(level);
			setContent(content);
			setInputExample(input);
			setOutputExample(output);
			setTestCases(testcases);
			setCategories(category);
		};
		fetchData();
		// dispatch(getCategories()).then(response => {
		//   const { data } = response.payload;
		//   setCategories(data)
		// })
		setTimeout(() => {
			setLoading(false);
		}, 500);
	}, []);

	const [testCases, setTestCases] = useState([
		{input_example: '', output_example: ''},
	]);

	const handleTestCases = (idx, type, data) => {
		const _testCases = Object.assign([], testCases);
		_testCases[idx][type] = data;
		setTestCases(_testCases);
	};

	const handleAddTestCase = () => {
		const _testCases = Object.assign([], testCases);
		_testCases.push({input_example: '', output_example: ''});
		setTestCases(_testCases);
	};

	const handleRemoveTestCase = (idx) => {
		const _testCases = Object.assign([], testCases);
		_testCases.splice(idx, 1);
		setTestCases(_testCases);
	};

	const handleSubmitProblem = async () => {
		// name, language, category, tags, usage


		if (

			!title ||
      !level ||
      !language ||
      !content ||
      !category ||
      !input ||
      !output ||
      !testCases
		) {
			alert('입력값을 확인해주세요');
			return;
		}


		try {
			alert('문제가 수정되었습니다.');
			const {id} = queryString.parse(props.location.search);
			let problem = {
				id,
				title,
				level,
				category,
				language,
				content,
				input,
				output,
				testCases,
			};
			const response = await AdminProblemAPI.updateProblems(problem);
			const {result, message, data} = response;
			if (result) {
				alert(message);
				props.history.push('/admin');
			} else {
				alert(message);
			}
		} catch (error) {
			console.log(`Add problem error ${error}`);
		}
	};

	// if(props.user.roleId != 1){
	//   return(<NotFound/>);
	// }
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
				<i className="fa fa-pencil-square-o"></i> 프로그래밍 문제 등록
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
						<label>카테고리</label>
						<DisplayCategories
							categories = {categories}
							selectedCategory={(id) => setCategory(id)}
							enableSet = {true}
						/>
					</div>
				</div>
			</div>

			<div className="problem-info">
				<div className="problem-info__title">
          입력 정보<span style={{color: 'red'}}>*</span>
				</div>
				<div className="problem-info__content--ioexample">
					<div>
						<label>입력 예제</label>
						<input
							type="input"
							placeholder="100이하의 정수"
							value={input}
							onChange={(e) => setInputExample(e.target.value)}
						/>
					</div>
					<div>
						<label>출력 예제</label>
						<input
							type="input"
							placeholder="최대값"
							value={output}
							onChange={(e) => setOutputExample(e.target.value)}
						/>
					</div>
				</div>
			</div>

			<div className="problem-info">
				<div className="problem-info__title">
          테스트 케이스
					<br /> 정보<span style={{color: 'red'}}>*</span>
				</div>
				<div className="problem-info__content--testcase">
					<div className="list-testcase">
						<p>※테스트 케이스 정보를 입력해주세요.</p>
						<p>첫번째부터 다섯번쨰의 입력과 출력 예제는 제공되는 테스트 케이스이고 나머지 입력/출력 예제들은 히든 테스트 케이스입니다.</p>
						<br /> <br />
					</div>
					<div className="list-testcase">
						<TestCasesInputs
							testCases={testCases}
							handleTestCases={handleTestCases}
							removeTestCase={handleRemoveTestCase}
							addTestCase={handleAddTestCase}
						/>
					</div>
				</div>
			</div>
			<div className="problem-info__btn--insert">
				<button onClick={() => handleSubmitProblem()}>문제 수정하기</button>
			</div>
		</DashboardLayout>
	);
}
function TestCasesInputs({
	testCases,
	handleTestCases,
	addTestCase,
	removeTestCase,
}) {
	return (
		<>
			{testCases.map(({input_example, output_example}, idx) => {
				return (
					<>
						<div className="wrapper-input">
							<div>
								<label>입력 예제 {idx +1}</label>
								<input
									type="input"
									value={input_example}
									onChange={(e) =>
										handleTestCases(idx, 'input_example', e.target.value)
									}
									name="input_example"
								/>
							</div>
							<div>
								<label>출력 예제 {idx +1}</label>
								<input
									type="input"
									value={output_example}
									onChange={(e) =>
										handleTestCases(idx, 'output_example', e.target.value)
									}
									name="output_example"
								/>
							</div>
						</div>
						{/* <div key={`testcase-input-btn-${idx}`}>
              {idx !== 0 && (
                <button
                  className="btn_primary "
                  onClick={() => {
                    removeTestCase(idx);
                  }}
                >
                  삭제
                </button>
              )}
              {idx === testCases.length - 1 && (
                <button
                  className="btn_primary "
                  onClick={() => {
                    addTestCase();
                  }}
                >
                  추가
                </button>
              )}
            </div> */}
					</>
				);
			})}
		</>
	);
}

export default EditProblem;
