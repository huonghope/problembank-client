import React from 'react';
import './style.scss';
import Footer from '../../components/FooterMainPage';
import MainPageLayout from '../../../../layouts/MainPageLayout';

function MainPage(props) {
	return (
		<MainPageLayout>
			<div className="slide__container">
				<div className="wrapper__image">
					<img src="https://ucarecdn.com/bc4908de-f56e-483e-a49f-41577b5b04a9/-/crop/653x653/326,0/-/preview/"
						alt="algoritm-image-page"
					/>
				</div>
				<div className="modal">
					<div>
						<h2>문제 은행</h2>
						<p>온라인으로 프로그래밍 문제를 풀고 자동채점 받을 수 있는 웹사이트입니다.</p>
					</div>
				</div>
			</div>
		</MainPageLayout>
	);
}
export default MainPage;

