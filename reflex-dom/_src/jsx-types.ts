/// <reference lib="dom" />

import { DefaultReflexBaseProps, VNode } from "./common";
import { IComputeState, IState } from "./states";

/**
 * JSX types are straight stolen from Preact. Thanks Preact core team ✌️
 * https://github.com/preactjs/preact/blob/master/src/jsx.d.ts
 * It has been a bit adapted for Reflex API
 * (children, classes as array, style as object only)
 *
 * TODO : Missing
 * - JSX.Element
 * - JSX.ElementClass
 * - Default const r = ref() without generics should work
 *
 * TODO : Errors
 * - Disallow a component render function to return a component as main node !
 * 			() => <OtherComponent /> <- Forbidden
 * - Disallow a component which render an array
 * 			() => [<div />, <div />] <- Forbidden
 */


// ----------------------------------------------------------------------------- CHILDREN

export type ComponentChild =
	| VNode<any>
	| string
	| number
	| null
	| undefined
	| boolean
	| object
	| bigint

export interface DefaultReflexAttributes
	<GDom extends Element = Element> extends DefaultReflexBaseProps<GDom>
{
	// Children here can be string or number
	children	?:ComponentChild|ComponentChild[]
}

// ----------------------------------------------------------------------------- EVENT TARGETS

type TargetedEvent
	<
		Target extends EventTarget = EventTarget,
		TypedEvent extends Event = Event
	>
	= TypedEvent

// type TargetedEvent
// 	<
// 		Target extends EventTarget = EventTarget,
// 		TypedEvent extends Event = Event
// 	>
// 	= Omit<TypedEvent, 'currentTarget'> & {
// 		readonly currentTarget:Target;
// 	};

type TargetedAnimationEvent<Target extends Element> = TargetedEvent<Target, AnimationEvent>;
type TargetedClipboardEvent<Target extends Element> = TargetedEvent<Target, ClipboardEvent>;
type TargetedCompositionEvent<Target extends Element> = TargetedEvent<Target, CompositionEvent>;
type TargetedDragEvent<Target extends Element> = TargetedEvent<Target, DragEvent>;
type TargetedFocusEvent<Target extends Element> = TargetedEvent<Target, FocusEvent>;
type TargetedKeyboardEvent<Target extends Element> = TargetedEvent<Target, KeyboardEvent>;
type TargetedMouseEvent<Target extends Element> = TargetedEvent<Target, MouseEvent>;
type TargetedPointerEvent<Target extends Element> = TargetedEvent<Target, PointerEvent>;
type TargetedTouchEvent<Target extends Element> = TargetedEvent<Target, TouchEvent>;
type TargetedTransitionEvent<Target extends Element> = TargetedEvent<Target, TransitionEvent>;
type TargetedUIEvent<Target extends Element> = TargetedEvent<Target, UIEvent>;
type TargetedWheelEvent<Target extends Element> = TargetedEvent<Target, WheelEvent>;

interface EventHandler<E extends TargetedEvent> {
	/**
	 * The `this` keyword always points to the DOM element the event handler
	 * was invoked on. See: https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Event_handlers#Event_handlers_parameters_this_binding_and_the_return_value
	 */
	( this:never, event:E ):void;
}

// ----------------------------------------------------------------------------- EVENT HANDLERS

type AnimationEventHandler<Target extends Element> = EventHandler<TargetedAnimationEvent<Target>>;
type ClipboardEventHandler<Target extends Element> = EventHandler<TargetedClipboardEvent<Target>>;
type CompositionEventHandler<Target extends Element> = EventHandler<TargetedCompositionEvent<Target>>;
type DragEventHandler<Target extends Element> = EventHandler<TargetedDragEvent<Target>>;
type FocusEventHandler<Target extends Element> = EventHandler<TargetedFocusEvent<Target>>;
type GenericEventHandler<Target extends Element> = EventHandler<TargetedEvent<Target>>;
type KeyboardEventHandler<Target extends Element> = EventHandler<TargetedKeyboardEvent<Target>>;
type MouseEventHandler<Target extends Element> = EventHandler<TargetedMouseEvent<Target>>;
type PointerEventHandler<Target extends Element> = EventHandler<TargetedPointerEvent<Target>>;
type TouchEventHandler<Target extends Element> = EventHandler<TargetedTouchEvent<Target>>;
type TransitionEventHandler<Target extends Element> = EventHandler<TargetedTransitionEvent<Target>>;
type UIEventHandler<Target extends Element> = EventHandler<TargetedUIEvent<Target>>;
type WheelEventHandler<Target extends Element> = EventHandler<TargetedWheelEvent<Target>>;

// ----------------------------------------------------------------------------- DOM ATTRIBUTES

export interface DOMAttributes <Target extends Element>
{
	//extends ReflexDefaultDOMAttributes {
	// Image Events
	onLoad?:GenericEventHandler<Target>;
	onLoadCapture?:GenericEventHandler<Target>;
	onError?:GenericEventHandler<Target>;
	onErrorCapture?:GenericEventHandler<Target>;

	// Clipboard Events
	onCopy?:ClipboardEventHandler<Target>;
	onCopyCapture?:ClipboardEventHandler<Target>;
	onCut?:ClipboardEventHandler<Target>;
	onCutCapture?:ClipboardEventHandler<Target>;
	onPaste?:ClipboardEventHandler<Target>;
	onPasteCapture?:ClipboardEventHandler<Target>;

	// Composition Events
	onCompositionEnd?:CompositionEventHandler<Target>;
	onCompositionEndCapture?:CompositionEventHandler<Target>;
	onCompositionStart?:CompositionEventHandler<Target>;
	onCompositionStartCapture?:CompositionEventHandler<Target>;
	onCompositionUpdate?:CompositionEventHandler<Target>;
	onCompositionUpdateCapture?:CompositionEventHandler<Target>;

	// Details Events
	onToggle?:GenericEventHandler<Target>;

	// Focus Events
	onFocus?:FocusEventHandler<Target>;
	onFocusCapture?:FocusEventHandler<Target>;
	onfocusin?:FocusEventHandler<Target>;
	onfocusinCapture?:FocusEventHandler<Target>;
	onfocusout?:FocusEventHandler<Target>;
	onfocusoutCapture?:FocusEventHandler<Target>;
	onBlur?:FocusEventHandler<Target>;
	onBlurCapture?:FocusEventHandler<Target>;

	// Form Events
	onChange?:GenericEventHandler<Target>;
	onChangeCapture?:GenericEventHandler<Target>;
	onInput?:GenericEventHandler<Target>;
	onInputCapture?:GenericEventHandler<Target>;
	onBeforeInput?:GenericEventHandler<Target>;
	onBeforeInputCapture?:GenericEventHandler<Target>;
	onSearch?:GenericEventHandler<Target>;
	onSearchCapture?:GenericEventHandler<Target>;
	onSubmit?:GenericEventHandler<Target>;
	onSubmitCapture?:GenericEventHandler<Target>;
	onInvalid?:GenericEventHandler<Target>;
	onInvalidCapture?:GenericEventHandler<Target>;
	onReset?:GenericEventHandler<Target>;
	onResetCapture?:GenericEventHandler<Target>;
	onFormData?:GenericEventHandler<Target>;
	onFormDataCapture?:GenericEventHandler<Target>;

	// Keyboard Events
	onKeyDown?:KeyboardEventHandler<Target>;
	onKeyDownCapture?:KeyboardEventHandler<Target>;
	onKeyPress?:KeyboardEventHandler<Target>;
	onKeyPressCapture?:KeyboardEventHandler<Target>;
	onKeyUp?:KeyboardEventHandler<Target>;
	onKeyUpCapture?:KeyboardEventHandler<Target>;

	// Media Events
	onAbort?:GenericEventHandler<Target>;
	onAbortCapture?:GenericEventHandler<Target>;
	onCanPlay?:GenericEventHandler<Target>;
	onCanPlayCapture?:GenericEventHandler<Target>;
	onCanPlayThrough?:GenericEventHandler<Target>;
	onCanPlayThroughCapture?:GenericEventHandler<Target>;
	onDurationChange?:GenericEventHandler<Target>;
	onDurationChangeCapture?:GenericEventHandler<Target>;
	onEmptied?:GenericEventHandler<Target>;
	onEmptiedCapture?:GenericEventHandler<Target>;
	onEncrypted?:GenericEventHandler<Target>;
	onEncryptedCapture?:GenericEventHandler<Target>;
	onEnded?:GenericEventHandler<Target>;
	onEndedCapture?:GenericEventHandler<Target>;
	onLoadedData?:GenericEventHandler<Target>;
	onLoadedDataCapture?:GenericEventHandler<Target>;
	onLoadedMetadata?:GenericEventHandler<Target>;
	onLoadedMetadataCapture?:GenericEventHandler<Target>;
	onLoadStart?:GenericEventHandler<Target>;
	onLoadStartCapture?:GenericEventHandler<Target>;
	onPause?:GenericEventHandler<Target>;
	onPauseCapture?:GenericEventHandler<Target>;
	onPlay?:GenericEventHandler<Target>;
	onPlayCapture?:GenericEventHandler<Target>;
	onPlaying?:GenericEventHandler<Target>;
	onPlayingCapture?:GenericEventHandler<Target>;
	onProgress?:GenericEventHandler<Target>;
	onProgressCapture?:GenericEventHandler<Target>;
	onRateChange?:GenericEventHandler<Target>;
	onRateChangeCapture?:GenericEventHandler<Target>;
	onSeeked?:GenericEventHandler<Target>;
	onSeekedCapture?:GenericEventHandler<Target>;
	onSeeking?:GenericEventHandler<Target>;
	onSeekingCapture?:GenericEventHandler<Target>;
	onStalled?:GenericEventHandler<Target>;
	onStalledCapture?:GenericEventHandler<Target>;
	onSuspend?:GenericEventHandler<Target>;
	onSuspendCapture?:GenericEventHandler<Target>;
	onTimeUpdate?:GenericEventHandler<Target>;
	onTimeUpdateCapture?:GenericEventHandler<Target>;
	onVolumeChange?:GenericEventHandler<Target>;
	onVolumeChangeCapture?:GenericEventHandler<Target>;
	onWaiting?:GenericEventHandler<Target>;
	onWaitingCapture?:GenericEventHandler<Target>;

	// MouseEvents
	onClick?:MouseEventHandler<Target>;
	onClickCapture?:MouseEventHandler<Target>;
	onContextMenu?:MouseEventHandler<Target>;
	onContextMenuCapture?:MouseEventHandler<Target>;
	onDblClick?:MouseEventHandler<Target>;
	onDblClickCapture?:MouseEventHandler<Target>;
	onDrag?:DragEventHandler<Target>;
	onDragCapture?:DragEventHandler<Target>;
	onDragEnd?:DragEventHandler<Target>;
	onDragEndCapture?:DragEventHandler<Target>;
	onDragEnter?:DragEventHandler<Target>;
	onDragEnterCapture?:DragEventHandler<Target>;
	onDragExit?:DragEventHandler<Target>;
	onDragExitCapture?:DragEventHandler<Target>;
	onDragLeave?:DragEventHandler<Target>;
	onDragLeaveCapture?:DragEventHandler<Target>;
	onDragOver?:DragEventHandler<Target>;
	onDragOverCapture?:DragEventHandler<Target>;
	onDragStart?:DragEventHandler<Target>;
	onDragStartCapture?:DragEventHandler<Target>;
	onDrop?:DragEventHandler<Target>;
	onDropCapture?:DragEventHandler<Target>;
	onMouseDown?:MouseEventHandler<Target>;
	onMouseDownCapture?:MouseEventHandler<Target>;
	onMouseEnter?:MouseEventHandler<Target>;
	onMouseEnterCapture?:MouseEventHandler<Target>;
	onMouseLeave?:MouseEventHandler<Target>;
	onMouseLeaveCapture?:MouseEventHandler<Target>;
	onMouseMove?:MouseEventHandler<Target>;
	onMouseMoveCapture?:MouseEventHandler<Target>;
	onMouseOut?:MouseEventHandler<Target>;
	onMouseOutCapture?:MouseEventHandler<Target>;
	onMouseOver?:MouseEventHandler<Target>;
	onMouseOverCapture?:MouseEventHandler<Target>;
	onMouseUp?:MouseEventHandler<Target>;
	onMouseUpCapture?:MouseEventHandler<Target>;

	// Selection Events
	onSelect?:GenericEventHandler<Target>;
	onSelectCapture?:GenericEventHandler<Target>;

	// Touch Events
	onTouchCancel?:TouchEventHandler<Target>;
	onTouchCancelCapture?:TouchEventHandler<Target>;
	onTouchEnd?:TouchEventHandler<Target>;
	onTouchEndCapture?:TouchEventHandler<Target>;
	onTouchMove?:TouchEventHandler<Target>;
	onTouchMoveCapture?:TouchEventHandler<Target>;
	onTouchStart?:TouchEventHandler<Target>;
	onTouchStartCapture?:TouchEventHandler<Target>;

	// Pointer Events
	onPointerOver?:PointerEventHandler<Target>;
	onPointerOverCapture?:PointerEventHandler<Target>;
	onPointerEnter?:PointerEventHandler<Target>;
	onPointerEnterCapture?:PointerEventHandler<Target>;
	onPointerDown?:PointerEventHandler<Target>;
	onPointerDownCapture?:PointerEventHandler<Target>;
	onPointerMove?:PointerEventHandler<Target>;
	onPointerMoveCapture?:PointerEventHandler<Target>;
	onPointerUp?:PointerEventHandler<Target>;
	onPointerUpCapture?:PointerEventHandler<Target>;
	onPointerCancel?:PointerEventHandler<Target>;
	onPointerCancelCapture?:PointerEventHandler<Target>;
	onPointerOut?:PointerEventHandler<Target>;
	onPointerOutCapture?:PointerEventHandler<Target>;
	onPointerLeave?:PointerEventHandler<Target>;
	onPointerLeaveCapture?:PointerEventHandler<Target>;
	onGotPointerCapture?:PointerEventHandler<Target>;
	onGotPointerCaptureCapture?:PointerEventHandler<Target>;
	onLostPointerCapture?:PointerEventHandler<Target>;
	onLostPointerCaptureCapture?:PointerEventHandler<Target>;

	// UI Events
	onScroll?:UIEventHandler<Target>;
	onScrollCapture?:UIEventHandler<Target>;

	// Wheel Events
	onWheel?:WheelEventHandler<Target>;
	onWheelCapture?:WheelEventHandler<Target>;

	// Animation Events
	onAnimationStart?:AnimationEventHandler<Target>;
	onAnimationStartCapture?:AnimationEventHandler<Target>;
	onAnimationEnd?:AnimationEventHandler<Target>;
	onAnimationEndCapture?:AnimationEventHandler<Target>;
	onAnimationIteration?:AnimationEventHandler<Target>;
	onAnimationIterationCapture?:AnimationEventHandler<Target>;

	// Transition Events
	onTransitionEnd?:TransitionEventHandler<Target>;
	onTransitionEndCapture?:TransitionEventHandler<Target>;
}

interface HTMLMarqueeElement extends HTMLElement
{
	behavior?:'scroll' | 'slide' | 'alternate';
	bgColor?:string;
	direction?:'left' | 'right' | 'up' | 'down';
	height?:number | string;
	hspace?:number | string;
	loop?:number | string;
	scrollAmount?:number | string;
	scrollDelay?:number | string;
	trueSpeed?:boolean;
	vspace?:number | string;
	width?:number | string;
}

// ----------------------------------------------------------------------------- DOM CSS

type DOMCSSProperties = {
	[key in keyof Omit<
		CSSStyleDeclaration,
		| 'item'
		| 'setProperty'
		| 'removeProperty'
		| 'getPropertyValue'
		| 'getPropertyPriority'
		>]?: string | number | null | undefined;
};
type AllCSSProperties = {
	[key: string]: string | number | null | undefined;
};
export interface CSSProperties extends AllCSSProperties, DOMCSSProperties {
	cssText?: string | null;
}

// ----------------------------------------------------------------------------- HTML ATTRIBUTES

export type ClassNameItem = string|boolean

export type ClassName = (
	| ClassNameItem
	// Classes as array can have on level deep of classes
	| (ClassNameItem | (ClassNameItem[]))[]
)

type AttributeState <G> = ( G | IState<G> | IComputeState<G> )

export interface HTMLAttributes
	<GDom extends Element = Element>
	extends DefaultReflexAttributes<GDom>, DOMAttributes<GDom>
{
	// Standard HTML Attributes
	accept?: 				AttributeState<string>
	acceptCharset?: 		AttributeState<string>
	accessKey?: 			AttributeState<string>
	action?: 				AttributeState<string>
	allow?: 				AttributeState<string>
	allowFullScreen?: 		AttributeState<boolean>
	allowTransparency?: 	AttributeState<boolean>
	alt?: 					AttributeState<string>
	as?: 					AttributeState<string>
	async?: 				AttributeState<boolean>
	autocomplete?: 			AttributeState<string>
	autoComplete?: 			AttributeState<string>
	autocorrect?: 			AttributeState<string>
	autoCorrect?: 			AttributeState<string>
	autofocus?: 			AttributeState<boolean>
	autoFocus?: 			AttributeState<boolean>
	autoPlay?: 				AttributeState<boolean>
	capture?: 				AttributeState<boolean | string>
	cellPadding?: 			AttributeState<number | string>
	cellSpacing?: 			AttributeState<number | string>
	charSet?: 				AttributeState<string>
	challenge?: 			AttributeState<string>
	checked?: 				AttributeState<boolean>
	cite?: 					AttributeState<string>
	class?: 				AttributeState<ClassName>
	className?: 			AttributeState<ClassName>
	cols?: 					AttributeState<number>
	colSpan?: 				AttributeState<number>
	content?: 				AttributeState<string>
	contentEditable?: 		AttributeState<boolean>
	contextMenu?: 			AttributeState<string>
	controls?: 				AttributeState<boolean>
	controlsList?: 			AttributeState<string>
	coords?: 				AttributeState<string>
	crossOrigin?: 			AttributeState<string>
	data?: 					AttributeState<string>
	dateTime?: 				AttributeState<string>
	default?: 				AttributeState<boolean>
	defaultChecked?: 		AttributeState<boolean>
	defaultValue?: 			AttributeState<string>
	defer?: 				AttributeState<boolean>
	dir?: 					AttributeState<'auto' | 'rtl' | 'ltr'>
	disabled?: 				AttributeState<boolean>
	disableRemotePlayback?: AttributeState<boolean>
	download?: 				AttributeState<any>
	decoding?: 				AttributeState<'sync' | 'async' | 'auto'>
	draggable?: 			AttributeState<boolean>
	encType?: 				AttributeState<string>
	enterkeyhint?:			AttributeState<'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send'>;
	form?: 					AttributeState<string>
	formAction?: 			AttributeState<string>
	formEncType?: 			AttributeState<string>
	formMethod?: 			AttributeState<string>
	formNoValidate?: 		AttributeState<boolean>
	formTarget?: 			AttributeState<string>
	frameBorder?: 			AttributeState<number | string>
	headers?: 				AttributeState<string>
	height?: 				AttributeState<number | string>
	hidden?: 				AttributeState<boolean>
	high?: 					AttributeState<number>
	href?: 					AttributeState<string>
	hrefLang?: 				AttributeState<string>
	for?: 					AttributeState<string>
	htmlFor?: 				AttributeState<string>
	httpEquiv?: 			AttributeState<string>
	icon?: 					AttributeState<string>
	id?: 					AttributeState<string>
	inputMode?: 			AttributeState<string>
	integrity?: 			AttributeState<string>
	is?: 					AttributeState<string>
	keyParams?: 			AttributeState<string>
	keyType?: 				AttributeState<string>
	kind?: 					AttributeState<string>
	label?: 				AttributeState<string>
	lang?: 					AttributeState<string>
	list?: 					AttributeState<string>
	loading?: 				AttributeState<'eager' | 'lazy'>
	loop?: 					AttributeState<boolean>
	low?: 					AttributeState<number>
	manifest?: 				AttributeState<string>
	marginHeight?: 			AttributeState<number>
	marginWidth?: 			AttributeState<number>
	max?: 					AttributeState<number | string>
	maxLength?: 			AttributeState<number>
	media?: 				AttributeState<string>
	mediaGroup?: 			AttributeState<string>
	method?: 				AttributeState<string>
	min?: 					AttributeState<number | string>
	minLength?: 			AttributeState<number>
	multiple?: 				AttributeState<boolean>
	muted?: 				AttributeState<boolean>
	name?: 					AttributeState<string>
	nomodule?: 				AttributeState<boolean>
	nonce?: 				AttributeState<string>
	noValidate?: 			AttributeState<boolean>
	open?: 					AttributeState<boolean>
	optimum?: 				AttributeState<number>
	part?: 					AttributeState<string>
	pattern?: 				AttributeState<string>
	ping?: 					AttributeState<string>
	placeholder?: 			AttributeState<string>
	playsInline?: 			AttributeState<boolean>
	poster?: 				AttributeState<string>
	preload?: 				AttributeState<string>
	radioGroup?: 			AttributeState<string>
	readonly?: 				AttributeState<boolean>
	readOnly?: 				AttributeState<boolean>
	referrerpolicy	?:		AttributeState<'no-referrer' | 'no-referrer-when-downgrade' | 'origin' | 'origin-when-cross-origin' | 'same-origin' | 'strict-origin' | 'strict-origin-when-cross-origin' | 'unsafe-url'>
	rel?: 					AttributeState<string>
	required?: 				AttributeState<boolean>
	reversed?: 				AttributeState<boolean>
	role?: 					AttributeState<string>
	rows?: 					AttributeState<number>
	rowSpan?: 				AttributeState<number>
	sandbox?: 				AttributeState<string>
	scope?: 				AttributeState<string>
	scoped?: 				AttributeState<boolean>
	scrolling?: 			AttributeState<string>
	seamless?: 				AttributeState<boolean>
	selected?: 				AttributeState<boolean>
	shape?: 				AttributeState<string>
	size?: 					AttributeState<number>
	sizes?: 				AttributeState<string>
	slot?: 					AttributeState<string>
	span?: 					AttributeState<number>
	spellcheck?: 			AttributeState<boolean>
	spellCheck?: 			AttributeState<boolean>
	src?: 					AttributeState<string>
	srcset?: 				AttributeState<string>
	srcDoc?: 				AttributeState<string>
	srcLang?: 				AttributeState<string>
	srcSet?: 				AttributeState<string>
	start?: 				AttributeState<number>
	step?: 					AttributeState<number | string>
	style?: 				AttributeState<string | CSSProperties>
	summary?: 				AttributeState<string>
	tabIndex?: 				AttributeState<number>
	target?: 				AttributeState<string>
	title?: 				AttributeState<string>
	type?: 					AttributeState<string>
	useMap?: 				AttributeState<string>
	value?: 				AttributeState<string | string[] | number>
	volume?: 				AttributeState<string | number>
	width?: 				AttributeState<number | string>
	wmode?: 				AttributeState<string>
	wrap?: 					AttributeState<string>

	// Non-standard Attributes
	autocapitalize?:		AttributeState<'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters'>
	autoCapitalize?:		AttributeState<'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters'>
	disablePictureInPicture	?: AttributeState<boolean>
	results?: 				AttributeState<number>
	translate?: 			AttributeState<'yes' | 'no'>

	// RDFa Attributes
	about?: 				AttributeState<string>
	datatype?: 				AttributeState<string>
	inlist?: 				AttributeState<any>
	prefix?: 				AttributeState<string>
	property?: 				AttributeState<string>
	resource?: 				AttributeState<string>
	typeof?: 				AttributeState<string>
	vocab?: 				AttributeState<string>

	// Microdata Attributes
	itemProp?: 				AttributeState<string>
	itemScope?: 			AttributeState<boolean>
	itemType?: 				AttributeState<string>
	itemID?: 				AttributeState<string>
	itemRef?: 				AttributeState<string>
}

// ----------------------------------------------------------------------------- SVG ATTRIBUTES

export interface SVGAttributes
	<GDom extends Element = SVGElement>
	extends HTMLAttributes<GDom> {
	accentHeight?: AttributeState<number | string>
	accumulate?: AttributeState<'none' | 'sum'>
	additive?: AttributeState<'replace' | 'sum'>
	alignmentBaseline?:AttributeState<
		| 'auto'
		| 'baseline'
		| 'before-edge'
		| 'text-before-edge'
		| 'middle'
		| 'central'
		| 'after-edge'
		| 'text-after-edge'
		| 'ideographic'
		| 'alphabetic'
		| 'hanging'
		| 'mathematical'
		| 'inherit'>
	allowReorder?: AttributeState<'no' | 'yes'>
	alphabetic?: AttributeState<number | string>
	amplitude?: AttributeState<number | string>
	arabicForm?: AttributeState<'initial' | 'medial' | 'terminal' | 'isolated'>
	ascent?: AttributeState<number | string>
	attributeName?: AttributeState<string>
	attributeType?: AttributeState<string>
	autoReverse?: AttributeState<number | string>
	azimuth?: AttributeState<number | string>
	baseFrequency?: AttributeState<number | string>
	baselineShift?: AttributeState<number | string>
	baseProfile?: AttributeState<number | string>
	bbox?: AttributeState<number | string>
	begin?: AttributeState<number | string>
	bias?: AttributeState<number | string>
	by?: AttributeState<number | string>
	calcMode?: AttributeState<number | string>
	capHeight?: AttributeState<number | string>
	clip?: AttributeState<number | string>
	clipPath?: AttributeState<string>
	clipPathUnits?: AttributeState<number | string>
	clipRule?: AttributeState<number | string>
	colorInterpolation?: AttributeState<number | string>
	colorInterpolationFilters?: AttributeState<'auto' | 'sRGB' | 'linearRGB' | 'inherit'>
	colorProfile?: AttributeState<number | string>
	colorRendering?: AttributeState<number | string>
	contentScriptType?: AttributeState<number | string>
	contentStyleType?: AttributeState<number | string>
	cursor?: AttributeState<number | string>
	cx?: AttributeState<number | string>
	cy?: AttributeState<number | string>
	d?: AttributeState<string>
	decelerate?: AttributeState<number | string>
	descent?: AttributeState<number | string>
	diffuseConstant?: AttributeState<number | string>
	direction?: AttributeState<number | string>
	display?: AttributeState<number | string>
	divisor?: AttributeState<number | string>
	dominantBaseline?: AttributeState<number | string>
	dur?: AttributeState<number | string>
	dx?: AttributeState<number | string>
	dy?: AttributeState<number | string>
	edgeMode?: AttributeState<number | string>
	elevation?: AttributeState<number | string>
	enableBackground?: AttributeState<number | string>
	end?: AttributeState<number | string>
	exponent?: AttributeState<number | string>
	externalResourcesRequired?: AttributeState<number | string>
	fill?: AttributeState<string>
	fillOpacity?: AttributeState<number | string>
	fillRule?: AttributeState<'nonzero' | 'evenodd' | 'inherit'>
	filter?: AttributeState<string>
	filterRes?: AttributeState<number | string>
	filterUnits?: AttributeState<number | string>
	floodColor?: AttributeState<number | string>
	floodOpacity?: AttributeState<number | string>
	focusable?: AttributeState<number | string>
	fontFamily?: AttributeState<string>
	fontSize?: AttributeState<number | string>
	fontSizeAdjust?: AttributeState<number | string>
	fontStretch?: AttributeState<number | string>
	fontStyle?: AttributeState<number | string>
	fontVariant?: AttributeState<number | string>
	fontWeight?: AttributeState<number | string>
	format?: AttributeState<number | string>
	from?: AttributeState<number | string>
	fx?: AttributeState<number | string>
	fy?: AttributeState<number | string>
	g1?: AttributeState<number | string>
	g2?: AttributeState<number | string>
	glyphName?: AttributeState<number | string>
	glyphOrientationHorizontal?: AttributeState<number | string>
	glyphOrientationVertical?: AttributeState<number | string>
	glyphRef?: AttributeState<number | string>
	gradientTransform?: AttributeState<string>
	gradientUnits?: AttributeState<string>
	hanging?: AttributeState<number | string>
	horizAdvX?: AttributeState<number | string>
	horizOriginX?: AttributeState<number | string>
	ideographic?: AttributeState<number | string>
	imageRendering?: AttributeState<number | string>
	in2?: AttributeState<number | string>
	in?: AttributeState<string>
	intercept?: AttributeState<number | string>
	k1?: AttributeState<number | string>
	k2?: AttributeState<number | string>
	k3?: AttributeState<number | string>
	k4?: AttributeState<number | string>
	k?: AttributeState<number | string>
	kernelMatrix?: AttributeState<number | string>
	kernelUnitLength?: AttributeState<number | string>
	kerning?: AttributeState<number | string>
	keyPoints?: AttributeState<number | string>
	keySplines?: AttributeState<number | string>
	keyTimes?: AttributeState<number | string>
	lengthAdjust?: AttributeState<number | string>
	letterSpacing?: AttributeState<number | string>
	lightingColor?: AttributeState<number | string>
	limitingConeAngle?: AttributeState<number | string>
	local?: AttributeState<number | string>
	markerEnd?: AttributeState<string>
	markerHeight?: AttributeState<number | string>
	markerMid?: AttributeState<string>
	markerStart?: AttributeState<string>
	markerUnits?: AttributeState<number | string>
	markerWidth?: AttributeState<number | string>
	mask?: AttributeState<string>
	maskContentUnits?: AttributeState<number | string>
	maskUnits?: AttributeState<number | string>
	mathematical?: AttributeState<number | string>
	mode?: AttributeState<number | string>
	numOctaves?: AttributeState<number | string>
	offset?: AttributeState<number | string>
	opacity?: AttributeState<number | string>
	operator?: AttributeState<number | string>
	order?: AttributeState<number | string>
	orient?: AttributeState<number | string>
	orientation?: AttributeState<number | string>
	origin?: AttributeState<number | string>
	overflow?: AttributeState<number | string>
	overlinePosition?: AttributeState<number | string>
	overlineThickness?: AttributeState<number | string>
	paintOrder?: AttributeState<number | string>
	panose1?: AttributeState<number | string>
	pathLength?: AttributeState<number | string>
	patternContentUnits?: AttributeState<string>
	patternTransform?: AttributeState<number | string>
	patternUnits?: AttributeState<string>
	pointerEvents?: AttributeState<number | string>
	points?: AttributeState<string>
	pointsAtX?: AttributeState<number | string>
	pointsAtY?: AttributeState<number | string>
	pointsAtZ?: AttributeState<number | string>
	preserveAlpha?: AttributeState<number | string>
	preserveAspectRatio?: AttributeState<string>
	primitiveUnits?: AttributeState<number | string>
	r?: AttributeState<number | string>
	radius?: AttributeState<number | string>
	refX?: AttributeState<number | string>
	refY?: AttributeState<number | string>
	renderingIntent?: AttributeState<number | string>
	repeatCount?: AttributeState<number | string>
	repeatDur?: AttributeState<number | string>
	requiredExtensions?: AttributeState<number | string>
	requiredFeatures?: AttributeState<number | string>
	restart?: AttributeState<number | string>
	result?: AttributeState<string>
	rotate?: AttributeState<number | string>
	rx?: AttributeState<number | string>
	ry?: AttributeState<number | string>
	scale?: AttributeState<number | string>
	seed?: AttributeState<number | string>
	shapeRendering?: AttributeState<number | string>
	slope?: AttributeState<number | string>
	spacing?: AttributeState<number | string>
	specularConstant?: AttributeState<number | string>
	specularExponent?: AttributeState<number | string>
	speed?: AttributeState<number | string>
	spreadMethod?: AttributeState<string>
	startOffset?: AttributeState<number | string>
	stdDeviation?: AttributeState<number | string>
	stemh?: AttributeState<number | string>
	stemv?: AttributeState<number | string>
	stitchTiles?: AttributeState<number | string>
	stopColor?: AttributeState<string>
	stopOpacity?: AttributeState<number | string>
	strikethroughPosition?: AttributeState<number | string>
	strikethroughThickness?: AttributeState<number | string>
	string?: AttributeState<number | string>
	stroke?: AttributeState<string>
	strokeDasharray?: AttributeState<string | number>
	strokeDashoffset?: AttributeState<string | number>
	strokeLinecap?: AttributeState<'butt' | 'round' | 'square' | 'inherit'>
	strokeLinejoin?: AttributeState<'miter' | 'round' | 'bevel' | 'inherit'>
	strokeMiterlimit?: AttributeState<string | number>
	strokeOpacity?: AttributeState<number | string>
	strokeWidth?: AttributeState<number | string>
	surfaceScale?: AttributeState<number | string>
	systemLanguage?: AttributeState<number | string>
	tableValues?: AttributeState<number | string>
	targetX?: AttributeState<number | string>
	targetY?: AttributeState<number | string>
	textAnchor?: AttributeState<string>
	textDecoration?: AttributeState<number | string>
	textLength?: AttributeState<number | string>
	textRendering?: AttributeState<number | string>
	to?: AttributeState<number | string>
	transform?: AttributeState<string>
	u1?: AttributeState<number | string>
	u2?: AttributeState<number | string>
	underlinePosition?: AttributeState<number | string>
	underlineThickness?: AttributeState<number | string>
	unicode?: AttributeState<number | string>
	unicodeBidi?: AttributeState<number | string>
	unicodeRange?: AttributeState<number | string>
	unitsPerEm?: AttributeState<number | string>
	vAlphabetic?: AttributeState<number | string>
	values?: AttributeState<string>
	vectorEffect?: AttributeState<number | string>
	version?: AttributeState<string>
	vertAdvY?: AttributeState<number | string>
	vertOriginX?: AttributeState<number | string>
	vertOriginY?: AttributeState<number | string>
	vHanging?: AttributeState<number | string>
	vIdeographic?: AttributeState<number | string>
	viewBox?: AttributeState<string>
	viewTarget?: AttributeState<number | string>
	visibility?: AttributeState<number | string>
	vMathematical?: AttributeState<number | string>
	widths?: AttributeState<number | string>
	wordSpacing?: AttributeState<number | string>
	writingMode?: AttributeState<number | string>
	x1?: AttributeState<number | string>
	x2?: AttributeState<number | string>
	x?: AttributeState<number | string>
	xChannelSelector?: AttributeState<string>
	xHeight?: AttributeState<number | string>
	xlinkActuate?: AttributeState<string>
	xlinkArcrole?: AttributeState<string>
	xlinkHref?: AttributeState<string>
	xlinkRole?: AttributeState<string>
	xlinkShow?: AttributeState<string>
	xlinkTitle?: AttributeState<string>
	xlinkType?: AttributeState<string>
	xmlBase?: AttributeState<string>
	xmlLang?: AttributeState<string>
	xmlns?: AttributeState<string>
	xmlnsXlink?: AttributeState<string>
	xmlSpace?: AttributeState<string>
	y1?: AttributeState<number | string>
	y2?: AttributeState<number | string>
	y?: AttributeState<number | string>
	yChannelSelector?: AttributeState<string>
	z?: AttributeState<number | string>
	zoomAndPan?: AttributeState<string>
}

// ----------------------------------------------------------------------------- REFLEX INTRINSIC ELEMENTS

export interface ReflexIntrinsicElements {
	// HTML
	a: HTMLAttributes<HTMLAnchorElement>;
	abbr: HTMLAttributes<HTMLElement>;
	address: HTMLAttributes<HTMLElement>;
	area: HTMLAttributes<HTMLAreaElement>;
	article: HTMLAttributes<HTMLElement>;
	aside: HTMLAttributes<HTMLElement>;
	audio: HTMLAttributes<HTMLAudioElement>;
	b: HTMLAttributes<HTMLElement>;
	base: HTMLAttributes<HTMLBaseElement>;
	bdi: HTMLAttributes<HTMLElement>;
	bdo: HTMLAttributes<HTMLElement>;
	big: HTMLAttributes<HTMLElement>;
	blockquote: HTMLAttributes<HTMLQuoteElement>;
	body: HTMLAttributes<HTMLBodyElement>;
	br: HTMLAttributes<HTMLBRElement>;
	button: HTMLAttributes<HTMLButtonElement>;
	canvas: HTMLAttributes<HTMLCanvasElement>;
	caption: HTMLAttributes<HTMLTableCaptionElement>;
	cite: HTMLAttributes<HTMLElement>;
	code: HTMLAttributes<HTMLElement>;
	col: HTMLAttributes<HTMLTableColElement>;
	colgroup: HTMLAttributes<HTMLTableColElement>;
	data: HTMLAttributes<HTMLDataElement>;
	datalist: HTMLAttributes<HTMLDataListElement>;
	dd: HTMLAttributes<HTMLElement>;
	del: HTMLAttributes<HTMLModElement>;
	details: HTMLAttributes<HTMLDetailsElement>;
	dfn: HTMLAttributes<HTMLElement>;
	dialog: HTMLAttributes<HTMLDialogElement>;
	div: HTMLAttributes<HTMLDivElement>;
	dl: HTMLAttributes<HTMLDListElement>;
	dt: HTMLAttributes<HTMLElement>;
	em: HTMLAttributes<HTMLElement>;
	embed: HTMLAttributes<HTMLEmbedElement>;
	fieldset: HTMLAttributes<HTMLFieldSetElement>;
	figcaption: HTMLAttributes<HTMLElement>;
	figure: HTMLAttributes<HTMLElement>;
	footer: HTMLAttributes<HTMLElement>;
	form: HTMLAttributes<HTMLFormElement>;
	h1: HTMLAttributes<HTMLHeadingElement>;
	h2: HTMLAttributes<HTMLHeadingElement>;
	h3: HTMLAttributes<HTMLHeadingElement>;
	h4: HTMLAttributes<HTMLHeadingElement>;
	h5: HTMLAttributes<HTMLHeadingElement>;
	h6: HTMLAttributes<HTMLHeadingElement>;
	head: HTMLAttributes<HTMLHeadElement>;
	header: HTMLAttributes<HTMLElement>;
	hgroup: HTMLAttributes<HTMLElement>;
	hr: HTMLAttributes<HTMLHRElement>;
	html: HTMLAttributes<HTMLHtmlElement>;
	i: HTMLAttributes<HTMLElement>;
	iframe: HTMLAttributes<HTMLIFrameElement>;
	img: HTMLAttributes<HTMLImageElement>;
	input: HTMLAttributes<HTMLInputElement> & { defaultValue?: string };
	ins: HTMLAttributes<HTMLModElement>;
	kbd: HTMLAttributes<HTMLElement>;
	keygen: HTMLAttributes<HTMLUnknownElement>;
	label: HTMLAttributes<HTMLLabelElement>;
	legend: HTMLAttributes<HTMLLegendElement>;
	li: HTMLAttributes<HTMLLIElement>;
	link: HTMLAttributes<HTMLLinkElement>;
	main: HTMLAttributes<HTMLElement>;
	map: HTMLAttributes<HTMLMapElement>;
	mark: HTMLAttributes<HTMLElement>;
	marquee: HTMLAttributes<HTMLMarqueeElement>;
	menu: HTMLAttributes<HTMLMenuElement>;
	menuitem: HTMLAttributes<HTMLUnknownElement>;
	meta: HTMLAttributes<HTMLMetaElement>;
	meter: HTMLAttributes<HTMLMeterElement>;
	nav: HTMLAttributes<HTMLElement>;
	noscript: HTMLAttributes<HTMLElement>;
	object: HTMLAttributes<HTMLObjectElement>;
	ol: HTMLAttributes<HTMLOListElement>;
	optgroup: HTMLAttributes<HTMLOptGroupElement>;
	option: HTMLAttributes<HTMLOptionElement>;
	output: HTMLAttributes<HTMLOutputElement>;
	p: HTMLAttributes<HTMLParagraphElement>;
	param: HTMLAttributes<HTMLParamElement>;
	picture: HTMLAttributes<HTMLPictureElement>;
	pre: HTMLAttributes<HTMLPreElement>;
	progress: HTMLAttributes<HTMLProgressElement>;
	q: HTMLAttributes<HTMLQuoteElement>;
	rp: HTMLAttributes<HTMLElement>;
	rt: HTMLAttributes<HTMLElement>;
	ruby: HTMLAttributes<HTMLElement>;
	s: HTMLAttributes<HTMLElement>;
	samp: HTMLAttributes<HTMLElement>;
	script: HTMLAttributes<HTMLScriptElement>;
	section: HTMLAttributes<HTMLElement>;
	select: HTMLAttributes<HTMLSelectElement>;
	slot: HTMLAttributes<HTMLSlotElement>;
	small: HTMLAttributes<HTMLElement>;
	source: HTMLAttributes<HTMLSourceElement>;
	span: HTMLAttributes<HTMLSpanElement>;
	strong: HTMLAttributes<HTMLElement>;
	style: HTMLAttributes<HTMLStyleElement>;
	sub: HTMLAttributes<HTMLElement>;
	summary: HTMLAttributes<HTMLElement>;
	sup: HTMLAttributes<HTMLElement>;
	table: HTMLAttributes<HTMLTableElement>;
	tbody: HTMLAttributes<HTMLTableSectionElement>;
	td: HTMLAttributes<HTMLTableCellElement>;
	textarea: HTMLAttributes<HTMLTextAreaElement>;
	tfoot: HTMLAttributes<HTMLTableSectionElement>;
	th: HTMLAttributes<HTMLTableCellElement>;
	thead: HTMLAttributes<HTMLTableSectionElement>;
	time: HTMLAttributes<HTMLTimeElement>;
	title: HTMLAttributes<HTMLTitleElement>;
	tr: HTMLAttributes<HTMLTableRowElement>;
	track: HTMLAttributes<HTMLTrackElement>;
	u: HTMLAttributes<HTMLElement>;
	ul: HTMLAttributes<HTMLUListElement>;
	var: HTMLAttributes<HTMLElement>;
	video: HTMLAttributes<HTMLVideoElement>;
	wbr: HTMLAttributes<HTMLElement>;

	//SVG
	svg: SVGAttributes<SVGSVGElement>;
	animate: SVGAttributes<SVGAnimateElement>;
	circle: SVGAttributes<SVGCircleElement>;
	animateTransform: SVGAttributes<SVGAnimateElement>;
	clipPath: SVGAttributes<SVGClipPathElement>;
	defs: SVGAttributes<SVGDefsElement>;
	desc: SVGAttributes<SVGDescElement>;
	ellipse: SVGAttributes<SVGEllipseElement>;
	feBlend: SVGAttributes<SVGFEBlendElement>;
	feColorMatrix: SVGAttributes<SVGFEColorMatrixElement>;
	feComponentTransfer: SVGAttributes<SVGFEComponentTransferElement>;
	feComposite: SVGAttributes<SVGFECompositeElement>;
	feConvolveMatrix: SVGAttributes<SVGFEConvolveMatrixElement>;
	feDiffuseLighting: SVGAttributes<SVGFEDiffuseLightingElement>;
	feDisplacementMap: SVGAttributes<SVGFEDisplacementMapElement>;
	feDropShadow: SVGAttributes<SVGFEDropShadowElement>;
	feFlood: SVGAttributes<SVGFEFloodElement>;
	feFuncA: SVGAttributes<SVGFEFuncAElement>;
	feFuncB: SVGAttributes<SVGFEFuncBElement>;
	feFuncG: SVGAttributes<SVGFEFuncGElement>;
	feFuncR: SVGAttributes<SVGFEFuncRElement>;
	feGaussianBlur: SVGAttributes<SVGFEGaussianBlurElement>;
	feImage: SVGAttributes<SVGFEImageElement>;
	feMerge: SVGAttributes<SVGFEMergeElement>;
	feMergeNode: SVGAttributes<SVGFEMergeNodeElement>;
	feMorphology: SVGAttributes<SVGFEMorphologyElement>;
	feOffset: SVGAttributes<SVGFEOffsetElement>;
	feSpecularLighting: SVGAttributes<SVGFESpecularLightingElement>;
	feTile: SVGAttributes<SVGFETileElement>;
	feTurbulence: SVGAttributes<SVGFETurbulenceElement>;
	filter: SVGAttributes<SVGFilterElement>;
	foreignObject: SVGAttributes<SVGForeignObjectElement>;
	g: SVGAttributes<SVGGElement>;
	image: SVGAttributes<SVGImageElement>;
	line: SVGAttributes<SVGLineElement>;
	linearGradient: SVGAttributes<SVGLinearGradientElement>;
	marker: SVGAttributes<SVGMarkerElement>;
	mask: SVGAttributes<SVGMaskElement>;
	path: SVGAttributes<SVGPathElement>;
	pattern: SVGAttributes<SVGPatternElement>;
	polygon: SVGAttributes<SVGPolygonElement>;
	polyline: SVGAttributes<SVGPolylineElement>;
	radialGradient: SVGAttributes<SVGRadialGradientElement>;
	rect: SVGAttributes<SVGRectElement>;
	stop: SVGAttributes<SVGStopElement>;
	symbol: SVGAttributes<SVGSymbolElement>;
	text: SVGAttributes<SVGTextElement>;
	textPath: SVGAttributes<SVGTextPathElement>;
	tspan: SVGAttributes<SVGTSpanElement>;
	use: SVGAttributes<SVGUseElement>;
}

