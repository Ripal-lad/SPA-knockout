// This is a simple *viewmodel* - JavaScript that defines the data and behavior of your UI

var flag = false;

function Task(data) {
    this.Department = ko.observable(data.DName);
    this.Id = ko.observable(data.ID);
    this.Name = ko.observable(data.Name);
    this.Designation = ko.observable(data.Designation);
    this.Emailid = ko.observable(data.Emailid);
    this.Contactno = ko.observable(data.ContactNo);
    this.EmployeeId = ko.observable(data.ID);
    this.Deptid = ko.observable(data.DepartmentID);
   // this.Selected = ko.observable(data.DName);

    //alert("task");
    //alert("select = " + this.Selected() + " || " + this.Id());
     //    this.isDone = ko.observable(data.isDone);
}


function AppViewModel() {
    alert("hello");
   
    this.firstName = ko.observable("");
    this.DeptName = ko.observable("");  //Create
    this.DeptEdit = ko.observable(""); // Edit Name
    this.DepteditId = ko.observable("");// Edit Id
    this.DeptDetail = ko.observable("");//Detail
    this.Name = ko.observable("");
    this.Designation = ko.observable("");
    this.Emailid = ko.observable("");
    this.Contactno = ko.observable("");
    this.EmployeeId = ko.observable("");
    this.Department = ko.observable("");
    this.Deptid = ko.observable("");
    this.Id = ko.observable("");
  
    var self = this;
    self.tasks = ko.observableArray([]);            // Home page
   
    (function ($) {
        alert("function");

        var app = $.sammy('#Home', function () {
            this.get('#/', function (context) {
                context.log('hi');
                alert("sammy");
                $("#divhome ").show();
                //$("#home1").load('/Home/Empmanagement/', function (items) {
                //  context.log('hello');

                });
            
            //Employee List.
            this.get('#/EmployeeList/', function (context) {
                alert("saamy emp")
           //     this.Employee = function () {
                    alert("employee");
                    $("#divhome").hide();
                    $("#EmpIndex").show();
                    $.getJSON("/Employee/GetDepartment/", function (data) {  //check if department exist.
                        var ParsedData = JSON.parse(data);
                            alert(data);
                        if (data == 'serializedata') {
                            $("#NoDptFound").show();
                            $("#EmpIndex").hide();
                        }
                        else {
                            $.getJSON("/Employee/LoadEmployee/", function (data) {  //retrieve data

                                var ParsedData = JSON.parse(data);
                                alert("data = "+data);
                                if (data == 'Nodatafound') {
                                    alert("nodata");
                                    $("#datanotfound").show();
                                    $("#EmpIndex").hide();

                                } else {
                                     alert("else");
                                        var mappedTasks = $.map(ParsedData, function (item) {
                                        return new Task(item);
                                    });

                                    self.tasks(mappedTasks);
                                }
                            });
                        }
                    });
               // }
            });
    //Add employee.
    this.AddEmployee = function () {
        alert("add");
        $("#Empcreate").show();
        $("#EmpIndex").hide();
        $.getJSON("/Employee/GetDepartment/", function (data) {  //Check if department exist.
            var ParsedData = JSON.parse(data);
            if (data == 'NoDataFound') {
                // alert("data undefined");

            } else {
                alert(data);
                var mappedTasks = $.map(ParsedData, function (item) {
                    return new Task(item);
                });

                self.tasks(mappedTasks);

            }

        });


    }

    //add employee into database.
    this.CreateEmployee = function () {
        alert("create");
        var regexemail = /[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        var regexname = /^[A-Z]+[a-zA-Z''-'\s]*$/;
        var regdesignation = /^[A-Za-z- ]+$/;
        $("#errorname").html("");
        $("#errordept").html("");
        $("#erroremailid").html("");
        $("#errorcontactno").html("");
        $("#errordesignation").html("");

        var flag = false;
        var name = this.Name();
        var designation = this.Designation();
        var emailid = this.Emailid();
        var contactno = this.Contactno();
        var department = $("#select option:selected").val();
      //  var deptid = this.Id();
        alert("department = "+department + " || " );
        alert(name + " || " + designation + " || " + emailid + " || " + contactno + " || " + department);
        // email validation
        if (emailid != "") {
            if (!(emailid.match(regexemail))) {
                $("#erroremailid").html("Invalid Email-id");
                //  alert("inside match else");
                flag = true;
            }
        }
        else {
            flag = true;
            $("#erroremailid").html("This field is required.");

        }

        //name validation
        if (name != "") {
            // alert("name = " + name);
            if (!(name.match(regexname))) {
                flag = true;
                $("#errorname").html("Invalid name.");

            }
        }
        else {
            flag = true;
            $("#errorname").html("This field is required.");

        }

        // Designation Validation       
        if (designation != "") {
             if (!(designation.match(regdesignation))) {
                flag = true;
                $("#errordesignation").html("Text only.");

            }
        }
        else {
            flag = true;
            $("#errordesignation").html("This field is required.");

        }
        //department validation
        if (department == "") {
            flag = true;
            $("#errordept").html("This field is required.");
          }

        //contactno validation
        if (contactno == "") {
            flag = true;
            $("#errorcontactno").html("This field is required.");

        }

        if (flag == true) {
            alert(flag);
         //   window.location.hash = "#/AddEmployee/";
        }
       
        else {
            alert(flag);
                    $.ajax({
                        type: 'Post',
                        url: "/Employee/Create/",
                        datatype: 'json',
                        data: { "Name": "" + name + "", "Designation": "" + designation + "", "ContactNo": "" + contactno + "", "Emailid": "" + emailid + "", "DepartmentID": "" + department + "" },
                        success: function (data) {
                            console.log("Success");
                            alert("Employee detail added successfuly.");
                           // window.location.hash = "#/EmployeeList/";
                           
                        },
                        error: function (xhr, status, errorThrown) {

                            alert("error");
                            console.log("Sorry, there was a problem!");
                            console.log("Error: " + errorThrown);
                            console.log("Status: " + status);
                        },
                    });
    }

    }


    //Edit Employee view.
    self.UpdateEmployee = function () {
        $("#Empupdate").show();
        $("#divhome").hide();
        $("#EmpIndex").hide();
        var id = this.EmployeeId();
        var name = this.Name();
        var designation = this.Designation();
        var emailid = this.Emailid();
        var contactno = this.Contactno();
        var department = this.Deptid();//$("#select option:selected").val();
       
        var hello;
        alert("update" + id + "deptid  = " + department );
        alert(name + " || " + designation + " || " + emailid + " || " + contactno + " || " + department);
        $.ajax({
            type: 'GET',
            url: "/Employee/GetEmployee/",
            datatype: 'json',
            data: { "ID": ""+id+"" },
            success: function (data) {
                 // alert("success" + data);
                var empdata = JSON.parse(data);
                $.ajax({
                    type: 'GET',
                    url: "/Employee/GetDepartment/",
                    datatype: 'json',
                    success: function (data) {
                        // alert("2nd success" + data);

                        var ParsedData = JSON.parse(data);
                        var mappedTasks = $.map(ParsedData, function (item) {
                           
                                    return new Task(item);
                              //      alert("aftr");
                        });
                        self.tasks(mappedTasks);
                        //Selected = this.Selected();
                         $.each((ParsedData), function (key, value) {
                             var hi;
                             var SelDepartmen;
                             if (value.ID == department) {
                                 var deptsel = value.DName;
                                // alert(value.ID + " || " + department);
                                 var mappedTasks = $.map(deptsel, function (item) {
                                     alert("inside");
                                     return new Selected(item);
                                     //    ;
                                 });
                                 self.Selected(mappedTasks);
                             }
                             else {
                                // alert(" else " + value.ID + " || " + department);
                               
                               //  select.append("<Option value = " + value.ID + " id='ddldept'>" + value.DName + "</Option>");
                             }
                         });
                        //  self.tasks(mappedTasks);
                         
                         self.Name(name);
                         self.Designation(designation);
                         self.Emailid(emailid);
                         self.Contactno(contactno);
                     //    self.Selected(hello);
                        // self.Department(department);
                   
                    },
                    error: function (xhr, status, errorThrown, data) {
                        console.log("Sorry, there was a problem!");
                        console.log("Error: " + errorThrown);
                        console.log("Status: " + status);
                        // alert("error :" + " " + errorThrown + " " + "Status: " + " " + status + "data : " + data);
                    }
                });

                    
            },
            error: function (xhr, status, errorThrown) {
                console.log("Sorry, there was a problem!");
                console.log("Error: " + errorThrown);
                console.log("Status: " + status);
                //  alert("error :" + " " + errorThrown + " " + "Status: " + " " + status);
            }
        });
    }

    //Details of Employee.
    self.EmployeeDetails = function () {
        alert("detail");
        $("#Empdetail").show();
        $("#EmpIndex").hide();
      
        var id = this.EmployeeId();
        var name = this.Name();
        var designation = this.Designation();
        var emailid = this.Emailid();
        var contactno = this.Contactno();
        var deptid = this.Deptid();//$("#select option:selected").val();
        var Deptname;
        $.ajax({
            type: 'GET',
            url: "/Employee/GetDepartment/",
            datatype: 'json',
            success: function (data) {
                // alert("dept success");
                var department = JSON.parse(data);
                //alert(data);
                $.each(JSON.parse(data), function (key, value) {

                    alert("dept id = " + value.ID + " empdeptid id = " + deptid);
                    if (deptid == value.ID) {
                        Deptname = value.DName;
                        self.Department(Deptname);
                         alert("deptname = "+Deptname);
                    };
                });
            },
        });
   
        self.Name(name);
        self.Designation(designation);
        self.Emailid(emailid);
        self.Contactno(contactno);
       
    }

    //Employeee delete
    self.DeleteEmployee = function (data) {

        alert("delete");
        var id = this.Id();
        alert(id);
        if (confirm("Are you sure that you want to delete details of " + name + " ?")) {
            self.tasks.remove(data);
            $.ajax({
                type: 'POST',
                url: "/Employee/Delete/",
                datatype: 'json',
                data: { "ID": "" + id + "" },
                success: function (data) {
                    alert("success");
                    // var deptdata = JSON.parse(data);
                    console.log("Success");

                    //  window.location.hash = '#/EmployeeList/';
                },
                error: function (xhr, status, errorThrown) {

                    alert("error");
                    console.log("Sorry, there was a problem!");
                    console.log("Error: " + errorThrown);
                    console.log("Status: " + status);
                }

            });
        }
        else {
            alert("Not deleted");
        }

    }

    this.DepartmentDetail = function () {
        alert("department");
        $("#DeptIndex").show();
        $("#divhome").hide();
        $.getJSON("/Department/GetDepartment", function (data) {
            if (data == 'Nodatafound') { 
                $("#Deptnotfound").show();
                $("#DeptIndex").hide();
            }
            else { 
            var ParsedData = JSON.parse(data);
            var mappedTasks = $.map(ParsedData, function (item) {
                return new Task(item);
            });

            self.tasks(mappedTasks);
        }
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
        alert(id);
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
                           //window.location.hash = "#/EditDepartment/";
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
        var deptname = this.Department();
        self.DeptEdit(deptname);
      //  alert(id + deptname);
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
                  //  alert(flag);
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
        });


        $(function () {
            app.run('#/');
        });


    })(jQuery);
    

    }


// Activates knockout.js
ko.applyBindings(new AppViewModel());