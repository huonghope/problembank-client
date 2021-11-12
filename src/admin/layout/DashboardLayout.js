import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function DashboardLayout(props) {
    // !refactory active class
    const { children } = props;
    const [activeClass, setActiveClass] = useState(false);
    const [enableClass, setEnableClass] = useState(false);
    const [examClass, setExamClass] = useState(false);

    return (
        <Wrapper className="row">
            <div className="left-body">
                <div className="left-body__title">
                    <span><i className="fa fa-align-justify"></i> 문제은행 관리</span>
                </div>
                <div className="left-body__nav">
                    <ul>
                        {/* <li onClick={() => { }}><Link to="/admin"><i className="fa fa-search" ></i> 문제 조회</Link></li> */}
                        <li onClick={() => setEnableClass(!enableClass)}><Link to="#"><i className="fa fas fa-search" ></i> 문제 조회 </Link>
                            {
                                enableClass &&
                                <ul style={{ marginLeft: '15px' }}>
                                    <li onClick={() => setEnableClass(!enableClass)}><Link to="/admin/"><i className="fa fas fa-laptop"></i> 프로그래밍 문제</Link></li>
                                    <li onClick={() => setEnableClass(!enableClass)}><Link to="/admin/multiple"><i className="fa fas fa-list-ol"></i> 객관식 문제</Link></li>
                                    <li onClick={() => setEnableClass(!enableClass)}><Link to="/admin/short"><i className="fa fa-check-square-o"></i> 단답형 문제</Link></li>
                                </ul>
                            }
                        </li>

                        <li onClick={() => setActiveClass(!activeClass)}><Link to="#"><i className="fa fa-pencil-square-o" ></i> 문제 등록 </Link>
                            {
                                activeClass &&
                                <ul style={{ marginLeft: '15px' }}>
                                    <li onClick={() => setActiveClass(!activeClass)}><Link to="/admin/createproblem"><i className="fa fas fa-laptop"></i> 프로그래밍 문제</Link></li>
                                    <li onClick={() => setActiveClass(!activeClass)}><Link to="/admin/createmultichoiceproblem"><i className="fa fas fa-list-ol"></i> 객관식 문제</Link></li>
                                    <li onClick={() => setActiveClass(!activeClass)}><Link to="/admin/createshortanswerproblem"><i className="fa fa-check-square-o"></i> 단답형 문제</Link></li>
                                </ul>
                            }
                        </li>
                    </ul>
                </div>
            </div>
            <div className="right-body">
                <div className="right-body__header">
                    <Link to="/"><i className="fa fa-bars"><span> 문제은행 페이지</span></i></Link>
                    <Link to="#"><i className="fa fa-user-circle"></i><span> Admin</span></Link>
                </div>
                <div className="right-body__content">
                    {children}
                </div>
            </div>
        </Wrapper>
    );
}
const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    min-height: 100vh;
    
    .left-body{    
        width: 10%;
        display: flex;
        flex-direction: column;
        background: #282828;
        color: white;
        height: auto;
        &__title{
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-bottom: 1px solid #ddd;
        }
        &__nav{
            height: 95%;
            height: auto;
            ul li{
                cursor: pointer;
                border-bottom: 1px solid #ddd;
                a{
                    font-size: 14px;
                    color: #ccc;
                    padding: 10px 5px;  
                    width: 100%;
                    height: 100%;
                    display: block;
                    &:hover{
                        color: white;
                    }
                }
            }
        }
    }
    .right-body{
        width: 90%;
        flex-direction: column;
        height: 100%;
        display: flex;
        &__header{
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0px 40px;
            border-bottom: 1px solid #ddd;
        }
        &__content{
            height: 95%;
            height: auto;
            padding: 10px 10px 0 10px;
        }
    }

`;
export default DashboardLayout;

