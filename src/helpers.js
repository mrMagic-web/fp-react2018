export const imageUrl = "/img/images/";
export const language = getLanguage();
export const languages = ["DK", "EN", "PL"];
export const flags = {
  DK: "DK",
  EN: "GB",
  PL: "PL"
};

function getLanguage() {
  var browserLang =
    document.getElementsByTagName("html")[0].attributes.appLanguage || "dk-DK";
  return browserLang.split("-")[0];
}
