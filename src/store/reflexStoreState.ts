import { IStore } from "./store";
import { state } from "../reflex";
import { IStateObservable } from "@zouloux/signal";


export function storeState <GType extends object> ( store:IStore<GType> ) : IStateObservable<GType>
{
	const bit = state<GType>( store.getState() )
	store.onAfter.add( () => bit.set( store.getState() ) )
	// TODO : When component is removed, remove onAfter listener
	return bit;
}
