let labels = ["Accueil", "Produits", "Contact"]; 
let menu = new Menu(labels);
let menuObj = menu.getObjDOM();

menuObj.addEventListener('menu_click', evt => console.log(`Clic sur ${labels[evt.detail.index]}`)); 

out.appendChild(menuObj);
