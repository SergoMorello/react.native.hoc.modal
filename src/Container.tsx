import {
	useContext,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
	forwardRef,
	useImperativeHandle
} from "react";
import { Modal, Pressable, View } from "react-native";
import {
	ProviderContext
} from "./Provider";
import type {
	TProps,
	TModal,
	TPropsRender
} from "./types";

const Container = forwardRef<TModal, TProps>((props, ref) => {
	const {
		children,
		style,
		name,
		title,
		transparent = true,
		disableClose = false,
		backgroundClose = true,
		hideCloseButton = false,
		statusBarTranslucent = true,
		theme = 'light',
		effect = 'fade',
		render,
		onHide
	} = props;
	
	const showStatus = useRef(false);
	const [isShow, setShow] = useState(false);
	const providerContext = useContext(ProviderContext);

	const show = () => {
		setShow(true);
	};

	const _hide = () => {
		setShow(false);
	};

	const hide = () => {
		if (disableClose) return;
		_hide();
	};
	
	const backgroundHide = () => {
		if (!backgroundClose) return;
		hide();
	};

	useEffect(() => {
		showStatus.current = isShow;

		if (!isShow) {
			onHide?.();
		}
		
	},[isShow]);

	useEffect(() => {
		return () => {
			showStatus.current = false;
		}
	}, []);

	useLayoutEffect(() => {
		providerContext.push(name, {
			show,
			hide: _hide,
			showStatus
		});
	},[]);

	useImperativeHandle(ref, () => ({
		show,
		hide
	}));

	const renderProps: TPropsRender = {
		...props,
		show,
		hide
	};
	
	return(
			<>
			{isShow &&
				<Modal transparent={transparent} animationType={effect} statusBarTranslucent={statusBarTranslucent}>
					{
					typeof render === 'function' ? render(renderProps) : <Pressable android_disableSound style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000090'}} onPress={backgroundHide}>
						<View style={[style, {width: '80%', backgroundColor: '#FFFFFF', padding: 10, borderRadius: 3}]}>{children}</View>
					</Pressable>
					}
				</Modal>
			}
		</>
	);
});

export {
	Container
};