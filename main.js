let lists = JSON.parse(localStorage.getItem('lists')) || [];
let selectedIndex = JSON.parse(localStorage.getItem('selectedIndex'));

const addListInput = document.getElementById('add_list');
const chooseListDiv = document.querySelector('.choose_list');
const deleteListButton = document.getElementById('delete_list');

function updateLists() {
    chooseListDiv.innerHTML = '';
    lists.forEach((list, index) => {
        const listDiv = document.createElement('div');
        listDiv.textContent = list.toUpperCase();
        
        if (index === selectedIndex) {
            listDiv.classList.add('selected');
        }
        
        listDiv.addEventListener('click', function() {
            chooseListDiv.querySelectorAll('.selected').forEach(item => {
                item.classList.remove('selected');
            });
            listDiv.classList.add('selected');
            selectedIndex = index;
            localStorage.setItem('selectedIndex', JSON.stringify(selectedIndex));
        });
        chooseListDiv.appendChild(listDiv);
    });
}

function addList() {
    const newList = addListInput.value.trim();
    if (newList !== '') {
        lists.push(newList);
        localStorage.setItem('lists', JSON.stringify(lists));
        addListInput.value = '';
        updateLists();
        const newlyAddedListItem = chooseListDiv.lastChild;
        newlyAddedListItem.click();
    }
}

function deleteList() {
    if (selectedIndex !== null && selectedIndex !== undefined) {
        lists.splice(selectedIndex, 1);
        localStorage.setItem('lists', JSON.stringify(lists));
        if (lists.length > 0) {
            if (selectedIndex > 0) {
                selectedIndex--; // Select the previous item
            } else {
                selectedIndex = 0; // Select the next item
            }
        } else {
            selectedIndex = null; // No items left, reset selectedIndex
        }
        localStorage.setItem('selectedIndex', JSON.stringify(selectedIndex));;
        updateLists();  
    }
}


deleteListButton.addEventListener('click', deleteList);

addListInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        addList();
    }
});

updateLists();
