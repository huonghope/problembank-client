import React from 'react';
import {Consumer} from '../ModalContext';
import Button from '../../DesignComponent/Button';
import Text from '../../DesignComponent/Text';
import Scroll from '../../DesignComponent/Scroll';
import Spacing from '../../DesignComponent/Spacing';
import Heading from '../../DesignComponent/Heading';
import InlineList from '../../DesignComponent/InlineList';

export default function NoticeContent({title, auth, content}) {
	return (
		<Consumer>
			{({closeModal})=> (
				<div>
					<div style={{float: 'right'}}>
						<Button onPress={closeModal}>X</Button>
					</div>
					<InlineList>
						<Heading level={3}>{title}</Heading>
						<Text fade >{auth}</Text>
					</InlineList>
					<Spacing vertical={5}>
						<Scroll>
							{content}
						</Scroll>
					</Spacing>
				</div>
			)}
		</Consumer>

	);
}
