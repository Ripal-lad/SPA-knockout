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
    this.EmpDetailUrl = ko.observable("#/EmployeeDetail/" + data.ID + "/" + data.Name);
    this.EmpDeleteUrl = ko.observable("#/DeleteEmployee/" + data.ID + "/" + data.Name);
    this.EmpupdateUrl = ko.observable("#/UpdateEmployeeDetail/0/" + data.ID + "/" + data.Name);
    this.DeptDetailUrl = ko.observable("#/DepartmentDetail/" + data.ID + "/" + data.DName);
    this.DeptDeletelUrl = ko.observable("#/DeleteDepartment/" + data.ID + "/" + data.DName);
    this.DeptUpdateUrl = ko.observable("#/UpdateDepartment/" + data.ID + "/" + data.DName);
    this.DeptCancelUpdate = ko.observable("#/CancelEdit/" + data.ID + "/" + data.DName);
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
    this.DeptCancelUpdate = ko.observable("");

    var self = this;
    self.tasks = ko.observableArray([]);            // Home page
   
    (function ($) {
        //alert("function");

        var app = $.sammy('#Home', function () {
          
          
            

      this.get('#/', function (context) {
                context.log('hi');
           //     alert("sammy");
                $("#divhome ").show();
                $("#DeptIndex").hide();              
                $("#EmpIndex").hide();
                $("#Deptcreate").hide();
                $("#Deptupdate").hide();
                $("#Deptdetail").hide();
                $("#detailnotfound").hide();
                $("#Deptnotfound").hide();
                $("#Empcreate").hide();
                $("#Empupdate").hide();


                //$("#home1").load('/Home/Empmanagement/', function (items) {
                //  context.log('hello');

                });

      //Employee List.
      this.get('#/EmployeeList/', function (context) {
               // alert("saamy emp")
           //     this.Employee = function () {
                  //  alert("employee");
                    $("#divhome").hide();
                    $("#EmpIndex").show();
                    $("#DeptIndex").hide();
                    $("#divhome").hide();
                    $("#Deptcreate").hide();
                    $("#Deptupdate").hide();
                    $("#Deptdetail").hide();
                    $("#detailnotfound").hide();
                    $("#Deptnotfound").hide();
                    $("#Empcreate").hide();
                    $("#Empupdate").hide();
                    $("#Empdetail").hide();
                    $("#NoDptFound").hide();
                    $("#datanotfound").hide();
                  
                    $.getJSON("/Employee/GetDepartment/", function (data) {  //check if department exist.
                        var ParsedData = JSON.parse(data);
                           // alert(data);
                        if (data == 'serializedata') {
                            $("#NoDptFound").show();
                            $("#EmpIndex").hide();
                        }
                        else {
                            $.getJSON("/Employee/LoadEmployee/", function (data) {  //retrieve data

                                var ParsedData = JSON.parse(data);
                               // alert("data = "+data);
                                if (data == 'Nodatafound') {
                                    alert("nodata");
                                    $("#datanotfound").show();
                                    $("#EmpIndex").hide();

                                } else {
                                    // alert("else");
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
      this.get('#/AddEmployee/0', function (context) {
          //this.AddEmployee = function () {
          alert("add");
         
          $("#EmpIndex").hide();
          $("#Empcreate").show();
          $.getJSON("/Employee/GetDepartment/", function (data) {  //Check if department exist.
              var ParsedData = JSON.parse(data);
              //if (data == 'NoDataFound') {
              //    // alert("data undefined");
              //    $("#datanotfound").show();
              //} else {
                 
                  //alert(data);
                  var mappedTasks = $.map(ParsedData, function (item) {
                      return new Task(item);
                  });

                  self.tasks(mappedTasks);
              //}
          });
      });

            //add employee into database.
      this.get('#/CreateEmployee/', function (data, context) {
          // this.CreateEmployee = function () {
          alert("create");
          var regexemail = /[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
          var regexname = /^[A-Z]+[a-zA-Z''-'\s]*$/;
          var regdesignation = /^[A-Za-z- ]+$/;
          $("#errorname").html("");
          $("#errordept").html("");
          $("#erroremailid").html("");
          $("#errorcontactno").html("");
          $("#errordesignation").html("");
          $("#errorname").show();
          $("#errordesignation").show();
          $("#erroremailid").show();
          $("#errorcontactno").show();
          $("#errordept").show();

          var flag = false;
          var name = self.Name();
          var designation = self.Designation();
          var emailid = self.Emailid();
          var contactno = self.Contactno();
          var department = $("#select option:selected").val();
          //  var deptid = this.Id();
     //     alert("department = " + department + " || ");
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
           //   alert(flag);
              window.location.hash = "#/AddEmployee/";
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
                      window.location.hash = "#/EmployeeList/";

                  },
                  error: function (xhr, status, errorThrown) {

                      alert("error");
                      console.log("Sorry, there was a problem!");
                      console.log("Error: " + errorThrown);
                      console.log("Status: " + status);
                  },
              });
          }

      });


            //Edit Employee view.
      this.get('#/UpdateEmployeeDetail/0/:id?/?:name?', function (context) {
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
          });

    //Details of Employee.
    this.get('#/EmployeeDetail/:id?/?:name?', function (context) {

       ///   self.EmployeeDetails = function () {
      //  alert("detail");
        $("#Empdetail").show();
        $("#EmpIndex").hide();
        var id = context.params.id;
        var name = context.params.name;

        $.ajax({
            type: 'GET',
            url: "/Employee/Detail/",
            datatype: 'json',
            success: function (data) {
                ///   alert("success");
                console.log("success" + "data = " + data);
               
                $.each((JSON.parse(data)), function (key, value) {
                  //  alert(id + " " + value.ID);
                    if (id == (value.ID)) {
                        flag = true;
                        //   var deptid = value.DepartmentID;
                        deptid = value.DepartmentID;
                        self.Name(value.Name);
                        self.Designation(value.Designation);
                        self.Emailid(value.Emailid);
                        self.Contactno(value.ContactNo);

                        $.ajax({
                            type: 'GET',
                            url: "/Employee/GetDepartment/",
                            datatype: 'json',
                            success: function (data) {
                                // alert("dept success");
                               
                                $.each(JSON.parse(data), function (key, value) {

                                  //  alert("dept id = " + value.ID + " empdeptid id = " + deptid);
                                    if (deptid == value.ID) {
                                        self.Department(value.DName);
                                       //  alert("deptname = "+Deptname);
                                    };
                                });
                            },
                        });
                    }
                });
            },
        });
            
    });

            //Employeee delete
    this.get('#/DeleteEmployee/:id?/?:name?', function (context) {
        //  self.DeleteEmployee = function (data) {

        alert("delete");
        var id = context.params.id;
        alert(id);
        if (confirm("Are you sure that you want to delete details of " + name + " ?")) {
          //  self.tasks.remove(data);
            $.ajax({
                type: 'POST',
                url: "/Employee/Delete/",
                datatype: 'json',
                data: { "ID": "" + id + "" },
                success: function (data) {
                 //   alert("success");
                    // var deptdata = JSON.parse(data);
                    console.log("Success");

                     window.location.hash = '#/EmployeeList/';
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
            window.location.hash = '#/EmployeeList/';
        }

    });

    //Cancel Add department.
    this.get('#/CancelAddEmployee/', function (context) {
        context.log('Yo yo yo');
        alert("hello");
        $("#errorname").hide();
        $("#errordesignation").hide();
        $("#erroremailid").hide();
        $("#errorcontactno").hide();
        $("#errordept").hide();
        self.Name('');
        self.Designation('');
        self.Emailid('');
        self.Contactno('');
        self.Department('');
        window.location.hash = '#/AddEmployee/0';
    });

    
    //Back to employee List
    this.get('#/BackToEmpList/', function (context) {
        context.log('Yo yo yo');
        $("#errorname").hide();
        $("#errordesignation").hide();
        $("#erroremailid").hide();
        $("#errorcontactno").hide();
        $("#errordept").hide();
        self.Name('');
        self.Designation('');
        self.Emailid('');
        self.Contactno('');
        self.Department('');
        $("#Empcreate").hide();
        $("#Empupdate").hide();
        $("#Empdetail").hide();
        $("#NoDptFound").hide();
        $("#datanotfound").hide();
        window.location.hash = "#/EmployeeList/";
    });

    this.get('#/DepartmentList/', function (context) {
       alert("saamy emp")
        //this.DepartmentDetail = function () {
     //   alert("department");
       $("#DeptIndex").show();
        $("#divhome").hide();
        $("#EmpIndex").hide();
        $("#Deptcreate").hide();
        $("#Deptupdate").hide();
        $("#Deptdetail").hide();
        $("#detailnotfound").hide();
        $("#Deptnotfound").hide();
        $("#Empcreate").hide();
        //$("#Empupdate").hide();
        $.getJSON("/Department/GetDepartment", function (data) {
          //  alert(data);
            if (data == 'Nodatafound') {
                $("#Deptnotfound").show();
                $("#DeptIndex").hide();
            }
            else {
                $("#DeptIndex").show();
                $("#Deptnotfound").hide();
                //alert(data);
                var ParsedData = JSON.parse(data);
                var mappedTasks = $.map(ParsedData, function (item) {
                    return new Task(item);
                });

                self.tasks(mappedTasks);
            }
        });

    });
    this.capitalizeLastName = function () {
        alert("Hello");
        var currentVal = this.firstName();        // Read the current value
        this.firstName(currentVal.toUpperCase()); // Write back a modified value
    };

    //Retrieve data for home page.
    this.get('#/DeleteDepartment/:id?/?:name?', function (context) {
        var id = context.params.id;
        //  self.DeleteDepartment = function (data) {

        if (confirm("Are you sure you want to delete this department ?")) {
          //  self.tasks.remove(data);

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
                              //   alert("no data");
                                 window.location.hash = "#/DepartmentList/";
                            }
                            else {
                                $.each(JSON.parse(data), function (key, value) {
                                    //alert("Inside each");
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
                                            window.location.hash = "#/DepartmentList/";
                                        },
                                        error: function (xhr, status, errorThrown) {

                                             alert("error");
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
            window.location.hash = "#/DepartmentList/";
        }

    });

    // add department view
    this.get('#/AddDepartment/0', function (context) {
        //self.AddDepartment = function () {
        alert("add");
        $("#divhome").hide();
        $("#Deptcreate").show();
        $("#DeptIndex").hide();
    });

    //add department into database.
    this.get('#/CreateDeparment/', function (context, data) {
        //   self.CreateDepartment = function () {
        alert("create");

       var DepartmentName = self.DeptName();
         alert(DepartmentName);
         $("#error").html("");
         $("#error").show();
        if (DepartmentName == "") {
            $("#error").append("This field is required.");
              window.location.hash = "#/AddDepartment/";
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
                            $("#error").html(value.DName + " already exist");
                            // alert(value.DName + " already exist");
                            console.log(value.DName + "already exist ");
                             window.location.hash = "#/AddDepartment/";
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
                                window.location.hash = "#/DepartmentList/";
                              

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
    });

            //Edit department view
    this.get('#/UpdateDepartment/:id?/?:name?', function (context) {
       // self.UpdateDepartment = function () {
           // alert("update");
          
            $("#divhome").hide();         
            $("#DeptIndex").hide();
            $("#Deptupdate").show();
            var deptname = context.params.name;
            var id = context.params.id;
            //var deptname = self.Department();
            //var id = self.Id();
           // alert(id + deptname);
            self.Department(deptname);
            self.DepteditId(id);
          
        });

            //Update departmnet into database.
    this.get('#/EditDepartment/0', function (context) {
        //  self.EditDepartment = function () {
       // alert("edit");
        var DepartmentName = self.Department();       // Get department name.
        var id = self.DepteditId();                 // Get department Id.
      //  alert(DepartmentName + " || " + id);
        $("#UpdateError").html("");
        $("#UpdateError").show();
        if (DepartmentName == "") {
            //alert("error");
            $("#UpdateError").append("This field is required.");
            window.location.hash = '#/UpdateDepartment/' + value.ID + '/' + value.DName + '';
        }
        else {
           // alert("else");
            $.ajax({
                type: 'GET',
                url: "/Department/GetDepartment/",
                datatype: 'json',
                success: function (data) {
               //     alert("inside success");
                    var flag = false;
                    $.each((JSON.parse(data)), function (key, value) {
                        console.log(key + ": " + value.DName);
                        if (DepartmentName == (value.DName)) {
                            flag = true;
                            $("#UpdateError").html(value.DName + " already exist");

                            console.log("already exist " + value.DName);
                            window.location.hash = '#/UpdateDepartment/' + value.ID + '/' + value.DName + '';

                        }
                    });
                    if (flag) {
                        //alert("flag = " + flag);
                    }
                    else {

                       // alert("flag = " + flag);
                        $.ajax({
                            type: 'POST',
                            url: "/Department/Edit/",
                            datatype: 'json',
                            data: { "ID": "" + id + "", "DName": "" + DepartmentName + "" },
                            success: function (data) {

                                console.log("Success post");
                                console.log(data.DName + " is updated sucessfuly ");
                                window.location.hash = "#/DepartmentList/";
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
    });

            //Department details
    this.get('#/DepartmentDetail/:id?/?:name?', function (context) {
        context.log('Yo yo yo');
       // alert("hello");
        var id = context.params.id;
        var name = context.params.name;

        //    this.DepartmentDetail = function () {
       // alert(id + name);
        $("#DeptIndex").hide();
        $("#divhome").hide();
        self.Department(name);
        $.ajax({
            type: 'GET',
            url: "/Department/LoadEmployee/",
            datatype: 'json',
            data: { "ID": "" + id + "" },
            success: function (data) {

                //alert(data);
                if (data == 'Nodatafound') {
                    // alert("inside");
                    $("#detailnotfound").show();
                    $("#Deptdetail").hide();
                }
                else {
                    $("#Deptdetail").show();
                    $("#detailnotfound").hide();
                  //  alert(data);
                    var ParsedData = JSON.parse(data);
                    var mappedTasks = $.map(ParsedData, function (item) {
                        //  alert("inside");
                        return new Task(item);
                    });

                    self.tasks(mappedTasks);
                }
            },
        });

    });
   
    //Cancel add department.
    this.get('#/CancelAddDept/', function (context) {
       alert('Yo yo yo');
       $("#error").hide();
       self.DeptName('');
        window.location.hash = '#/AddDepartment/0';
    });

   //cancel event for Upadte department
    this.get('#/CancelEdit/:id?/?:name?', function (context) {
        alert('Yo yo yo');
        $("#UpdateError").hide();
        $("#txtdept").value = "";
        var id = context.params.id;
        var deptname = context.params.name;
        window.location.hash = '#/UpdateDepartment/' + id + '/' + deptname + '';
    });


    //Back to department list
    this.get('#/BackToDeptList/', function (context) {
        context.log('Yo yo yo');
        $("#Deptcreate").hide();
        $("#Deptupdate").hide();
        $("#Deptdetail").hide();
        $("#detailnotfound").hide();
        $("#Deptnotfound").hide();
        self.DeptName('');
        window.location.hash = "#/DepartmentList/";
    });
        });




        $(function () {
            app.run('#/');
        });


    })(jQuery);
    

    }


// Activates knockout.js
ko.applyBindings(new AppViewModel());