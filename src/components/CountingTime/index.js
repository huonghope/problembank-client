import React, {useEffect, useState} from 'react'
import moment from 'moment';
import PropTypes from 'prop-types'

function CountingTime({alertEndTime}) {
	const [dt, setDt] = useState(moment().format('YYYY-MM-DD h:mm:ss a'));
	
	useEffect(() => {
		let secTimer = setInterval( () => {
			let time = moment().format('YYYY-MM-DD h:mm:ss a');
			alertEndTime(time)
			setDt(time)
		},1000)
		
		return () => clearInterval(secTimer);
	}, []);
	
	return (
		<>{dt}</>
		)
}

export default CountingTime

