import React, {Component} from 'react';
import './style.scss';
import {FaEdit} from 'react-icons/fa';
import {Link} from 'react-router-dom';
import problemsBank from '../../../../apis/problemsBank';
import Tutorial from '../../components/Tutorial';
import Loading from 'react-loading';
import Images from '../../../../constansts/Images';
import ListCategoryLayout from '../../../../layouts/ListCategoryLayout';
import WrapperLoading from '../../../../components/WrapperLoading';

export default class ListCategory extends Component {
	constructor(props) {
		super(props);
		this.state={
			tutorials: [],
			loading: true,
		};
	}
	async componentDidMount() {
		try {
			const response = await problemsBank.getCategory();
			let {data} = response;
			const images = [{
				name: '기초 프로그래밍',
				path: 'c',
			}, {
				name: '심화 프로그래밍',
				path: 'cplus',
			}, {
				name: '객체 지향 프로그래밍',
				path: 'java',
			}, {
				name: '자료구조',
				path: 'str',
			}, {
				name: '알고리즘',
				path: 'al',
			}];
			data.forEach((item, index) => item.img = Images[images[index].path]);

			this.setState({
				tutorials: data,
				loading: false,
			});
		} catch (error) {
			console.log(error);
			alert('계속 사용하려면 다시 로그인 하십시오');
		}
	}
	render() {
		const {tutorials, loading} = this.state;
		return (
			<ListCategoryLayout>
				<section className="TUTORIALLIST">
					<h3>
						<i className="fa fa-th-large" aria-hidden="true"></i> 모든 카테고리
					</h3>
					<div className="wrapper__categories">
						{
							tutorials.length !== 0 &&
                            tutorials.map((tutorial) => {
                            	return <Tutorial key={tutorial.id} tutorial={tutorial} />;
                            })
						}
					</div>
				</section>
			</ListCategoryLayout>
		);
	}
}

