console.log("JS");

let countriesArrayList = [];

let index = 0;

function loadCountries(){
    let countriesList = document.getElementById("countriesList");
 
    let body = "";
    
    fetch("https://restcountries.com/v3.1/all")
    .then(res=>res.json())
    .then(dataList=>{
        countriesArrayList=dataList;
        dataList.forEach(element => {
            body+=`
                               <div class="col" id="${index++}" data-aos="zoom-in">
                        <div class="card shadow-sm">
                            <img src="${element.flags.png}" alt="">
                            <div class="card-body">
                                <p class="card-text">This is a wider card with supporting text below as a natural
                                    lead-in to
                                    additional content. This content is a little bit longer.</p>
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="btn-group">
                                       <button type="button" onclick="loadModalData()" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal">View More-></button>
                                    </div>
                                    <small class="text-body-secondary">9 mins</small>
                                </div>
                            </div>
                        </div>
                    </div>
            `
        });

        countriesList.innerHTML=body;
    })
}


function loadModalData(){
    // console.log("modal");
    // let modalBody = document.getElementById("modal-body");
    // console.log(modalBody);
    console.log(countriesArrayList);
    alert(index);
  
}

function search(){
    let searchTxt = document.getElementById("txtSearch").value;
    console.log(searchTxt);
    fetch(`https://restcountries.com/v3.1/name/${searchTxt}`)
    .then(res=>res.json())
    .then(data=>{
        console.log(data);
        
    })
        
    }

    function loadModalData(){
        async function loadModalData(index){
            // console.log("modal");
            // let modalBody = document.getElementById("modal-body");
            let modalBody = document.getElementById("modal-body");
            // console.log(modalBody);
            console.log(countriesArrayList);
            alert(index);
            let log = document.querySelectorAll('.show-more');
        
            console.log(log);
            console.log(countriesArrayList[index]);
        
            modalBody.innerHTML = `<img src="${countriesArrayList[index].flags.png}" alt="">`
        
        }
        }

    




loadCountries();
