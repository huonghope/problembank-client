import React, {useState} from 'react';
import './style.scss';
import PropTypes from 'prop-types';

function Search({problems, setResultProblem}) {
	const [diffculty, setDiffculty] = useState(false);
	const [keyword, setKeyword] = useState('');

	const handleChange = (e) => {
		console.log(problems);
		let searchValue = e.target.value;
		const filterProblems = problems.filter((element) => element.id === Number(searchValue) || element.name.match(new RegExp(searchValue, 'i')));
		setKeyword(searchValue);
		setResultProblem(filterProblems);
	};
	const setDisplayListProblem = (e) => {
		const temproblems = [...problems];
		// if (e === "ALL") {
		//     setResultProblem(temproblems)
		//     // setCountDisplayProblem(15);
		//     return;
		// }
		const filterProblems = temproblems.filter((element) => element.level === e);
		const filterOtherProblems = temproblems.filter((element) => element.level !== e);
		const totalProblems = filterProblems.concat(filterOtherProblems);

		setResultProblem(totalProblems);
	};
	// <button className="btn-search" onClick={() => handleSearchBtn()}>조회</button>

	const blockSearch = keyword ? {display: 'block'} : {display: 'none'};
	return (
		<div className="wrapper__search">
			<div className="wrapper__search-key">
				<input type="text" value={keyword} className="wrapper__search--text" onChange={handleChange} placeholder="이름, 번호를 입력하여 검색하세요." />
				<p style={blockSearch}>{keyword}
                &nbsp;<span style={{cursor: 'pointer'}} onClick={() => setKeyword('')}>x</span>
				</p>
			</div>
			<div className="wrapper__search--filter">

				<div className="filter-title diffculty__container" onClick={() => setDiffculty(!diffculty)}>
                    난이도
					<i className="fa fa-caret-down"></i>
					{
						diffculty ?
							<div className="diffculty__container--select">
								<p onClick={() => setDisplayListProblem('하')}>하</p>
								<p onClick={() => setDisplayListProblem('중')}>중</p>
								<p onClick={() => setDisplayListProblem('상')}>상</p>
								<p onClick={() => setDisplayListProblem("ALL")}>Reset</p>
							</div> :
							''
					}
				</div>

				{/* <div className="filter-title" onClick={() => alert("현재 개발 중인 기능입니다.")}>
                Status
                <i class="fa fa-caret-down"></i>
            </div>
            <div className="filter-title" onClick={() => alert("현재 개발 중인 기능입니다.")}>
                List
                <i class="fa fa-caret-down"></i>
            </div> */}
				{/* <div className="filter-title" onClick={() => alert("현재 개발 중인 기능입니다.")}>
                Tag
                <i class="fa fa-caret-down"></i>
            </div> */}
			</div>
		</div>
	);
}
export default Search;

