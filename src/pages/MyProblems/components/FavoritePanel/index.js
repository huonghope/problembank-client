import React, {useEffect, useState} from 'react';
import {Link, NavLink} from 'react-router-dom';
import styled from 'styled-components';
import problemsBank from '../../../../apis/problemsBank';

function FavoritePanel() {
	const [listProblem, setListProblem] = useState([]);

	useEffect(() => {
		try {
			const fetchData = async () => {
				const res = await problemsBank.getProblemFromMyList();
				const problems = res.data;
				setListProblem(problems);
			};
			fetchData();
		} catch (error) {
			console.log('서버 연결 실패합니다. 다시 시도해주세요.');
		}
	}, []);

	const handleDeleteMyProblem = async (id) => {
		if (window.confirm('문제를 삭제 하시겠습니까?'))
		{
			let params = {id};
			const res = await problemsBank.deleteMyProblem(params);
			const listProblemTemp = listProblem.filter((problem) => problem.id !== id);
			setListProblem(listProblemTemp);
		}
	};
	return (
		<Wrapper>
			<div className="favorite__pabel">
				<div className="favorite__header">
                Favorite Problem List
				</div>
				<div className="list__problem">
					{
						listProblem.length !== 0 &&
                            listProblem.map((item, idx) =>{
                            	let {problem_type} = item;
                            	let categoryName;
                            	let url;
                            	if (problem_type === 1) {
                            		categoryName = '프로그래밍 문제';
                            		url = 'problem';
                            	}
                            	else if (problem_type === 2) {
                            		categoryName = '객관식 문제';
                            		url = 'multiplechoice';
                            	} else {
                            		categoryName = '단답형 문제';
                            		url = 'shortans';
                            	}
                            	return (
                            		<ColComponent>
                            			<p>{idx + 1}. {categoryName}</p>
                            			<Link to={`${url}/view?id=${item.id}`} key={idx}>
                            				{item.id}. {item.name}
                            			</Link>
                            			<span onClick={() => handleDeleteMyProblem(item.id)} className="del-problem"><i className="fa fa-trash-o"></i></span>
                            		</ColComponent>
                            	);
                            },
                            )
					}
				</div>
			</div>
		</Wrapper>
	);
}
const Wrapper = styled.div`
    flex: 1;
    margin-left: 10px;
    .favorite__pabel{
        border: 1px solid #ddd;
        border-radius: 4px;
        .favorite__header{
            box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 1px;
            padding: 10px 20px;
            background: #F5F5F5;
        }
        .list__problem{
            padding: 5px 10px;
            display: flex;
            flex-direction: column;
            row-gap: 5px;
        }
    }
`;
const ColComponent = styled.div`
    margin-bottom: 10px;
    p{
        font-weight: bold
    }
    span{
        cursor: pointer;
        opacity: 0;
        margin-left: 10px;
        border: 1px solid black;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        display: inline-block;
        text-align: center;
    }
    :hover{
        .del-problem{
            opacity: 1
        }
    }
`;
export default FavoritePanel;
