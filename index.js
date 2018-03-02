var createKeyBoardItem = function() {
    let keyBordListDiv = document.querySelector(".div-c-keyBoard")
    let keyArray = [
        ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
        ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
        ["z", "x", "c", "v", "b", "n", "m"],
    ]
    for (let i = 0; i < keyArray.length; i++) {
        let newDiv = document.createElement("div")
        keyBordListDiv.appendChild(newDiv)
        let keys = keyArray[i]
        for (let j = 0; j < keys.length; j++) {
            let newKey = document.createElement("kbd")
            newKey.classList.add("keyItem")
            newKey.id = "kbd-i-" + keys[j]
            newKey.textContent = keys[j]
            newDiv.appendChild(newKey)
        }
    }
}

var showKeyBindEditModal = function() {
    $("#editModal").modal("show")
}

var bindWindowKeyDownEvent = function() {
    document.addEventListener("keypress", function(event) {
        let keyValue = event.key
        let keyElment = document.querySelector("#kbd-i-" + keyValue)
        keyElment.classList.add("keyItem-press")
        setTimeout(function() {
            keyElment.classList.remove("keyItem-press")
        }, 80)
        let pText = document.querySelector(".p-i-keyPressStatus")
        let upCaseWord = keyValue.toUpperCase()
        pText.innerHTML = `你按了${upCaseWord}`
        pText.classList.add("p-i-fadeIn")
        setTimeout(function() {
            pText.classList.remove("p-i-fadeIn")
        }, 600)
    })
}

var bindKeyClickEvent = function() {
    let allKeys = document.querySelectorAll(".keyItem")
    for (let j = 0; j < allKeys.length; j++) {
        var key = allKeys[j]
        key.addEventListener("click", function(event) {
            showKeyBindEditModal()
        })
    }
}

var __main = function() {
    createKeyBoardItem()
    bindWindowKeyDownEvent()
    bindKeyClickEvent()
}

__main()