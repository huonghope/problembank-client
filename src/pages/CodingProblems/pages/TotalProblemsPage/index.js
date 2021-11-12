import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import {getProblemData} from '../../../../_actions/problemAction';
import {useDispatch, useSelector} from 'react-redux';
import {FaBorderNone, FaEdit} from 'react-icons/fa';
import {Link} from 'react-router-dom';
import ProblemDisplayTable from '../../components/ProblemDisplayTable';
import Loading from '../../../../components/Loading/Loading';
import WrapperLoading from '../../../../components/WrapperLoading';
import TotalProblemsLayout from '../../../../layouts/TotalProblemsLayout';
import Select from 'react-select';
import Search from '../../../../components/Search';

function TotalProblemsPage(props) {
	const [problems, setProblems] = useState([]);
	const [resultProblems, setResultProblems] = useState([]);
	const [countDisplayProblem, setCountDisplayProblem] = useState(15);
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);

	React.useEffect(() => {
		dispatch(getProblemData()).then((response) => {
			const {data} = response.payload;
			setProblems(data);
			const sliceProblems = data.slice(0, Number(countDisplayProblem));
			setResultProblems(sliceProblems);
			setLoading(false);
		});
	}, []);

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

	const blockFotter = resultProblems.length === 0 ? {display: 'none'} : {display: 'block'};

	const handleSetResultProblem = (data) => {
		setLoading(true);
		const sliceProblems = data.slice(0, Number(countDisplayProblem));
		setResultProblems(sliceProblems);
		setTimeout(function() {
			setLoading(false);
		}, 500);
	};
	const handlePrevProblem = () => {
		let prevPage = currentPage - 1;
		const sliceProblems = problems.slice(prevPage * countDisplayProblem, currentPage * countDisplayProblem);
		setCurrentPage(prevPage);
		setResultProblems(sliceProblems);
	};
	const handleNextProblem = () => {
		let nextPage = currentPage + 1;
		const sliceProblems = problems.slice(nextPage * countDisplayProblem, (nextPage * countDisplayProblem) + countDisplayProblem);
		setCurrentPage(nextPage);
		setResultProblems(sliceProblems);
	};
	let idx;
	const handleNumberPage = (idx) => {
		console.log((idx * countDisplayProblem) + countDisplayProblem);
		const sliceProblems = problems.slice(idx * countDisplayProblem, (idx * countDisplayProblem) + countDisplayProblem);
		setResultProblems(sliceProblems);
		setCurrentPage(idx);
	};
	const [currentPage, setCurrentPage] = useState(0);

	const calCountPage = () => {
		let totalPage = problems.length / countDisplayProblem;
		let result = new Array();
		for (let i = 0; i < totalPage; i++) {
			result.push(<span onClick={() => handleNumberPage(i)} style={currentPage === i ? {fontSize: '20px'} : {}}> {i + 1} </span>);
		}
		return result;
	};

	return (
		<TotalProblemsLayout>
			<div className="totalproblems__page">
				<div className="container">
					<Search
						problems={problems}
						setResultProblem={(data) => handleSetResultProblem(data)
						}
					/>
					<div className="wrapper__problems">
						{
							loading ?
								<WrapperLoading type={'bars'} color={'black'} /> :
								resultProblems.length !== 0 &&
                                <ProblemDisplayTable
                                	problems={resultProblems}
                                />
						}
						{
							!loading &&
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
						}
					</div>
				</div>
			</div>
		</TotalProblemsLayout>
	);
}

export default TotalProblemsPage;

