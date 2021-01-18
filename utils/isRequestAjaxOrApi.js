/* Con esta función validamos si la peticione es de AJAX o sea desde una librerpia JS o vanilla
y no del navegador directo */

const isRequestAjaxOrApi = req => {
   return !req.accepts('html') || req.xhr;
}

module.exports = isRequestAjaxOrApi;