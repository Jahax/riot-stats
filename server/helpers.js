// Find Spell Data in JSON based off of key in object
module.exports.findDataKey = (id, data) => {
	for (let key of Object.keys(data)) {
        if(data[key].key == id){
            return data[key];
        }
    }
}

// Find Item Data in JSON based off of object
module.exports.findItemDataObject = (id, data) => {
    var item = '';
    Object.keys(data).forEach((key, index) => {
        if(key == id){
            item = data[key];
        }
     })	
     return item;
}

// Find Rune Data in JSON based off of key in object
module.exports.findRuneDataObject = (id, data) => {
    for(let i = 0; i < data.slots.length; i++){
        for(let a = 0; a < data.slots[i].runes.length; a++){
            if(data.slots[i].runes[a].id == id){
                return data.slots[i].runes[a];
            }
        }
    }
}