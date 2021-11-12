import React, {useEffect} from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Loading from '../components/Loading/Loading';

function MultipleChoiceLayout(props) {
	const {children} = props;
	return (
		<div className="row">
			<Header/>
			<div className="body-container">
				{ children }
			</div>
		</div>
	);
}


export default MultipleChoiceLayout;

