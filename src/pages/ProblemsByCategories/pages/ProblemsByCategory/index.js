import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './style.scss';
import qs from 'query-string';
import ListProblem from '../ListProblem';
import ListTag from './ListTag';
import Loading from 'react-loading';
import problemsBank from '../../../../apis/problemsBank';
import ListProjectByCategoryLayout from '../../../../layouts/ListProjectByCategoryLayout';
import {connect} from 'react-redux';
import {getMultiChoiceProblems, getShortProblems} from '../../../../admin/_actions/problemAction';
import {bindActionCreators} from 'redux';
import WrapperLoading from '../../../../components/WrapperLoading';

class ProblemsByCategory extends Component {
	constructor(props) {
		super(props);
		this.state ={
			detailstutorial: [],
			fullProblems: [],
			problems: [],
			loading: true,
			category: null,

			problemType: '코딩 문제',
		};
	}

	async componentDidMount() {
		try {
			const {id} = qs.parse(this.props.location.search);

			const params = {
				id: id,
			};
			const response = await problemsBank.getProblemsBankByCategoryID(params);
			const {data, category} = response;
			const firstProblems = data[0].problems;

			let fullProblems = [];
			data.map((categoryInfo) => {
				const {problems} = categoryInfo;
				fullProblems.push(problems);
			});
			fullProblems = [].concat(...fullProblems);
			this.setState(() => {
				return {
					fullProblems: fullProblems,
					detailstutorial: data,
					loading: false,
					problems: firstProblems,
					category: category,
				};
			});
		} catch (error) {
			console.log(error);
		}
	}
    getProblemsByTagId = (childTagId) => {
    	let {detailstutorial} = this.state;
    	for (let i = 0; i < detailstutorial.length; i++)
    	{
    		const {id} = detailstutorial[i];
    		if (id === childTagId)
    		{
    			const {problems} = detailstutorial[i];
    			if (problems) {
    				return problems;
    			}
    			return null;
    		}
    	}
    }
    handleClickTag = (id) => {
    	const problems = this.getProblemsByTagId(id);
    	this.setState({
    		problems: problems,
    	});
    }
    handleAllProblem = async () => {
    	let fullProblems = this.state.fullProblems;
    	this.setState({
    		problems: fullProblems,
    	});
    }
    handleChangeProblemType = async (e) => {
    	const {multiChoiceProblems, shortProblems} = this.props.problemAdmin;
    	const {id} = qs.parse(this.props.location.search);

    	const params = {
    		id: id,
    	};
    	let detailstutorialTemp = this.state.detailstutorial;
    	let resultProblems;

    	this.setState({loading: true});
    	let type = e.target.value;
    	if (type === '객관식 문제') {
    		if (multiChoiceProblems) {
    			const {data} = multiChoiceProblems;
    			resultProblems = data;
    		} else {
    			await this.props.dispatch(getMultiChoiceProblems()).then((response) => {
    				const {data} = response.payload;
    				resultProblems = data;
    			});
    		}
    	} else if (type === '단답형 문제')
    	{
    		if (shortProblems) {
    			const {data} = multiChoiceProblems;
    			resultProblems = data;
    		} else {
    			await this.props.dispatch(getShortProblems()).then((response) => {
    				const {data} = response.payload;
    				resultProblems = data;
    			});
    		}
    	} else {
    		const response = await problemsBank.getProblemsBankByCategoryID(params);
    		const {data} = response;

    		let fullProblems = [];
    		data.map((categoryInfo) => {
    			const {problems} = categoryInfo;
    			fullProblems.push(problems);
    		});

    		const firstProblems = data[0].problems;

    		this.setState({
    			fullProblems: fullProblems,
    			problems: firstProblems,
    			loading: false,
    			problemType: type,
    		});
    		return;
    	}

    	detailstutorialTemp.map((category) => {
    		let temp = category;
    		let problems = resultProblems.filter((problem) => problem.tagInfo && problem.tagInfo.id === category.id);
    		temp.problems = problems;
    		return temp;
    	});

    	let fullProblems = [];
    	detailstutorialTemp.map((categoryInfo) => {
    		const {problems} = categoryInfo;
    		fullProblems.push(problems);
    	});
    	fullProblems = [].concat(...fullProblems);

    	const firstProblems = detailstutorialTemp[0].problems;

    	this.setState({
    		fullProblems: fullProblems,
    		detailstutorial: detailstutorialTemp,
    		problems: firstProblems,
    		loading: false,
    		problemType: type,
    	});
    }
    render() {
    	const {detailstutorial, problems, loading, category, problemType, fullProblems} = this.state;
    	const {id} = qs.parse(this.props.location.search);
    	return (
    		<ListProjectByCategoryLayout>
    			<div className="problems__by--category">
    				<>
    					<div className="list__child--category">
    						{
    							category &&
                                <>
                                	<select value={problemType} onChange={this.handleChangeProblemType} name="problem-type" id=""
                                		style={{width: '100%', height: '50px', borderColor: '#ccc', cursor: 'pointer', outline: 'none', textAlignLast: 'center'}}>
                                		<option value="프로그래밍 문제">프로그래밍 문제</option>
                                		<option value="객관식 문제">객관식 문제</option>
                                		<option value="단답형 문제">단답형 문제</option>
                                	</select>
                                	<p style={{cursor: 'pointer'}} onClick={() => this.handleAllProblem()}>{category.name}</p>
                                	<ListTag listtags = {detailstutorial} loading = {loading} tutorialId = {id} handleClickTag = {this.handleClickTag} />
                                </>
    						}
    					</div>
    					{
    						loading ? <WrapperLoading type={'bars'} color={'black'} /> :
    							<div className="list__problems">
    								<ListProblem {...this.props} problemType ={problemType} problems = {problems} handleClickTag = {this.handleClickTag}/>
    							</div>
    					}
    				</>
    			</div>
    		</ListProjectByCategoryLayout>
    	);
    }
}
const mapStateToProps = (state) => ({
	problemAdmin: state.problemAdmin,
});

function mapDispatchToProps(dispatch) {
	let actions = bindActionCreators({ProblemsByCategory});
	return {...actions, dispatch};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ProblemsByCategory);

