let labels = ["Accueil", "Produits","Contact"]; 
let menu = new Menu(labels);
let menuObj = menu.getObjDOM(); menuObj.addEventListener('menu_click', evt =>
console.log(`Clic sur ${labels[evt.detail.index]}`)); out.appendChild(menuObj);
setTimeout(() => menu.setEsp(100).setDisp(1).addItem('Test'), 5000);
