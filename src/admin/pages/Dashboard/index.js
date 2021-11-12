import React, {useState} from 'react';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import WrapperLoading from '../../../components/WrapperLoading';
import ProblemDisplayTable from '../../components/ProblemDisplayTable';
import DashboardLayout from '../../layout/DashboardLayout';
import {getProblemData, getCategories, getMultiChoiceProblems, getShortProblems} from '../../_actions/problemAction';
import moment from 'moment';
import './style.scss';
import DisplayCategories from '../../components/DisplayCategories';

function Dashboard(props) {
	const [problems, setProblems] = useState([]);
	const [multiChoiceProblems, setMultiChoiceProblems] = useState([]);
	const [shortProblems, setShortProblems] = useState([]);

	const [resultProblems, setResultProblems] = useState([]);
	const [countDisplayProblem, setCountDisplayProblem] = useState(15);

	// 등록한 날짜
	const [createdDateFrom, setCreateDateFrom] = useState(moment().format('YYYY-MM-DD'));
	const [createdDateTo, setCreateDateTo] = useState(moment(moment().format('YYYY-MM-DD')).add(7, 'days').format('YYYY-MM-DD'));

	const [title, setTitle] = useState('');
	const [loading, setLoading] = useState(true);
	const [problemType, setProblemType] = useState('프로그래밍 문제');

	const [currentPage, setCurrentPage] = useState(0);


	const dispatch = useDispatch();
	const [categories, setCategories] = useState([]);
	const [childCategories, setChildCategories] = useState([]);
	const [category, setCategory] = useState('6'); // !확인필요함

	const problemAdmin = useSelector((state) => state.problemAdmin);

	useEffect(() => {
		dispatch(getCategories()).then((response) => {
			const {data} = response.payload;
			setCategories(data);
		});
		const fetchDate = async () => {
			await dispatch(getProblemData()).then((response) => {
				const {data} = response.payload;
				setProblems(data);
				const sliceProblems = data.slice(0, Number(countDisplayProblem));
				setResultProblems(sliceProblems);
			});
			await dispatch(getMultiChoiceProblems()).then((response) => {
				const {data} = response.payload;
				setMultiChoiceProblems(data);
			});

			await dispatch(getShortProblems()).then((response) => {
				const {data} = response.payload;
				setShortProblems(data);
			});

			setLoading(!loading);
		};
		fetchDate();
	}, []);

	// 등록일자부타
	const handleSearchBtn = () => {

		// setResultProblems(filterForCategories)
	};
	const handleChangeDisplayPro = (e) => {
		setLoading(true);
		const countValue = e.target.value;
		setCountDisplayProblem(countValue);

		const sliceProblems = problems.slice(0, Number(countValue));
		setResultProblems(sliceProblems);

		setTimeout(function() {
			setLoading(false);
		}, 500);
	};

	// ! need refactory
	const handlePrevProblem = () => {
		let prevPage= currentPage - 1;
		const sliceProblems = problems.slice(prevPage * countDisplayProblem, currentPage * countDisplayProblem);
		setCurrentPage(prevPage);
		setResultProblems(sliceProblems);
	};

	const handleNextProblem = () => {
		let nextPage= currentPage + 1;
		const sliceProblems = problems.slice(nextPage * countDisplayProblem, (nextPage * countDisplayProblem) + countDisplayProblem);
		setCurrentPage(nextPage);
		setResultProblems(sliceProblems);
	};

	// !check
	const calCountPage = () => {
		let totalPage = problems.length / countDisplayProblem;
		let result = new Array();
		for (let i = 0; i < totalPage; i++) {
			result.push(<span style={currentPage === i ? {fontSize: '20px'} : {}}> {i + 1} </span>);
		}
		return result;
	};
	const blockFotter = title && resultProblems.length === 0 ? {display: 'none'} : {display: 'block'};


	return (
		<DashboardLayout>
			<p style={{marginBottom: '20px'}}><i className="fa fa-search"></i> 문제 조회</p>
			<div style={{padding: '30px'}}>
				<div className="wrapper-search">
					<div className="wrapper-search__col">
						<div className="input-wrapper">
							<label>문제 형태</label>
							<select name="" id="" value={problemType} onChange={(e) => setProblemType(e.target.value)}>
								<option value="프로그래밍 문제">프로그래밍 문제</option>
								<option value="객관식 문제">객관식 문제</option>
								<option value="단답형 문제">단답형 문제</option>
							</select>
						</div>
					</div>
					<div className="wrapper-search__col">
						{/* <div className="input-wrapper">
                            <label>등록 일자</label>
                            <input type="date" value={createdDateFrom} onChange={(e) => setCreateDateFrom(e.target.value)}/> ~ <input type="date" value={createdDateTo} onChange={(e) => setCreateDateTo(e.target.value)}/>
                        </div> */}
						{/* <div className="input-wrapper">
                            <label>이름</label>
                            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="이름" type="input"/>
                        </div> */}
					</div>

					<div className="wrapper-search__col" style={{flex: 1}}>
						<div className="input-wrapper search-categories" style={{display: 'flex'}}>
							<label>카테고리</label>
							<DisplayCategories
								categories = {categories}
								selectedCategory={(id) => setCategory(id)}
							/>
						</div>
					</div>
					<button className="btn-search" onClick={() => handleSearchBtn()}>조회</button>
				</div>
				{
					!loading ?
						<>
							<div className="wrapper-result">
								{
									resultProblems.length !== 0 ?
										<ProblemDisplayTable
											problems = {resultProblems}
											enableEdit = {true}
										/> :
										problems.length != 0 &&
                                    <ProblemDisplayTable
                                    	problems = {problems}
                                    	enableEdit = {true}
                                    	problemType = {problemType}
                                    />
								}
							</div>
							<div className="row-selector" style={blockFotter}>
								<select className="form-control" onChange={handleChangeDisplayPro} value={countDisplayProblem}>
									<option value="15">15</option>
									<option value="30" selected="">30</option>
									<option value="50">50</option>
									<option value="100">100</option>
								</select>
								<span className="sort-caret">
                                문제수
								</span>
								<div>
									<button onClick={() => handlePrevProblem()} disabled={currentPage === 0}> {'<<'} </button>
									{
										calCountPage()
									}
									<button onClick={() => handleNextProblem()} disabled={(problems.length / resultProblems.length) !== 1 ? currentPage >= (problems.length / resultProblems.length) : true}> {'>>'} </button>
								</div>
							</div>
						</> :
						<WrapperLoading type={'bars'} color={'black'} />
				}

			</div>
		</DashboardLayout>
	);
}


export default Dashboard;

