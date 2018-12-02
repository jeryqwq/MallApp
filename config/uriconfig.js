networkHost="192.168.4.153";
imgServerPort="8080";
imgAgreement="http";
apiAgreement="http";
apiServerPort="3000";
apiAddressFront=apiAgreement+"://"+ networkHost+":"+apiServerPort+"/";
imgAddressFront=imgAgreement+"://" +networkHost+":"+imgServerPort+'/';
module.exports={apiAddressFront,imgAddressFront}
