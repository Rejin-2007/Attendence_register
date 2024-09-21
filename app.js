document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("addForm");
    const searchForm = document.getElementById("searchForm");
    const addItemInput = document.getElementById("addItem");
    const searchInput = document.getElementById("search");
    const itemList = document.getElementById("itemList");
    const noItemsMessage = document.getElementById("noItemsMessage");

    let items = JSON.parse(localStorage.getItem("todo_list")) || [];

    const displayItems = (itemsToDisplay) => {
        itemList.innerHTML = "";
        itemsToDisplay.forEach(item => {
            const li = document.createElement("li");
            li.className = "item";

            const label = document.createElement("label");
            label.textContent = item.doing;
            li.appendChild(label);

            const handleSide = document.createElement("div");
            handleSide.className = "handleSide";

            const count = document.createElement("p");
            count.textContent = item.count;

            const minusButton = document.createElement("span");
            minusButton.className = "aAndRButton";
            minusButton.textContent = "-";
            minusButton.addEventListener("click", () => {
                if (item.count > 0) {
                    item.count -= 1;
                    count.textContent = item.count;
                    saveItems();
                }
            });

            const plusButton = document.createElement("span");
            plusButton.className = "aAndRButton";
            plusButton.textContent = "+";
            plusButton.addEventListener("click", () => {
                item.count += 1;
                count.textContent = item.count;
                saveItems();
            });

            handleSide.appendChild(minusButton);
            handleSide.appendChild(count);
            handleSide.appendChild(plusButton);
            li.appendChild(handleSide);

            const deleteButton = document.createElement("button");
            deleteButton.innerHTML = "&times;";
            deleteButton.addEventListener("click", () => {
                items = items.filter(i => i.id !== item.id);
                saveItems();
                displayItems(items);
            });
            li.appendChild(deleteButton);

            itemList.appendChild(li);
        });

        noItemsMessage.style.display = itemsToDisplay.length ? "none" : "block";
    };

    const saveItems = () => {
        localStorage.setItem("todo_list", JSON.stringify(items));
    };

    const capitalizeFirstLetter = (sentence) => {
        const words = sentence.split(' ');
        const capitalizedWords = words.map(word => {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        });
        return capitalizedWords.join(' ');
    };

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const newItem = capitalizeFirstLetter(addItemInput.value.trim());

        if (newItem !== "") {
            const newItemObject = {
                id: Date.now().toString(),
                doing: newItem,
                count: 0,
            };

            items.push(newItemObject);
            saveItems();
            displayItems(items);
            addItemInput.value = "";
        }
    });

    searchForm.addEventListener("input", () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredItems = items.filter(item => item.doing.toLowerCase().includes(searchTerm));
        displayItems(filteredItems);
    });

    const updateDate = () => {
        const currentDate = new Date().toLocaleDateString();
        document.getElementById("date").textContent = currentDate;
    };

    updateDate();
    displayItems(items);
});
