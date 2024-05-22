var myLibrary = [];
const cards = document.getElementById("cards");

function Book(title, author, dateOfPublication, read, pages) {
  this.title = title; 
  this.author = author; 
  this.dateOfPublication = dateOfPublication ;
  this.read = read; 
  this.pages = pages; 
}

Book.prototype.changeReadStatus = function(){
    if(this.read === true){
        this.read = false; 
    } else {
        this.read = true; 
    }
};


function addBookToLibrary(book) {
    myLibrary.push(book); 
}
function createBook(){
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let dateOfPublication = document.getElementById('dateOfPublication').value;
    let read = document.getElementById('read').checked;
    let pages = document.getElementById('pages').value;
    return (new Book(title, author, dateOfPublication, read, pages)); 
}

function showLibraryOnThePage (){
    cleancards(); 
    myLibrary.forEach(book => {
        addCardTothePage(createCard(book)); 
    }); 
}

function createCard(book){
    let card = document.createElement('div');
    card.className = "card"; 
    let cardText = document.createElement('div'); 
    card.appendChild(cardText); 
    let cardButton = document.createElement('div'); 
    card.appendChild(cardButton); 
    cardText.textContent = convertObjToString(book); 

    let deleteButton = document.createElement('button');
    deleteButton.textContent = "DELETE";  
    deleteButton.addEventListener('click', function(){   
        myLibrary = myLibrary.filter((currentBook)=>currentBook !==book);
        card.remove();
    })
    cardButton.appendChild(deleteButton);
    
    let changeReadStatusButton = document.createElement('button');
    changeReadStatusButton.textContent = "Change Read Status"; 
    changeReadStatusButton.addEventListener('click', function(){
        book.changeReadStatus();
        cardText.textContent = convertObjToString(book); 
    }); 
    cardButton.appendChild(changeReadStatusButton); 

    return card;     
}

function addCardTothePage(card){
    cards.appendChild(card);
}

const testBook = new Book("titleTest", "authoorTest","1233", "NO", "1234"); 

function convertObjToString(obj){
    return Object.keys(obj).map(key => `${key}: ${obj[key]}`).join(", ");
}


const form = document.querySelector('form');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  addBookToLibrary(createBook()); 
  showLibraryOnThePage();  
  form.reset(); 
}

function cleancards(){
    while(cards.firstChild){
        cards.removeChild(cards.firstChild); 
    }
}

/*addBookToLibrary(createBook());*/ 
showLibraryOnThePage(); 

