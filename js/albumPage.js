
function getDB() {
  $.ajax({
      url: 'https://tdst3pf014.execute-api.us-east-2.amazonaws.com/v1/getphotos',
      success: function (pics) {
        console.log("in load photos")
        console.log(pics)
        pic_list = [];
        id_num = pics['Count'];
          for (let i = 0; i < pics['Count']; i++){
            // console.log(pics)
            pic_list.push({
              'id': pics['Items'][i]['id']['S'],
              'name': pics['Items'][i]['name']['S'],
              'personal_id': pics['Items'][i]['personal_id']['S'],
              'phone': pics['Items'][i]['phone']['S'],
              'ip': pics['Items'][i]['ip']['S'],
            })
          }
          console.log(pic_list)
          createTable(pic_list);
      },
      error: function () {
          $("section").replaceWith(`<div id="errorLoadMusic">Error, failed to load the music list</div>`);
      }
  });
}


function loadPhotos() {
  $('#getClientsBtn').click(getDB);
}

function createTable(pics) {
  let tbl = ''
  $.get
  let table = `
          <table style="width:90%">
               <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>ID</th>
                      <th>Phone Number</th>
                      <th>IP Address</th>
                    </tr>
               </thead>
              <tbody>`;
  for (i = 0; i < pics.length; i++) {
      table +=
          `<tr>
              <th>${i + 1}</th>
              <td>${pics[i].name}</td>
              <td>${pics[i].personal_id}</td>
              <td>${pics[i].phone}</td>
              <td>${pics[i].ip}</td>
              </tr>`;
  }

  table += ` </tbody></table>`;
  $("#getClientsDiv").replaceWith(`<div id="getClientsDiv">
                                    ${table}
                                  </div>`);
  // document.getElementById("addPhotoBtn").addEventListener("click",  clickListener);
}

function response() {
  if (xhttp.readyState == 4 && xhttp.status == 200) {    
      let res = JSON.parse(xhttp.responseText);
      console.log("OK!!!!")
      console.log(res)
      getDB()
  }
  else{
    console.log("something is wrong");
    console.log(xhttp.responseText)
  }

}


function isValidIsraeliID(id) {
	var id = String(id).trim();
	if (id.length > 9 || id.length < 5 || isNaN(id)) return false;
	// Pad string with zeros up to 9 digits
  	id = id.length < 9 ? ("00000000" + id).slice(-9) : id;
  	return Array
            .from(id, Number)
  		    .reduce((counter, digit, i) => {
		        const step = digit * ((i % 2) + 1);
                        return counter + (step > 9 ? step - 9 : step);
    	            }) % 10 === 0;
}


function clickListener() {
  const API_ENDPOINT = 'https://tdst3pf014.execute-api.us-east-2.amazonaws.com/v1/addClient';
  xhttp = new XMLHttpRequest();
  let client_name = document.getElementById("client_name").value;
  let client_id = document.getElementById("personal_id").value;
  let client_phone = document.getElementById("client_phone").value;
  let client_ip = document.getElementById("client_ip").value;
  if (!isValidIsraeliID(client_id)){
    alert(client_id + " is an invalid Israeli ID")
    return
  }
  console.log(client_ip)
  console.log(client_phone)
  console.log(client_id)
  console.log(client_name)
  id_num += 1;
  let pic = {
    "id": id_num.toString(),
    "name": client_name,
    "personal_id": client_id,
    "phone": client_phone,
    "ip": client_ip
  }

  // console.log(pic)
  // xhttp.onreadystatechange = function() { response();}
  // xhttp.open("POST", API_ENDPOINT, true);
  // xhttp.setRequestHeader('Content-Type', 'application/json');
  // xhttp.send(JSON.stringify(pic));


  $.ajax({
    type: 'POST',
    url:API_ENDPOINT,
    contentType: 'application/json',
    data: JSON.stringify(pic),
    processData: false,
    encode: true,
    success: (data) => {
      console.log(data)
    },
    error:(data) => {
      console.log(data)
    }
  });
}



onLoad = function () {
  var id_num = 0;
  loadPhotos();

  console.log("in on load")
};

$("document").ready(onLoad); 