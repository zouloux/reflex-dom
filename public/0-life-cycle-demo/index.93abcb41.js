var e = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {},
	n = {}, t = {}, l = e.parcelRequirea1a1;
null == l && ( ( l = function ( e ) {
	if ( e in n ) return n[ e ].exports;
	if ( e in t )
	{
		var l = t[ e ];
		delete t[ e ];
		var o = { id: e, exports: {} };
		return n[ e ] = o, l.call( o.exports, o, o.exports ), o.exports
	}
	var i = new Error( "Cannot find module '" + e + "'" );
	throw i.code = "MODULE_NOT_FOUND", i
} ).register = function ( e, n ) {
	t[ e ] = n
}, e.parcelRequirea1a1 = l );
var o = l( "leUMy" ), i = l( "3AbUl" ), u = ( o = l( "leUMy" ), l( "hvc62" ) );

function r( e )
{
	const n = ( 0, o.ref )();
	let t = 0;

	function l()
	{
		console.log( "Clicked " + ++t )
	}

	return ( 0, o.mounted )( ( () => ( console.log( `SubChild mounted ${ n.dom.innerHTML }` ), () => {
		console.log( `SubChild unmounted ${ t }` )
	} ) ) ), () => ( 0, o.h )( "div", { onClick: l }, ( 0, o.h )( "table", null, ( 0, o.h )( "tr", null, ( 0, o.h )( "td", null, "Id :" ), ( 0, o.h )( "td", null, e.item.id ) ), ( 0, o.h )( "tr", null, ( 0, o.h )( "td", null, "Name :" ), ( 0, o.h )( "td", { ref: n }, e.item.title ) ) ) )
}

function d( e )
{
	return ( 0, o.mounted )( ( () => {
		console.log( "List item mounted" )
	} ) ), ( 0, o.unmounted )( ( () => {
		console.log( "List item unmounted" )
	} ) ), () => ( 0, o.h )( "div", { style: { border: "1px solid white" } }, ( 0, o.h )( "span", null, "ListItem" ), ( 0, o.h )( r, { item: e.item } ), ( 0, o.h )( "button", { onClick: n => e.removeClicked( e.item ) }, "Remove" ) )
}

function s()
{
	const e = ( 0, o.state )( !0 ), n = ( 0, o.state )( [] ), t = ( 0, o.refs )();

	function l( e )
	{
		n.set( n.value.filter( ( n => n != e ) ) )
	}

	function i()
	{
		return ( 0, o.h )( "div", null, ( 0, o.h )( "button", {
			onClick: e => function () {
				const e = {
					id: ( 0, u.createUID )(),
					title: `${ ( 0, u.pickRandom )( u.colorList ) } ${ ( 0, u.pickRandom )( u.foodList ) }`
				};
				n.set( [ ...n.value, e ] )
			}()
		}, "Add list item" ), ( 0, o.h )( "h3", null, "Items :" ), ( 0, o.h )( "div", null, n.value.map( ( e => ( 0, o.h )( d, {
			ref: t,
			key: e.id,
			item: e,
			removeClicked: l
		} ) ) ) ) )
	}

	return () => ( 0, o.h )( "div", null, ( 0, o.h )( "button", { onClick: n => e.set( !e.value ) }, e.value ? "Hide list" : "Show list" ), ( 0, o.h )( "br", null ), ( 0, o.h )( "br", null ), e.value && ( 0, o.h )( i, { pure: !1 } ) )
}

( 0, i.setReflexDebug )( !0 ), function () {
	const e = ( 0, i.trackPerformances )( "Root rendering" );
	( 0, o.render )( ( 0, o.h )( s, null ), document.body ), e()
}();
//# sourceMappingURL=index.93abcb41.js.map
