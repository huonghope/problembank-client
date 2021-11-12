import React from 'react';
import {Consumer} from '../ModalContext';
import Button from '../../DesignComponent/Button';
import Text from '../../DesignComponent/Text';
import Spacing from '../../DesignComponent/Spacing';
import Heading from '../../DesignComponent/Heading';

export default function DeleteModalContent({id, name}) {
	return (
		<Consumer>
			{({closeModal})=> (
				<div>
					<Spacing top={5}/>
					<div>
						<Heading level={1}>Test Modal</Heading>
						<Spacing vertical={2}/>
						<Text large>{name}: delete content</Text>
					</div>
					<Spacing vertical={5}/>
					<Button primary>button</Button>
					<Button secondary>yes</Button>
					<Button onPress={closeModal}>no</Button>
				</div>
			)}
		</Consumer>

	);
}
