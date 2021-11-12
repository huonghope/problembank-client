import React, {useEffect} from 'react';
import {useState} from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Loading from '../components/Loading/Loading';
import FooterMainPage from '../pages/MainPage/components/FooterMainPage';

function MainPageLayout(props) {
	const {children} = props;
	return (
		<div className="row">
			<Header/>
			<div className="body-container">
				{ children }
			</div>
			<FooterMainPage />
		</div>
	);
}


export default MainPageLayout;

