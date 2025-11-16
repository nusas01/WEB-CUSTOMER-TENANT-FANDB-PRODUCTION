
export default function ImagePaymentMethod(key, widthimg, heightimg) {
    const paymentImages = {
        BCA: <img src={require("../image/BCA.png")} alt="BCA" style={{height: '50px', width: '55px'}}/>,
        BNI: <img src={require("../image/BNI.png")} alt="BNI" style={{height: '50px', width: '50px'}}/>,
        BRI: <img src={require("../image/BRI.png")} alt="BRI" style={{height: '25px', width: '55px', margin: '10px 0'}}/>,
        BJB: <img src={require("../image/BJB.png")} alt="BJB" style={{height: '50px', width: '50px'}}/>,
        CIMB:<img src={require("../image/CIMB.png")} alt="CIMB" style={{height: '50px', width: '50px'}}/>,
        MANDIRI: <img src={require("../image/MANDIRI.png")} alt="MANDIRI" style={{height: '45px', width: '60px', margin: '5px 0'}}/>,
        PERMATA:  <img src={require("../image/PERMATA.png")} alt="PERMATA" style={{height: '30px', width: '60px', margin: '10px 0'}}/>,
        DANA:  <img src={require("../image/DANA.png")} alt="DANA" style={{height: '27.5px', width: '60px', margin: '10px 0'}}/>,
        LINKAJA:  <img src={require("../image/LINKAJA.png")} alt="LINKAJA" style={{height: '40px', width: '60px', margin: '5px 0'}}/>,
        OVO:  <img src={require("../image/OVO.jpg")} alt="OVO" style={{height: '40px', width: '60px'}}/>,
        SHOPEEPAY :  <img src={require("../image/SHOOPEPAY.png")} alt="SHOOPEPAY" style={{height: '50px', width: '75px'}}/>,
        QRIS:  <img src={require("../image/QRIS.png")} alt="QRIS" style={{height: heightimg, width: widthimg}}/>,
    }
    return paymentImages[key]
}
