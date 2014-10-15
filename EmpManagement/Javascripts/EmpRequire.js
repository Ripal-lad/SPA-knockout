

define(['jquery', 'knockout', 'sammy'], function ($, ko, sammy) {
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

    }
 
    return function appViewModel() {
   
        //this.DeptName = ko.observable("");  //Create
        //this.DeptEdit = ko.observable(""); // Edit Name
        //this.DepteditId = ko.observable("");// Edit Id
        //this.DeptDetail = ko.observable("");//Detail
        this.Name = ko.observable("");
        this.Designation = ko.observable("");
        this.Emailid = ko.observable("");
        this.Contactno = ko.observable("");
        this.EmployeeId = ko.observable("");
        this.Department = ko.observable("");
        this.Deptid = ko.observable("");
        this.Id = ko.observable("");
     
        var self = this;
        self.tasks = ko.observableArray([]);
        self.dept = ko.observableArray([]);
        self.Selected = ko.observableArray([1]);
        self.departmentid = ko.observableArray([]);
        var emp;
        (function ($) {
              var app = sammy('#Home', function () {
               
                  //Home page.
                  this.get('#/', function (context) {
                      context.log('hi');
                      
                      $("#Home").load('/Templates/Home/Index.html', function (items) {
                         // alert("#");
                      })
                    
                  });

                  //Employee list
                  this.get('#/EmployeeList/', function (context) {
                      
                     $("#Home").load('/Templates/Employee/Index.html', function (items) {
                          alert("emp");
                     // require(["text!/Templates/Employee/Index.html"],
                       //     function (module, html, css) {
                          $.getJSON("/Employee/GetDepartment/", function (data) {  //check if department exist.
                              var ParsedData = JSON.parse(data);
                             alert(data);
                              if (data == 'serializedata') {
                                  //$("#NoDptFound").show();
                                  //$("#EmpIndex").hide();
                              }
                              else {
                                  $.getJSON("/Employee/LoadEmployee/", function (data) {  //retrieve data

                                      var ParsedData = JSON.parse(data);
                              
                                      if (data == 'Nodatafound') {
                                          alert("nodata");
                                          //$("#datanotfound").show();
                                          //$("#EmpIndex").hide();

                                      } else {
                                         
                                           alert("else");
                                          var mappedTasks = $.map(ParsedData, function (item) {
                                              return new Task(item);
                                           
                                          });
                                      
                                         self.tasks(mappedTasks);
                                       //  ko.applyBindings(new appViewModel(), document.getElementById("EmployeeIndex"));
                                        
                                      }  //$.each(ParsedData, function (key, value) {
                                      //    self.tasks.push(value);
                                      //    $("#Home").load('/Templates/Employee/Index1.html');
                                      //})
                                      
                                  });
                              }
                         });
                      });

                      })
                     
                  //Add employee.
                  this.get('#/AddEmployee/0', function (context) {
                      //this.AddEmployee = function () {
                    
                      $("#Home").load('/Templates/Employee/Create.html', function (items) {
                          //$("#EmpIndex").hide();
                          //$("#Empcreate").show();
                          $.getJSON("/Employee/GetDepartment/", function (data) {     //Check if department exist.
                           
                              var ParsedData = JSON.parse(data);
                           
                              var mappedTasks = $.map(ParsedData, function (item) {
                                  return new Task(item);
                              });

                              self.tasks(mappedTasks);
                              //}
                           });
                      });
                  });

                  //Edit Employee view.
                  this.get('#/UpdateEmployeeDetail/0/:id?/?:name?', function (context) {
                      //  self.UpdateEmployee = function () {
                      //$("#Empupdate").show();
                      //$("#divhome").hide();
                      //$("#EmpIndex").hide();

                      var id = context.params.id;
                      var name = context.params.name;
                      $("#Home").load('/Templates/Employee/Edit.html', function (items) {
                          //  alert(id + "||" + name);
                          var dept;
                          $.ajax({
                              type: 'GET',
                              url: "/Employee/GetEmployee/",
                              datatype: 'json',
                              data: { "ID": "" + id + "" },
                              success: function (data) {
                                  //var flag = false;
                                  //  alert("success " + data);
                                  var empdata = JSON.parse(data);

                                  deptid = empdata.DepartmentID;
                                  self.Name(empdata.Name);
                                  self.Designation(empdata.Designation);
                                  self.Emailid(empdata.Emailid);
                                  self.Contactno(empdata.ContactNo);
                                  self.EmployeeId(id);
                                  $.ajax({
                                      type: 'GET',
                                      url: "/Employee/GetDepartment/",
                                      datatype: 'json',
                                      success: function (data) {
                                          //   alert("2nd success" + data);
                                          var ParsedData = JSON.parse(data);

                                          $.each(ParsedData, function (key, value) {
                                              if (value.ID == deptid) {

                                                  self.dept.push(value.DName);
                                                  self.Selected.push(value.DName);
                                                  self.departmentid.push(value.ID);
                                              }
                                              else {
                                                  self.departmentid.push(value.ID);
                                                  self.dept.push(value.DName);
                                              }
                                          })
                                      },

                                      error: function (xhr, status, errorThrown, data) {
                                          console.log("Sorry, there was a problem!");
                                          console.log("Error: " + errorThrown);
                                          console.log("Status: " + status);
                                          //  alert("error :" + " " + errorThrown + " " + "Status: " + " " + status + "data : " + data);
                                      }
                                  });


                              },
                              error: function (xhr, status, errorThrown) {
                                  console.log("Sorry, there was a problem!");
                                  console.log("Error: " + errorThrown);
                                  console.log("Status: " + status);
                                  // alert("error :" + " " + errorThrown + " " + "Status: " + " " + status);
                              },

                          });

                      });
                  });

                  //Back to employee List
                  this.get('#/BackToEmpList/', function (context) {
                      context.log('Yo yo yo');
                  
                      window.location.hash = "#/EmployeeList/";
                  });

                  //Department list.
                  this.get('#/DepartmentList/', function (context) {

                      $("#Home").load('/Templates/Department/Index.html', function (items) {
                        //  alert("department");
                          $.getJSON("/Department/GetDepartment", function (data) {
                                  //  alert(data);
                              if (data == 'Nodatafound') {
                                  //$("#Deptnotfound").show();
                                  //$("#DeptIndex").hide();
                              }
                              else {
                                  //$("#DeptIndex").show();
                                  //$("#Deptnotfound").hide();
                                 //  alert(data);
                                  var ParsedData = JSON.parse(data);
                                  var mappedTasks = $.map(ParsedData, function (item) {
                                      return new Task(item);
                                  });

                                  self.tasks(mappedTasks);
                                  ko.applyBindings(new appViewModel(), document.getElementById("DeptIndex"));
                              }
                          });

                      })

                  });

                  //add department
                  this.get('#/AddDepartment/0', function (context) {
                      //self.AddDepartment = function () {
                      //  alert("add");
                      $("#Home").load('/Templates/Department/Create.html', function (items) {
                         // alert("add");
                      });
                      //$("#divhome").hide();
                      //$("#Deptcreate").show();
                      //$("#DeptIndex").hide();
                  });

                  //add department into database.
                  this.get('#/CreateDeparment/', function (context, data) {
                      //   self.CreateDepartment = function () {
                     //  alert("create");

                       var DepartmentName = document.getElementById("txtdept").value;//self.Department();
                  //    alert(DepartmentName);
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

                                              alert(data.DName + " added successfully");
                                              window.location.hash = "#/DepartmentList/";


                                          },
                                          error: function (xhr, status, errorThrown) {

                                              //   alert("error");
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
                                  //  alert("error :" + " " + errorThrown + " " + "Status: " + " " + status + "data : " + data);
                              }
                          });
                      }
                  });

                  //Cancel for add department.
                  this.get('#/CancelAddDept/', function (context) {
                      // alert('Yo yo yo');
                      //$("#error").hide();
                      //self.DeptName('');
                      window.location.hash = '#/AddDepartment/0';
                  });

                  //Back to department list
                  this.get('#/BackToDeptList/', function (context) {
                    
                      window.location.hash = "#/DepartmentList/";
                  });
              });
              $(function () {
                  app.run('#/');
              });


          })(jQuery);

    };

});







//require(['/Templates/Employee/Index.html'], function (ko) {
//    alert("define2");
//    return function appViewModel() {
//        alert("function");
//        //this.firstName = ko.observable('Bert');
//        //this.firstNameCaps = ko.pureComputed(function () {
//        //    return this.firstName().toUpperCase();
//        //}, this);
//    };
//});