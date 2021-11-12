import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import './style.scss';
let moment = require('moment');

function ProblemDisplayTable(props) {
	const {problems} = props;
	return (
		<table className="table table-contribution">
			<thead>
				<tr>
					<th width = "5%">번호</th>
					<th width = "45%">제목</th>
					<th width = "10%">난이도</th>
					<th width = "10%">작성일</th>
					<th width = "20%">카테고리</th>
					<th width = "10%">풀이</th>
				</tr>
			</thead>
			<tbody>
				{
					problems.map((item, index) => {
						return (
							<tr key = {index} onClick={() => props.history.push(`/shortans/view?id=${item.id}`)}>
								<th>{item.id}</th>
								<td>{item.name}</td>
								<th>{item.level}</th>
								<th>{moment(item.created).format('YYYY-MM-DD')}</th>
								<td>{item.tagInfo ? `${item.tagInfo.parent_name} - ${item.tagInfo.name}` : ''}</td>
								<th style={item.submit.answer_status === 'true' ? {color: 'blue'} : {color: 'red'}}>{item.submit.length !== 0 ? item.submit.answer_status === 'true' ? '성공' : '실패' : '' }</th>
							</tr>
						);
					})
				}
			</tbody>
		</table>
	);
}
export default withRouter(ProblemDisplayTable);

