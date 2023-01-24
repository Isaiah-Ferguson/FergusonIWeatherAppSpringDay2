function saveToLocalStorageByName(name) {
    //get the current values that are saved into local storage
    // create an array of values to store into local storage
    let favorites = getLocalStorage();

    //add new name into our favorites array

    favorites.push(name);

    //save updated array to local storage
    localStorage.setItem('Favorites', JSON.stringify(favorites));

}

function getLocalStorage(){
    // get all of the values that are stored in favorites in local storage

    let localStorageData = localStorage.getItem('Favorites');

    if (localStorageData == null) {
        return [];
    }
    return JSON.parse(localStorageData);
}

function removeFromLocalStorage(name){
    let favorites = getLocalStorage();

    // find the index of the name in local storage

    let nameindex = favorites.indexOf(name);

    //remove the name from the array using the splice method.
    favorites.splice(nameindex, 1);

    // save updated array to local storage
    localStorage.setItem('Favorites', JSON.stringify(favorites));
}

export{saveToLocalStorageByName, getLocalStorage, removeFromLocalStorage}