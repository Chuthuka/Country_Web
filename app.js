console.log("JS");

let countriesArrayList = [];

let index = 0;

function loadCountries() {
    let countriesList = document.getElementById("countriesList");

    let body = "";

    fetch("https://restcountries.com/v3.1/all")
        .then(res => res.json())
        .then(dataList => {
            countriesArrayList = dataList;
            dataList.forEach(element => {
                body += `
                               <div class="col" id="${index++}" data-aos="zoom-in">
                        <div class="card shadow-sm width=700px">
                            
                            <img src="${element.flags.png}" class="img-fluid" style="width:100%; height:200px; object-fit:cover;" alt="Country Flag">

                            <div class="card-body">
                            <h4>${element.name.common}</h4>
                            <h5>${element.name.official}</h5>
                        
                            <p>${element.maps.googleMaps}</p>
                             <p>${element.timezones}</p>
                            

                                <p class="card-text">visit more--></p>
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="btn-group">
                                       <button type="button" onclick="loadModalData(${index})" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal">View More-></button>
                                    </div>
                                    <small class="text-body-secondary">${element.timezones}</small>
                                </div>
                            </div>
                        </div>
                    </div>
            `


            });
            console.log(dataList);

            countriesList.innerHTML = body;
        })
}


function loadModalData() {
    // console.log("modal");
    // let modalBody = document.getElementById("modal-body");
    // console.log(modalBody);
    console.log(countriesArrayList);
    alert(index);

}



//Search click

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("countryModal").querySelector(".modal-content").style.backgroundColor = "#5A5A5A";
    document.getElementById("countryModal").querySelector(".modal-content").style.color = "white";

    document.getElementById("btnSearch").addEventListener("click", function () {
        let searchTxt = document.getElementById("txtSearch").value.trim();
        if (!searchTxt) {
            alert("Please enter a country name.");
            return;
        }

        fetch(`https://restcountries.com/v3.1/name/${searchTxt}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error("Country not found.");
                }
                return res.json();
            })
            .then(data => {
                console.log("API Response:", data); // Debugging log

                if (!Array.isArray(data) || data.length === 0) {
                    alert("No country found!");
                    return;
                }

                let country = data[0];

                let countryName = country.name?.common || "N/A";
                let flagUrl = country.flags?.svg || "https://via.placeholder.com/150";
                let capital = country.capital?.[0] || "N/A";
                let region = country.region || "N/A";
                let population = country.population ? country.population.toLocaleString() : "N/A";
                let currency = country.currencies
                    ? Object.values(country.currencies)[0]?.name || "N/A"
                    : "N/A";
                let languages = country.languages
                    ? Object.values(country.languages).join(", ")
                    : "N/A";

                // Update Modal Content
                document.getElementById("modalTitle").innerText = countryName;
                document.getElementById("modalBody").innerHTML = `
                    <img src="${flagUrl}" alt="${countryName} flag" style="width:100%; border-radius: 10px;">
                    <p><strong>Capital:</strong> ${capital}</p>
                    <p><strong>Region:</strong> ${region}</p>
                    <p><strong>Population:</strong> ${population}</p>
                    <p><strong>Currency:</strong> ${currency}</p>
                    <p><strong>Languages:</strong> ${languages}</p>
                `;

                let modalElement = document.getElementById('countryModal');
                let modalInstance = new bootstrap.Modal(modalElement);

                // Show the modal
                modalInstance.show();
            })
            .catch(err => {
                console.error("Error fetching country data:", err);
                alert("Error: Unable to fetch country details.");
            });
    });
});




async function loadModalData(index) {
    let modalBody = document.getElementById("modal-body");
    console.log(countriesArrayList[index]);

    modalBody.innerHTML = `
        
      
        <div class="card" style="width: 18rem; ">
      <div class="card-body">
         <img src="${countriesArrayList[index].flags.png}" class="img-fluid" style="width:100%; height:200px; object-fit:cover;" alt="Country Flag">

        <h5 class="card-title">${countriesArrayList[index].name.official}</h5>
        <h6 class="card-subtitle mb-2 text-body-secondary"> ${countriesArrayList[index].name.official}</h6>
        <p class="card-text">Capital : ${countriesArrayList[index].capital}</p>
         <p class="card-text">Region : ${countriesArrayList[index].region}</p>
          <p class="card-text">Population : ${countriesArrayList[index].population}</p>
        <a href="#" class="card-link">View More-></a>
        <a href="#" class="card-link">Another link</a>
      </div>
    </div>
        `
}






loadCountries();
