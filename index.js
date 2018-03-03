var WORD_LETTERS = "qwertyuioplkjhgfdsazxcvbnm"

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
            newKey.dataset.value = keys[j]
            newKey.textContent = keys[j]
            let path = getPathFormLocalStorage(keys[j])
            if (path != undefined) {
                var newImg = createNewImg(keys[j])
                newKey.appendChild(newImg)
            }
            newDiv.appendChild(newKey)
        }
    }
}

var createNewImg = function(key) {
    let newImg = document.createElement("img")
    let path = getPathFormLocalStorage(key) || ""
    newImg.src = path + "/favicon.ico"
    newImg.onerror = function(event) {
        var self = event.target
        self.src = "cloud-error.png"
    }
    return newImg
}

var showKeyBindEditModal = function() {
    $("#editModal").modal("show")
}

var hiddenKeyBindEditModal = function() {
    $("#editModal").modal("hide")
}

var showHeadTitleText = function(text) {
    let pText = document.querySelector(".p-i-keyPressStatus")
    pText.innerHTML = text
    pText.classList.add("p-i-fadeIn")
    setTimeout(function() {
        pText.classList.remove("p-i-fadeIn")
    }, 600)           
}

var bindWindowKeyDownEvent = function() {
    document.addEventListener("keypress", function(event) {
        let modalDiv = document.querySelector("#editModal")
        if (modalDiv.classList.contains("in")) {
            return
        }
        let keyValue = event.key
        if (!WORD_LETTERS.includes(keyValue)) {
            showHeadTitleText(`你按下了${keyValue}, 但是目前还没有增加该键的绑定`)
            return
        }
        let keyElment = document.querySelector("#kbd-i-" + keyValue)
        keyElment.classList.add("keyItem-press")
        setTimeout(function() {
            keyElment.classList.remove("keyItem-press")
        }, 80)
        let upCaseWord = keyValue.toUpperCase()
        var path = getPathFormLocalStorage(keyValue)
        var text = ""
        if (path != undefined) {
            text = `你按下了${upCaseWord}, 准备跳转`
            setTimeout(function() {
                window.open(path, "_blank")
            }, 200)            
        } else {
            text = `你按下了${upCaseWord}, 但是目前还没有绑定网站`  
        }
        showHeadTitleText(text)         
    })
}

var getPathFormLocalStorage = function(key) {
    var obj = getLocalStorageData()
    return obj[key]
}

var bindKeyClickEvent = function() {
    let allKeys = document.querySelectorAll(".keyItem")
    for (let j = 0; j < allKeys.length; j++) {
        var key = allKeys[j]
        key.addEventListener("click", function(event) {
            var currentKeyValue = event.currentTarget.dataset.value
            var spanText = document.querySelector(".span-c-currentKey")
            spanText.innerHTML = currentKeyValue.toUpperCase()
            var currentPath = getPathFormLocalStorage(currentKeyValue) || ""
            document.querySelector("#input-i-newSite").value = currentPath
            showKeyBindEditModal()
        })
    }
}

var getLocalStorageData = function() {
    var dataObj = localStorage.keyBindObject
    if (dataObj == undefined) {
        dataObj = {}
    } else {
        dataObj = JSON.parse(dataObj)
    }
    return dataObj
}

var upDateLocalStorageData = function(obj) {
    localStorage.keyBindObject = JSON.stringify(obj)
}

var bindSubmittBtn = function() {
    var btn = document.querySelector("#btn-i-submitEdit")
    btn.addEventListener("click", function(event) {
        var value = document.querySelector("#input-i-newSite").value
        var key = document.querySelector(".span-c-currentKey").innerHTML.toLowerCase()
        var keyBindObj = getLocalStorageData()
        if (!value.includes("http")) {
            value = "http://" + value
        }
        keyBindObj[key] = value
        upDateLocalStorageData(keyBindObj)
        let keyItem = document.querySelector("#kbd-i-" + key)
        if (keyItem.children.length == 0) {
            var img = createNewImg(key)
            keyItem.appendChild(img)
        } else {
            console.log("value", value)
            keyItem.querySelector("img").src = value + "/favicon.ico"
            console.log("src", keyItem.querySelector("img").src)
        }
        hiddenKeyBindEditModal()
        showHeadTitleText("绑定成功！")
    })
}

var bindRemoveBtn = function() {
    var btn = document.querySelector("#btn-i-removeBind")
    btn.addEventListener("click", function(event) {
        let key = document.querySelector(".span-c-currentKey").innerHTML.toLowerCase()
        var obj = getLocalStorageData()
        obj[key] = undefined
        let img = document.querySelector("#kbd-i-" + key).querySelector("img")
        if (img != undefined) {
            img.remove()
        }
        upDateLocalStorageData(obj)
        hiddenKeyBindEditModal()
        showHeadTitleText("解除绑定成功！")
    })
}

var bindModalBtnsEvent = function() {
    bindSubmittBtn()
    bindRemoveBtn()
}

var __main = function() {
    createKeyBoardItem()
    bindWindowKeyDownEvent()
    bindKeyClickEvent()
    bindModalBtnsEvent()
}

__main()