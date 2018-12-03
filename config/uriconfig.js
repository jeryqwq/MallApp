//私人电脑局域网
// networkHost="192.168.137.1"
// imgServerPort="8080"
// imgAgreement="http"
// apiAgreement="http"
// apiServerPort="3000"
// apiAddressFront=apiAgreement+"://"+ networkHost+":"+apiServerPort+"/"
// imgAddressFront=imgAgreement+"://" +networkHost+":"+imgServerPort+'/'
// module.exports={apiAddressFront,imgAddressFront}

// 公司IP
networkHost="192.168.4.153";
imgServerPort="8080";
imgAgreement="http";
apiAgreement="http";
apiServerPort="3000";
apiAddressFront=apiAgreement+"://"+ networkHost+":"+apiServerPort+"/";
imgAddressFront=imgAgreement+"://" +networkHost+":"+imgServerPort+'/';
module.exports={apiAddressFront,imgAddressFront}
