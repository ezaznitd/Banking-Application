function getHttpConnection(url){
    http=new XMLHttpRequest(); //used to send the req to server
    http.open("GET",url);
    http.setRequestHeader("Accept","application/json");
    http.send();
    return http;
    //0 ==> before conn open
    //1 ==> conn opened
    //2 ==> req send
    //3 ==> client partially received the res
    //4 ==> response completed, client received the complete res
}

function postHttpConnection(url) {
    http=new XMLHttpRequest(); //used to send the req to server
    http.open("POST",url);
    http.setRequestHeader("Accept","application/json");
    http.setRequestHeader("Content-Type","application/json");
    return http;
}

function updateHttpConnection(url) {
    http=new XMLHttpRequest(); //used to send the req to server
    http.open("PUT",url);
    http.setRequestHeader("Accept","application/json");
    http.setRequestHeader("Content-Type","application/json");
    return http;
}

/*************************************Clerk API****************************************/

//Customer class constructor
function Customer(customerId, customerName, gender, phoneNo, email) {
    this.customerId = customerId;
    this.customerName = customerName;
    this.gender = gender;
    this.phoneNo = phoneNo;
    this.email = email;
}

//Application class constructor
function Application(applicationId, customerId, loanType, loanAmount, status, remark) {
    this.applicationId = applicationId;
    this.customerId = customerId;
    this.loanType = loanType;
    this.loanAmount = loanAmount;
    this.status = status;
    this.remark = remark;
}

//UploadedDocuments class constructor
function UploadedDocument(applicationId, adhaarCard, photo, voterCard) {
    this.applicationId = applicationId;
    this.adhaarCard = adhaarCard;
    this.photo = photo;
    this.voterCard = voterCard;
}

//Get all customers details
function getAllCustomersDetails() {
    let url="http://localhost:8080/Banking_Application/onlineapi/clerk/customers";
    http=getHttpConnection(url);
    http.onreadystatechange = function() {
        if(http.readyState == 4) {
            let res=http.responseText;
            console.log(res);
            let customers = JSON.parse(res);
            let allTableDetails = document.getElementById("tableId");
            let tblBody = document.createElement("tbody");
            let custRow = document.createElement("tr");

            let cell = document.createElement("th");
            let cellText = document.createTextNode("Customer Id");
            cell.appendChild(cellText);
            custRow.appendChild(cell);

            cell = document.createElement("th");
            cellText = document.createTextNode("Customer Name");
            cell.appendChild(cellText);
            custRow.appendChild(cell);

            cell = document.createElement("th");
            cellText = document.createTextNode("Gender");
            cell.appendChild(cellText);
            custRow.appendChild(cell);

            cell = document.createElement("th");
            cellText = document.createTextNode("Phone No");
            cell.appendChild(cellText);
            custRow.appendChild(cell);

            cell = document.createElement("th");
            cellText = document.createTextNode("Email");
            cell.appendChild(cellText);
            custRow.appendChild(cell);
            tblBody.appendChild(custRow);

            customers.forEach(cust => {
                custRow = document.createElement("tr");

                cell = document.createElement("td");
                cellText = document.createTextNode(cust.customerId);
                cell.appendChild(cellText);
                custRow.appendChild(cell);

                cell = document.createElement("td");
                cellText = document.createTextNode(cust.customerName);
                cell.appendChild(cellText);
                custRow.appendChild(cell);

                cell = document.createElement("td");
                cellText = document.createTextNode(cust.gender);
                cell.appendChild(cellText);
                custRow.appendChild(cell);

                cell = document.createElement("td");
                cellText = document.createTextNode(cust.phoneNo);
                cell.appendChild(cellText);
                custRow.appendChild(cell);

                cell = document.createElement("td");
                cellText = document.createTextNode(cust.email);
                cell.appendChild(cellText);
                custRow.appendChild(cell);
                tblBody.appendChild(custRow);
            })
            allTableDetails.appendChild(tblBody);
        }
    }
}

//Get Details of a customer by Id
function getCustomerDetailsById() {
    let cid = document.getElementById("cid").value;
    let url=`http://localhost:8080/Banking_Application/onlineapi/clerk/customers/${cid}`;
    http=getHttpConnection(url);
    http.onreadystatechange = function() {
        let allTableDetails = document.getElementById("tableId");
        let tblBody = document.createElement("tbody");
        let custRow = document.createElement("tr");

        let cell = document.createElement("th");
        let cellText = document.createTextNode("Customer Id");
        cell.appendChild(cellText);
        custRow.appendChild(cell);

        cell = document.createElement("th");
        cellText = document.createTextNode("Customer Name");
        cell.appendChild(cellText);
        custRow.appendChild(cell);

        cell = document.createElement("th");
        cellText = document.createTextNode("Gender");
        cell.appendChild(cellText);
        custRow.appendChild(cell);

        cell = document.createElement("th");
        cellText = document.createTextNode("Phone No");
        cell.appendChild(cellText);
        custRow.appendChild(cell);

        cell = document.createElement("th");
        cellText = document.createTextNode("Email");
        cell.appendChild(cellText);
        custRow.appendChild(cell);
        tblBody.appendChild(custRow);
        if(http.readyState == 4 && http.status == 200) {
            let res = http.responseText;
            console.log(res);
            let customer = JSON.parse(res);

            custRow = document.createElement("tr");

            cell = document.createElement("td");
            cellText = document.createTextNode(customer.customerId);
            cell.appendChild(cellText);
            custRow.appendChild(cell);

            cell = document.createElement("td");
            cellText = document.createTextNode(customer.customerName);
            cell.appendChild(cellText);
            custRow.appendChild(cell);

            cell = document.createElement("td");
            cellText = document.createTextNode(customer.gender);
            cell.appendChild(cellText);
            custRow.appendChild(cell);

            cell = document.createElement("td");
            cellText = document.createTextNode(customer.phoneNo);
            cell.appendChild(cellText);
            custRow.appendChild(cell);

            cell = document.createElement("td");
            cellText = document.createTextNode(customer.email);
            cell.appendChild(cellText);
            custRow.appendChild(cell);
            tblBody.appendChild(custRow);

            allTableDetails.appendChild(tblBody);
        }
        else if(http.status == 404) {
            allTableDetails.appendChild(tblBody);
        }
    }
}

//Get details of all the loans taken by a customer by customer id
/*function getAllLoansDetailsByCustomerId() {
    let cid = document.getElementById("cid").value;
    let url=`http://localhost:8080/Banking_Application/onlineapi/clerk/customers/${cid}/loans`;
    http=getHttpConnection(url);
    http.onreadystatechange = function() {
        if(http.readyState == 4) {
            let res=http.responseText;
            console.log(res);
            let loans = JSON.parse(res);
            let allLoansDiv = document.getElementById("allLoanSection");

            loans.forEach(loan => {
                var loanDiv = document.createElement("div");
                loanDiv.setAttribute("class","all");
                loanDiv.style.visibility="visible";
                var data = `Loan Id : ${loan.loanId}<br> Customer Id : ${loan.customerId}
                <br> Loan Type : ${loan.loanType}<br> Loan Amount : ${loan.loanAmount}`;
                loanDiv.innerHTML = data;
                allLoansDiv.appendChild(loanDiv);
            });
        }
    }
}*/

//Get details of all the loan applicants by customer id
function getAllLoanApplicationDetailsByCustomerId() {
    let cid = document.getElementById("cid").value;
    let url=`http://localhost:8080/Banking_Application/onlineapi/clerk/customers/${cid}/applications`;
    http=getHttpConnection(url);
    http.onreadystatechange = function() {
        if(http.readyState == 4) {
            let allTableDetails = document.getElementById("tableId");
            let tblBody = document.createElement("tbody");
            let applicationRow = document.createElement("tr");

            let cell = document.createElement("th");
            let cellText = document.createTextNode("Customer Id");
            cell.appendChild(cellText);
            applicationRow.appendChild(cell);

            cell = document.createElement("th");
            cellText = document.createTextNode("Application Id");
            cell.appendChild(cellText);
            applicationRow.appendChild(cell);

            cell = document.createElement("th");
            cellText = document.createTextNode("Loan Type");
            cell.appendChild(cellText);
            applicationRow.appendChild(cell);

            cell = document.createElement("th");
            cellText = document.createTextNode("Loan Amount");
            cell.appendChild(cellText);
            applicationRow.appendChild(cell);

            cell = document.createElement("th");
            cellText = document.createTextNode("Application Status");
            cell.appendChild(cellText);
            applicationRow.appendChild(cell);

            cell = document.createElement("th");
            cellText = document.createTextNode("Remarks");
            cell.appendChild(cellText);
            applicationRow.appendChild(cell);
            tblBody.appendChild(applicationRow);

            let res=http.responseText;
            console.log(res);
            let applications = JSON.parse(res);

            applications.forEach(application => {
                applicationRow = document.createElement("tr");

                cell = document.createElement("td");
                cellText = document.createTextNode(application.customerId);
                cell.appendChild(cellText);
                applicationRow.appendChild(cell);

                cell = document.createElement("td");
                cellText = document.createTextNode(application.applicationId);
                cell.appendChild(cellText);
                applicationRow.appendChild(cell);

                cell = document.createElement("td");
                cellText = document.createTextNode(application.loanType);
                cell.appendChild(cellText);
                applicationRow.appendChild(cell);

                cell = document.createElement("td");
                cellText = document.createTextNode(application.loanAmount);
                cell.appendChild(cellText);
                applicationRow.appendChild(cell);

                cell = document.createElement("td");
                cellText = document.createTextNode(application.status);
                cell.appendChild(cellText);
                applicationRow.appendChild(cell);

                cell = document.createElement("td");
                cellText = document.createTextNode(application.remark);
                cell.appendChild(cellText);
                applicationRow.appendChild(cell);
                tblBody.appendChild(applicationRow);
            });
            allTableDetails.appendChild(tblBody);
        }
    }
}

//Get application details by application Id
function getApplicationDetailsByApplicationId() {
    let cid = document.getElementById("cid").value;
    let aid = document.getElementById("aid").value;
    let url=`http://localhost:8080/Banking_Application/onlineapi/clerk/customers/${cid}/applications/${aid}`;
    http=getHttpConnection(url);
    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            let allTableDetails = document.getElementById("tableId");
            let tblBody = document.createElement("tbody");
            let applicationRow = document.createElement("tr");

            let cell = document.createElement("th");
            let cellText = document.createTextNode("Customer Id");
            cell.appendChild(cellText);
            applicationRow.appendChild(cell);

            cell = document.createElement("th");
            cellText = document.createTextNode("Application Id");
            cell.appendChild(cellText);
            applicationRow.appendChild(cell);

            cell = document.createElement("th");
            cellText = document.createTextNode("Loan Type");
            cell.appendChild(cellText);
            applicationRow.appendChild(cell);

            cell = document.createElement("th");
            cellText = document.createTextNode("Loan Amount");
            cell.appendChild(cellText);
            applicationRow.appendChild(cell);

            cell = document.createElement("th");
            cellText = document.createTextNode("Application Status");
            cell.appendChild(cellText);
            applicationRow.appendChild(cell);

            cell = document.createElement("th");
            cellText = document.createTextNode("Remarks");
            cell.appendChild(cellText);
            applicationRow.appendChild(cell);
            tblBody.appendChild(applicationRow);

            let res = http.responseText;
            console.log(res);
            let application = JSON.parse(res);

            applicationRow = document.createElement("tr");

            cell = document.createElement("td");
            cellText = document.createTextNode(application.customerId);
            cell.appendChild(cellText);
            applicationRow.appendChild(cell);

            cell = document.createElement("td");
            cellText = document.createTextNode(application.applicationId);
            cell.appendChild(cellText);
            applicationRow.appendChild(cell);

            cell = document.createElement("td");
            cellText = document.createTextNode(application.loanType);
            cell.appendChild(cellText);
            applicationRow.appendChild(cell);

            cell = document.createElement("td");
            cellText = document.createTextNode(application.loanAmount);
            cell.appendChild(cellText);
            applicationRow.appendChild(cell);

            cell = document.createElement("td");
            cellText = document.createTextNode(application.status);
            cell.appendChild(cellText);
            applicationRow.appendChild(cell);

            cell = document.createElement("td");
            cellText = document.createTextNode(application.remark);
            cell.appendChild(cellText);
            applicationRow.appendChild(cell);
            tblBody.appendChild(applicationRow);

            allTableDetails.appendChild(tblBody);
        }
    }
}

//Get all uploaded documents of the applicant
function getAllUploadedDocumentsByApplicationId() {
    let cid = document.getElementById("cid").value;
    let aid = document.getElementById("aid").value;
    let url=`http://localhost:8080/Banking_Application/onlineapi/clerk/customers/${cid}/applications/${aid}/documents`;
    http=getHttpConnection(url);
    http.onreadystatechange = function() {
        if(http.readyState == 4) {
            let res = http.responseText;
            console.log(res);
            let doc = JSON.parse(res);
            document.getElementById("title1").innerHTML = "Adhaar Card Image";
            document.getElementById("title2").innerHTML = "Customer Photo";
            document.getElementById("title3").innerHTML = "Voter Card Image";
            document.getElementById("adhaarCardUrl").src = `images/${doc.adhaarCard}`;
            document.getElementById("photoUrl").src = `images/${doc.photo}`;
            document.getElementById("voterCardUrl").src = `images/${doc.voterCard}`;
            /*var data = `Application Id : ${doc.applicationId}<br> Adhaar : ${doc.adhaar}<br> 
            Photo : ${doc.photo}<br> Voter Card : ${doc.voterCard}`;
            document.getElementById("doc").style.visibility = "visible";
            document.getElementById("doc").innerHTML = data;*/
        }
    }
}

//Add new customer
function addCustomer() {
    let url = `http://localhost:8080/Banking_Application/onlineapi/clerk/customers`;
    http = postHttpConnection(url);
    let customerId = Math.floor(Math.random() * 1000000);
    console.log(customerId);
    var customerName = document.getElementById("customerName").value;
    var gender = document.getElementById("gender").value;
    var phoneNo = document.getElementById("phoneNo").value;
    var email = document.getElementById("email").value;
    var cust = new Customer(customerId, customerName, gender, phoneNo, email);
    http.send(JSON.stringify(cust));
    http.onreadystatechange = function() {
        if(http.readyState == 4) {
            console.log("New Customer added successfully");
            return customerId;
        }
    }
}

//Add new applicant
function addApplicationByCustomerId() {
    let cid = document.getElementById("cid").value;
    let url = `http://localhost:8080/Banking_Application/onlineapi/clerk/customers/${cid}/applications`;
    http = postHttpConnection(url);
    var customerId = cid;
    var applicationId = Math.floor(Math.random() * 1000000);
    var loanType = document.getElementById("loanType").value;
    var loanAmount = document.getElementById("loanAmount").value;
    var status = "Pending..";
    var remark = "Waiting for approval.";
    var loanApplication = new Application(applicationId, customerId, loanType, loanAmount, status, remark);
    http.send(JSON.stringify(loanApplication));
    http.onreadystatechange = function() {
        if(http.readyState == 4) {
            console.log("New application submitted");
        }
    }
}

/*const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

function convertFileToString(file) {
   const s1 = toBase64(file);
   return s1;
}*/

//Add new documents
function addDocumentsByApplicationId() {
    let cid = document.getElementById("cid").value;
    let aid = document.getElementById("aid").value;
    let url = `http://localhost:8080/Banking_Application/onlineapi/clerk/customers/${cid}/applications/${aid}/documents`;
    http = postHttpConnection(url);
    const file1 = document.querySelector('#formFile').files[0];
    const file2 = document.querySelector('#formFile1').files[0];
    const file3 = document.querySelector('#formFile2').files[0];
    var applicationId = aid;
    var adhaarCard = file2.name;
    var photo = file1.name;
    var voterCard = file3.name;
    var uploadedDocument = new UploadedDocument(applicationId, adhaarCard, photo, voterCard);
    http.send(JSON.stringify(uploadedDocument));
    http.onreadystatechange = function() {
        if(http.readyState == 4) {
            console.log("Documents uploaded successfully");
        }
    }
}

//Clerk Page callback function
function getClerkSection() {
    let selectField = document.getElementById('clerkCallBackFunction');
    let valueField = selectField.options[selectField.selectedIndex].value;
    console.log(valueField);
    switch(valueField) {
        case "1":
            getCustomerDetailsById();
            break;
        case "3":
            getAllLoanApplicationDetailsByCustomerId();
            break;
        case "4":
            getApplicationDetailsByApplicationId();
            break;
        case "5":
            getAllCustomersDetails();
            break;
        case "6":
            getAllUploadedDocumentsByApplicationId();
            break;
        default:
            alert("Please select required field");
    }
}

function updateProduct() {
    var productId=document.getElementById("productId").value;
    var price=document.getElementById("price").value;
    http=new XMLHttpRequest(); //used to send the req to server
    let url=`http://localhost:8080/4_Rest_Api_App/onlineapi/products/${productId}/price/${price}`;
    http.open("PUT",url);
    http.setRequestHeader("Accept","application/json");
    http.setRequestHeader("Content-Type","application/json");
    http.send(productId, price);
    http.onreadystatechange=function() {
        if(http.readyState==4) {
            console.log(http.status);
            let resTxt=http.responseText;
            //convert jsntxt into javascript object
            //display in paragraph / heading
            console.log(resTxt);
            let product=JSON.parse(resTxt);
            let data="Product Id : "+product.productId+"<br> Name : "+product.productName+"<br>Price : "+product.price;
            document.getElementById("productSection").style.visibility="visible";
            document.getElementById("productSection").innerHTML=data;
        }
    }
}



/**************************Customer API******************************************/

//Get Customer Details By Customer Id
function getByCustomerId() {
    let cid = document.getElementById("cid").value;
    let url=`http://localhost:8080/Banking_Application/onlineapi/customer/${cid}`;
    http=getHttpConnection(url);
    http.onreadystatechange = function() {
        let allTableDetails = document.getElementById("tableId");
        let tblBody = document.createElement("tbody");
        let custRow = document.createElement("tr");

        let cell = document.createElement("th");
        let cellText = document.createTextNode("Customer Id");
        cell.appendChild(cellText);
        custRow.appendChild(cell);

        cell = document.createElement("th");
        cellText = document.createTextNode("Customer Name");
        cell.appendChild(cellText);
        custRow.appendChild(cell);

        cell = document.createElement("th");
        cellText = document.createTextNode("Gender");
        cell.appendChild(cellText);
        custRow.appendChild(cell);

        cell = document.createElement("th");
        cellText = document.createTextNode("Phone No");
        cell.appendChild(cellText);
        custRow.appendChild(cell);

        cell = document.createElement("th");
        cellText = document.createTextNode("Email");
        cell.appendChild(cellText);
        custRow.appendChild(cell);
        tblBody.appendChild(custRow);

        if(http.readyState == 4 && http.status == 200) {
            let res = http.responseText;
            console.log(res);
            let customer = JSON.parse(res);
            
            custRow = document.createElement("tr");

            cell = document.createElement("td");
            cellText = document.createTextNode(customer.customerId);
            cell.appendChild(cellText);
            custRow.appendChild(cell);

            cell = document.createElement("td");
            cellText = document.createTextNode(customer.customerName);
            cell.appendChild(cellText);
            custRow.appendChild(cell);

            cell = document.createElement("td");
            cellText = document.createTextNode(customer.gender);
            cell.appendChild(cellText);
            custRow.appendChild(cell);

            cell = document.createElement("td");
            cellText = document.createTextNode(customer.phoneNo);
            cell.appendChild(cellText);
            custRow.appendChild(cell);

            cell = document.createElement("td");
            cellText = document.createTextNode(customer.email);
            cell.appendChild(cellText);
            custRow.appendChild(cell);
            tblBody.appendChild(custRow);

            allTableDetails.appendChild(tblBody);
        }
        else if(http.status == 404) {
            allTableDetails.appendChild(tblBody);
        }
    }
}

//Get Loan Details By Customer Id
/*function getLoanDetails() {
    let cid = document.getElementById("cid").value;
    let url=`http://localhost:8080/Banking_Application/onlineapi/customer/${cid}/loans`;
    http=getHttpConnection(url);
    http.onreadystatechange = function() {
        if(http.readyState == 4) {
            let allTableDetails = document.getElementById("tableId");
            let tblBody = document.createElement("tbody");
            let applicationRow = document.createElement("tr");

            let cell = document.createElement("th");
            let cellText = document.createTextNode("Customer Id");
            cell.appendChild(cellText);
            applicationRow.appendChild(cell);

            cell = document.createElement("th");
            cellText = document.createTextNode("Application Id");
            cell.appendChild(cellText);
            applicationRow.appendChild(cell);

            cell = document.createElement("th");
            cellText = document.createTextNode("Loan Type");
            cell.appendChild(cellText);
            applicationRow.appendChild(cell);

            cell = document.createElement("th");
            cellText = document.createTextNode("Loan Amount");
            cell.appendChild(cellText);
            applicationRow.appendChild(cell);

            cell = document.createElement("th");
            cellText = document.createTextNode("Application Status");
            cell.appendChild(cellText);
            applicationRow.appendChild(cell);

            cell = document.createElement("th");
            cellText = document.createTextNode("Remarks");
            cell.appendChild(cellText);
            applicationRow.appendChild(cell);
            tblBody.appendChild(applicationRow);

            let res=http.responseText;
            console.log(res);
            let applications = JSON.parse(res);

            applications.forEach(application => {
                applicationRow = document.createElement("tr");

                cell = document.createElement("td");
                cellText = document.createTextNode(application.customerId);
                cell.appendChild(cellText);
                applicationRow.appendChild(cell);

                cell = document.createElement("td");
                cellText = document.createTextNode(application.applicationId);
                cell.appendChild(cellText);
                applicationRow.appendChild(cell);

                cell = document.createElement("td");
                cellText = document.createTextNode(application.loanType);
                cell.appendChild(cellText);
                applicationRow.appendChild(cell);

                cell = document.createElement("td");
                cellText = document.createTextNode(application.loanAmount);
                cell.appendChild(cellText);
                applicationRow.appendChild(cell);

                cell = document.createElement("td");
                cellText = document.createTextNode(application.status);
                cell.appendChild(cellText);
                applicationRow.appendChild(cell);

                cell = document.createElement("td");
                cellText = document.createTextNode(application.remark);
                cell.appendChild(cellText);
                applicationRow.appendChild(cell);
                tblBody.appendChild(applicationRow);
            });
            allTableDetails.appendChild(tblBody);
        }
    }
}*/

//Get Application Details By Customer Id
function getApplications() {
    let cid = document.getElementById("cid").value;
    let url=`http://localhost:8080/Banking_Application/onlineapi/customer/${cid}/applications`;
    http=getHttpConnection(url);
    http.onreadystatechange = function() {
        if(http.readyState == 4) {
            let allTableDetails = document.getElementById("tableId");
            let tblBody = document.createElement("tbody");
            let applicationRow = document.createElement("tr");

            let cell = document.createElement("th");
            let cellText = document.createTextNode("Customer Id");
            cell.appendChild(cellText);
            applicationRow.appendChild(cell);

            cell = document.createElement("th");
            cellText = document.createTextNode("Application Id");
            cell.appendChild(cellText);
            applicationRow.appendChild(cell);

            cell = document.createElement("th");
            cellText = document.createTextNode("Loan Type");
            cell.appendChild(cellText);
            applicationRow.appendChild(cell);

            cell = document.createElement("th");
            cellText = document.createTextNode("Loan Amount");
            cell.appendChild(cellText);
            applicationRow.appendChild(cell);

            cell = document.createElement("th");
            cellText = document.createTextNode("Application Status");
            cell.appendChild(cellText);
            applicationRow.appendChild(cell);

            cell = document.createElement("th");
            cellText = document.createTextNode("Remarks");
            cell.appendChild(cellText);
            applicationRow.appendChild(cell);
            tblBody.appendChild(applicationRow);

            let res=http.responseText;
            console.log(res);
            let applications = JSON.parse(res);

            applications.forEach(application => {
                applicationRow = document.createElement("tr");

                cell = document.createElement("td");
                cellText = document.createTextNode(application.customerId);
                cell.appendChild(cellText);
                applicationRow.appendChild(cell);

                cell = document.createElement("td");
                cellText = document.createTextNode(application.applicationId);
                cell.appendChild(cellText);
                applicationRow.appendChild(cell);

                cell = document.createElement("td");
                cellText = document.createTextNode(application.loanType);
                cell.appendChild(cellText);
                applicationRow.appendChild(cell);

                cell = document.createElement("td");
                cellText = document.createTextNode(application.loanAmount);
                cell.appendChild(cellText);
                applicationRow.appendChild(cell);

                cell = document.createElement("td");
                cellText = document.createTextNode(application.status);
                cell.appendChild(cellText);
                applicationRow.appendChild(cell);

                cell = document.createElement("td");
                cellText = document.createTextNode(application.remark);
                cell.appendChild(cellText);
                applicationRow.appendChild(cell);
                tblBody.appendChild(applicationRow);
            });
            allTableDetails.appendChild(tblBody);
        }
    }
}

//Get Application Details By Application Id
function getApplicationById() {
    let cid = document.getElementById("cid").value;
    let aid = document.getElementById("aid").value;
    let url=`http://localhost:8080/Banking_Application/onlineapi/customer/${cid}/applications/${aid}`;
    http=getHttpConnection(url);
    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            let allTableDetails = document.getElementById("tableId");
            let tblBody = document.createElement("tbody");
            let applicationRow = document.createElement("tr");

            let cell = document.createElement("th");
            let cellText = document.createTextNode("Customer Id");
            cell.appendChild(cellText);
            applicationRow.appendChild(cell);

            cell = document.createElement("th");
            cellText = document.createTextNode("Application Id");
            cell.appendChild(cellText);
            applicationRow.appendChild(cell);

            cell = document.createElement("th");
            cellText = document.createTextNode("Loan Type");
            cell.appendChild(cellText);
            applicationRow.appendChild(cell);

            cell = document.createElement("th");
            cellText = document.createTextNode("Loan Amount");
            cell.appendChild(cellText);
            applicationRow.appendChild(cell);

            cell = document.createElement("th");
            cellText = document.createTextNode("Application Status");
            cell.appendChild(cellText);
            applicationRow.appendChild(cell);

            cell = document.createElement("th");
            cellText = document.createTextNode("Remarks");
            cell.appendChild(cellText);
            applicationRow.appendChild(cell);
            tblBody.appendChild(applicationRow);

            let res = http.responseText;
            console.log(res);
            let application = JSON.parse(res);

            applicationRow = document.createElement("tr");

            cell = document.createElement("td");
            cellText = document.createTextNode(application.customerId);
            cell.appendChild(cellText);
            applicationRow.appendChild(cell);

            cell = document.createElement("td");
            cellText = document.createTextNode(application.applicationId);
            cell.appendChild(cellText);
            applicationRow.appendChild(cell);

            cell = document.createElement("td");
            cellText = document.createTextNode(application.loanType);
            cell.appendChild(cellText);
            applicationRow.appendChild(cell);

            cell = document.createElement("td");
            cellText = document.createTextNode(application.loanAmount);
            cell.appendChild(cellText);
            applicationRow.appendChild(cell);

            cell = document.createElement("td");
            cellText = document.createTextNode(application.status);
            cell.appendChild(cellText);
            applicationRow.appendChild(cell);

            cell = document.createElement("td");
            cellText = document.createTextNode(application.remark);
            cell.appendChild(cellText);
            applicationRow.appendChild(cell);
            tblBody.appendChild(applicationRow);

            allTableDetails.appendChild(tblBody);
        }
    }
}

//Get Documents By Id
function getDocument() {
    let cid = document.getElementById("cid").value;
    let aid = document.getElementById("aid").value;
    let url=`http://localhost:8080/Banking_Application/onlineapi/customer/${cid}/applications/${aid}/documents`;
    http=getHttpConnection(url);
    http.onreadystatechange = function() {
        if(http.readyState == 4) {
            let res = http.responseText;
            console.log(res);
            let doc = JSON.parse(res);
            document.getElementById("title1").innerHTML = "Adhaar Card Image";
            document.getElementById("title2").innerHTML = "Customer Photo";
            document.getElementById("title3").innerHTML = "Voter Card Image";
            document.getElementById("adhaarCardUrl").src = `images/${doc.adhaarCard}`;
            document.getElementById("photoUrl").src = `images/${doc.photo}`;
            document.getElementById("voterCardUrl").src = `images/${doc.voterCard}`;
        }
    }
}

//Add new Application
function addNewApplication() {
    let cid = document.getElementById("cid").value;
    let url = `http://localhost:8080/Banking_Application/onlineapi/customer/${cid}/applications`;
    http = postHttpConnection(url);
    var customerId = cid;
    var applicationId = Math.floor(Math.random() * 1000000);
    var loanType = document.getElementById("loanType").value;
    var loanAmount = document.getElementById("loanAmount").value;
    var status = "Pending..";
    var remark = "Waiting for approval.";
    var loanApplication = new Application(applicationId, customerId, loanType, loanAmount, status, remark);
    http.send(JSON.stringify(loanApplication));
    http.onreadystatechange = function() {
        if(http.readyState == 4) {
            console.log("New application submitted");
        }
    }
}

//Add New Documents
function addNewDocuments() {
    let cid = document.getElementById("cid").value;
    let aid = document.getElementById("aid").value;
    let url = `http://localhost:8080/Banking_Application/onlineapi/customer/${cid}/applications/${aid}/documents`;
    http = postHttpConnection(url);
    const file1 = document.querySelector('#formFile').files[0];
    const file2 = document.querySelector('#formFile1').files[0];
    const file3 = document.querySelector('#formFile2').files[0];
    var applicationId = aid;
    var adhaarCard = file2.name;
    var photo = file1.name;
    var voterCard = file3.name;
    var uploadedDocument = new UploadedDocument(applicationId, adhaarCard, photo, voterCard);
    http.send(JSON.stringify(uploadedDocument));
    http.onreadystatechange = function() {
        if(http.readyState == 4) {
            console.log("Documents uploaded successfully");
        }
    }
}

//Customer Section Callback Function
function getCustomerSection() {
    let selectField = document.getElementById('customerCallBackFunction');
    let valueField = selectField.options[selectField.selectedIndex].value;
    console.log(valueField)
    switch(valueField) {
        case "1":
            getByCustomerId();
            break;
        case "3":
            getApplications();
            break;
        case "4":
            getApplicationById();
            break;
        case "5":
            getDocument();
            break;
        default:
            alert("Please select required field");
    }
}

/*******************************Manager API**************************************/

//Get List of Applications
function listApplications() {
    let url=`http://localhost:8080/Banking_Application/onlineapi/manager/applications`;
    http=getHttpConnection(url);
    http.onreadystatechange = function() {
        if(http.readyState == 4) {
            let allTableDetails = document.getElementById("tableId");
            let tblBody = document.createElement("tbody");
            let applicationRow = document.createElement("tr");

            let cell = document.createElement("th");
            let cellText = document.createTextNode("Customer Id");
            cell.appendChild(cellText);
            applicationRow.appendChild(cell);

            cell = document.createElement("th");
            cellText = document.createTextNode("Application Id");
            cell.appendChild(cellText);
            applicationRow.appendChild(cell);

            cell = document.createElement("th");
            cellText = document.createTextNode("Loan Type");
            cell.appendChild(cellText);
            applicationRow.appendChild(cell);

            cell = document.createElement("th");
            cellText = document.createTextNode("Loan Amount");
            cell.appendChild(cellText);
            applicationRow.appendChild(cell);

            cell = document.createElement("th");
            cellText = document.createTextNode("Application Status");
            cell.appendChild(cellText);
            applicationRow.appendChild(cell);

            cell = document.createElement("th");
            cellText = document.createTextNode("Remarks");
            cell.appendChild(cellText);
            applicationRow.appendChild(cell);
            tblBody.appendChild(applicationRow);

            let res=http.responseText;
            console.log(res);
            let applications = JSON.parse(res);

            applications.forEach(application => {
                applicationRow = document.createElement("tr");

                cell = document.createElement("td");
                cellText = document.createTextNode(application.customerId);
                cell.appendChild(cellText);
                applicationRow.appendChild(cell);

                cell = document.createElement("td");
                cellText = document.createTextNode(application.applicationId);
                cell.appendChild(cellText);
                applicationRow.appendChild(cell);

                cell = document.createElement("td");
                cellText = document.createTextNode(application.loanType);
                cell.appendChild(cellText);
                applicationRow.appendChild(cell);

                cell = document.createElement("td");
                cellText = document.createTextNode(application.loanAmount);
                cell.appendChild(cellText);
                applicationRow.appendChild(cell);

                cell = document.createElement("td");
                cellText = document.createTextNode(application.status);
                cell.appendChild(cellText);
                applicationRow.appendChild(cell);

                cell = document.createElement("td");
                cellText = document.createTextNode(application.remark);
                cell.appendChild(cellText);
                applicationRow.appendChild(cell);
                tblBody.appendChild(applicationRow);
            });
            allTableDetails.appendChild(tblBody);
        }
    }
}

//Get Application Details By Id
function getByApplicationId() {
    let aid = document.getElementById("aid").value;
    let url=`http://localhost:8080/Banking_Application/onlineapi/manager/applications/${aid}`;
    http=getHttpConnection(url);
    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            let allTableDetails = document.getElementById("tableId");
            let tblBody = document.createElement("tbody");
            let applicationRow = document.createElement("tr");

            let cell = document.createElement("th");
            let cellText = document.createTextNode("Customer Id");
            cell.appendChild(cellText);
            applicationRow.appendChild(cell);

            cell = document.createElement("th");
            cellText = document.createTextNode("Application Id");
            cell.appendChild(cellText);
            applicationRow.appendChild(cell);

            cell = document.createElement("th");
            cellText = document.createTextNode("Loan Type");
            cell.appendChild(cellText);
            applicationRow.appendChild(cell);

            cell = document.createElement("th");
            cellText = document.createTextNode("Loan Amount");
            cell.appendChild(cellText);
            applicationRow.appendChild(cell);

            cell = document.createElement("th");
            cellText = document.createTextNode("Application Status");
            cell.appendChild(cellText);
            applicationRow.appendChild(cell);

            cell = document.createElement("th");
            cellText = document.createTextNode("Remarks");
            cell.appendChild(cellText);
            applicationRow.appendChild(cell);
            tblBody.appendChild(applicationRow);

            let res = http.responseText;
            console.log(res);
            let application = JSON.parse(res);

            applicationRow = document.createElement("tr");

            cell = document.createElement("td");
            cellText = document.createTextNode(application.customerId);
            cell.appendChild(cellText);
            applicationRow.appendChild(cell);

            cell = document.createElement("td");
            cellText = document.createTextNode(application.applicationId);
            cell.appendChild(cellText);
            applicationRow.appendChild(cell);

            cell = document.createElement("td");
            cellText = document.createTextNode(application.loanType);
            cell.appendChild(cellText);
            applicationRow.appendChild(cell);

            cell = document.createElement("td");
            cellText = document.createTextNode(application.loanAmount);
            cell.appendChild(cellText);
            applicationRow.appendChild(cell);

            cell = document.createElement("td");
            cellText = document.createTextNode(application.status);
            cell.appendChild(cellText);
            applicationRow.appendChild(cell);

            cell = document.createElement("td");
            cellText = document.createTextNode(application.remark);
            cell.appendChild(cellText);
            applicationRow.appendChild(cell);
            tblBody.appendChild(applicationRow);

            allTableDetails.appendChild(tblBody);
        }
    }
}

//Get Documents for an Application
function getDocumentForApproval() {
    let aid = document.getElementById("aid").value;
    let url=`http://localhost:8080/Banking_Application/onlineapi/manager/applications/${aid}/documents`;
    http=getHttpConnection(url);
    http.onreadystatechange = function() {
        if(http.readyState == 4) {
            let res = http.responseText;
            console.log(res);
            let doc = JSON.parse(res);
            document.getElementById("title1").innerHTML = "Adhaar Card Image";
            document.getElementById("title2").innerHTML = "Customer Photo";
            document.getElementById("title3").innerHTML = "Voter Card Image";
            document.getElementById("adhaarCardUrl").src = `images/${doc.adhaarCard}`;
            document.getElementById("photoUrl").src = `images/${doc.photo}`;
            document.getElementById("voterCardUrl").src = `images/${doc.voterCard}`;
        }
    }
}

//Approve application
function approveApplication() {
    let aid = document.getElementById("aid").value;
    let rem = document.getElementById("remark").value;
    let url=`http://localhost:8080/Banking_Application/onlineapi/manager/applications/${aid}/${rem}/approve`;
    http = updateHttpConnection(url);
    http.send(aid, rem);
    http.onreadystatechange=function() {
        if(http.readyState==4) {
            console.log("Application is approved");
        }
    }
}

//Reject Application
function rejectApplication() {
    let aid = document.getElementById("aid").value;
    let rem = document.getElementById("remark").value;
    let url=`http://localhost:8080/Banking_Application/onlineapi/manager/applications/${aid}/${rem}/reject`;
    http = updateHttpConnection(url);
    http.send(aid);
    http.onreadystatechange=function() {
        if(http.readyState==4) {
            console.log("Application is rejected");
        }
    }
}

//Manager Section Callback function
function getManagerSection() {
    let selectField = document.getElementById('managerCallBackFunction');
    let valueField = selectField.options[selectField.selectedIndex].value;
    console.log(valueField);
    switch(valueField) {
        case "1":
            listApplications();
            break;
        case "2":
            getByApplicationId();
            break;
        case "3":
            getDocumentForApproval();
            break;
        case "4":
            approveApplication();
            break;
        case "5":
            rejectApplication();
            break;
        default:
            alert("Please select required field");
    }
}

/********************************Validate Html Pages************************************************/
//Validate user
function userValidation() {
    var uname= document.getElementById("inputEmail3")
    var pword= document.getElementById("inputPassword3")
    if(uname.value.trim()==""||pword.value.trim()==""){
        alert("No blank values allowed");
        return false;
    }
    else {
        if(uname.value.trim() == "clerk@gmail.com") {
            document.getElementById("userValidationId").action = "clerk.html";
            document.getElementById("userValidationId").submit();
        }
        else if(uname.value.trim() == "manager@gmail.com") {
            document.getElementById("userValidationId").action = "manager.html";
            document.getElementById("userValidationId").submit();
        }
        else {
            document.getElementById("userValidationId").action = "customer.html";
            document.getElementById("userValidationId").submit();
        }
        true;
    }
}

//Clerk Page 1 Validation
function addCustomerValidation() {
    var customerName= document.getElementById("customerName")
    var gender= document.getElementById("gender")
    var email= document.getElementById("email")
    var phoneNo= document.getElementById("phoneNo")
    if(customerName.value.trim()==""||gender.value.trim()==""||email.value.trim()==""||phoneNo.value.trim()==""){
        alert("No blank values allowed");
    }
    else {
        addCustomer();
        window.location.replace("clerk.html");
    }
}

//Clerk Page 2 Validation
function addApplicationValidation() {
    let customerId = document.getElementById("cid");
    var loan= document.getElementById("loanType")
    var amount= document.getElementById("loanAmount")
    if(loan.value.trim()==""||amount.value.trim()==""||customerId.value.trim()=="") {
        alert("No blank values allowed");
    }
    else {
        addApplicationByCustomerId();
        window.location.replace("clerk.html");
    }
}

//Customer Page 1 Validation
function addApplicationByCustomerValidation() {
    let customerId = document.getElementById("cid");
    var loan= document.getElementById("loanType")
    var amount= document.getElementById("loanAmount")
    if(loan.value.trim()==""||amount.value.trim()==""||customerId.value.trim()=="") {
        alert("No blank values allowed");
    }
    else {
        addNewApplication();
        window.location.replace("customer.html");
    }
}

//Clerk Page 3 Validation
function uploadDocumentsValidation() {
    var photo= document.getElementById("formFile").value;
    var aadhar= document.getElementById("formFile1").value;
    var voterid= document.getElementById("formFile2").value;
    
    if(photo==''||aadhar==''||voterid=='') {
        alert("Please select all the files");
    }
    else {
        var extension=photo.substring(photo.lastIndexOf('.')+1).toLowerCase();
        var extension1=aadhar.substring(aadhar.lastIndexOf('.')+1).toLowerCase();
        var extension2=voterid.substring(voterid.lastIndexOf('.')+1).toLowerCase();
        if(extension=='jpg'&& extension1=='jpg'&& extension2=='jpg'){
            addDocumentsByApplicationId();
            window.location.replace("clerk.html");
        }
        else {
            alert('Invalid file type selected');
            document.getElementById("formFile").value='';
            document.getElementById("formFile1").value='';
            document.getElementById("formFile2").value='';
        } 
    }
}

//Customer Page 2 Validation
function uploadDocumentsByCustomerValidation() {
    var photo= document.getElementById("formFile").value;
    var aadhar= document.getElementById("formFile1").value;
    var voterid= document.getElementById("formFile2").value;
    
    if(photo==''||aadhar==''||voterid=='') {
        alert("Please select all the files");
    }
    else {
        var extension=photo.substring(photo.lastIndexOf('.')+1).toLowerCase();
        var extension1=aadhar.substring(aadhar.lastIndexOf('.')+1).toLowerCase();
        var extension2=voterid.substring(voterid.lastIndexOf('.')+1).toLowerCase();
        if(extension=='jpg'&& extension1=='jpg'&& extension2=='jpg'){
            addNewDocuments();
            window.location.replace("customer.html");
        }
        else {
            alert('Invalid file type selected');
            document.getElementById("formFile").value='';
            document.getElementById("formFile1").value='';
            document.getElementById("formFile2").value='';
        } 
    }
}

/*let base64String = "";
  
function imageUploaded() {
    var file = document.querySelector(
        'input[type=file]')['files'][0];
  
    var reader = new FileReader();
    console.log("next");
      
    reader.onload = function () {
        base64String = reader.result.replace("data:", "")
            .replace(/^.+,/, "");
  
        imageBase64Stringsep = base64String;
  
        // alert(imageBase64Stringsep);
        console.log(base64String);
    }
    reader.readAsDataURL(file);
}
  
function displayString() {
    console.log("Base64String about to be printed");
    alert(base64String);
}

function decode() {
    var base64_string = "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";
    var img = document.createElement("img");
    // added `width` , `height` properties to `img` attributes
    img.width = "250px";
    img.height = "250px";
    img.src = "data:image/png;base64," + base64_string;
    var preview = document.getElementById("img_preview");
    preview.appendChild(img);
}*/

/*function addSection() {
    console.log("Hello");
    document.getElementById("Add").onclick = function () {
        console.log("Hi!!");
        location.href = "index.html";
    };
}*/
/*function func(){
    console.log("You were called");
}
function tryFunction(){
var image = new Image();
//Just getting the source from the span. It was messy in JS.
var data1 = "data:image/jpeg;base64,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";
//console.log(document.getElementById("source"));
//image.src = data1;
//document.getElementById("testImage").setAttribute("src", data1);
//console.log(document.getElementById("testImage").src);
//divTag.appendChild(image);

    document.getElementById("testImage").src="images/peacock.jpg";
}*/