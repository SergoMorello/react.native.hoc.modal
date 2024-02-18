<h1>React.hoc.modal</h1>

##	React component for easy create modals

## install
```
npm i react-native-hoc-modal
```

### Examples

#### Create modal component
```js
// MyFirstModal.jsx
...
import Modal from 'react-hoc-modal';

const MyFirstModal = () => {

	return(<View>
		<Text>Hello, i am you first modal component</Text>
	</View>);
};

export default Modal.withModal(MyFirstModal);
```

#### Mount modal component
```js
// App.jsx
...
import MyFirstModal from "./MyFirstModal";
...
const App = () => {
	...
	return(
		...
		<MyFirstModal/>
	);
}
```

#### Use modal component
```js
<Button onPress={MyFirstModal.show} title="Show my first modal"/>
```

#### If you need update data without 'props', you can use the 'setState' method.
```js
MyFirstModal.setState({testData: 'Hello'});
```

#### To get data use the 'state' property in the returned 'useModal' hook object.
```js
const MyFirstModal = () => {
	const {state} = Modal.useModal();

	return(<View>
		<Text>{state?.testData}</Text>
	</View>);
};
```