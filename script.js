// This script contains the functions for updating the web pages using AJAX

// A function for sending an AJAX request to the server
function sendRequest(url, method, data, callback) {
    // Create a new XMLHttpRequest object
    var xhr = new XMLHttpRequest();

    // Open the connection
    xhr.open(method, url, true);

    // Set the request header for sending JSON data
    xhr.setRequestHeader("Content-Type", "application/json");

    // Handle the response
    xhr.onreadystatechange = function() {
        // Check if the request is completed
        if (xhr.readyState == 4) {
            // Check if the status is OK
            if (xhr.status == 200) {
                // Parse the response data as JSON
                var response = JSON.parse(xhr.responseText);

                // Call the callback function with the response data
                callback(response);
            } else {
                // Handle the error
                console.error(xhr.statusText);
            }
        }
    };

    // Send the request with the data as JSON string
    xhr.send(JSON.stringify(data));
}

// A function for updating the product list using AJAX
function updateProductList() {
    // Get the selected category from the dropdown menu
    var category = document.getElementById("category").value;

    // Send an AJAX request to the server with the category as data
    sendRequest("/products", "POST", { category: category }, function(response) {
        // Get the product list element from the document
        var productList = document.getElementById("product-list");

        // Clear the previous content of the product list element
        productList.innerHTML = "";

        // Loop through the response data which is an array of products
        for (var i = 0; i < response.length; i++) {
            // Get the current product object from the array
            var product = response[i];

            // Create a new div element for the product
            var productDiv = document.createElement("div");
            productDiv.className = "product";

            // Create a new h3 element for the product name
            var productName = document.createElement("h3");
            productName.textContent = product.name;

            // Create a new p element for the product price
            var productPrice = document.createElement("p");
            productPrice.textContent = "Price: " + product.price + " Toman";

            // Create a new p element for the product details
            var productDetails = document.createElement("p");
            productDetails.textContent = "Details: " + product.details;

            // Create a new button element for buying or renting the product
            var productButton = document.createElement("button");
            productButton.textContent = product.type == "buy" ? "Buy" : "Rent";
            productButton.onclick = function() {
                // Send an AJAX request to the server with the product id as data
                sendRequest(
                    "/products/" + product.id,
                    "POST", {},
                    function(response) {
                        // Check if the response is successful or not
                        if (response.success) {
                            // Show an alert message with the response message
                            alert(response.message);
                        } else {
                            // Show an error message with the response message
                            alert("Error: " + response.message);
                        }
                    }
                );
            };

            // Append all the elements to the product div element
            productDiv.appendChild(productName);
            productDiv.appendChild(productPrice);
            productDiv.appendChild(productDetails);
            productDiv.appendChild(productButton);

            // Append the product div element to the product list element
            productList.appendChild(productDiv);
        }
    });
}

// A function for updating the service list using AJAX
function updateServiceList() {
    // Get the selected category from the dropdown menu
    var category = document.getElementById("category").value;

    // Send an AJAX request to the server with the category as data
    sendRequest("/services", "POST", { category: category }, function(response) {
        // Get the service list element from the document
        var serviceList = document.getElementById("service-list");

        // Clear the previous content of the service list element
        serviceList.innerHTML = "";

        // Loop through the response data which is an array of services
        for (var i = 0; i < response.length; i++) {
            // Get the current service object from the array
            var service = response[i];

            // Create a new div element for the service
            var serviceDiv = document.createElement("div");
            serviceDiv.className = "service";

            // Create a new h3 element for the service name
            var serviceName = document.createElement("h3");
            serviceName.textContent = service.name;

            // Create a new p element for the service price
            var servicePrice = document.createElement("p");
            servicePrice.textContent = "Price: " + service.price + " Toman";

            // Create a new p element for the service details
            var serviceDetails = document.createElement("p");
            serviceDetails.textContent = "Details: " + service.details;

            // Create a new button element for buying or renting the service
            var serviceButton = document.createElement("button");
            serviceButton.textContent = service.type == "buy" ? "Buy" : "Rent";
            serviceButton.onclick = function() {
                // Send an AJAX request to the server with the service id as data
                sendRequest(
                    "/services/" + service.id,
                    "POST", {},
                    function(response) {
                        // Check if the response is successful or not
                        if (response.success) {
                            // Show an alert message with the response message
                            alert(response.message);
                        } else {
                            // Show an error message with the response message
                            alert("Error: " + response.message);
                        }
                    }
                );
            };

            // Append all the elements to the service div element
            serviceDiv.appendChild(serviceName);
            serviceDiv.appendChild(servicePrice);
            serviceDiv.appendChild(serviceDetails);
            serviceDiv.appendChild(serviceButton);

            // Append the service div element to the service list element
            serviceList.appendChild(serviceDiv);
        }
    });
}

// A function for updating the profile page using AJAX
function updateProfile() {
    // Send an AJAX request to the server with no data
    sendRequest("/profile", "GET", {}, function(response) {
        // Get the profile element from the document
        var profile = document.getElementById("profile");

        // Clear the previous content of the profile element
        profile.innerHTML = "";

        // Create a new h2 element for the user name
        var userName = document.createElement("h2");
        userName.textContent = response.name;

        // Create a new p element for the user email
        var userEmail = document.createElement("p");
        userEmail.textContent = "Email: " + response.email;

        // Create a new p element for the user role
        var userRole = document.createElement("p");
        userRole.textContent = "Role: " + response.role;

        // Create a new h3 element for the user invoices
        var userInvoices = document.createElement("h3");
        userInvoices.textContent = "Invoices:";

        // Create a new ul element for the invoice list
        var invoiceList = document.createElement("ul");

        // Loop through the response data which is an array of invoices
        for (var i = 0; i < response.invoices.length; i++) {
            // Get the current invoice object from the array
            var invoice = response.invoices[i];

            // Create a new li element for the invoice
            var invoiceItem = document.createElement("li");

            // Create a new p element for the invoice id
            var invoiceId = document.createElement("p");
            invoiceId.textContent = "ID: " + invoice.id;

            // Create a new p element for the invoice date
            var invoiceDate = document.createElement("p");
            invoiceDate.textContent =
                "Date: " + new Date(invoice.date).toLocaleDateString();

            // Create a new p element for the invoice amount
            var invoiceAmount = document.createElement("p");
            invoiceAmount.textContent = "Amount: " + invoice.amount + " Toman";

            // Create a new p element for the invoice status
            var invoiceStatus = document.createElement("p");
            invoiceStatus.textContent =
                "Status: " + (invoice.paid ? "Paid" : "Unpaid");

            // Append all the elements to the invoice item element
            invoiceItem.appendChild(invoiceId);
            invoiceItem.appendChild(invoiceDate);
            invoiceItem.appendChild(invoiceAmount);
            invoiceItem.appendChild(invoiceStatus);

            // Append the invoice item element to the invoice list element
            invoiceList.appendChild(invoiceItem);
        }

        // Append all the elements to the profile element
        profile.appendChild(userName);
        profile.appendChild(userEmail);
        profile.appendChild(userRole);
        profile.appendChild(userInvoices);
        profile.appendChild(invoiceList);
    });
}

// A function for updating the manage page using AJAX
function updateManage() {
    // Send an AJAX request to the server with no data
    sendRequest("/manage", "GET", {}, function(response) {
                // Get the manage element from the document
                var manage = document.getElementById("manage");

                // Clear the previous content of the manage element
                manage.innerHTML = "";

                // Create a new h3 element for the customers list
                var customersListTitle = document.createElement("h3");
                customersListTitle.textContent = "Customers:";

                // Create a new table element for the customers list
                var customersListTable = document.createElement("table");

                // Create a new tr element for the table header row
                var customersListHeaderRow = document.createElement("tr");

                // Create a new tr element for the table header row
                var customersListHeaderRow = document.createElement("tr");

                // Create a new th element for the name column
                var customersListNameColumn = document.createElement("th");
                customersListNameColumn.textContent = "Name";

                // Create a new th element for the email column
                var customersListEmailColumn = document.createElement("th");
                customersListEmailColumn.textContent = "Email";

                // Create a new th element for the role column
                var customersListRoleColumn = document.createElement("th");
                customersListRoleColumn.textContent = "Role";

                // Create a new th element for the edit column
                var customersListEditColumn = document.createElement("th");
                customersListEditColumn.textContent = "Edit";

                // Create a new th element for the delete column
                var customersListDeleteColumn = document.createElement("th");
                customersListDeleteColumn.textContent = "Delete";

                // Append all the elements to the table header row element
                customersListHeaderRow.appendChild(customersListNameColumn);
                customersListHeaderRow.appendChild(customersListEmailColumn);
                customersListHeaderRow.appendChild(customersListRoleColumn);
                customersListHeaderRow.appendChild(customersListEditColumn);
                customersListHeaderRow.appendChild(customersListDeleteColumn);

                // Append the table header row element to the table element
                customersListTable.appendChild(customersListHeaderRow);

                // Loop through the response data which is an array of customers
                for (var i = 0; i < response.customers.length; i++) {
                    // Get the current customer object from the array
                    var customer = response.customers[i];

                    // Create a new tr element for the table body row
                    var customersListBodyRow = document.createElement("tr");

                    // Create a new td element for the name cell
                    var customersListNameCell = document.createElement("td");
                    customersListNameCell.textContent = customer.name;

                    // Create a new td element for the email cell
                    var customersListEmailCell = document.createElement("td");
                    customersListEmailCell.textContent = customer.email;

                    // Create a new td element for the role cell
                    var customersListRoleCell = document.createElement("td");
                    customersListRoleCell.textContent = customer.role;

                    // Create a new td element for the edit cell
                    var customersListEditCell = document.createElement("td");

                    // Create a new button element for editing the customer
                    var customersListEditButton = document.createElement("button");
                    customersListEditButton.textContent = "Edit";
                    customersListEditButton.onclick = function() {
                        // Send an AJAX request to the server with the customer id as data
                        sendRequest(
                            "/manage/customers/" + customer.id,
                            "GET", {},
                            function(response) {
                                // Get the edit form element from the document
                                var editForm = document.getElementById("edit-form");

                                // Clear the previous content of the edit form element
                                editForm.innerHTML = "";

                                // Create a new h3 element for the edit form title
                                var editFormTitle = document.createElement("h3");
                                editFormTitle.textContent =
                                    "Edit Customer: " + response.name + " (" + response.email + ")";

                                // Create a new label element for the name input
                                var editFormNameLabel = document.createElement("label");
                                editFormNameLabel.textContent = "Name:";

                                // Create a new input element for the name input
                                var editFormNameInput = document.createElement("input");
                                editFormNameInput.type = "text";
                                editFormNameInput.value = response.name;

                                // Create a new label element for the email input
                                var editFormEmailLabel = document.createElement("label");
                                editFormEmailLabel.textContent = "Email:";

                                // Create a new input element for the email input
                                var editFormEmailInput = document.createElement("input");
                                editFormEmailInput.type = "email";
                                editFormEmailInput.value = response.email;

                                // Create a new label element for the role input
                                var editFormRoleLabel = document.createElement("label");
                                editFormRoleLabel.textContent = "Role:";

                                // Create a new select element for the role input
                                var editFormRoleSelect = document.createElement("select");

                                // Create a new option element for each possible role value
                                var roles = ["customer", "workshop", "ceo", "admin", "superuser"];
                                for (var j = 0; j < roles.length; j++) {
                                    var roleOption = document.createElement("option");
                                    roleOption.value = roles[j];
                                    roleOption.textContent =
                                        roles[j].charAt(0).toUpperCase() + roles[j].slice(1);
                                    if (roles[j] == response.role) {
                                        roleOption.selected = true;
                                    }
                                    editFormRoleSelect.appendChild(roleOption);
                                }

                                // Create a new button element for submitting the edit form
                                var editFormSubmitButton = document.createElement("button");
                                editFormSubmitButton.textContent = "Submit";
                                editFormSubmitButton.onclick = function() {
                                    // Get the updated values from the input elements
                                    var updatedName = editFormNameInput.value;
                                    var updatedEmail = editFormEmailInput.value;
                                    var updatedRole = editFormRoleSelect.value;

                                    // Send an AJAX request to the server with the updated values as data
                                    sendRequest(
                                        "/manage/customers/" + customer.id,
                                        "PUT", {
                                            name: updatedName,
                                            email: updatedEmail,
                                            role: updatedRole,
                                        },
                                        function(response) {
                                            // Check if the response is successful or not
                                            if (response.success) {
                                                // Show an alert message with the response message
                                                alert(response.message);

                                                // Update the manage page
                                                updateManage();
                                            } else {
                                                // Show an error message with the response message
                                                alert("Error: " + response.message);
                                            }
                                        }
                                    );
                                };

                                // Append all the elements to the edit form element
                                editForm.appendChild(editFormTitle);
                                editForm.appendChild(editFormNameLabel);
                                editForm.appendChild(editFormNameInput);
                                editForm.appendChild(editFormEmailLabel);
                                editForm.appendChild(editFormEmailInput);
                                editForm.appendChild(editFormRoleLabel);
                                editForm.appendChild(editFormRoleSelect);
                                editForm.appendChild(editFormSubmitButton);
                            }
                        );
                    };

                    // Append the button element to the edit cell element
                    customersListEditCell.appendChild(customersListEditButton);

                    // Create a new td element for the delete cell
                    var customersListDeleteCell = document.createElement("td");

                    // Create a new button element for deleting the customer
                    var customersListDeleteButton = document.createElement("button");
                    customersListDeleteButton.textContent = "Delete";
                    customersListDeleteButton.onclick = function() {
                        // Confirm the deletion with the user
                        if (confirm("Are you sure you want to delete this customer?")) {
                            // Send an AJAX request to the server with the customer id as data
                            sendRequest(
                                "/manage/customers/" + customer.id,
                                "DELETE", {},
                                function(response) {
                                    // Check if the response is successful or not
                                    if (response.success) {
                                        // Show an alert message with the response message
                                        alert(response.message);

                                        // Update the manage page
                                        updateManage();
                                    } else {
                                        // Show an error message with the response message
                                        alert("Error: " + response.message);
                                    }
                                }
                            );
                        }
                    };

                    // Append the button element to the delete cell element
                    customersListDeleteCell.appendChild(customersListDeleteButton);

                    // Append all the elements to the table body row element
                    customersListBodyRow.appendChild(customersListNameCell);
                    customersListBodyRow.appendChild(customersListEmailCell);
                    customersListBodyRow.appendChild(customersListRoleCell);
                    customersListBodyRow.appendChild(customersListEditCell);
                    customersListBodyRow.appendChild(customersListDeleteCell);

                    // Append the table body row element to the table element
                    customersListTable.appendChild(customersListBodyRow);
                }

                // Append all the elements to the manage element
                manage.appendChild(customersListTitle);
                manage.appendChild(customersListTable);

                // Create a new h3 element for the workshops list
                var workshopsListTitle = document.createElement("h3");
                workshopsListTitle.textContent = "Workshops:";

                // Create a new table element for the workshops list
                var workshopsListTable = document.createElement("table");

                // Create a new tr element for the table header row
                var workshopsListHeaderRow = document.createElement("tr");

                // Create a new th element for the name column
                var workshopsListNameColumn = document.createElement("th");
                workshopsListNameColumn.textContent = "Name";

                // Create a new th element for the email column
                var workshopsListEmailColumn = document.createElement("th");
                workshopsListEmailColumn.textContent = "Email";

                // Create a new th element for the role column
                var workshopsListRoleColumn = document.createElement("th");
                workshopsListRoleColumn.textContent = "Role";

                // Create a new th element for the edit column
                var workshopsListEditColumn = document.createElement("th");
                workshopsListEditColumn.textContent = "Edit";

                // Create a new th element for the delete column
                var workshopsListDeleteColumn = document.createElement("th");
                workshopsListDeleteColumn.textContent = "Delete";

                // Append all the elements to the table header row element
                workshopsListHeaderRow.appendChild(workshopsListNameColumn);
                workshopsListHeaderRow.appendChild(workshopsListEmailColumn);
                workshopsListHeaderRow.appendChild(workshopsListRoleColumn);
                workshopsListHeaderRow.appendChild(workshopsListEditColumn);
                workshopsListHeaderRow.appendChild // Append all the elements to the table header row element
                workshopsListHeaderRow.appendChild(workshopsListNameColumn);
                workshopsListHeaderRow.appendChild(workshopsListEmailColumn);
                workshopsListHeaderRow.appendChild(workshopsListRoleColumn);
                workshopsListHeaderRow.appendChild(workshopsListEditColumn);
                workshopsListHeaderRow.appendChild(workshopsListDeleteColumn);

                // Append the table header row element to the table element
                workshopsListTable.appendChild(workshopsListHeaderRow);

                // Loop through the response data which is an array of workshops
                for (var i = 0; i < response.workshops.length; i++) {
                    // Get the current workshop object from the array
                    var workshop = response.workshops[i];

                    // Create a new tr element for the table body row
                    var workshopsListBodyRow = document.createElement("tr");

                    // Create a new td element for the name cell
                    var workshopsListNameCell = document.createElement("td");
                    workshopsListNameCell.textContent = workshop.name;

                    // Create a new td element for the email cell
                    var workshopsListEmailCell = document.createElement("td");
                    workshopsListEmailCell.textContent = workshop.email;

                    // Create a new td element for the role cell
                    var workshopsListRoleCell = document.createElement("td");
                    workshopsListRoleCell.textContent = workshop.role;

                    // Create a new td element for the edit cell
                    var workshopsListEditCell = document.createElement("td");

                    // Create a new button element for editing the workshop
                    var workshopsListEditButton = document.createElement("button");
                    workshopsListEditButton.textContent = "Edit";
                    workshopsListEditButton.onclick = function() {
                        // Send an AJAX request to the server with the workshop id as data
                        sendRequest(
                            "/manage/workshops/" + workshop.id,
                            "GET", {},
                            function(response) {
                                // Get the edit form element from the document
                                var editForm = document.getElementById("edit-form");

                                // Clear the previous content of the edit form element
                                editForm.innerHTML = "";

                                // Create a new h3 element for the edit form title
                                var editFormTitle = document.createElement("h3");
                                editFormTitle.textContent =
                                    "Edit Workshop: " + response.name + " (" + response.email + ")";

                                // Create a new label element for the name input
                                var editFormNameLabel = document.createElement("label");
                                editFormNameLabel.textContent = "Name:";

                                // Create a new input element for the name input
                                var editFormNameInput = document.createElement("input");
                                editFormNameInput.type = "text";
                                editFormNameInput.value = response.name;

                                // Create a new label element for the email input
                                var editFormEmailLabel = document.createElement("label");
                                editFormEmailLabel.textContent = "Email:";

                                // Create a new input element for the email input
                                var editFormEmailInput = document.createElement("input");
                                editFormEmailInput.type = "email";
                                editFormEmailInput.value = response.email;

                                // Create a new label element for the role input
                                var editFormRoleLabel = document.createElement("label");
                                editFormRoleLabel.textContent = "Role:";

                                // Create a new select element for the role input
                                var editFormRoleSelect = document.createElement("select");

                                // Create a new option element for each possible role value
                                var roles = ["customer", "workshop", "ceo", "admin", "superuser"];
                                for (var j = 0; j < roles.length; j++) {
                                    var roleOption = document.createElement("option");
                                    roleOption.value = roles[j];
                                    roleOption.textContent =
                                        roles[j].charAt(0).toUpperCase() + roles[j].slice(1);
                                    if (roles[j] == response.role) {
                                        roleOption.selected = true;
                                    }
                                    editFormRoleSelect.appendChild(roleOption);
                                }

                                // Create a new button element for submitting the edit form
                                var editFormSubmitButton = document.createElement("button");
                                editFormSubmitButton.textContent = "Submit";
                                editFormSubmitButton.onclick = function() {
                                    // Get the updated values from the input elements
                                    var updatedName = editFormNameInput.value;
                                    var updatedEmail = editFormEmailInput.value;
                                    var updatedRole = editFormRoleSelect.value;

                                    // Send an AJAX request to the server with the updated values as data
                                    sendRequest(
                                        "/manage/workshops/" + workshop.id,
                                        "PUT", {
                                            name: updatedName,
                                            email: updatedEmail,
                                            role: updatedRole,
                                        },
                                        function(response) {
                                            // Check if the response is successful or not
                                            if (response.success) {
                                                // Show an alert message with the response message
                                                alert(response.message);

                                                // Update the manage page
                                                updateManage();
                                            } else {
                                                // Show an error message with the response message
                                                alert("Error: " + response.message);
                                            }
                                        }
                                    );
                                };

                                // Append all the elements to the edit form element
                                editForm.appendChild(editFormTitle);
                                editForm.appendChild(editFormNameLabel);
                                editForm.appendChild(editFormNameInput);
                                editForm.appendChild(editFormEmailLabel);
                                editForm.appendChild(editFormEmailInput);
                                editForm.appendChild(editFormRoleLabel);
                                editForm.appendChild(editFormRoleSelect);
                                editForm.appendChild(editFormSubmitButton);
                            }
                        );
                    };

                    // Append the button element to the edit cell element
                    workshopsListEditCell.appendChild(workshopsListEditButton);

                    // Create a new td element for the delete cell
                    var workshopsListDeleteCell = document.createElement("td");

                    // Create a new button element for deleting the workshop
                    var workshopsListDeleteButton = document.createElement("button");
                    workshopsListDeleteButton.textContent = "Delete";
                    workshopsListDeleteButton.onclick = function() {
                        // Confirm the deletion with the user
                        if (confirm("Are you sure you want to delete this workshop?")) {
                            // Send an AJAX request to the server with the workshop id as data
                            sendRequest(
                                "/manage/workshops/" + workshop.id,
                                "DELETE", {},
                                function(response) {
                                    // Check if the response is successful or not
                                    if (response.success) {
                                        // Show an alert message with the response message
                                        alert(response.message);

                                        // Update the manage page
                                        updateManage();
                                    } else {
                                        // Show an error message with the response message
                                        alert("Error: " + response.message);
                                    }
                                }
                            );
                        }
                    };

                    // Append the button element to the delete cell element
                    workshopsListDeleteCell.appendChild(workshopsListDeleteButton);

                    // Append all the elements to the table body row element
                    workshopsListBodyRow.appendChild(workshopsListNameCell);
                    workshopsListBodyRow.appendChild(workshopsListEmailCell);
                    workshopsListBodyRow.appendChild(workshopsListRoleCell);
                    workshopsListBodyRow.appendChild(workshopsListEditCell);
                    workshopsListBodyRow.appendChild(workshopsListDeleteCell);

                    // Append the table body row element to the table element
                    workshopsListTable.appendChild(workshopsListBodyRow);
                }

                // Append all the elements to the manage element
                manage.appendChild(workshopsListTitle);
                manage.appendChild(workshopsListTable);

                // Create a new h3 element for the products list
                var productsListTitle = document.createElement("h3");
                productsListTitle.textContent = "Products:";

                // Create a new table element for the products list
                var productsListTable = document.createElement("table");

                // Create a new tr element for the table header row
                var productsListHeaderRow = document.createElement("tr");

                // Create a new th element for the name column
                var productsListNameColumn = document.createElement("th");
                productsListNameColumn.textContent = "Name";

                // Create a new th element for the price column
                var productsListPriceColumn = document.createElement("th");
                productsListPriceColumn.textContent = "Price";

                // Create a new th element for the details column
                var productsListDetailsColumn = document.createElement("th");
                productsListDetailsColumn.textContent = "Details";

                // Create a new th element for the type column
                var productsListTypeColumn = document.createElement("th");
                productsListTypeColumn.textContent = "Type";

                // Create a new th element for the edit column
                var productsListEditColumn = document.createElement("th");
                productsListEditColumn.textContent = "Edit";

                // Create a new th element for the delete column
                var productsListDeleteColumn = document.createElement("th");
                productsListDeleteColumn.textContent = "Delete";

                // Append all the elements to the table header row element
                productsListHeaderRow.appendChild(productsListNameColumn);
                productsListHeaderRow.appendChild(productsListPriceColumn);
                productsListHeaderRow.appendChild(productsListDetailsColumn);
                productsListHeaderRow.appendChild(productsListTypeColumn);
                productsListHeaderRow.appendChild(productsListEditColumn);
                productsLis // Append all the elements to the table header row element
                productsListHeaderRow.appendChild(productsListNameColumn);
                productsListHeaderRow.appendChild(productsListPriceColumn);
                productsListHeaderRow.appendChild(productsListDetailsColumn);
                productsListHeaderRow.appendChild(productsListTypeColumn);
                productsListHeaderRow.appendChild(productsListEditColumn);
                productsListHeaderRow.appendChild(productsListDeleteColumn);

                // Append the table header row element to the table element
                productsListTable.appendChild(productsListHeaderRow);

                // Loop through the response data which is an array of products
                for (var i = 0; i < response.products.length; i++) {
                    // Get the current product object from the array
                    var product = response.products[i];

                    // Create a new tr element for the table body row
                    var productsListBodyRow = document.createElement("tr");

                    // Create a new td element for the name cell
                    var productsListNameCell = document.createElement("td");
                    productsListNameCell.textContent = product.name;

                    // Create a new td element for the price cell
                    var productsListPriceCell = document.createElement("td");
                    productsListPriceCell.textContent = product.price + " Toman";

                    // Create a new td element for the details cell
                    var productsListDetailsCell = document.createElement("td");
                    productsListDetailsCell.textContent = product.details;

                    // Create a new td element for the type cell
                    var productsListTypeCell = document.createElement("td");
                    productsListTypeCell.textContent =
                        product.type == "buy" ? "Buy" : "Rent";

                    // Create a new td element for the edit cell
                    var productsListEditCell = document.createElement("td");

                    // Create a new button element for editing the product
                    var productsListEditButton = document.createElement("button");
                    productsListEditButton.textContent = "Edit";
                    productsListEditButton.onclick = function() {
                        // Send an AJAX request to the server with the product id as data
                        sendRequest(
                            "/manage/products/" + product.id,
                            "GET", {},
                            function(response) {
                                // Get the edit form element from the document
                                var editForm = document.getElementById("edit-form");

                                // Clear the previous content of the edit form element
                                editForm.innerHTML = "";

                                // Create a new h3 element for the edit form title
                                var editFormTitle = document.createElement("h3");
                                editFormTitle.textContent =
                                    "Edit Product: " + response.name + " (" + response.price + " Toman)";

                                // Create a new label element for the name input
                                var editFormNameLabel = document.createElement("label");
                                editFormNameLabel.textContent = "Name:";

                                // Create a new input element for the name input
                                var editFormNameInput = document.createElement("input");
                                editFormNameInput.type = "text";
                                editFormNameInput.value = response.name;

                                // Create a new label element for the price input
                                var editFormPriceLabel = document.createElement("label");
                                editFormPriceLabel.textContent = "Price:";

                                // Create a new input element for the price input
                                var editFormPriceInput = document.createElement("input");
                                editFormPriceInput.type = "number";
                                editFormPriceInput.value = response.price;

                                // Create a new label element for the details input
                                var editFormDetailsLabel = document.createElement("label");
                                editFormDetailsLabel.textContent = "Details:";

                                // Create a new textarea element for the details input
                                var editFormDetailsTextarea = document.createElement("textarea");
                                editFormDetailsTextarea.value = response.details;

                                // Create a new label element for the type input
                                var editFormTypeLabel = document.createElement("label");
                                editFormTypeLabel.textContent = "Type:";

                                // Create a new select element for the type input
                                var editFormTypeSelect = document.createElement("select");

                                // Create a new option element for each possible type value
                                var types = ["buy", "rent"];
                                for (var j = 0; j < types.length; j++) {
                                    var typeOption = document.createElement("option");
                                    typeOption.value = types[j];
                                    typeOption.textContent =
                                        types[j] == "buy" ? "Buy" : "Rent";
                                    if (types[j] == response.type) {
                                        typeOption.selected = true;
                                    }
                                    editFormTypeSelect.appendChild(typeOption);
                                }

                                // Create a new button element for submitting the edit form
                                var editFormSubmitButton = document.createElement("button");
                                editFormSubmitButton.textContent = "Submit";
                                editFormSubmitButton.onclick = function() {
                                    // Get the updated values from the input elements
                                    var updatedName = editFormNameInput.value;
                                    var updatedPrice = editFormPriceInput.value;
                                    var updatedDetails = editFormDetailsTextarea.value;
                                    var updatedType = editFormTypeSelect.value;

                                    // Send an AJAX request to the server with the updated values as data
                                    sendRequest(
                                        "/manage/products/" + product.id,
                                        "PUT", {
                                            name: updatedName,
                                            price: updatedPrice,
                                            details: updatedDetails,
                                            type: updatedType,
                                        },
                                        function(response) {
                                            // Check if the response is successful or not
                                            if (response.success) {
                                                // Show an alert message with the response message
                                                alert(response.message);

                                                // Update the manage page
                                                updateManage();
                                            } else {
                                                // Show an error message with the response message
                                                alert("Error: " + response.message);
                                            }
                                        }
                                    );
                                };

                                // Append all the elements to the edit form element
                                editForm.appendChild(editFormTitle);
                                editForm.appendChild(editFormNameLabel);
                                editForm.appendChild(editFormNameInput);
                                editForm.appendChild(editFormPriceLabel);
                                editForm.appendChild(editFormPriceInput);
                                editForm.appendChild(editFormDetailsLabel);
                                editForm.appendChild(editFormDetailsTextarea);
                                editForm.appendChild(editFormTypeLabel);
                                editForm.appendChild(editFormTypeSelect);
                                editForm.appendChild(editFormSubmitButton);
                            }
                        );
                    };

                    // Append the button element to the edit cell element
                    productsListEditCell.appendChild(productsListEditButton);

                    // Create a new td element for the delete cell
                    var productsListDeleteCell = document.createElement("td");

                    // Create a new button element for deleting the product
                    var productsListDeleteButton = document.createElement("button");
                    productsListDeleteButton.textContent = "Delete";
                    productsListDeleteButton.onclick = function() {
                        // Confirm the deletion with the user
                        if (confirm("Are you sure you want to delete this product?")) {
                            // Send an AJAX request to the server with the product id as data
                            sendRequest(
                                "/manage/products/" + product.id,
                                "DELETE", {},
                                function(response) {
                                    // Check if the response is successful or not
                                    if (response.success) {
                                        // Show an alert message with the response message
                                        alert(response.message);

                                        // Update the manage page
                                        updateManage();
                                    } else {
                                        // Show an error message with the response message
                                        alert("Error: " + response.message);
                                    }
                                }
                            );
                        }
                    };

                    // Append the button element to the delete cell element
                    productsListDeleteCell.appendChild(productsListDeleteButton);

                    // Append all the elements to the table body row element
                    productsListBodyRow.appendChild(productsListNameCell);
                    productsListBodyRow.appendChild(productsListPriceCell);
                    productsListBodyRow.appendChild(productsListDetailsCell);
                    productsListBodyRow.appendChild(productsListTypeCell);
                    productsListBodyRow.appendChild(productsListEditCell);
                    productsListBodyRow.appendChild(productsListDeleteCell);

                    // Append the table body row element to the table element
                    productsListTable.appendChild(productsListBodyRow);
                }

                // Append all the elements to the manage element
                manage.appendChild(productsListTitle);
                manage.appendChild(productsListTable);

                // Create a new h3 element for the services list
                var servicesListTitle = document.createElement("h3");
                servicesListTitle.textContent = "Services:";

                // Create a new table element for the services list
                var servicesListTable = document.createElement("table");

                // Create a new tr element for the table header row
                var servicesListHeaderRow = document.createElement("tr");

                // Create a new th element for the name column
                var servicesListNameColumn = document.createElement("th");
                servicesListNameColumn.textContent = "Name";

                // Create a new th element for the price column
                var servicesListPriceColumn = document.createElement("th");
                servicesListPriceColumn.textContent = "Price";

                // Create a new th element for the details column
                var servicesListDetailsColumn = document.createElement("th");
                servicesListDetailsColumn.textContent = "Details";

                // Create a new th element for the type column
                var servicesListTypeColumn = document.createElement("th");
                servicesListTypeColumn.textContent = "Type";

                // Create a new th element for the edit column
                var servicesListEditColumn = document.createElement("th");
                servicesListEditColumn.textContent = "Edit";

                // Create a new th element for the delete column
                var servicesListDeleteColumn = document.createElement("th");
                servicesListDeleteColumn.textContent = "Delete";

                // Append all the elements to the table header row element
                servicesListHeaderRow.appendChild(servicesListNameColumn);
                servicesLis // Append all the elements to the table header row element
                servicesListHeaderRow.appendChild(servicesListNameColumn);
                servicesListHeaderRow.appendChild(servicesListPriceColumn);
                servicesListHeaderRow.appendChild(servicesListDetailsColumn);
                servicesListHeaderRow.appendChild(servicesListTypeColumn);
                servicesListHeaderRow.appendChild(servicesListEditColumn);
                servicesListHeaderRow.appendChild(servicesListDeleteColumn);

                // Append the table header row element to the table element
                servicesListTable.appendChild(servicesListHeaderRow);

                // Loop through the response data which is an array of services
                for (var i = 0; i < response.services.length; i++) {
                    // Get the current service object from the array
                    var service = response.services[i];

                    // Create a new tr element for the table body row
                    var servicesListBodyRow = document.createElement("tr");

                    // Create a new td element for the name cell
                    var servicesListNameCell = document.createElement("td");
                    servicesListNameCell.textContent = service.name;

                    // Create a new td element for the price cell
                    var servicesListPriceCell = document.createElement("td");
                    servicesListPriceCell.textContent = service.price + " Toman";

                    // Create a new td element for the details cell
                    var servicesListDetailsCell = document.createElement("td");
                    servicesListDetailsCell.textContent = service.details;

                    // Create a new td element for the type cell
                    var servicesListTypeCell = document.createElement("td");
                    servicesListTypeCell.textContent =
                        service.type == "buy" ? "Buy" : "Rent";

                    // Create a new td element for the edit cell
                    var servicesListEditCell = document.createElement("td");

                    // Create a new button element for editing the service
                    var servicesListEditButton = document.createElement("button");
                    servicesListEditButton.textContent = "Edit";
                    servicesListEditButton.onclick = function() {
                        // Send an AJAX request to the server with the service id as data
                        sendRequest(
                            "/manage/services/" + service.id,
                            "GET", {},
                            function(response) {
                                // Get the edit form element from the document
                                var editForm = document.getElementById("edit-form");

                                // Clear the previous content of the edit form element
                                editForm.innerHTML = "";

                                // Create a new h3 element for the edit form title
                                var editFormTitle = document.createElement("h3");
                                editFormTitle.textContent =
                                    "Edit Service: " + response.name + " (" + response.price + " Toman)";

                                // Create a new label element for the name input
                                var editFormNameLabel = document.createElement("label");
                                editFormNameLabel.textContent = "Name:";

                                // Create a new input element for the name input
                                var editFormNameInput = document.createElement("input");
                                editFormNameInput.type = "text";
                                editFormNameInput.value = response.name;

                                // Create a new label element for the price input
                                var editFormPriceLabel = document.createElement("label");
                                editFormPriceLabel.textContent = "Price:";

                                // Create a new input element for the price input
                                var editFormPriceInput = document.createElement("input");
                                editFormPriceInput.type = "number";
                                editFormPriceInput.value = response.price;

                                // Create a new label element for the details input
                                var editFormDetailsLabel = document.createElement("label");
                                editFormDetailsLabel.textContent = "Details:";

                                // Create a new textarea element for the details input
                                var editFormDetailsTextarea = document.createElement("textarea");
                                editFormDetailsTextarea.value = response.details;

                                // Create a new label element for the type input
                                var editFormTypeLabel = document.createElement("label");
                                editFormTypeLabel.textContent = "Type:";

                                // Create a new select element for the type input
                                var editFormTypeSelect = document.createElement("select");

                                // Create a new option element for each possible type value
                                var types = ["buy", "rent"];
                                for (var j = 0; j < types.length; j++) {
                                    var typeOption = document.createElement("option");
                                    typeOption.value = types[j];
                                    typeOption.textContent =
                                        types[j] == "buy" ? "Buy" : "Rent";
                                    if (types[j] == response.type) {
                                        typeOption.selected = true;
                                    }
                                    editFormTypeSelect.appendChild(typeOption);
                                }

                                // Create a new button element for submitting the edit form
                                var editFormSubmitButton = document.createElement("button");
                                editFormSubmitButton.textContent = "Submit";
                                editFormSubmitButton.onclick = function() {
                                    // Get the updated values from the input elements
                                    var updatedName = editFormNameInput.value;
                                    var updatedPrice = editFormPriceInput.value;
                                    var updatedDetails = editFormDetailsTextarea.value;
                                    var updatedType = editFormTypeSelect.value;

                                    // Send an AJAX request to the server with the updated values as data
                                    sendRequest(
                                        "/manage/services/" + service.id,
                                        "PUT", {
                                            name: updatedName,
                                            price: updatedPrice,
                                            details: updatedDetails,
                                            type: updatedType,
                                        },
                                        function(response) {
                                            // Check if the response is successful or not
                                            if (response.success) {
                                                // Show an alert message with the response message
                                                alert(response.message);

                                                // Update the manage page
                                                updateManage();
                                            } else {
                                                // Show an error message with the response message
                                                alert("Error: " + response.message);
                                            }
                                        }
                                    );
                                };

                                // Append all the elements to the edit form element
                                editForm.appendChild(editFormTitle);
                                editForm.appendChild(editFormNameLabel);
                                editForm.appendChild(editFormNameInput);
                                editForm.appendChild(editFormPriceLabel);
                                editForm.appendChild(editFormPriceInput);
                                editForm.appendChild(editFormDetailsLabel);
                                editForm.appendChild(editFormDetailsTextarea);
                                editForm.appendChild(editFormTypeLabel);
                                editForm.appendChild(editFormTypeSelect);
                                editForm.appendChild(editFormSubmitButton);
                            }
                        );
                    };

                    // Append the button element to the edit cell element
                    servicesListEditCell.appendChild(servicesListEditButton);

                    // Create a new td element for the delete cell
                    var servicesListDeleteCell = document.createElement("td");

                    // Create a new button element for deleting the service
                    var servicesListDeleteButton = document.createElement("button");
                    servicesListDeleteButton.textContent = "Delete";
                    servicesListDeleteButton.onclick = function() {
                        // Confirm the deletion with the user
                        if (confirm("Are you sure you want to delete this service?")) {
                            // Send an AJAX request to the server with the service id as data
                            sendRequest(
                                "/manage/services/" + service.id,
                                "DELETE", {},
                                function(response) {
                                    // Check if the response is successful or not
                                    if (response.success) {
                                        // Show an alert message with the response message
                                        alert(response.message);

                                        // Update the manage page
                                        updateManage();
                                    } else {
                                        // Show an error message with the response message
                                        alert("Error: " + response.message);
                                    }
                                }
                            );
                        }
                    };

                    // Append the button element to the delete cell element
                    servicesListDeleteCell.appendChild(servicesListDeleteButton);

                    // Append all the elements to the table body row element
                    servicesListBodyRow.appendChild(servicesListNameCell);
                    servicesListBodyRow.appendChild(servicesListPriceCell);
                    servicesListBodyRow.appendChild(servicesListDetailsCell);
                    servicesListBodyRow.appendChild(servicesListTypeCell);
                    servicesListBodyRow.appendChild(servicesListEditCell);
                    servicesListBodyRow.appendChild(servicesListDeleteCell);

                    // Append the table body row element to the table element
                    servicesListTable.appendChild(servicesListBodyRow);
                }

                // Append all the elements to the manage element
                manage.appendChild(servicesListTitle);
                manage.appendChild(servicesListTable);

                // Create a new h3 element for the invoices list
                var invoicesListTitle = document.createElement("h3");
                invoicesListTitle.textContent = "Invoices:";

                // Create a new table element for the invoices list
                var invoicesListTable = document.createElement("table");

                // Create a new tr element for the table header row
                var invoicesListHeaderRow = document.createElement("tr");

                // Create a new th element for the id column
                var invoicesListIdColumn = document.createElement("th");
                invoicesListIdColumn.textContent = "ID";

                // Create a new th element for the date column
                var invoicesListDateColumn = document.createElement("th");
                invoicesListDateColumn.textContent = "Date";

                // Create a new th element for the amount column
                var invoicesListAmountColumn = document.createElement("th");
                invoicesListAmountColumn.textContent = "Amount";

                // Create a new th element for the paid column
                var invoicesListPaidColumn = document.createElement("th");
                invoicesListPaidColumn.textContent = "Paid";

                // Create a new th element for the customer column
                var invoicesListCustomerColumn = document.createElement("th");
                invoicesListCustomerColumn.textContent = "Customer";

                // Create a new th element for the product column
                var invoicesListProductColumn = document.createElement("th");
                invoicesListProductColumn.textContent = "Product";

                // Create a new th element for the service column
                var invoicesListServiceColumn = document.createElement("th");
                invoicesListServiceColumn.textContent = "Service";

                // Create a new th element for the edit column

                var invoicesListEditColumn = document.createElement("th");
                invoicesListEditColumn.textContent = "Edit";

                // Create a new th element for the delete column
                var invoicesListDeleteColumn = document.createElement("th");
                invoicesListDeleteColumn.textContent = "Delete";

                // Append all the elements to the table header row element
                invoicesListHeaderRow.appendChild(invoicesListIdColumn);
                invoicesListHeaderRow.appendChild(invoicesListDateColumn);
                invoicesListHeaderRow.appendChild(invoicesListAmountColumn);
                invoicesListHeaderRow.appendChild(invoicesListPaidColumn);
                invoicesListHeaderRow.appendChild(invoicesListCustomerColumn);
                invoicesListHeaderRow.appendChild(invoicesListProductColumn);
                invoicesListHeaderRow.appendChild(invoicesListServiceColumn);
                invoicesListHeaderRow.appendChild(invoicesListEditColumn);
                invoicesListHeaderRow.appendChild(invoicesListDeleteColumn);

                // Append the table header row element to the table element
                invoicesListTable.appendChild(invoicesListHeaderRow);

                // Loop through the response data which is an array of invoices
                for (var i = 0; i < response.invoices.length; i++) {
                    // Get the current invoice object from the array
                    var invoice = response.invoices[i];

                    // Create a new tr element for the table body row
                    var invoicesListBodyRow = document.createElement("tr");

                    // Create a new td element for the id cell
                    var invoicesListIdCell = document.createElement("td");
                    invoicesListIdCell.textContent = invoice.id;

                    // Create a new td element for the date cell
                    var invoicesListDateCell = document.createElement("td");
                    invoicesListDateCell.textContent =
                        new Date(invoice.date).toLocaleDateString();

                    // Create a new td element for the amount cell
                    var invoicesListAmountCell = document.createElement("td");
                    invoicesListAmountCell.textContent = invoice.amount + " Toman";

                    // Create a new td element for the paid cell
                    var invoicesListPaidCell = document.createElement("td");
                    invoicesListPaidCell.textContent =
                        invoice.paid ? "Yes" : "No";

                    // Create a new td element for the customer cell
                    var invoicesListCustomerCell = document.createElement("td");
                    invoicesListCustomerCell.textContent = invoice.customer;

                    // Create a new td element for the product cell
                    var invoicesListProductCell = document.createElement("td");
                    invoicesListProductCell.textContent =
                        invoice.product ? invoice.product : "-";

                    // Create a new td element for the service cell
                    var invoicesListServiceCell = document.createElement("td");
                    invoicesListServiceCell.textContent =
                        invoice.service ? invoice.service : "-";

                    // Create a new td element for the edit cell
                    var invoicesListEditCell = document.createElement("td");

                    // Create a new button element for editing the invoice
                    var invoicesListEditButton = document.createElement("button");
                    invoicesListEditButton.textContent = "Edit";
                    invoicesListEditButton.onclick = function() {
                        // Send an AJAX request to the server with the invoice id as data
                        sendRequest(
                            "/manage/invoices/" + invoice.id,
                            "GET", {},
                            function(response) {
                                // Get the edit form element from the document
                                var editForm = document.getElementById("edit-form");

                                // Clear the previous content of the edit form element
                                editForm.innerHTML = "";

                                // Create a new h3 element for the edit form title
                                var editFormTitle = document.createElement("h3");
                                editFormTitle.textContent =
                                    "Edit Invoice: " +
                                    response.id +
                                    " (" +
                                    response.amount +
                                    " Toman)";

                                // Create a new label element for the date input
                                var editFormDateLabel = document.createElement("label");
                                editFormDateLabel.textContent = "Date:";

                                // Create a new input element for the date input
                                var editFormDateInput = document.createElement("input");
                                editFormDateInput.type = "date";
                                editFormDateInput.value =
                                    new Date(response.date).toISOString().slice(0, 10);

                                // Create a new label element for the amount input
                                var editFormAmountLabel = document.createElement("label");
                                editFormAmountLabel.textContent = "Amount:";

                                // Create a new input element for the amount input
                                var editFormAmountInput = document.createElement("input");
                                editFormAmountInput.type = "number";
                                editFormAmountInput.value = response.amount;

                                // Create a new label element for the paid input
                                var editFormPaidLabel = document.createElement("label");
                                editFormPaidLabel.textContent = "Paid:";

                                // Create a new select element for the paid input
                                var editFormPaidSelect = document.createElement("select");

                                // Create a new option element for each possible paid value
                                var paidValues = [true, false];
                                for (var j = 0; j < paidValues.length; j++) {
                                    var paidOption = document.createElement("option");
                                    paidOption.value = paidValues[j];
                                    paidOption.textContent =
                                        paidValues[j] ? "Yes" : "No";
                                    if (paidValues[j] == response.paid) {
                                        paidOption.selected = true;
                                    }
                                    editFormPaidSelect.appendChild(paidOption);
                                }

                                // Create a new label element for the customer input
                                var editFormCustomerLabel = document.createElement("label");
                                editFormCustomerLabel.textContent = "Customer:";

                                // Create a new select element for the customer input
                                var editFormCustomerSelect = document.createElement("select");

                                // Create a new option element for each possible customer value
                                var customers = response.customers;
                                for (var j = 0; j < customers.length; j++) {
                                    var customerOption = document.createElement("option");
                                    customerOption.value = customers[j].id;
                                    customerOption.textContent =
                                        customers[j].name + " (" + customers[j].email + ")";
                                    if (customers[j].id == response.customer_id) {
                                        customerOption.selected = true;
                                    }
                                    editFormCustomerSelect.appendChild(customerOption);
                                }

                                // Create a new label element for the product input
                                var editFormProductLabel = document.createElement("label");
                                editFormProductLabel.textContent = "Product:";

                                // Create a new select element for the product input
                                var editFormProductSelect = document.createElement("select");

                                // Create a new option element for the empty product value
                                var productEmptyOption = document.createElement("option");
                                productEmptyOption.value = "";
                                productEmptyOption.textContent = "-";
                                if (!response.product_id) {
                                    productEmptyOption.selected = true;
                                }
                                editFormProductSelect.appendChild(productEmptyOption);

                                // Create a new option element for each possible product value
                                var products = response.products;
                                for (var j = 0; j < products.length; j++) {
                                    var productOption = document.createElement("option");
                                    productOption.value = products[j].id;
                                    productOption.textContent =
                                        products[j].name + " (" + products[j].price + " Toman)";
                                    if (products[j].id == response.product_id) {
                                        productOption.selected = true;
                                    }
                                    editFormProductSelect.appendChild(productOption);
                                }

                                // Create a new label element for the service input
                                var editFormServiceLabel = document.createElement("label");
                                editFormServiceLabel.textContent = "Service:";

                                // Create a new select element for the service input
                                var editFormServiceSelect = document.createElement("select");

                                // Create a new option element for the empty service value
                                var serviceEmptyOption = document.createElement("option");
                                // Create a new option element for the empty service value
                                var serviceEmptyOption = document.createElement("option");
                                serviceEmptyOption.value = "";
                                serviceEmptyOption.textContent = "-";
                                if (!response.service_id) {
                                    serviceEmptyOption.selected = true;
                                }
                                editFormServiceSelect.appendChild(serviceEmptyOption);

                                // Create a new option element for each possible service value
                                var services = response.services;
                                for (var j = 0; j < services.length; j++) {
                                    var serviceOption = document.createElement("option");
                                    serviceOption.value = services[j].id;
                                    serviceOption.textContent =
                                        services[j].name + " (" + services[j].price + " Toman)";
                                    if (services[j].id == response.service_id) {
                                        serviceOption.selected = true;
                                    }
                                    editFormServiceSelect.appendChild(serviceOption);
                                }

                                // Create a new button element for submitting the edit form
                                var editFormSubmitButton = document.createElement("button");
                                editFormSubmitButton.textContent = "Submit";
                                editFormSubmitButton.onclick = function() {
                                    // Get the updated values from the input elements
                                    var updatedDate = editFormDateInput.value;
                                    var updatedAmount = editFormAmountInput.value;
                                    var updatedPaid = editFormPaidSelect.value;
                                    var updatedCustomer = editFormCustomerSelect.value;
                                    var updatedProduct = editFormProductSelect.value;
                                    var updatedService = editFormServiceSelect.value;

                                    // Send an AJAX request to the server with the updated values as data
                                    sendRequest(
                                        "/manage/invoices/" + invoice.id,
                                        "PUT", {
                                            date: updatedDate,
                                            amount: updatedAmount,
                                            paid: updatedPaid,
                                            customer: updatedCustomer,
                                            product: updatedProduct,
                                            service: updatedService,
                                        },
                                        function(response) {
                                            // Check if the response is successful or not
                                            if (response.success) {
                                                // Show an alert message with the response message
                                                alert(response.message);

                                                // Update the manage page
                                                updateManage();
                                            } else {
                                                // Show an error message with the response message
                                                alert("Error: " + response.message);
                                            }
                                        }
                                    );
                                };

                                // Append all the elements to the edit form element
                                editForm.appendChild(editFormTitle);
                                editForm.appendChild(editFormDateLabel);
                                editForm.appendChild(editFormDateInput);
                                editForm.appendChild(editFormAmountLabel);
                                editForm.appendChild(editFormAmountInput);
                                editForm.appendChild(editFormPaidLabel);
                                editForm.appendChild(editFormPaidSelect);
                                editForm.appendChild(editFormCustomerLabel);
                                editForm.appendChild(editFormCustomerSelect);
                                editForm.appendChild(editFormProductLabel);
                                editForm.appendChild(editFormProductSelect);
                                editForm.appendChild(editFormServiceLabel);
                                editForm.appendChild(editFormServiceSelect);
                                editForm.appendChild(editFormSubmitButton);
                            }
                        );

                        // Append the button element to the edit cell element
                        invoicesListEditCell.appendChild(invoicesListEditButton);

                        // Create a new td element for the delete cell
                        var invoicesListDeleteCell = document.createElement("td");

                        // Create a new button element for deleting the invoice
                        var invoicesListDeleteButton = document.createElement("button");
                        invoicesListDeleteButton.textContent = "Delete";
                        invoicesListDeleteButton.onclick = function() {
                            // Confirm the deletion with the user
                            if (confirm("Are you sure you want to delete this invoice?")) {
                                // Send an AJAX request to the server with the invoice id as data
                                sendRequest(
                                    "/manage/invoices/" + invoice.id,
                                    "DELETE", {},
                                    function(response) {
                                        // Check if the response is successful or not
                                        if (response.success) {
                                            // Show an alert message with the response message
                                            alert(response.message);

                                            // Update the manage page
                                            updateManage();
                                        } else {
                                            // Show an error message with the response message
                                            alert("Error: " + response.message);
                                        }
                                    }
                                );
                            }
                        };

                        // Append the button element to the delete cell element
                        invoicesListDeleteCell.appendChild(invoicesListDeleteButton);

                        // Append all the elements to the table body row element
                        invoicesListBodyRow.appendChild(invoicesListIdCell);
                        invoicesListBodyRow.appendChild(invoicesListDateCell);
                        invoicesListBodyRow.appendChild(invoicesListAmountCell);
                        invoicesListBodyRow.appendChild(invoicesListPaidCell);
                        invoicesListBodyRow.appendChild(invoicesListCustomerCell);
                        invoicesListBodyRow.appendChild(invoicesListProductCell);
                        invoicesListBodyRow.appendChild(invoicesListServiceCell);
                        invoicesListBodyRow.appendChild(invoicesListEditCell);
                        invoicesListBodyRow.appendChild(invoicesListDeleteCell);

                        // Append the table body row element to the table element
                        invoicesListTable.appendChild(invoicesListBodyRow);
                    }

                } {
                    manage.appendChild(invoicesListTitle);
                    manage.appendChild(invoicesListTable);
                }
