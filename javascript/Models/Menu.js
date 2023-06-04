class Menu 
{
    // labels est un tableau de string (les items du menu).
    #labels;
    
    // esp est l’espacement en pixels entre deux items (devrait être pair).
    #esp;

    // disp définit l’orientation du menu (0 = horizontal, 1 = vertical).
    #disp;

    // conteneur des li
    #htmlUlElement;

    /**
     * @param {string[]}    labels  Le nom des labels a ajouter au menu
     * @param {int}         esp     Espacement entre les label  
     * @param {smallint}    disp    Disposition du menu (0 = horizontal, 1 = vertical)
     */
    constructor(labels = [], esp = 20, disp = 0)
    {
        this.#labels          =   labels;
        this.#esp             =   esp;
        this.#disp            =   disp;
        this.#htmlUlElement   =   document.createElement('ul');
        this.#htmlUlElement.addEventListener('click', e => this.#getCustomEvent(e));
    }

    /**
     * Modifie l'espacement entre les items du menu
     * @param {int} esp 
     */
    setEsp(esp)
    {
        this.#esp = esp;
        this.#applyStyleForAllLi();
        return this;
    }

    /**
     * Modifie l'orientation du menu
     * @param {int} disp 
     */
    setDisp(disp)
    {
        this.#disp = disp;
        this.#ApplyStyleForUl();
        this.#applyStyleForAllLi();
        return this;
    }

    /**
     * Ajoute un item au menu
     * @param {string} label 
     */
    addItem(label)
    {
        this.#labels.push(label);
        this.#addItemListForUl(label);
        this.#applyStyleForAllLi();
        return this;
    }

    /**
     * Fonction qui génére les labels (les items du menu HTMLIElement) 
     * @param {string} label
     */
    #generatieListItem(label)
    {
        const textNode      =   document.createTextNode(label);     
        const li            =   document.createElement('li');
        li.appendChild(textNode)
        return li;
    }

    /**
     * Fonction qui retourne l'objet menu
     * @returns {HTMLUListElement} 
     */
    getObjDOM() 
    {
        this.#labels.forEach(label => this.#addItemListForUl(label));
        this.#ApplyStyleForUl();
        this.#applyStyleForAllLi();

        return this.#htmlUlElement;
    }   


    /**
     * Génére le style pour un élement li
     * @returns {string}
     */
    #generateLiStyle()
    {
        const liHoriztonTalStyle    =   `padding-right: ${this.#esp}px; padding-left: ${this.#esp}px; padding-top: 30px; padding-bottom: 30px;`;
        const liVerticalStyle       =   `padding-right: 30px; padding-left: 30px; padding-top: ${this.#esp}px; padding-bottom: ${this.#esp}px;`;
        return this.#disp === 0 ? liHoriztonTalStyle : liVerticalStyle;
    }

    /**
     * Génére le style pour un élément ul
     * @returns string
     */
    #generateUlStyle()
    {
        const ulBaseStyle         =   "display: flex; list-style: none; background: #006266; color: #ffffff; font-weight: bold; text-align: center; height: 100%; width: 100%;";
        const ulHorizontalStyle   =   ulBaseStyle + "flex-wrap: wrap; justify-content: center;";
        const ulVerticalStyle     =   ulBaseStyle + "flex-direction: column;";
        return this.#disp === 0 ? ulHorizontalStyle : ulVerticalStyle;
    }

    /**
     * Applique le style css correspondant pour chaque li de l'élement ul
     */
    #applyStyleForAllLi()
    {
        const listLi = this.#htmlUlElement.querySelectorAll('li');
        const style  = this.#generateLiStyle();
        listLi.forEach((li, index) => {
            li.style.cssText = style;
            li.setAttribute('index', index);
        })
    }

    /**
     * Applique le style pour un élément ul
     */
    #ApplyStyleForUl()
    {
        this.#htmlUlElement.style.cssText = this.#generateUlStyle();
    }

    /**
     * Ajoute un élément li a la liste
     * @param {string} label contenu dans le li
     */
    #addItemListForUl(label)
    {
        this.#htmlUlElement.appendChild(this.#generatieListItem(label));
    }

    /**
     * Fonction qui dispatch l'event "menu_click" et qui set l'attribut du lit dans le detail.index de l'event
     * @param {MouseEvent} event 
     */
    #getCustomEvent(event)
    {
        this.#htmlUlElement.dispatchEvent(
            new CustomEvent("menu_click", {
                detail: {
                    index: event.target.getAttribute('index')
                }        
            })
        )
    }
}