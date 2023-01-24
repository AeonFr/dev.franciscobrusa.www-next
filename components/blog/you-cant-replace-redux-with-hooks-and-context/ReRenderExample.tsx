import { useCallback } from "react";
import * as styles from "./styles.css";

export default function ReRenderExample() {
  const svgContainer = useCallback((node: HTMLElement) => {
    if (node) {
      node.innerHTML = `

<svg width="640" height="424" viewBox="0 0 640 424" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="text box">
<g id="Diagram">
<g id="Frame 18">
<g id="Frame 15">
<g id="Frame 20">
<g id="Frame 12">
<rect width="44" height="40" transform="translate(298 14)" fill="#FDEC9A"/>
<text id="App" fill="#B13E40" xml:space="preserve" style="white-space: pre" font-family="inherit" font-size="13" letter-spacing="0em"><tspan x="308" y="39.0496">App</tspan></text>
</g>
<g id="Arrow">
<path id="Arrow 12" d="M320.354 63.6464C320.158 63.4512 319.842 63.4512 319.646 63.6464L316.464 66.8284C316.269 67.0237 316.269 67.3403 316.464 67.5355C316.66 67.7308 316.976 67.7308 317.172 67.5355L320 64.7071L322.828 67.5355C323.024 67.7308 323.34 67.7308 323.536 67.5355C323.731 67.3403 323.731 67.0237 323.536 66.8284L320.354 63.6464ZM320.5 94L320.5 64L319.5 64L319.5 94L320.5 94Z" fill="#B13E40"/>
</g>
<g id="Frame 19">
<rect width="138" height="40" transform="translate(251 104)" fill="#FDEC9A"/>
<text id="ContextProvider" fill="#B13E40" xml:space="preserve" style="white-space: pre" font-family="inherit" font-size="13" letter-spacing="0em"><tspan x="261" y="129.05">ContextProvider</tspan></text>
</g>
<g id="Arrows joining">
<path id="Arrow 10" d="M320.031 153.5C319.755 153.5 319.531 153.724 319.531 154L319.531 158.5C319.531 158.776 319.755 159 320.031 159C320.307 159 320.531 158.776 320.531 158.5L320.531 154.5L324.531 154.5C324.807 154.5 325.031 154.276 325.031 154C325.031 153.724 324.807 153.5 324.531 153.5L320.031 153.5ZM350.384 183.646L320.384 153.646L319.677 154.354L349.677 184.354L350.384 183.646Z" fill="#B13E40"/>
<path id="Arrow 12_2" d="M320.261 153.646C320.066 153.451 319.749 153.451 319.554 153.646L316.372 156.828C316.177 157.024 316.177 157.34 316.372 157.536C316.567 157.731 316.884 157.731 317.079 157.536L319.907 154.707L322.736 157.536C322.931 157.731 323.248 157.731 323.443 157.536C323.638 157.34 323.638 157.024 323.443 156.828L320.261 153.646ZM320.407 184L320.407 154L319.407 154L319.407 184L320.407 184Z" fill="#B13E40"/>
<path id="Arrow 11" d="M320.469 154C320.469 153.724 320.245 153.5 319.969 153.5L315.469 153.5C315.193 153.5 314.969 153.724 314.969 154C314.969 154.276 315.193 154.5 315.469 154.5L319.469 154.5L319.469 158.5C319.469 158.776 319.693 159 319.969 159C320.245 159 320.469 158.776 320.469 158.5L320.469 154ZM290.323 184.354L320.323 154.354L319.616 153.646L289.616 183.646L290.323 184.354Z" fill="#B13E40"/>
</g>
<g id="Frame 18_2">
<g id="Frame 16">
<g id="Row">
<g id="Frame 14">
<rect width="114" height="40" transform="translate(139 204)" fill="#B13E40"/>
<text id="Component A" fill="#FDEC9A" xml:space="preserve" style="white-space: pre" font-family="inherit" font-size="13" letter-spacing="0em"><tspan x="153" y="229.05">Component A</tspan></text>
</g>
</g>
<g id="Frame 19_2">
<path id="Arrow 10_2" d="M141.354 266.646C141.158 266.451 140.842 266.451 140.646 266.646L137.464 269.828C137.269 270.024 137.269 270.34 137.464 270.536C137.66 270.731 137.976 270.731 138.172 270.536L141 267.707L143.828 270.536C144.024 270.731 144.34 270.731 144.536 270.536C144.731 270.34 144.731 270.024 144.536 269.828L141.354 266.646ZM141.5 337L141.5 267L140.5 267L140.5 337L141.5 337Z" fill="#B13E40"/>
<text id="Subscription" fill="#B13E40" xml:space="preserve" style="white-space: pre" font-family="inherit" font-size="13" font-style="italic" letter-spacing="0em"><tspan x="159" y="307.05">Subscription</tspan></text>
</g>
<g id="Frame 12_2">
<rect width="114" height="40" transform="translate(139 360)" fill="#FDEC9A"/>
<text id="useContext()" fill="#B13E40" xml:space="preserve" style="white-space: pre" font-family="inherit" font-size="13" letter-spacing="0em"><tspan x="149" y="385.05">useContext()</tspan></text>
</g>
</g>
<g id="Frame 17">
<g id="Row_2">
<g id="Frame 14_2">
<rect width="114" height="40" transform="translate(263 204)" fill="#B13E40"/>
<text id="Component B" fill="#FDEC9A" xml:space="preserve" style="white-space: pre" font-family="inherit" font-size="13" letter-spacing="0em"><tspan x="277.058" y="229.05">Component B</tspan></text>
</g>
</g>
<g id="Frame 19_3">
<path id="Arrow 10_3" d="M265.354 266.646C265.158 266.451 264.842 266.451 264.646 266.646L261.464 269.828C261.269 270.024 261.269 270.34 261.464 270.536C261.66 270.731 261.976 270.731 262.172 270.536L265 267.707L267.828 270.536C268.024 270.731 268.34 270.731 268.536 270.536C268.731 270.34 268.731 270.024 268.536 269.828L265.354 266.646ZM265.5 337L265.5 267L264.5 267L264.5 337L265.5 337Z" fill="#B13E40"/>
<text id="Subscription_2" fill="#B13E40" xml:space="preserve" style="white-space: pre" font-family="inherit" font-size="13" font-style="italic" letter-spacing="0em"><tspan x="283" y="307.05">Subscription</tspan></text>
</g>
<g id="Frame 12_3">
<rect width="114" height="40" transform="translate(263 360)" fill="#FDEC9A"/>
<text id="useContext()_2" fill="#B13E40" xml:space="preserve" style="white-space: pre" font-family="inherit" font-size="13" letter-spacing="0em"><tspan x="273" y="385.05">useContext()</tspan></text>
</g>
</g>
<g id="Frame 18_3">
<g id="Row_3">
<g id="Frame 14_3">
<rect width="114" height="40" transform="translate(387 204)" fill="#B13E40"/>
<text id="Component C" fill="#FDEC9A" xml:space="preserve" style="white-space: pre" font-family="inherit" font-size="13" letter-spacing="0em"><tspan x="401.058" y="229.05">Component C</tspan></text>
</g>
</g>
<g id="Frame 19_4">
<path id="Arrow 10_4" d="M389.354 266.646C389.158 266.451 388.842 266.451 388.646 266.646L385.464 269.828C385.269 270.024 385.269 270.34 385.464 270.536C385.66 270.731 385.976 270.731 386.172 270.536L389 267.707L391.828 270.536C392.024 270.731 392.34 270.731 392.536 270.536C392.731 270.34 392.731 270.024 392.536 269.828L389.354 266.646ZM389.5 337L389.5 267L388.5 267L388.5 337L389.5 337Z" fill="#B13E40"/>
<text id="Subscription_3" fill="#B13E40" xml:space="preserve" style="white-space: pre" font-family="inherit" font-size="13" font-style="italic" letter-spacing="0em"><tspan x="407" y="307.05">Subscription</tspan></text>
</g>
<g id="Frame 12_4">
<rect width="114" height="40" transform="translate(387 360)" fill="#FDEC9A"/>
<text id="useContext()_3" fill="#B13E40" xml:space="preserve" style="white-space: pre" font-family="inherit" font-size="13" letter-spacing="0em"><tspan x="397" y="385.05">useContext()</tspan></text>
</g>
</g>
</g>
</g>
</g>
</g>
</g>
</g>
</svg>

`;
    }
  }, []);

  return (
    <div className={styles.interactiveColumn}>
      <div ref={svgContainer} className={styles.svg}></div>
    </div>
  );
}
