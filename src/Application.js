import Affichage from "./Affichage.js";
import Routeur from "./Routeur.js";
import MaireFetch from "./MaireFetch.js";

export default class Application {
    #routeur;
    #domParent;
    /**
     * Constructeur de la classe Application 
     * Le constructeur attache les écouteurs d'événement sur les bonnes méthodes de l'application
     */
    constructor() {
      this.#domParent = document.querySelector('main');
      this.#routeur = new Routeur();

      this.#routeur.ajouterRoute('recherche', this.getRecherche.bind(this));
      this.#routeur.ajouterRoute('liste', this.getListe.bind(this));
      this.#routeur.demarrer();
      
      

    }

    getRecherche(){
      const gabarit = document.querySelector('[id="tmpl_recherche"]').innerHTML;
      this.#domParent.innerHTML = gabarit;
      const oMaires = new MaireFetch();
      let params;
      document.querySelector('.recherche'),addEventListener('click', function(e){
        const valeur = document.querySelector('.champ-recherche').value;
        const cible = e.target;
        if(cible.classList.contains('btn-recherche-nom')){
          params = {
            'type' : 'nom',
            'valeur' : valeur,
            'callback' : this.afficherRecherche
          };
          oMaires.rechercheMaires(params);
        }else if(cible.classList.contains('btn-recherche-date')){
          params = {
            'type' : 'date',
            'valeur' : valeur,
            'callback' : this.afficherRecherche
          };
          oMaires.rechercheMaires(params);
        }
      }.bind(this));
    }

    getListe(){
      const gabarit = document.querySelector('[id="tmpl_liste"]').innerHTML;
      this.#domParent.innerHTML = gabarit;
      const oMaires = new MaireFetch();
      let params;
      document.querySelector('.liste').addEventListener('click', function(e){
        const domOrdre = document.querySelectorAll('[name="ordre"]');
        const cible = e.target;
        let ordre;

        for(let i = 0; i < domOrdre.length; i++) {
          if(domOrdre[i].checked)
              ordre = domOrdre[i].value;
        }
        if(cible.classList.contains('btn-liste-nom')){
          params = {
            'type' : 'nom',
            'ordre' : ordre,
            'callback' : this.afficherListe
          }
          oMaires.listeMaires(params);
        }else if(cible.classList.contains('btn-liste-date')){
          params = {
            'type' : 'date',
            'ordre' : ordre,
            'callback' : this.afficherListe
          }
          oMaires.listeMaires(params);
        }
      }.bind(this));
    }

    afficherRecherche(data){
      const mairesDestination = document.querySelector('[id="insert_rangee"]');
      const gabarit = document.querySelector('[id="tmpl_rangee"]');
      Affichage.afficher(data, gabarit, mairesDestination);

    }

    afficherListe(data){
      const mairesDestination = document.querySelector('[id="insert_rangee"]');
      const gabarit = document.querySelector('[id="tmpl_rangee"]');
      Affichage.afficher(data, gabarit, mairesDestination);
    }

  }