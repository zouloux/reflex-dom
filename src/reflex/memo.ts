import { RenderFunction } from "./common";
import { _getBrowsablePropsFromProxy, shallowPropsCompare } from "./props";


type MemoCheckHandler <GProps extends object = object> = (newProps:GProps, oldProps:GProps) => boolean

// TODO : Allow memo on factory components

export function Memo
	<GProps extends object = object>
	(
		componentFunction:RenderFunction<GProps>,
		compareShouldUpdateHandler?:MemoCheckHandler<GProps>
	)
	:RenderFunction<GProps>
{
	let oldProps:GProps = {} as GProps
	let previousRender;


	function _MemoizedComponent ( newProps:GProps ) {
		newProps = _getBrowsablePropsFromProxy( newProps )
		const shouldUpdate = (
			compareShouldUpdateHandler
			? compareShouldUpdateHandler( newProps, oldProps )
			: !shallowPropsCompare( newProps, oldProps )
		)
		// console.log('Memo', 'shouldUpdate', shouldUpdate, newProps, oldProps)
		if ( shouldUpdate || !previousRender )
			previousRender = componentFunction( newProps )
		oldProps = newProps
		return previousRender
	}

	// FIXME : Useful ?
	_MemoizedComponent['name'] = componentFunction.name
	// @ts-ignore
	_MemoizedComponent.isFunctional = true;

	return _MemoizedComponent
}
