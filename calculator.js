let cameraCount = cameraCountInput.innerText;
let camera = {};
let cableLenght = 50;
const cablePrice = 0.49;
let finalPrice = 0;
const mountPrice = 10;
const workPriceCoeficient = 0.5; //0 to 1
const basePrice = 80;
const AIprice = 40;
const colorPrice = 40;
const price2Mpx = 0;
const price4Mpx = 50;
const price8Mpx = 140;
const minWorkPrice = 120;

const NVR4ChannelPrice = 160;
const NVR8ChannelPrice = 260;
const NVR16ChannelPrice = 500;
const NVR32ChannelPrice = 700;

const hardTbPrice = 40;
const sdCardGBPrice = 1;
const serverineSpintaPrice = 70;

function NVR(channels, hard) {
  this.channels = channels;
  this.hard = hard;
}
function Camera(
  model,
  basePrice,
  isAI,
  isColor,
  cableLenght,
  hasMounting,
  isIP,
  mpx,
  sound
) {
  this.model = model;
  this.basePrice = basePrice;
  this.isAI = isAI;
  this.isColor = isColor;
  this.cableLenght = cableLenght;
  this.hasMounting = hasMounting;
  this.isIP = isIP;
  this.mpx = mpx;
  this.sound = sound;
}
function calculatePrice() {
  //reset final price
  finalPrice = 0;
  //get camera count from html
  const cameraCount = cameraCountInput.value;
  //mpx amount
  const mpx = mpxInput.value;
  //Ai
  const isAI = AIinput.checked;
  //Color night vision
  const isColor = ColorInput.checked;
  // Cable lenght
  cableLenght = cableLenghtInput.value;

  for (i = 0; i < cameraCount; i++) {
    camera[i] = new Camera(
      "hikvision",
      basePrice,
      isAI,
      isColor,
      cableLenght,
      true,
      true,
      mpx
    );
  }
  let = totalCableUsed = 0;
  //count camera price
  for (i = 0; i < cameraCount; i++) {
    //base price
    let singleCameraPrice = 0
    singleCameraPrice += camera[i].basePrice;
    //AI price
    singleCameraPrice += camera[i].isAI == true ? AIprice : 0;
    //Color price
    singleCameraPrice += camera[i].isColor == true ? colorPrice : 0;
    switch (camera[i].mpx) {
        case "2":
          console.log(2);
          singleCameraPrice += price2Mpx;
          break;
        case "4":
          console.log(4);
          singleCameraPrice += price4Mpx;
          break;
        case "8":
          console.log(8);
          singleCameraPrice += price8Mpx;
          break;
        default:
          break;
      }
      console.log("Camera",i+1,"price",singleCameraPrice)
      finalPrice += singleCameraPrice

    //Cable lenght price calculation
    let singleCameraCablePrice = 0
    singleCameraCablePrice += camera[i].cableLenght * cablePrice;
    console.log("camera",i+1,"cable price", singleCameraCablePrice)
    finalPrice += singleCameraCablePrice
    //TOUSE total cable used in m.
    //totalCableUsed += camera[i].cableLenght

    //mounting base price
    let singleCameraMountPrice = 0
    singleCameraMountPrice += camera[i].hasMounting == true ? mountPrice : 0;
    console.log("Camera",i+1,"mount price",singleCameraMountPrice)
    finalPrice+=singleCameraMountPrice
   
  }
  //work price minimum 120eur check
  let finalWorkPrice = cameraCount * minWorkPrice;
  //add price for installing NVR if 2 or more cameras
  if (cameraCount > 2) {
    finalWorkPrice += minWorkPrice;
  }
  finalPrice += finalWorkPrice;
  console.log("Work price", finalWorkPrice);
  

    //calculate NVR Price
    let NVRPrice = 0;
    if (cameraCount > 1 && cameraCount <= 4) {
      NVRPrice = NVR4ChannelPrice;
    } else if (cameraCount > 4 && cameraCount <= 8) {
      NVRPrice = NVR8ChannelPrice;
    } else if (cameraCount > 8 && cameraCount <= 16) {
      NVRPrice = NVR16ChannelPrice;
    } else if (cameraCount > 16 && cameraCount <= 32) {
      NVRPrice = NVR32ChannelPrice;
    } else {
      console.log("Too many cameras, please call for individual price");
    }
    console.log("Nvr price", NVRPrice);
    finalPrice += NVRPrice;

    //calculate TB Price if more than 1 camera
    if (cameraCount > 1) {
      let TbPrice = hardTbPrice * TbAmount.value;
      console.log("Terabaitu kaina", TbPrice);
      finalPrice += TbPrice;
    }

    //tvirtinimas price 10% nuo laidu
    let tvirtinimas = cableLenght * cameraCount * cablePrice * 0.1;
    console.log("Tvirtinimo medziagos", tvirtinimas);
    finalPrice += tvirtinimas;

    //laidu klojimo darbai
    let laiduDarbai = cableLenght * cameraCount;
    console.log("laidu klojimo darbai", laiduDarbai);
    finalPrice += laiduDarbai;

    //Transporto islaidos, Klaipeda ar ne
    isLocal = isLocalInput.checked;
    let transportCost = isLocal == true ? 20 : 50;
    console.log("Transporto islaidos", transportCost);
    finalPrice += transportCost;

    //If 1 camera let select sd card, also hide Tb option and show Gb selector. And vice versa
    let sdCardCost = 0;
    if (cameraCount == 1) {
      console.log("SD card size", GbAmount.value);
      GbAmount.hidden = false;
      TbAmount.hidden = true;
      sdCardCost = sdCardGBPrice * GbAmount.value;
      console.log("SD card price", sdCardCost);
      finalPrice += sdCardCost;
    } else {
      //   hide sd card sselector
      GbAmount.hidden = true;
      //show tb selector
      TbAmount.hidden = false;
    }

   

  

   

    //TODO add serverine spinta islaidos if 2 or more cameras.
    let spintaPrice = 0;
    if (cameraCount > 1) {
      spintaPrice = serverineSpintaPrice;
    }
    console.log("Serverine metaline spinta:", spintaPrice);
    finalPrice += spintaPrice;
    //TODO add option to select stulpiniai kronsteinai

    console.log(finalPrice);
    console.log("-----------------------------------------------------")
    if (cameraCount <= 32) {
      result.innerText = finalPrice;
    } else {
      result.innerText = `Too many cameras, please call for individual price`;
    }
  }

