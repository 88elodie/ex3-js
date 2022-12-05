export default class Affichage {
    /**
     * @static
     * @param {*} data 
     * @param {*} gabarit 
     * @param {*} domParent 
     * @param {boolean} bInserer
     */
    static afficher(data, gabarit, domParent){
        let chaineHTML = "";
        let aChaineHTML = [];
        /*
            <article data-id={{id}} class="carte">
                <h2><a href="#!/detail/{{id}}">  {{ title }} ({{release_date}})</a></h2>
                <h3>{{original_title}}</h3>
                <div class="contenu">
                    <p>{{description}}</p>
                </div>              
            </article>
         */
        if(!Array.isArray(data)){
            let sGabarit = gabarit.innerHTML;
            chaineHTML = Affichage.#remplacement(data, sGabarit);
            /*for(let prop in data){
                let regexp = new RegExp("\{\{\\s*"+prop+"\\s*\}\}", "g");  //{{prop}} ou {{ prop }}
                gabarit.innerHTML = gabarit.innerHTML.replace(regexp, data[prop]);
            }
            chaineHTML = gabarit.innerHTML;*/
            console.log(chaineHTML)
        }else{
            let aChaineHTML = data.map(unElement =>{
                let sGabarit = gabarit.innerHTML;
                return Affichage.#remplacement(unElement, sGabarit);
            })
            chaineHTML = aChaineHTML.join(" ");
        }

        
        if(domParent){
            domParent.innerHTML = chaineHTML;
        }
        return chaineHTML
    }

    static #remplacement(unElement, sGabarit){
        for(let prop in unElement){
            let regexp = new RegExp("\{\{\\s*"+prop+"\\s*\}\}", "g");  //{{prop}} ou {{ prop }}
            sGabarit = sGabarit.replace(regexp, unElement[prop]);
        }
        return sGabarit;
    }

}