import { h, render } from "../../src";
import { drawReflexDebug, MemoryUsage } from "../../src/debug";
import { StatefulDemoApp } from "./StatefulListDemoApp";

// -----------------------------------------------------------------------------

drawReflexDebug();
render( <MemoryUsage />, document.getElementById("MemoryUsage") )
render( <StatefulDemoApp /> , document.getElementById("App") );