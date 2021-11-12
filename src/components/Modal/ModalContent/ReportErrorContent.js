import React, {useState} from 'react';
import {Consumer} from '../ModalContext';
import Button from '../../DesignComponent/Button';
import Text from '../../DesignComponent/Text';
import Textarea from '../../DesignComponent/Textarea';
import Spacing from '../../DesignComponent/Spacing';
import Heading from '../../DesignComponent/Heading';
import InlineList from '../../DesignComponent/InlineList';

import testsAPI from '../../../apis/tests';

export default function ReportErrorContent({user_id, test_id}) {
	const [text, setText] = useState('');

	const OnTextChange = (name, value) => {
		setText(value);
	};
	// const TestButton = async () => {
	//     try{
	//       console.log(user_id + " : "+test_id );
	//     } catch (error) {
	//         alert("서버 오류입니다. 잠시 후 다시 시도해주세요.");
	//         console.log(error)
	//     }

	// }

	const ErrorReportButton = async ()=> {
		try {
			const params = {
				user_id: user_id,
				test_id: test_id,
				content: text,
			};
			const response = await testsAPI.reportError(params);
			//   console.log(response);
		} catch (error) {
			alert('서버 오류입니다. 잠시 후 다시 시도해주세요.');
			console.log(error);
		}
	};

	return (
		<Consumer>
			{({closeModal})=> (
				<div>
					<InlineList>
						<Heading level={3}>오류 보고</Heading>
					</InlineList>
					<Spacing vertical={2}>
						<Spacing left={2} bottom={3}>
							<Text light>
                            관리자에게 오류 보고를 하시겠습니까?
							</Text>
						</Spacing>

						<InlineList align='center' distribution>
							<Textarea onChange={OnTextChange} light/>
						</InlineList>

					</Spacing>
					<InlineList align='right'>
						{/* <Button distance test onPress={()=>{
                            TestButton();
                            closeModal();
                        }}>테스트</Button> */}
						<Button distance test onPress={()=>{
							ErrorReportButton();
							closeModal();
						}}>보고</Button>
						<Button cancel onPress={closeModal}>취소</Button>
					</InlineList>
				</div>
			)}
		</Consumer>

	);
}
