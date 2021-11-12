import React from 'react';
import MyListLayout from '../../../../layouts/MyListLayout';
import FavoritePanel from '../../components/FavoritePanel';
import MyListContainer from '../../components/MyListContainer';
import ProgressPanel from '../../components/ProgressPanel';
import './style.scss';

function MyListPage(props) {
	return (
		<MyListLayout>
			<div className="mylist__container">
				<MyListContainer />
				<FavoritePanel />
				<ProgressPanel />
			</div>
		</MyListLayout>
	);
}

export default MyListPage;

