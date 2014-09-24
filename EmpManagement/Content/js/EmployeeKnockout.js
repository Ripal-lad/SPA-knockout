// This is a simple *viewmodel* - JavaScript that defines the data and behavior of your UI

var flag = false;

function Task(data) {
    this.Department = ko.observable(data.DName);
    this.Id = ko.observable(data.ID);
    this.Name = ko.observable(data.Name);
    this.Designation = ko.observable(data.Designation);
    this.Emailid = ko.observable(data.Emailid);
    this.Contactno = ko.observable(data.Contactno);

     //    this.isDone = ko.observable(data.isDone);
}

function AppViewModel() {
    alert("hello");
   
    this.firstName = ko.observable("");
    this.DeptName = ko.observable("");  //Create
    this.DeptEdit = ko.observable(""); // Edit Name
    this.DepteditId = ko.observable("");// Edit Id
    var self = this;
    self.tasks = ko.observableArray([]);            // Home page
    self.employee = ko.observableArray([]);

    this.Employee = function () {
        alert("employee");
        $("#divhome").hide();
        $("#EmpIndex").show();
        $.getJSON("/Employee/GetDepartment/", function (allData) {
            var ParsedData = JSON.parse(allData);
            alert(alldata);
            var mappedTasks = $.map(ParsedData, function (item) {
                return new Task(item);
            });

            self.employee(mappedTasks);
        });
    }
    this.Department = function () {
        alert("department");
        $("#DeptIndex").show();
        $("#divhome").hide();
        $.getJSON("/Department/GetDepartment", function (allData) {
            var ParsedData = JSON.parse(allData);
            var mappedTasks = $.map(ParsedData, function (item) {
                return new Task(item);
            });

            self.tasks(mappedTasks);
        });

    }
    this.capitalizeLastName = function () {
        alert("Hello");
        var currentVal = this.firstName();        // Read the current value
        this.firstName(currentVal.toUpperCase()); // Write back a modified value
    };

    //Retrieve data for home page.
   
    self.DeleteDepartment = function (data) {
        debugger;
        alert("delete");
        var id = this.Id();
        alert(id);
      
        if (confirm("Are you sure you want to delete this department ?")) {
            self.tasks.remove(data);
                
                $.ajax({
                    type: 'POST',
                    url: "/Department/Delete/",
                    datatype: 'json',
                    data: { "ID": "" + id + "" },
                    success: function (data) {
                        var deptdata = JSON.parse(data);

                        console.log("Success");
                        console.log(deptdata.DName + " is deleted sucessfuly ");
                        alert(deptdata.DName + " is deleted successfully ");
                      //  window.location.hash = "#/DepartmentList/";
                        $.ajax({
                            type: 'GET',
                            url: "/Department/LoadEmployee/",
                            datatype: 'json',
                            data: { "ID": "" + id + "" },
                            success: function (data) {
                               //  alert(data);   
                                if (data == 'Nodatafound') {
                                }   
                                else {
                                    $.each(JSON.parse(data), function (key, value) {
                                        // alert("Inside each");
                                        // alert(value.ID + " " + value.DeptID);

                                        $.ajax({
                                            type: 'POST',
                                            url: "/Employee/Delete/",
                                            datatype: 'json',
                                            data: { "ID": "" + value.ID + "" },
                                            success: function (data) {
                                                //  alert("success");
                                                var deptdata = JSON.parse(data);
                                                console.log("Success");
                                                console.log("details of " + deptdata.Name + " is deleted sucessfuly ");
                                                  //alert("details of " + deptdata.Name + " is deleted successfully ");
                                                //window.location.hash='#//';
                                            },
                                            error: function (xhr, status, errorThrown) {

                                                //  alert("error");
                                                console.log("Sorry, there was a problem!");
                                                console.log("Error: " + errorThrown);
                                                console.log("Status: " + status);
                                            },

                                        });
                                    });
                                    
                                };
                            },

                        });
                    },

                    error: function (xhr, status, errorThrown) {

                      //   alert("error");
                        console.log("Sorry, there was a problem!");
                        console.log("Error: " + errorThrown);
                        console.log("Status: " + status);
                    }

                });
            }
            else {
                alert("departmenmt not deleted");
            }

        }

    // add department view
    self.AddDepartment = function () {
        alert("add");
        $("#Deptcreate").show();
    }

    //add department into database.
    self.CreateDepartment = function () {
        alert("create");
        var DepartmentName = this.DeptName();
       // alert(DepartmentName);
        $("#error").html("");
        if (DepartmentName == "") {
            $("#error").append("This field is required.");
            //  window.location.hash = "#/AddDepartment/";
        }
        else {
            $.ajax({
                type: 'GET',
                url: "/Department/GetDepartment/",
                datatype: 'json',
                success: function (data) {
                   // alert("success");
                    flag = false;
                    //  alert(data);
                    $.each((JSON.parse(data)), function (key, value) {
                        console.log("inside each");
                        console.log(key + ": " + value.DName);
                        //    alert("each");
                        if (DepartmentName == (value.DName)) {
                            flag = true;
                            $("#error").html( value.DName+" already exist");
                           // alert(value.DName + " already exist");
                            console.log( value.DName+"already exist ");
                            //  window.location.hash = "#/AddDepartment/";
                        }
                    });
                    if (flag) {
                        //  alert("flag = " + flag);
                    }
                    else {
                      //  alert("flag = " + flag);
                        console.log("Inside else");
                        //   alert("inside else : flag " + flag)
                        $.ajax({
                            type: 'Post',
                            url: "/Department/Create/",
                            datatype: 'json',
                            data: { "DName": "" + DepartmentName + "" },
                            success: function (data) {
                                console.log("Success");
                               // alert(data.DName + " added successfully");
                                // window.location.hash = "#/DepartmentList/";

                            },
                            error: function (xhr, status, errorThrown) {

                                alert("error");
                                console.log("Sorry, there was a problem!");
                                console.log("Error: " + errorThrown);
                                console.log("Status: " + status);
                            },
                        });

                    }
                },
                error: function (xhr, status, errorThrown, data) {
                    console.log("Sorry, there was a problem!");
                    console.log("Error: " + errorThrown);
                    console.log("Status: " + status);
                    alert("error :" + " " + errorThrown + " " + "Status: " + " " + status + "data : " + data);
                }
            });
        }
    }

    //Edit department view
    self.UpdateDepartment = function () {
        alert("update");
        $("#Deptupdate").show();
        var deptname = this.Department();
        var id = this.Id();
        self.DeptEdit(deptname);
        self.DepteditId(id);
       }

    //Update departmnet into database.
    self.EditDepartment = function () {
        alert("edit");
        var DepartmentName = this.DeptEdit();       // Get department name.
        var id = this.DepteditId();                 // Get department Id.
        alert(DepartmentName +" || "+id);
        $("#UpdateError").html("");
        if (DepartmentName == "") {
            //alert("error");
            $("#UpdateError").append("This field is required.");
          //  window.location.hash = "#/EditDepartment/";
        }
        else {
            alert("else");
            $.ajax({
                type: 'GET',
                url: "/Department/GetDepartment/",
                datatype: 'json',
                success: function (data) {
                       alert("inside success");
                    var flag = false;
                    $.each((JSON.parse(data)), function (key, value) {
                        console.log(key + ": " + value.DName);
                        if (DepartmentName == (value.DName)) {
                            flag = true;
                            $("#UpdateError").html(value.DName + " already exist");

                            console.log("already exist " + value.DName);
                           // window.location.hash = "#/EditDepartment/";
                        }
                    });
                    if (flag) {
                         alert("flag = " + flag);
                    }
                    else {

                         alert("flag = " + flag);
                        $.ajax({
                            type: 'POST',
                            url: "/Department/Edit/",
                            datatype: 'json',
                            data: { "ID": "" + id + "", "DName": "" + DepartmentName + "" },
                            success: function (data) {

                                console.log("Success post");
                                console.log(data.DName + " is updated sucessfuly ");
                               // window.location.hash = "#/DepartmentList/";
                            },
                            error: function (xhr, status, errorThrown) {
                                 alert("error");
                                console.log("Sorry, there was a problem!");
                                console.log("Error: " + errorThrown);
                                console.log("Status: " + status);

                            },
                        });
                    };
                },
            });
        };
    }

    //Department details
    self.DepartmentDetails = function () {
       // alert("detail");
       
        $("#DeptIndex").hide();
        var id = this.Id();

        $.ajax({
            type: 'GET',
            url: "/Department/GetEmployee/",
            datatype: 'json',
            success: function (data) {
                //   alert("success");
                console.log("success" + "data = " + data);
                flag = false;
                var tr;
              
                $.each(JSON.parse(data), function (key, value) {
                    $("#Deptdetail").show();
                    if (id == (value.DepartmentID)) {
                        flag = true;
                     
                        tr = $("<tr></tr>");
                        tr.append("<td>" + value.Name + "</td><td>"
                                         + value.Designation + "</td><td>"
                                         + value.Emailid + "</td><td>"
                                         + value.ContactNo + "</td><td >");
                        $("#deptdetailtable").append(tr);

                    }
                });
                if (!flag) {
                  
                 //   $("#home1").load('/Department/NoDataFound/', function (items) {
                    $("#Deptdetail").hide();
                     $("#detailnotfound").show();
                      
                   // });
                };
               
            },
            error: function (xhr, status, errorThrown) {
                console.log("Sorry, there was a problem!");
                console.log("Error: " + errorThrown);
                console.log("Status: " + status);
                // alert("error");
            }

        });
    }

    

    }


// Activates knockout.js
ko.applyBindings(new AppViewModel());