
const colorPickerEl = document.getElementById("color-picker")
const schemeModeEl = document.getElementById("scheme-mode-selector")
const getSchemeButtonEl = document.getElementById("get-scheme-button")
const colorsEl = document.querySelector(".colors")
const hexValuesEl = document.querySelector(".hex-values")

let seedColor = "F55A5A"
let schemeMode = "monochrome"

function getColorScheme(seedColor, mode){ //get color API with query parameters
    colorsEl.innerHTML = ""
    hexValuesEl.innerHTML = ""
    fetch(`https://www.thecolorapi.com/scheme?hex=${seedColor}&mode=${mode}`)
    .then(res => res.json())
    .then(colorsArray => {
        for(let color of colorsArray.colors){
            const hexValue = color.hex.value
            colorsEl.innerHTML += `<div class="color-blocks" style="background:${hexValue}"></div>`
            hexValuesEl.innerHTML += `<p class="hex-numbers" id="${hexValue}">${hexValue}</p>`
        }
    })
}

colorPickerEl.addEventListener("change", (e) => { //select seed color
    seedColor = e.target.value.substring(1).toUpperCase()
})

schemeModeEl.addEventListener("change", (e) => { //select scheme mode
    schemeMode = e.target.value
})

hexValuesEl.addEventListener("click", (e) => { //copy hex value
    if(e.target.tagName == "P"){
        navigator.clipboard.writeText(e.target.id)
        alert("HEX Value Copied!: "+e.target.id)
    }
})


getSchemeButtonEl.addEventListener("click", () => { //get scheme button
 
    getColorScheme(seedColor, schemeMode)
})


getColorScheme("755BF5", "monochrome") //default values