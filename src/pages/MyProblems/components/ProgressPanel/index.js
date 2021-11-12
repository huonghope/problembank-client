import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {Pie, Doughnut} from 'react-chartjs-2';
import {useState} from 'react';
import problemBankAPI from '../../../../apis/problemsBank';
import {useSelector} from 'react-redux';
function ProgressPanel(props) {
	const user = useSelector((state) => state.user);
	const [statePie, setStatePie] = useState({});
	const [statePieMulti, setStateMulti] = useState({});
	const [statePieShortans, setStatePieShortans] = useState({});
	useEffect(() => {
		const fetchData = async () => {
			const res = await problemBankAPI.getStatusProblem();
			const {data} = res;
			const {problem, multichoice, shortans} = data;

			let CodingProblem = {
				labels: ['해결', '실패'],
				datasets: [
					{
						label: 'Rainfall',
						backgroundColor: [
							'#1FA67A',
							'#6800B4',
						],
						hoverBackgroundColor: [
							'#1FA000',
							'#35014F',
						],
						data: [problem.isCorrect, problem.noCorrect],
					},
				],
			};
			setStatePie(CodingProblem);
			let MultiChoiceProblem = {
				labels: ['해결', '실패'],
				datasets: [
					{
						label: 'Rainfall',
						backgroundColor: [
							'#FF6384',
							'#36A2EB',
						],
						hoverBackgroundColor: [
							'#FF6384',
							'#36A2EB',
						],
						data: [multichoice.isCorrectMul, multichoice.noCorrectMul],
					},
				],
			};
			setStateMulti(MultiChoiceProblem);
			let ShortansProblem = {
				labels: ['해결', '실패'],
				datasets: [
					{
						label: 'Rainfall',
						backgroundColor: [
							'#FFCE56',
							'#645631',
						],
						hoverBackgroundColor: [
							'#FFCE56',
							'#645974',
						],
						data: [shortans.isCorrectShortans, shortans.noCorrectShortans],
					},
				],
			};
			setStatePieShortans(ShortansProblem);
		};
		fetchData();
	}, []);
	return (
		<Wrapper>
			<div className="chart">
				<Pie
					data={statePie}
					options={{
						title: {
							display: true,
							text: '프로젝트 문제 현황',
							fontSize: 15,
						},
						legend: {
							display: true,
							position: 'left',
						},
					}}
				/>
			</div>
			<div className="chart">
				<Pie
					data={statePieMulti}
					options={{
						title: {
							display: true,
							text: '객관식 문제 현황',
							fontSize: 15,
						},
						legend: {
							display: true,
							position: 'left',
						},
					}}
				/>
			</div>
			<div className="chart">
				<Pie
					data={statePieShortans}
					options={{
						title: {
							display: true,
							text: '단답형 문제 현황',
							fontSize: 15,
						},
						legend: {
							display: true,
							position: 'left',
						},
					}}
				/>
			</div>
		</Wrapper>
	);
}

const Wrapper = styled.div`
    .chart{
        border-bottom: 5px solid #ccc;
        justify-content: space-between;
        display: flex;
        padding: 5px;
        /* border: none; */
    }
    .progress__content{
        padding: 10px 20px;
        background: #F5F5F5;
        display: flex;
        justify-content: space-between;
    }
`;
export default ProgressPanel;

