import {
	useContext,
	useLayoutEffect,
	useState
} from "react";
import { WhithModalContext } from "./withModal";
import { TConfigComponent } from "./types";

const Config = ({children, ...props}: TConfigComponent) => {
	const withModalContext = useContext(WhithModalContext);
	const [active, setActive] = useState(false);
	
	useLayoutEffect(() => {
		withModalContext.setConfig({
			...props
			
		});
	},[props.title, props.disableClose]);

	useLayoutEffect(() => {
		requestAnimationFrame(() => setActive(true));
	},[]);
	
	if ((!withModalContext.footerRef || !withModalContext.footerRef!.current) && !active) {
		return(null);
	}
	return(<>{typeof children === 'function' ? children(withModalContext) : children}</>);
};

export {Config};