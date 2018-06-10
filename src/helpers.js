export const imageUrl = 'http://fastpack.dk/wp-content/uploads/products/';
export const language =  getLanguage();
export const emailUrl = 'http://magiceportfolio.xon.pl/fastpack/wp-admin/admin-ajax.php?action=mail_before_submit';
export const languages = ['DK', 'GB', 'PL', 'IT'];

function getLanguage(){
  var browserLang = document.getElementsByTagName('html')[0].attributes.html || "en-GB";
  return browserLang.split('-')[0];
}