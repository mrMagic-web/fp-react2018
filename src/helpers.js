export const imageUrl = 'http://fastpack.dk/wp-content/uploads/products/';
export const language =  getLanguage();
export const emailUrl = 'http://magiceportfolio.xon.pl/fastpack/wp-admin/admin-ajax.php?action=mail_before_submit';
export const languages = ['DK', 'EN', 'PL'];
export const flags = {
  DK: "DK", 
  EN: "GB", 
  PL: "PL"
}

function getLanguage(){
  var browserLang = document.getElementsByTagName('html')[0].attributes.appLanguage || "dk-DK";
  return browserLang.split('-')[0];
}