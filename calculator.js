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
const sdCardGBPrice = 20 / 32;
const serverineSpintaPrice = 70;

const days2MpxCamera1Tb = 60;
const days4MpxCamera1Tb = 30;
const days8MpxCamera1Tb = 8;

const days2MpxCamera32Gb = 2;
const days4MpxCamera32Gb = 1;
const days8MpxCamera32Gb = 0.25;

var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "EUR",

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

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
    let singleCameraPrice = 0;
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
    console.log("Camera", i + 1, "price", singleCameraPrice);

    // samata calculate cameras
    cameraAmountSamata.innerText = i + 1 + " vnt";
    cameraPriceSamata.innerText = formatter.format(singleCameraPrice);
    cameraTotalSamata.innerText = formatter.format(singleCameraPrice * (i + 1));
    finalPrice += singleCameraPrice;

    //mounting base price
    let singleCameraMountPrice = 0;
    singleCameraMountPrice += camera[i].hasMounting == true ? mountPrice : 0;
    console.log("Camera", i + 1, "mount price", singleCameraMountPrice);
    //add to html
    cameraMountPriceSamata.innerText = formatter.format(singleCameraMountPrice);
    finalPrice += singleCameraMountPrice;

    cameraMountAmountSamata.innerText = i + 1 + " vnt";
    cameraMountPriceSamata.innerText = formatter.format(singleCameraMountPrice);
    cameraMountTotalSamata.innerText = formatter.format(
      singleCameraMountPrice * (i + 1)
    );
  }

  //Cable lenght price calculation
  let totalCablePrice = 0;
  totalCablePrice += cableLenght * cablePrice;
  console.log("cable price", totalCablePrice);
  finalPrice += totalCablePrice;
  //TOUSE total cable used in m.
  //totalCableUsed += camera[i].cableLenght
  cableAmountSamata.innerText = cableLenght + " m";
  cablePriceSamata.innerText = formatter.format(cablePrice);
  cableTotalSamata.innerText = formatter.format(cablePrice * cableLenght);

  //work price minimum 120eur check
  let finalWorkPrice = cameraCount * minWorkPrice;
  //add price for installing NVR if 2 or more cameras
  if (cameraCount > 2) {
    finalWorkPrice += minWorkPrice;
  }
  finalPrice += finalWorkPrice;
  console.log("Work price", finalWorkPrice);

  cameraWorkAmountSamata.innerText = "1 vnt";
  cameraWorkPriceSamata.innerText = formatter.format(finalWorkPrice);
  cameraWorkTotalSamata.innerText = formatter.format(finalWorkPrice);

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

  NVRAmountSamata.innerText = NVRPrice == 0 ? "0 vnt" : "1 vnt";
  NVRPriceSamata.innerText = formatter.format(NVRPrice);
  NVRTotalSamata.innerText = formatter.format(NVRPrice);
  NVRPrice == 0 ? (NVRRow.hidden = true) : (NVRRow.hidden = false);

  //calculate TB Price if more than 1 camera
  if (cameraCount > 1) {
    let TbPrice = hardTbPrice * TbAmount.value;
    console.log("Terabaitu kaina", TbPrice);
    finalPrice += TbPrice;

    storageAmountSamata.innerText = TbAmount.value + " Tb";
    storagePriceSamata.innerText = formatter.format(hardTbPrice);
    storageTotalSamata.innerText = formatter.format(TbPrice);
  }

  //storage days calculation Tb
  function changeStorageLabel(storageDays) {
    storageLabel.innerText =
      "Įrašo saugojimo dienų kiekis: " + Math.floor(storageDays);
  }
  function calculateDaysTb() {
    let storageDays = 0;
    function storageDayCalculation(daysConst) {
      return (TbAmount.value * daysConst) / cameraCount;
    }
    switch (mpxInput.value) {
      case "2":
        storageDays = storageDayCalculation(days2MpxCamera1Tb);
        break;
      case "4":
        storageDays = storageDayCalculation(days4MpxCamera1Tb);
        break;
      case "8":
        storageDays = storageDayCalculation(days8MpxCamera1Tb);
        break;
      default:
        storageDays = NaN;
        break;
    }
    changeStorageLabel(storageDays);
  }

  //storage days calculation Gb
  function calculateDaysGb() {
    let storageDays = 0;
    function storageDayCalculationGb(daysConst) {
      return ((GbAmount.value / 32) * daysConst) / cameraCount;
    }
    switch (mpxInput.value) {
      case "2":
        storageDays = storageDayCalculationGb(days2MpxCamera32Gb);
        break;
      case "4":
        storageDays = storageDayCalculationGb(days4MpxCamera32Gb);
        break;
      case "8":
        storageDays = storageDayCalculationGb(days8MpxCamera32Gb);
        break;
      default:
        storageDays = NaN;
        break;
    }
    changeStorageLabel(storageDays);
  }
  //choose calculation Tb or Gb
  cameraCount == 1 ? calculateDaysGb() : calculateDaysTb();

  //tvirtinimas price 10% nuo laidu
  let tvirtinimas = cableLenght * cameraCount * cablePrice * 0.1;
  console.log("Tvirtinimo medziagos", tvirtinimas);
  finalPrice += tvirtinimas;

  additionalAmountSamata.innerText = "1 vnt";
  additionalPriceSamata.innerText = formatter.format(tvirtinimas);
  additionalTotalSamata.innerText = formatter.format(tvirtinimas);

  //laidu klojimo darbai
  let laiduDarbai = cableLenght;
  console.log("laidu klojimo darbai", laiduDarbai);
  finalPrice += laiduDarbai;

  cableWorkAmountSamata.innerText = "1 vnt";
  cableWorkPriceSamata.innerText = formatter.format(laiduDarbai);
  cableWorkTotalSamata.innerText = formatter.format(laiduDarbai);

  //If 1 camera let select sd card, also hide Tb option and show Gb selector. And vice versa
  let sdCardCost = 0;
  if (cameraCount == 1) {
    console.log("SD card size", GbAmount.value);
    GbAmount.hidden = false;
    TbAmount.hidden = true;
    sdCardCost = sdCardGBPrice * GbAmount.value;
    console.log("SD card price", sdCardCost);
    finalPrice += sdCardCost;

    storageAmountSamata.innerText = GbAmount.value + " Gb";
    storagePriceSamata.innerText = formatter.format(sdCardGBPrice);
    storageTotalSamata.innerText = formatter.format(sdCardCost);
  } else {
    //   hide sd card sselector
    GbAmount.hidden = true;
    //show tb selector
    TbAmount.hidden = false;
  }

  //serverine spinta islaidos if 2 or more cameras.
  let spintaPrice = 0;
  if (cameraCount > 1) {
    spintaPrice = serverineSpintaPrice;
  }
  console.log("Serverine metaline spinta:", spintaPrice);
  finalPrice += spintaPrice;

  boxAmountSamata.innerText = "1 vnt";
  boxPriceSamata.innerText = formatter.format(spintaPrice);
  boxTotalSamata.innerText = formatter.format(spintaPrice);
  spintaPrice == 0 ? (boxRow.hidden = true) : (boxRow.hidden = false);

  //final price results
  console.log(finalPrice);
  console.log("-----------------------------------------------------");
  if (cameraCount <= 32) {
    result.innerText = formatter.format(finalPrice);
  } else {
    result.innerText = `Too many cameras, please call for individual price`;
  }

  //change image
  console.log(AIinput.checked, ColorInput.checked);
  let imageNameText = "camera";
  if (AIinput.checked == true) {
    //basic camera image
    imageNameText += "AI";
  }
  if (ColorInput.checked == true) {
    imageNameText += "Color";
  }
  //temp  dome
  imageNameText += "Dome";
  cameraImage.src = "resources/" + imageNameText + ".png";
}
