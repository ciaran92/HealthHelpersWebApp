var bool_isChild;
var bool_isMobileDevice;

var address1;
var address2;
var distance;

var openDiv;
var openDivContent;


var bool_section1Complete, bool_section2Complete, bool_section3Complete, bool_section4Complete;
var bool_communityCardEligibility, bool_ageEligibility, bool_distanceEligibility, bool_noTripsEligibility;


var dhbLocationList = ["Auckland", "Bay of Plenty", "Canterbury", "Capital & Coast", "Counties Manukau", "Hawke's Bay", "Hutt Valley", "Lakes Rotorua", "Lakes Taupo", "MidCentral", "Nelson Marlborough", "Northland", 
                "South Canterbury", "Southern", "Tairawhiti", "Taranaki", "Waikato", "Wairarapa", "Waitemata", "West Coast", "Whanganui"];

var dhbAddressList = [[["Level 1, Building 37", "Auckland City Hospital", "2 Park Road", "Grafton, Auckland 1023"],["(09) 367 0000"],["qascom@adhb.govt.nz"]],
                [["Cnr Clark St and 20th Ave", "Tauranga 3112"],["(07) 579 8000"],["communications@bopdhb.govt.nz"]],
                [["Level 2, H Block", "The Princess Margaret Hospital", "Cashmere Road", "Cashmere", "Christchurch"],["(03) 364 4106"],[null]],
                [["Wellington Hospital", "Riddliford Street", "Newtown", "Wellington 6021"],["(04) 385 5999"],["info@ccdhb.org.nz"]],
                [["19 Lambie Drive", "Manukau", "Auckland 2104"],["(09) 2629500"],["info@cmdhb.org.nz"]],
                [["Corner Omahu Road and McLeod Street", "Hastings"],["(06) 878 8109"],["ceo@hawkesbaydhb.govt.nz"]],
                [["Pilmuir House, Hutt Hospital Campus", "High Street", "Lower Hutt"],["(04) 566 6999"],["ceo@huttvalleydhb.org.nz"]],
                [["Corner Arawa Street and Pukeroa Road", "Rotorua"],["(07) 348 1199"],["feedback@lakesdhb.govt.nz"]],
                [["Kotare Street", "Taupo"],["(07) 376 1000"],["feedback@lakesdhb.govt.nz"]],
                [["Gate 2, Heretaunga Street", "Palmerston North 4414"],["(06) 350 8061"],["communications@midcentraldhb.govt.nz"]],
                [["Braemar Campus", "Waimea Road", "Nelson 7011"],["(03) 546 1800"],["enquiries.corporate@nmdhb.govt.nz"]],
                [["Maunu Road", "Whangarei 0110"],["(09) 470 0000"],[null]],
                [["Cnr Queen & High Street", "Timaru"],["(03) 687 2100"],["ceo@scdhb.health.nz"]],
                [["Dunedin Hospital", "201 Great King St", "Dunedin"],["(03) 474 0999"],["contactus@southerndhb.govt.nz"]],
                [["421 Ormond Rd", "Gisborne 4040"],["(06) 869 0500"],[null]],
                [["Corporate Services", "David Street", "New Plymouth 3410"],["(06) 753 6139"],["customer.services@tdhb.org.nz"]],
                [["Waikato Hospital", "Pembroke Street", "Hamilton"],["(07) 839 8899"],["info@waikatodhb.health.nz"]],
                [["Masterton Hospital", "Te Ore Ore Road", "Masterton 5810"],["(06) 946 9800"],["hospital@wairarapa.dhb.org.nz"]],
                [["Level 2, 15 Shea Tce", "Takapuna", "Auckland City 0622"],["(09) 486 8900"],["customer.feedback@waitematadhb.govt.nz"]],
                [["Grey Base Hospital", "Greymouth"],["(03) 769 7400"],["info@westcoastdhb.health.nz"]],
                [["100 Heads Road", "Whanganui 4501"],["(06) 348 3216"],[null]]];

function init(){
    checkScreenSize();
    openDiv = document.getElementById("traveller");
    openDivContent = openDiv.children[1];
    openDivContent.style.maxHeight = openDivContent.scrollHeight + "px";
    checkScreenSize();
    populateDHBList();
    initial = true;
}

function initMap(){
    directionsService = new google.maps.DirectionsService();
    directionsDisplay = new google.maps.DirectionsRenderer();
}

function checkScreenSize(){
    var screenWidth = window.innerWidth;
    var heading1 = document.getElementById("travellerHeader");
    var heading2 = document.getElementById("distanceHeader");
    var heading3 = document.getElementById("tripsHeader");
    var heading4 = document.getElementById("cardHeader");
    var heading5 = document.getElementById("assesmentHeader");
    if(screenWidth < 768){
        heading1.innerHTML = "Step 1: Traveller";
        heading2.innerHTML = "Step 2: Distance";
        heading3.innerHTML = "Step 3: Number of Trips";
        heading4.innerHTML = "Step 4: Community Services Card";
        heading5.innerHTML = "Step 5: Eligibility Assesment";
        bool_isMobileDevice = true;

    }
}

function checkAge(){
    var age = document.getElementById("personsAge").value;
    var errorMsg = document.getElementById("errorTraveller");

    if(age != "" && age >= 1){
        bool_section1Complete = true;
    }else{
        bool_section1Complete = false;
    }
    if(age < 18){
        bool_isChild = true;
    }else{
        bool_isChild = false;
    }
}

function showDistance(){
    var travelDistance;
    var start = document.getElementById("address1").value;
    var finish = document.getElementById("address2").value;
    var distanceOutput = document.getElementById("travelDistance");
    var errMsg = document.getElementById("errorDistance");

    if(start != "" && finish != ""){
        var request = {
        origin:start,
        destination:finish,
        travelMode: google.maps.DirectionsTravelMode.DRIVING 
        };

        directionsService.route(request, function(response, status) {
            if(status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
                travelDistance = parseInt(response.routes[0].legs[0].distance.value/1000);
                
                distance = travelDistance;
            }
            console.log(travelDistance);

            distanceOutput.value = distance+"Km";
            if(distance >= 0){
                console.log(distanceOutput.value);
                bool_section2Complete = true;
            }
            checkEligibilityDistanceTravelled();
        });
    }
    
}

function checkEligibilityDistanceTravelled(){

    if((distance > 80 && bool_isChild===true) || (distance > 350 && bool_isChild===false)){
        bool_distanceEligibility = true;
    }else{
        bool_distanceEligibility = false;
    }
}

function checkNumberOfTrips(){
    var noTrips = document.getElementById("noTrips").value;
    var period = document.getElementById("period").value;
    image = document.getElementById("isEligibleImageTrips");
    console.log("bool_isChild " + bool_isChild);
    console.log("distance " + distance);

    if(noTrips.value !== "" && period.value !== ""){
        bool_section3Complete = true;
    }

    if(noTrips >= 22 && period <= 2){
        bool_noTripsEligibility = true;
    }if(noTrips >= 6 && period <= 6 && bool_isChild === true && distance > 25){
        bool_noTripsEligibility = true;
    }if(noTrips >= 6 && period <= 6 && bool_isChild === false && distance > 50){
        bool_noTripsEligibility = true;
    }else{
        bool_noTripsEligibility = false;
    }
}

function communityCardCheck(value){
    if(value==="yes" && bool_isChild===true && distance > 25){
        bool_communityCardEligibility = true;
        bool_section4Complete = true;
    }else if (value==="yes" && bool_isChild===false && distance > 80) {
        bool_communityCardEligibility = true;
        bool_section4Complete = true
    }else{
        bool_communityCardEligibility = false;
        bool_section4Complete = true;
    }
}

function populateDHBList(){
    if(bool_isMobileDevice){
        selectList = document.getElementById("selectDHBMobile");
    }else{
        selectList = document.getElementById("selectDHB");
    }
    selectList.innerHTML = "";
    selectList.innerHTML += "<option default>DHB List</option>";
    for(var i = 0; i < dhbLocationList.length; i++){
        var option = dhbLocationList[i];
        var el = document.createElement("option");
        el.textContent = option;
        el.value = i;
        selectList.appendChild(el);
    }
}

function displayDHBAddress(selected){
    var address, phone, email;

    if(bool_isMobileDevice){
        address = document.getElementById("addressMobile");
        phone = document.getElementById("phoneMobile");
        email = document.getElementById("emailMobile");
    }else{
        address = document.getElementById("address");
        phone = document.getElementById("phone");
        email = document.getElementById("email");
    }

    address.innerHTML = "";
    phone.innerHTML = "";
    email.innerHTML = "";
    //displaying selected DHB address information
    var addressHeader = document.createElement("h4");
    addressHeader.id = "addressHeader";
    addressHeader.className = "contactInfoHeaders";
    var header1 = document.createTextNode("Address");
    addressHeader.appendChild(header1);
    address.appendChild(addressHeader);

    for(var i = 0; i < dhbAddressList[selected][0].length; i++){
        console.log(dhbAddressList[selected][0][i]);
        var addressBody = document.createElement("p");
        addressBody.className = "dhbContactInfo";
        var node = document.createTextNode(dhbAddressList[selected][0][i]);
        addressBody.appendChild(node);
        address.appendChild(addressBody);
    }

    //displaying selected DHB phoneNo.
    if(dhbAddressList[selected][1][0]!==null){
        var phoneHeader = document.createElement("h4");
        phoneHeader.id = "phoneHeader";
        phoneHeader.className = "contactInfoHeaders";
        var phoneHeaderNode = document.createTextNode("Phone");
        phoneHeaderNode.id = "phoneNo";
        phoneHeader.appendChild(phoneHeaderNode);
        phone.appendChild(phoneHeader);

        var phoneNo = document.createElement("p");
        phoneNo.className = "dhbContactInfo phoneContact";
        var phoneNoNode = document.createTextNode(dhbAddressList[selected][1][0]);
        phoneNo.appendChild(phoneNoNode);
        phone.appendChild(phoneNo);
    }

    //displaying selected DHB email
    if(dhbAddressList[selected][2][0]!==null){
        var emailHeader = document.createElement("h4");
        emailHeader.className = "contactInfoHeaders";
        var emailHeaderNode = document.createTextNode("Email");
        emailHeader.appendChild(emailHeaderNode);
        email.appendChild(emailHeader);

        var emailAddress = document.createElement("a");
        emailAddress.className = "dhbContactInfo emailContact";
        var emailNode = document.createTextNode(dhbAddressList[selected][2][0]);
        emailAddress.href = "mailto:"+dhbAddressList[selected][2][0];
        emailAddress.appendChild(emailNode);
        email.appendChild(emailAddress);
    }
    

}

function expandDiv(params){
    if(bool_isMobileDevice){
        console.log(params);
        closeOpenDiv(openDiv, openDivContent);
        openDiv = params;
        var panel = params.children[1];
        openDivContent = panel;
        params.style.height = "62%";
        panel.style.maxHeight = panel.scrollHeight+"px"; 
    }
}

function closeOpenDiv(openDiv, openDivContent){
    openDiv.style.height = "7%";
    openDivContent.style.maxHeight = null;
}

function clearDiv(elementID){
    document.getElementById(elementID).innerHTML = "";
}

function checkEligibility(){
    var eligibilityInfo = document.getElementById("eligibilityInfo");
    var errMsg;
    var label, dropdownBox, checkBtn, info;
    
    if(bool_isMobileDevice){
        checkBtn = document.getElementById("mobileBtn");
        errMsg = document.getElementById("errorMessageMobile");
        label = document.getElementById("dhbLabelMobile");
        dropdownBox = document.getElementById("selectDHBMobile");
        info = document.getElementById("eligibilityInfoMobile");
    }else{
        errMsg = document.getElementById("errorMessage");
        label = document.getElementById("dhbLabel");
        dropdownBox = document.getElementById("selectDHB");
        checkBtn = document.getElementById("desktopBtn");
        info = document.getElementById("eligibilityInfo");
    }
    console.log("section 1: " + bool_section1Complete + " section 2: " + bool_section2Complete + " section3: " + bool_section3Complete + " section4: " + bool_section4Complete);

    if(bool_section1Complete && bool_section2Complete && bool_section3Complete && bool_section4Complete){
        errMsg.style.display = "none";
        if(bool_distanceEligibility == true || bool_communityCardEligibility == true || bool_noTripsEligibility == true){
            console.log("bool_distanceEligibility : " + bool_distanceEligibility + " bool_communityCardEligibility : " + bool_communityCardEligibility + " bool_noTripsEligibility : " + bool_noTripsEligibility);
            eligibilityInfo.style.display = "block";
            label.style.display = "block";
            dropdownBox.style.display = "block";
            checkBtn.style.display = "none";
            info.style.display = "block";
        }else{
            errMsg.innerHTML = "You may not be eligible for Travel Assistance";
            errMsg.style.display = "block";
        }
    }else{
        errMsg.style.display = "block";
        label.style.displ;ay = "none";
        dropdownBox.style.display = "none";
        checkBtn.style.display = "block";
        info.style.display = "none";
    }
}




