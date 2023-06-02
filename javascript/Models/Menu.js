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
    }

    /**
     * Modifie l'espacement entre les items du menu
     * @param {int} esp 
     */
    setEsp(esp)
    {
        this.#esp = esp;
        this.applyStyleForAllLi();
        return this;
    }

    /**
     * Modifie l'orientation du menu
     * @param {int} disp 
     */
    setDisp(disp)
    {
        this.#disp = disp;
        this.ApplyStyleForUl();
        this.applyStyleForAllLi();
        return this;
    }

    /**
     * Ajoute un item au menu
     * @param {string} label 
     */
    addItem(label)
    {
        this.#labels.push(label);
        this.addItemListForUl(label);
        this.applyStyleForAllLi();
        return this;
    }

    /**
     * Fonction qui génére les labels (les items du menu HTMLIElement) 
     */
    generatieListItem(label)
    {
        const textNode      =   document.createTextNode(label);     
        const li            =   document.createElement('li');
        li.appendChild(textNode)
        return li;
    }

    /**
     * Fonction qui retourne l'objet menu
     */
    getObjDOM() 
    {
        this.#labels.forEach(label => this.addItemListForUl(label));
        this.ApplyStyleForUl();
        this.applyStyleForAllLi();

        return this.#htmlUlElement;
    }   


    /**
     * Génére le style pour un élement li
     * @returns string
     */
    generateLiStyle()
    {
        const liHoriztonTalStyle    =   `margin-right: ${this.#esp}px; margin-left: ${this.#esp}px; margin-top: 30px; margin-bottom: 30px;`;
        const liVerticalStyle       =   `margin-right: 30px; margin-left: 30px; margin-top: ${this.#esp}px; margin-bottom: ${this.#esp}px;`;
        return this.#disp === 0 ? liHoriztonTalStyle : liVerticalStyle;
    }

    /**
     * Génére le style pour un élément ul
     * @returns string
     */
    generateUlStyle()
    {
        const ulBaseStyle         =   "display: flex; list-style: none; background: #006266; color: #ffffff; font-weight: bold; text-align: center; height: 100%; width: 100%;";
        const ulHorizontalStyle   =   ulBaseStyle + "flex-wrap: wrap; justify-content: center;";
        const ulVerticalStyle     =   ulBaseStyle + "flex-direction: column;";
        return this.#disp === 0 ? ulHorizontalStyle : ulVerticalStyle;
    }

    /**
     * Applique le style css correspondant pour chaque li de l'élement ul
     */
    applyStyleForAllLi()
    {
        const listLi = this.#htmlUlElement.querySelectorAll('li');
        const style  = this.generateLiStyle();
        listLi.forEach(li => li.style.cssText = style)
    }

    /**
     * Applique le style pour un élément ul
     */
    ApplyStyleForUl()
    {
        this.#htmlUlElement.style.cssText = this.generateUlStyle();
    }

    addItemListForUl(label)
    {
        this.#htmlUlElement.appendChild(this.generatieListItem(label));
    }
}