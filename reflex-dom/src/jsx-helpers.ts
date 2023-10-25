import { compute, IState } from "./states";
import type { ReflexIntrinsicElements } from "./jsx-types";
import type { VNode } from "./common";

export type IForProps<GItem = any, GAs extends keyof ReflexIntrinsicElements = keyof ReflexIntrinsicElements> = {
	each: IState<GItem[]> | GItem[];
	children?: (item: GItem) => VNode;
	as?: GAs;
} & ReflexIntrinsicElements[GAs];

export function For ( props:IForProps ) {
	const _eachState = compute( () => (
		Array.isArray(props.each) ? props.each : (props.each as IState).value
	))
	return () => {
		const children = _eachState.value.map( props.children[0] )
		return {
			type: 6,
			value: props.as ?? "div",
			props: {
				children: [
					{
						type: 8,
						props: { children }
					}
				]
			}
		}
	}
}

export function Fragment ( props ) {
	return props.children
}