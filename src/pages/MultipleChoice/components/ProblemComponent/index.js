import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './style.scss';

function ProblemComponent({problem}) {
	const [choise, setChoise] = useState(false);
	return (
		<div className="multichoice-problem">
			<div className="multichoice-problem__content">
				<p style={{fontWeight: 'bold'}}>{problem.id}. {problem.name}</p>
				<pre className="prettyprint"
					dangerouslySetInnerHTML={{
						__html: problem.content,
					}}></pre>
				{/* <p>{problem.content}</p> */}
			</div>
			<div className="multichoice-problem__answer">
				<ul>
					{
						problem.answers.map((item, idx) => (
							<li className={choise === idx ? 'selected' : ''} onClick={() => setChoise(idx)}>{idx} : {item.answer_content} </li>
						))
					}
				</ul>
			</div>
		</div>
	);
}

ProblemComponent.propTypes = {

};

export default ProblemComponent;

