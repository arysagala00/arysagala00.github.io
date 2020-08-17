var base_url = "https://api.football-data.org/v2/";
var teams = "competitions/2021/teams/";
var area = "areas";
var option = {
    method: "get",
    mode: "cors",
    headers: {
        "X-Auth-Token": "c5f62d0cf4db4095be3b4514201d4463"
    }
};

function status(response) {
    if (response.status !== 200) {
        console.log("Error " + response.status);
        return Promise.reject(new Error(response.statusText));
    } else {
        return response;
    }
}

function json(response) {
    return response.json();
}

function error(error) {
    console.log("Error :" + error);
}

function getTeam() {
    fetch(base_url+teams, option)
        .then(status)
        .then(json)
        .then(function (data) {

            var contentHTML = "";

            data.teams.forEach(function (list) {
                var url = list.crestUrl.replace(/^http:\/\//i, "https://");
                contentHTML += `
            <div class="card">
                <table class="responsive-table">
                    <tbody>
                        <tr>
                            <td>
                                <a href="./detail.html?id=${list.id}">
                                    <div class="card-image waves-effect waves-block waves-light">
                                        <img src="${url}" height="300px" width="300px" />
                                    </div>
                                </a>
                                <div class="card-content">
                                    <p class="card-title truncate">${list.name}</p>
                                    <p class="card-title truncate">${list.address}</p>
                                </div>
                            </td>
                            <td>
                                <button onclick="addTeam(${list.id},'${list.name}','${url}')" class="waves-effect waves-light btn">Add</button>
                            </td>
                         </tr>
                    </tbody>
                 </table>
            </div> 
                  `;
            });

            document.getElementById("teams").innerHTML = contentHTML;
        })
        .catch(error);
}

function getTeamId() {
    var urlParams = new URLSearchParams(window.location.search);
    var id = urlParams.get("id");

    fetch(base_url + "teams/"+id, option)
        .then(status)
        .then(json)
        .then(function (data) {

            var detail = "";
                var url = data.crestUrl.replace(/^http:\/\//i, "https://");
                detail += `
                <div class="card">
                        <table class="responsive-table">
                            <tbody>
                                <tr>
                                    
                                        <div class="card-image">
                                            <img src="${url}" height="300px" width="300px" />
                                        </div>
                            
                                        <div class="card-content center-align">
                                            <p>${data.name}</p>
                                            <p>${data.address}</p>
                                            <p>${data.email}</p>
                                            <p>${data.website}</p>
                                            <p>${data.phone}</p>
                                            <p>${data.venue}</p>
                                        </div>
                                
                                </tr>
                            </tbody>
                        </table>    
                </div> 
                `;

            document.getElementById("detail").innerHTML = detail;
        })
        .catch(error);
}

function getArea(){
    fetch(base_url+area, option)
        .then(status)
        .then(json)
        .then(function (data) {

            var area = "";

            data.areas.forEach(function (list) {
                area += `
                <tr>
                    <td>${list.name}</td>
                    <td>${list.countryCode}</td>
                    <td>${list.parentArea}</td>     
                </tr>    
                  `;
            });

            document.getElementById("area").innerHTML = area;
        })
        .catch(error);
}

function getFavourite(items){

    var kontenSave = "";

    items.forEach(function(item){
        var id = item.idTeam;
        var name = item.nameTeam;
        var url = item.urlTeam;

        kontenSave +=`
        <div class="card">
            <table class="responsive-table">
                <tbody>
                    <tr>
                        <td>
                            <a href="./detail.html?id=${id}">
                                <div class="card-image waves-effect waves-block waves-light">
                                    <img src="${url}" height="300px" width="300px" />
                                </div>
                            </a>
                            <div class="card-content">
                                <p class="card-title truncate">${name}</p>
                            </div>
                        </td>
                        <td>
                            <button onclick="delTeam(${id})" class="waves-effect waves-light btn">Delete</button>
                        </td>
                     </tr>
                </tbody>
             </table>
        </div> 
              `;
    });

    document.getElementById("saved").innerHTML=kontenSave
    
}

function showAddSuccessNotification(name){
    const title = "Adding Success";
    const option = {
        'body': 'Adding '+name+' to saved'
    }

    if(Notification.permission === "granted"){
        navigator.serviceWorker.ready.then(function(registration){
            registration.showNotification(title,option);
        })
    }
}

function showDeleteSuccessNotification(name){
    const title = "Delete Success";
    const option = {
        'body': 'Delete '+name+' from saved succeeded'
    }

    if(Notification.permission === "granted"){
        navigator.serviceWorker.ready.then(function(registration){
            registration.showNotification(title,option);
        })
    }
}