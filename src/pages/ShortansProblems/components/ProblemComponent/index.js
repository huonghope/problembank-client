import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './style.scss';


function ProblemComponent({problem}) {
	const [choise, setChoise] = useState(false);

	// const codeFromServer = `<code>
	// function add(n1,n2){
	// console.log(x + y);
	// }

	// const x = 8;
	// const y = 10;

	// add(x,y);
	// </code>
	// `;

	return (
		<div className="shortans-problem">
			<div className="shortans-problem__content">
				<p style={{fontWeight: 'bold'}}>{problem.id}. {problem.name}</p>
			</div>
			<pre className="prettyprint"
				dangerouslySetInnerHTML={{
					__html: problem.content,
				}}></pre>
			{/* <div className="shortans-problem__answer">
                <ul>
                    {
                        problem.answers.map((item, idx) => (
                            <li className={choise === idx ? "selected" : ""} onClick={() => setChoise(idx)}>{idx} : {item.answer_content} </li>
                        ))
                    }
                </ul>
            </div> */}
		</div>
	);
}

ProblemComponent.propTypes = {

};

export default ProblemComponent;

