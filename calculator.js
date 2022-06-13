let cameraCount = cameraCountInput.innerText
let camera = {}
let cableLenght = 10;
const cablePrice = 0.5
let finalPrice = 0;
const mountPrice = 10
const workPrice = 150
const basePrice = 100
const AIprice = 20
const colorPrice = 20
const price2Mpx = 10
const price4Mpx = 20
const price5Mpx = 30
const price8Mpx = 50

function Camera(model, basePrice, isAI, isColor, cableLenght, hasMounting, isIP, mpx, sound) {
    this.model = model
    this.basePrice = basePrice
    this.isAI = isAI
    this.isColor = isColor
    this.cableLenght = cableLenght
    this.hasMounting = hasMounting
    this.isIP = isIP
    this.mpx = mpx
    this.sound = sound
}
function calculatePrice() {
    //reset final price
    finalPrice = 0
    //get camera count from html
    const cameraCount = cameraCountInput.value
    //mpx amount
    const mpx = mpxInput.value
    //Ai
    const isAI = AIinput.checked
    //Color night vision
    const isColor = ColorInput.checked
    // Cable lenght
    cableLenght = cableLenghtInput.value

    for (i = 0; i < cameraCount; i++) {
        camera[i] = new Camera('hikvision', basePrice, isAI, isColor, cableLenght, true, true, mpx)
    }

    //count price
    for (i = 0; i < cameraCount; i++) {
        //base price
        finalPrice += camera[i].basePrice
        //AI price
        finalPrice += (camera[i].isAI == true) ? AIprice : 0
        //Color price
        finalPrice += (camera[i].isColor == true) ? colorPrice : 0
        //Cable lenght price calculation
        finalPrice += camera[i].cableLenght * cablePrice
        //work price
        finalPrice += workPrice
        //mounting base price
        finalPrice += (camera[i].hasMounting == true) ? mountPrice : 0;
        switch (camera[i].mpx) {
            case "2":
                console.log(2)
                finalPrice += price2Mpx;
                break;
            case "4":
                console.log(4)
                finalPrice += price4Mpx;
                break;
            case "5":
                console.log(5)
                finalPrice += price5Mpx;
                break;
            case "8":
                console.log(8)
                finalPrice += price8Mpx;
                break;
            default:
                break;

        }
    }

    console.log(finalPrice)
    result.innerText = finalPrice
}