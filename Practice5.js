document.addEventListener("DOMContentLoaded", () => {
    const btnAdd = document.getElementById("btnAdd");
    const inputItem = document.getElementById("txtItem");
    const list = document.getElementById("itemList");

    let items = [];

    function renderList() {
        list.innerHTML = "";

        if (items.length === 0) {
            list.innerHTML = `
                <div id="loadingState">
                    <img src="https://img.freepik.com/vector-gratis/cargando-circulos-azul-degradado_78370-2646.jpg?semt=ais_hybrid&w=740&q=80" alt="Loading" class="loading-image">
                </div>
            `;
            return;
        }

        items.forEach((item, index) => {
            let li = document.createElement("li");
            li.innerHTML = `
                <span>${item.name}</span>
                <div>
                    <button class="edit-btn" onclick="editItem(${index})">Edit</button>
                    <button class="delete-btn" onclick="deleteItem(${index})">Delete</button>
                </div>
            `;
            list.appendChild(li);
        });
    }

    function addItem() {
        let itemName = inputItem.value.trim();
        if (itemName !== "") {
            items.push({ name: itemName });
            inputItem.value = "";
            renderList();
        }
    }

    window.deleteItem = function(index) {
        items.splice(index, 1);
        renderList();
    };

    window.editItem = function(index) {
        let newName = prompt("Edit item:", items[index].name);
        if (newName && newName.trim() !== "") {
            items[index].name = newName.trim();
            renderList();
        }
    };

    btnAdd.addEventListener("click", addItem);

    inputItem.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            addItem();
        }
    });

    renderList();
});