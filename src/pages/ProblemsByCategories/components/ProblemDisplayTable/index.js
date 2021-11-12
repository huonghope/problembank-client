import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import './style.scss';
let moment = require('moment');

function ProblemDisplayTable(props) {
	const {problems, problemType, fullProblems, currentPage, countDisplayProblem} = props;
	let url = problemType === '코딩 문제' ? 'codeproblems' : problemType === '객관식 문제' ? 'multiplechoice' : 'shortans';
	let indexProblem = currentPage * countDisplayProblem + 1;
	return (
		<table className="table table-contribution">
			<thead>
				<tr>
					<th width = "5%">번호</th>
					<th width = "55%">제목</th>
					<th width = "10%">난이도</th>
					<th width = "10%">작성일</th>
					<th width = "20%">카테고리</th>
				</tr>
			</thead>
			<tbody>
				{
					problems.map((item, idx) => {
						return (
							<tr key = {idx} onClick={() => props.history.push(`/${url}/view?id=${item.id}`)}>
								<th>{indexProblem++}</th>
								<td>{item.name}</td>
								<th>{item.level}</th>
								<th>{moment(item.created).format('YYYY-MM-DD')}</th>
								<th>{item.category_name ? item.category_name : item.tagInfo.name}</th>
							</tr>
						);
					})
				}
			</tbody>
		</table>
	);
}
export default withRouter(ProblemDisplayTable);


