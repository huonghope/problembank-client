import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {getCategories} from '../../_actions/problemAction';
import {useDispatch} from 'react-redux';
// !확인
function DisplayCategories({categories, selectedCategory, enableSet}) {
	const dispatch = useDispatch();
	useEffect(() => {
		if (enableSet) {
			const {child, parent, grand} = categories;

			dispatch(getCategories()).then((response) => {
				const {data} = response.payload;
				setListCategory1(data);
				let childCategories2 = data.filter((elm) => Number(elm.parent_id) === 1);
				setListCategory2(childCategories2);

				setCategory1(parent.id);
				setCategory2(child.id);
				selectedCategory(child.id);
				if (grand) {
					setCategory3(grand.id);
					selectedCategory(grand.id);
				}
			});
		} else {
			setListCategory1(categories);
			let childCategories2 = categories.filter((elm) => Number(elm.parent_id) === 1);
			setListCategory2(childCategories2);
			if (categories.length !== 0 && childCategories2) {
				setCategory2(childCategories2[0].id);
				selectedCategory(childCategories2[0].id);
			}
		}
	}, [categories]);

	const [listCategory1, setListCategory1] = useState([]);
	const [category1, setCategory1] = useState();

	const [listCategory2, setListCategory2] = useState([]);
	const [category2, setCategory2] = useState();

	const [listCategory3, setListCategory3] = useState([]);
	const [category3, setCategory3] = useState();

	const handleChangeCategory1 = (e) => {
		setCategory1(e.target.value);
		let childCategories2 = listCategory1.filter((elm) => Number(elm.parent_id) === Number(e.target.value));
		let tempChildCategory3 = listCategory1.filter((elm) => Number(elm.parent_id === childCategories2[0].id));

		setListCategory2(childCategories2);
		setListCategory3(tempChildCategory3);

		// default
		setCategory2(childCategories2[0].id);
		if (tempChildCategory3.length !== 0) {
			setCategory3(tempChildCategory3[0].id);
		} else {
			setCategory3('');
		}
	};

	const handleChangeCategory2 = (e) => {
		setCategory2(e.target.value);
		let childCategories3 = listCategory1.filter((elm) => Number(elm.parent_id) === Number(e.target.value));
		setListCategory3(childCategories3);
		if (childCategories3.length !== 0) {
			setCategory3(childCategories3[0].id);
		} else {
			setCategory3('');
		}
	};
	useEffect(() => {
		if (category3) {
			selectedCategory(category3);
		} else {
			selectedCategory(category2);
		}
	}, [category1, category2, category3]);
	return (
		<div>
			<select name="category" value={category1} onChange={(e) => handleChangeCategory1(e)} >
				{
					listCategory1.length !== 0 && listCategory1.map((category) =>
						category.id <= 5 && <option value={category.id}>{category.name}</option>,
					)
				}
			</select>&nbsp;~&nbsp;
			<select name="" value={category2} onChange={(e) => handleChangeCategory2(e)} >
				{
					listCategory2.length !== 0 && listCategory2.map((category) =>
						<option value={category.id}>{category.name}</option>,
					)
				}
			</select>
			{
				listCategory3.length !== 0 &&
        <>
          &nbsp;~&nbsp;
        	<select name="" value={category3} onChange={(e) => setCategory3(e.target.value)}>
        		{
        			listCategory3.length !== 0 && listCategory3.map((category) =>
        				<option value={category.id}>{category.name}</option>,
        			)
        		}
        	</select>
        </>
			}
		</div>
	);
}

DisplayCategories.propTypes = {

};

export default DisplayCategories;

