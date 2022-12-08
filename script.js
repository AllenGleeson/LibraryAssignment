displayBooks();

document.getElementById("addBook").addEventListener("click", function(){
    let book = {
        name: prompt("Please enter the name of the book"),
        read: confirm("Mark as read?")
    };
    addBook(book);
    displayBooks();
});

function addBook(book){
    let books = getBooks();
    book.id = books.length ? books[books.length - 1].Id : 1;
    books.push(book);

    window.localStorage.setItem('books', JSON.stringify(books));
}
function deleteBook(id){
    let books = getBooks();
    books = books.filter(book => book.id !== id);
    window.localStorage.setItem('books', JSON.stringify(books));

}
function editBook(book){
    let books = getBooks();
    let bookIndex = books.findIndex(b => b.id === book.id);
    books[bookIndex].read = !books[bookIndex].read;
    window.localStorage.setItem('books', JSON.stringify(books));
}
function getBooks(){
    let books = JSON.parse(window.localStorage.getItem('books'));
    if(!books){
        return [];
    }
    return books;
}

function displayBooks(){
    let table = document.querySelector("#bookTable tbody");
    table.replaceChildren();

    let books = getBooks();
    books.forEach(book => {
        let row = table.insertRow();
        let cellName = row.insertCell();
        let cellRead = row.insertCell();
        let cellOptions = row.insertCell();

        cellName.innerHTML = book.name;
        cellRead.innerHTML = book.read;

        let toggleReadBtn = document.createElement("button");
        toggleReadBtn.className = "toggleReadBtn btn";
        if(book.read){
            toggleReadBtn.innerHTML = "Mark as unread";
        }else{
            toggleReadBtn.innerHTML = "Mark as read";
        }
        let deleteBtn = document.createElement("button");
        deleteBtn.className = "deleteBtn btn";
        deleteBtn.innerHTML = "Delete";

        cellOptions.appendChild(toggleReadBtn);
        cellOptions.appendChild(deleteBtn);

        cellOptions.querySelector(".toggleReadBtn").addEventListener("click", function(){
            editBook(book);
            displayBooks();
        });

        cellOptions.querySelector(".deleteBtn").addEventListener("click", function(){
            deleteBook(book.id);
            displayBooks();
        });
    });
}