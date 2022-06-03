// La div qui se trouve dans notre html de base
const app = document.querySelector('#app')

// Les items sur lesquels faire nos opérations
const items = [
  {
    img:
      'https://images.unsplash.com/photo-1532618500676-2e0cbf7ba8b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1420&q=80',
    price: 9.99,
    category: 'category1'
  },
  {
    img:
      'https://images.unsplash.com/photo-1532618500676-2e0cbf7ba8b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1420&q=80',
    price: 9.99,
    category: 'category1'
  },
  {
    img:
      'https://images.unsplash.com/photo-1532618500676-2e0cbf7ba8b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1420&q=80',
    price: 9.99,
    category: 'category1'
  },
  {
    img:
      'https://images.unsplash.com/photo-1532618500676-2e0cbf7ba8b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1420&q=80',
    price: 12,
    category: 'category2'
  },
  {
    img:
      'https://images.unsplash.com/photo-1532618500676-2e0cbf7ba8b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1420&q=80',
    price: 12,
    category: 'category2'
  },
  {
    img:
      'https://images.unsplash.com/photo-1532618500676-2e0cbf7ba8b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1420&q=80',
    price: 12,
    category: 'category2'
  }
]

// Cart array, le tableau qui contient les items du paniers
const cart = []

// Functions, la fonction qui ajoute lles items dans le paniers
const addItemToCart = (index) /** or element */ => {
  cart.push(items[index])
  createItems(selectedItemsList, cart)
  let totalValue = cart.reduce((prevValue, currValue, idx) => {
      return prevValue + currValue.price
    },0)
  const cartTotalValueSpan = document.getElementById("cart_value");
  cartTotalValueSpan.innerHTML = `${Math.round(totalValue, 2)}`;
  // or cart.push(el)
}

// On crée notre button select qui nous permet de sélectionner les éléments à afficher selon la catégorie
const filterSelect = document.createElement("select"); // On crée l'élément select dans notre dom virtuelle 
const option1 = document.createElement("option"); // on ajoute les 3 option, ce lien montre à quoi ça ressemble en html: https://www.w3schools.com/tags/tag_select.asp 
const option2 = document.createElement("option");
const option3 = document.createElement("option");
option1.value = "default"; // Il faut ajouter une value à chaque option pour gérer que l'on va pouvoir récupérer en cliquant dessus 
option1.text = "default"; // Ici c'est le text qui sera afficher sur notre html
option2.value = "category1";
option2.text = "category1";
option3.value = "category2";
option3.text = "category2";
filterSelect.appendChild(option1); // On ajoute l'option à notre select
filterSelect.appendChild(option2);
filterSelect.appendChild(option3);
app.appendChild(filterSelect); // Et on ajoute notre select notre div app qui se trouve dans notre html


//  On ajoute un écouteur à notre select pour pouvoir filtrer nos éléments selon la catégorie sélectionner 
filterSelect.addEventListener("change", function(e) {
  let newItems = items;
  if (e.target.value != "default") {
    newItems = items.filter(el => el.category === e.target.value);
  }
  createItems(cardList, newItems);
})

// Ici on crée le conteneur qui va avoir nos items données par défaut, c'est le tableau items de la ligne 5
const cardList = document.createElement('div')
cardList.className = 'items_list' // On ajoute une classe 
const selectedItemsList = document.createElement('div') // On crée notre panier qui va contenir nos items sélectionner 
selectedItemsList.className = 'cart_list' // ON ajoute un classe

// Cette fonction crée nos items dans le html 
const createItems = (divList, arrToDisplay) => {
  divList.innerHTML = ''
  const cartTotalValueSpan = document.createElement('span')
  cartTotalValueSpan.id = "cart_value";
  selectedItemsList.appendChild(cartTotalValueSpan)

  arrToDisplay.map((el, idx) => {
    // Validé
    const card = document.createElement('div')
    // On y ajoute notre style direct sans passer par un fichier css 
    card.className = 'card'
    card.style.width = '50vw'
    card.style.height = '60vh'
    card.style.display = 'flex'
    card.style.flexDirection = 'column'
    card.style.border = '1px solid black'
    card.style.padding = '15px'
    card.style.marginBottom = '10px'

    // app.appendChild(card)

    // Oncrée une image 
    const img = document.createElement('img')
    img.src = el.img
    img.style.width = '100%'
    img.style.height = '100%'

    // On crée notre span pour afficher prix de l'item
    const priceSpan = document.createElement('span')
    priceSpan.style.cursor = 'pointer' // Ici on dit que lorsque l'on passe la souris sur l'élément, une petite main apparaît 
    priceSpan.onclick = () => addItemToCart(idx) // lorsqu'on clique sur le span, on ajoute l'élément dans le panier grâce à la fonction addItemtocart

    const categorySpan = document.createElement('span') // On crée un span pour afficher la catégorie de l'élément
    priceSpan.innerHTML =`${el.price} €` // ON affiche le prix correspondant
    categorySpan.innerHTML = el.category // On affiche le catégory correspondante

    card.appendChild(img) // On ajoute l'image à la carte 
    card.appendChild(priceSpan) // on ajoute le span qui affiche le prix à la carte 
    card.appendChild(categorySpan) // on ajoute le span qui affiche la catégorie à la carte 
    divList.appendChild(card) // On fini par ajouter la carte (qui est notre item complet) à notre conteneur aka  list d'items
  })
}

createItems(cardList, items) // On execute la fonction qui crée notre liste d'items

app.appendChild(cardList) // On ajoute notre list à notre html sinon on ne verra rien 
app.appendChild(selectedItemsList) // On ajoute notre panier à notre html sinon le panier n'apparaîtra pas 
