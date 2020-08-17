var table = "idTeam";
const dbPromise = idb.open("team",1,function(db){
    db.createObjectStore(table);
});

function addTeam(id, name, url){
    dbPromise.then(function(db){
        var tx = db.transaction(table, 'readwrite');
        var store = tx.objectStore(table);
        var item = {
            idTeam: id,
            nameTeam: name,
            urlTeam: url
        };

        store.put(item,id);
        return tx.complete;
    }).then(function(){
        console.log("Simpan berhasil");
        showAddSuccessNotification(name);
    }).catch(function(){
        console.log("Gagal simpan");
    })
}

function getSaved(){
    dbPromise.then(function(db){
        var tx = db.transaction(table,'readonly');
        var store = tx.objectStore(table);
        return store.getAll();
    }).then(function(items){
        getFavourite(items);
    })
}

function delTeam(id){
    dbPromise.then(function(db){
        var tx = db.transaction(table,'readwrite');
        var store = tx.objectStore(table);
        store.delete(id);
        return tx.complete;
    }).then(function(){
        console.log("Item : "+id+" deleted");
        showDeleteSuccessNotification(name);
        document.location.reload();
    })
}