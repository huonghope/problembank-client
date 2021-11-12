import React, { useState } from 'react';
import styled from 'styled-components';
import Images from '../../constansts/Images';
import {Link, NavLink, useRouteMatch} from 'react-router-dom';
import {useSelector} from 'react-redux';

function Header(props) {
	const user = useSelector((state) => state.user);
	const currentPath = window.location.pathname;
	// const handleClickEditor = () => {
	//     const api_token = localStorage.getItem("redirect_token");
	//     window.open(`http://210.94.194.63:5110?id=${api_token}`, '_bank');
	// }
	const addStype = currentPath === '/' ? {
	} : {
		boxShadow: '0 4px 2px -2px rgba(0, 0, 0, 0.2)',
	};
	const {userData} = user;
    console.log(user)
	return (
		<Wrapper>
			<div className="container" style={addStype} >
				<div className="header__logo">
					<Link to="/"><img src={Images.logo} /></Link>
				</div>
				<nav>
					<ul className="header__links">
						<li>
                        <NavLink to="/" exact  activeClassName='active_class'> 홈페이지</NavLink>
						</li>
						<li>
							<NavLink to="/codeproblems"  activeClassName='active_class' >프로그래밍 문제</NavLink>
						</li>
						<li>
							<NavLink to="/multiplechoice"  activeClassName='active_class'>객관식 문제</NavLink>
						</li>
						<li>
							<NavLink to="/shortans"  activeClassName='active_class'>단답형 문제</NavLink>
						</li>
						<li>
							<NavLink to="/problemsbank"  activeClassName='active_class'>카테고리별 문제</NavLink>
						</li>
						<li>
							<NavLink to="/mylist"  activeClassName='active_class'>마이 페이지</NavLink>
						</li>
						{
							userData && userData.roleId === 1 &&
                            <li>
                                <a  href="/admin" activeClassName='active_class' target="_blank" >관리 페이지</a>
                            </li>
						}

					</ul>
				</nav>
			</div>
		</Wrapper>
	);
}
function Navbar(props){
    return (
        <nav className="navbar">
            <ul className="navbar-nav">{props.children}</ul>
        </nav>
    )
}

function NavItem(props){
    const [open, setOpen] = useState(false);
    return (
        <li className="nav-item">
            <NavLink to="#" onClick={() => setOpen(!open)}>{props.link}</NavLink>
            {open && props.children}
        </li>
    )
}
const Wrapper = styled.div`
    min-height: 100px;
    max-height: 10vh;
    /* max-width: 1600px; */
    max-width: 100%;
    margin: auto;
    
    
    height: 10vh;
    position: sticky;
    top: 0;
    width: 100vw;
    z-index: 10;
    background: white;
    .container{
        display: flex;
        align-items: center;
        justify-content: space-between;
        /* max-width: 1920px; */
        height: 100%;
        margin: auto;
        border-bottom: 1px solid #ddd;
        
        padding: 0px 100px;
        .header__logo{
            flex: 1;
            img{
                width: 95px;
                height: 100%; 
            }
        }
        nav{
            flex: 8;
            ul{
                display: flex;
                justify-content: space-between;
                li{
                    /* margin-left: 2rem; */
                    a{
                        color: rgba(0,0,0,0.5); 
                        font-size: 18px;
                        &:hover{
                            color: black;
                        }
                    }
                }
            }
        }

        .header__userInfo{
            flex: 1;
            display: flex;
            justify-content: flex-end;
        }


        .active_class {
            color: black;
            padding-bottom:10px;
            border-bottom: 5px solid #ddd;
        }
        @media (max-width: 1400px) {
            nav{
                ul li a{
                    font-size: 14px;
                }
            }
        }
        @media (max-width: 1180px) {
            nav{
                ul li a{
                    font-size: 12px;
                }
                min-width: 100vw;
                max-width:100%;
            }
        }
        @media (max-width: 680px) {
            nav{
                display: none;
            }
        }
    }
`;

export default Header;

