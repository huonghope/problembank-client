import React from 'react';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import './style.scss';
let moment = require('moment');

function MultiProblemDisplayTable(props) {
	const {problems, enableEdit, problemType, MultideleteProblem} = props;
	return (
		<table className="table table-contribution">
			<thead>
				<tr>
					<th width = "5%">번호</th>
					<th width = "40%">제목</th>
					<th width = "10%">난이도</th>
					<th width = "10%">작성일</th>
					<th width = "15%">카테고리</th>
					<th width = "8%">작업</th>
				</tr>
			</thead>
			<tbody>
				{
					problems.map((item, index) => {
						return (
							<tr key = {index} >
								<th>{item.id}</th>
								<td onClick={() => props.history.push(`/multiplechoice/view?id=${item.id}`)}>{item.name}</td>
								<th>{item.level}</th>
								<th>{moment(item.created).format('YYYY-MM-DD')}</th>
								{
									problemType !== '객관식문제' &&
                                    <td>{item.tagInfo.parent_name} - {item.tagInfo.name}</td>
								}
								{ enableEdit &&
                                    <th style={{display: 'flex', justifyContent: 'space-between', padding: '10px'}}>
                                    	<Link to={`/admin/editmulti?id=${item.id}`}><i className="fa fa-pencil-square-o"></i> 수정</Link>
                                    	<button style= {{cursor: 'pointer'}} onClick={() => {MultideleteProblem(item.id);}}><i className="fa fa-trash-o"></i> 삭제</button>
                                    </th>
								}
							</tr>
						);
					})
				}
			</tbody>
		</table>
	);
}

export default withRouter(MultiProblemDisplayTable);
// far fa-trash-alt
