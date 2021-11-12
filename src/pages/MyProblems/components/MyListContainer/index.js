import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import styled from 'styled-components';

function MyListContainer(props) {
	return (
		<Wrapper className="all__lists">
			<div className="container">
				<div className="all__lists--header">
					<h3>마이 리스트</h3>
					{/* <button><i className="fa fa-fw fa-plus-circle"></i></button> */}
				</div>
				<div className="all__list--listgroup">
					<ul>
						<li><NavLink to ="/">Favorite Problem List</NavLink></li>
						{/* <li><NavLink to="/mypage/mytest" className="navLink">시험 결과 조회</NavLink></li>
                        <li><NavLink to="/mypage/mytest/manage" className="navLink">시험 수정</NavLink></li>
                        <li><NavLink to="/mypage/mytest/create" className="navLink">시험 생성</NavLink></li> */}
					</ul>
					{/* props.user.userData.roleId == 1 ||  // manager
          				props.user.userData.roleId == 2 ||        // coursecreator
          				props.user.userData.roleId == 3 ||        // professor
		  				props.user.userData.roleId == 10          // ta ? (
							<li>
								<NavLink to="/mypage/mytest/manage" className="navLink">시험 조회 및 수정</NavLink>
                                <NavLink to="/mypage/mytest/create" className="navLink">시험 생성</NavLink>
                            </li>
						) : (
							<li>
								<NavLink to="/mypage/mytest/apply" className="navLink">신청 시험 조회</NavLink>
							</li>
                        )*/}
				</div>
			</div>
		</Wrapper>
	);
}
const Wrapper = styled.div`
    flex: 0 0 240px;
    .container{
        box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 1px;
        border-radius: 4px;
        border: 1px solid #ddd;
        .all__lists--header{
            background: #F5F5F5;
            display: flex;
            padding: 10px 20px;
            justify-content: space-evenly;
            button{
                border: none;
                float: right;
            }
        }
        .all__list--listgroup{
            background: #fff;
            padding: 10px 20px;
        }
    }
`;
export default MyListContainer;

