import React, {useState} from 'react';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import WrapperLoading from '../../../../components/WrapperLoading';
import MultiProblemDisplayTable from '../../../components/MultiProblemDisplayTable';
import DashboardLayout from '../../../layout/DashboardLayout';
import {getProblemData, getCategories, getMultiChoiceProblems, getShortProblems} from '../../../_actions/problemAction';
import moment from 'moment';
import './style.scss';
import DisplayCategories from '../../../components/DisplayCategories';
import AdminProblemAPI from '../../../../apis/admin/problem';
import NotFound from '../../../../components/404NotFound';


function Multiple(props) {
	const [problems, setProblems] = useState([]);

	const [resultProblems, setResultProblems] = useState([]);
	const [countDisplayProblem, setCountDisplayProblem] = useState(15);

	// 등록한 날짜
	const [createdDateFrom, setCreateDateFrom] = useState(moment().format('YYYY-MM-DD'));
	const [createdDateTo, setCreateDateTo] = useState(moment(moment().format('YYYY-MM-DD')).add(7, 'days').format('YYYY-MM-DD'));

	const [title, setTitle] = useState('');
	const [loading, setLoading] = useState(true);
	const [problemType, setProblemType] = useState('객관식 문제');

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
			await dispatch(getMultiChoiceProblems()).then((response) => {
				const {data} = response.payload;
				setProblems(data);
				const sliceProblems = data.slice(0, Number(countDisplayProblem));
				setResultProblems(sliceProblems);
			});
			setLoading(!loading);
		};
		fetchDate();
	}, []);

	// 등록일자부타
	const handleSearchBtn = () => {
		let filterForCategories = problems.filter((ele) => Number(ele.tagInfo.id) === Number(category));
		let filterForCategoriesOther = problems.filter((ele) => Number(ele.tagInfo.id) !== Number(category));
		let totalProblems = filterForCategories.concat(filterForCategoriesOther);
		setProblems(totalProblems);
		const sliceProblems = totalProblems.slice(0, Number(countDisplayProblem));
		setResultProblems(sliceProblems);
	};

	const handleChangeDisplayPro = (e) => {
		setLoading(true);
		const countValue = e.target.value;
		setCountDisplayProblem(Number(countValue));

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

	const handleNumberPage = (idx) => {
		const sliceProblems = problems.slice(idx * countDisplayProblem, (idx * countDisplayProblem) + countDisplayProblem);
		setResultProblems(sliceProblems);
		setCurrentPage(idx);
	};

	// !check
	const calCountPage = () => {
		let totalPage = problems.length / countDisplayProblem;
		let result = new Array();
		for (let i = 0; i < totalPage; i++) {
			result.push(<span onClick={() => handleNumberPage(i)} style={currentPage === i ? {fontSize: '20px'} : {}}> {i + 1} </span>);
		}
		return result;
	};

	const MultideleteProblem = async (id) => {
		if (window.confirm('해당하는 문제 삭제하시겠습니까?')) {
			console.log('hi2');
			let params = {
				id,
			};
			const res = await AdminProblemAPI.deleteMultiChoiceProblem(params);
			console.log(res);
			if (res.result) {
				alert('삭제되었습니다');
				window.location.reload();
			}
		}
	};

	const blockFotter = title && resultProblems.length === 0 ? {display: 'none'} : {display: 'block'};

	const handleView = async (id) => {
		props.history.push(`/multiplechoice/view?id=`+id);
	};
	return (
		<DashboardLayout>
			<p style={{marginBottom: '20px'}}><i className="fa fa-search"></i> 객관식 문제 조회</p>
			<div style={{padding: '30px'}}>
				<div className="wrapper-search">
					<div className="wrapper-search__col">
						{/* <div className="input-wrapper">
                            <label>문제 형태</label>
                            <select name="" id="" value={problemType} onChange={(e) => setProblemType(e.target.value)}>
                                <option value="객관식 문제">객관식 문제</option>
                            </select>
                        </div> */}
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
									resultProblems.length !== 0 &&
                                    <MultiProblemDisplayTable
                                    	problems = {resultProblems}
                                    	enableEdit = {true}
                                    	MultideleteProblem={MultideleteProblem}
                                    	handleView={handleView}
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
									<button onClick={() => handleNextProblem()} disabled={(problems.length / countDisplayProblem) !== 1 ? currentPage >= ((problems.length / countDisplayProblem) - 1) : true}> {'>>'} </button>
								</div>
							</div>
						</> :
						<WrapperLoading type={'bars'} color={'black'} />
				}

			</div>
		</DashboardLayout>
	);
}


export default Multiple;

