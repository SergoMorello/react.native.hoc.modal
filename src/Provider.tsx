import {
	createContext,
	useImperativeHandle,
	useRef,
	createRef
} from "react";
import {
	TModals,
	TProvider,
	TContainerContext,
	TStaticControl,
	TPushControll
} from "./types";

const staticAction = createRef<TStaticControl>();

const ProviderContext = createContext<TContainerContext>({
	push: () => {},
	count: () => 0,
	modals: null
});

const Provider = ({children, SPA = false}: TProvider) => {
	const modals = useRef<TModals>({});

	const modalsRef = useRef<HTMLDivElement>(null);

	const push = (name: string, control: TPushControll) => {
		modals.current[name] = control;
	};

	const show = (name: string) => {
		if (name in modals.current) {
			modals.current[name].show();
		}
	};
	
	const hide = (name?: string) => {
		if (name && name in modals.current) {
			modals.current[name].hide();
		}else{
			Object.keys(modals.current).forEach(hide);
		}
	};

	const count = (): number => {
		return Object.values(modals.current).filter((modal) => modal.showStatus.current === true).length;
	};


	useImperativeHandle(staticAction, () => ({
		show,
		hide
	}));
	
	return(<ProviderContext.Provider value={{
		push,
		modals: modalsRef,
		count
	}}>
		{children}
	</ProviderContext.Provider>)
};

export {
	Provider,
	ProviderContext,
	staticAction
};