


(function ($) {
    //alert("function");
    var flag = false;
   
    var app = $.sammy('#home1', function () {
      // alert("hello");
      
        $(document).ajaxStart(function () {
            //  alert("ajax");
          //  $("#loading").show();
            $("#loading").css("display", "block");
        });

        $(document).ajaxComplete(function () {
            // alert("hide");
            //$("#loading").hide();
            $("#loading").css("display", "none");
        });
        this.get('#/', function (context) {
            context.log('hi');
          
            $("#home1").load('/Home/Empmanagement/', function (items) {
                context.log('hello');
             
            });
        
        });

        //Employee
        this.get('#/EmployeeList/', function (context) {
            context.log('Yo yo yo');
            // alert("emp");
           
           
            $("#home1").load('/Employee/Index/', function (items) {
                //  alert("/Emp/Index/");
               
                $.ajax({
                    type: 'GET',
                    url: "/Employee/GetDepartment/",
                    datatype: 'json',
                    success: function (data) {
                    //  alert("1st success");
                     if (data == 'serializedata') {
                         //  alert("data undefined");
                         $("#home1").load('/Employee/DeptNotAvailable/', function (items) {
                                //alert("inside deptnot");
                                tr = $("<tr></tr>");
                                tr.append("<h2 style='color:blue'>Currently there is no department</h2>");
                                $("#tabledeptnotexist").append(tr);
                                tr = $("<tr></tr>");
                                tr.append("<td  style='color:chocolate'> First add department details </td>");
                                $("#tabledeptnotexist").append(tr);
                                tr = $("<tr></tr>");
                                tr.append("<td><a href='#/AddDepartment/0' class = 'createdept'> Add Department </a>  </td>");
                                $("#tabledeptnotexist").append(tr);
                                
                            });
                          

                        }
                     else {
                        
                          //  alert("Inside else");
                            $.ajax({
                                type: 'GET',
                                url: "/Employee/LoadEmployee/",
                                datatype: 'json',
                                success: function (data) {
                                   // alert("success");
                                    if (data == 'Nodatafound') {

                                        tr = $("<tr></tr>");
                                        tr.append("<h2 style='color:blue'> Employee Details  </h2> ");
                                        $("#empindex").append(tr);

                                        tr = $("<tr></tr>");
                                        tr.append("<td style='color:blue'><a href='#/Home' class = 'homehref'> Home </a>|<a href='#/AddEmployee/0'> Create new </a>");
                                        $("#empindex").append(tr);

                                        tr = $("<tr></tr>");
                                        tr.append("<td style='color:blue'>No data found </a>");
                                        $("#empindex").append(tr);

                                    }
                                    else {
                                        var tr;
                                        tr = $("<tr></tr>");
                                        tr.append("<h2 style='color:blue'> Employee Details  </h2> ");
                                        $("#empindex").append(tr);

                                        tr = $("<tr></tr>");
                                        tr.append("<td style='color:blue'><a href='#/Home' class = 'homehref'> Home </a>|<a href='#/AddEmployee/0'> Create new </a>");
                                        $("#empindex").append(tr);

                                        tr = $("<tr class = 'header'></tr>");
                                        tr.append("<th>Name</th><th>Designation</th><th>Emailid</th><th>Contactno</th>");
                                        $("#empindex").append(tr);

                                        $.each(JSON.parse(data), function (key, value) {
                                            //alert("inside each");
                                            //console.log(key + ": " + value);

                                            tr = $("<tr></tr>");
                                            tr.append("<td>" + value.Name + "</td><td>"
                                                             + value.Designation + "</td><td>"
                                                             + value.Emailid + "</td><td>"
                                                             + value.ContactNo + "</td><td> <a href='#/UpdateEmployeeDetail/0/"+value.ID+"/"+value.Name+"' id =" + value.ID + "> Edit </a> </td><td> <a href='#/DeleteEmployee/" + value.ID + "/" + value.Name + "' id =" + value.ID + " name =" + value.Name + "> Delete </a> </td><td> <a href='#/EmployeeDetail/" + value.ID + "/" + value.Name + "' id =" + value.ID + "> Detail </a> </td>"
                                                                        );
                                            $("#empindex").append(tr);


                                        });

                                    };
                                  
                                },
                                error: function (xhr, status, errorThrown) {
                                    console.log("Sorry, there was a problem!");
                                    console.log("Error: " + errorThrown);
                                    console.log("Status: " + status);
                                   // alert("error :" + " " + errorThrown + " " + "Status: " + " " + status + "data : " + data);
                                }
                            });
                          
                        }

                    },
                    error: function (xhr, status, errorThrown) {
                        console.log("Sorry, there was a problem!");
                        console.log("Error: " + errorThrown);
                        console.log("Status: " + status);
                       // alert("error :" + " " + errorThrown + " " + "Status: " + " " + status + "data : " + data);
                    }
                });
              
              });

        });

        //Create page
        this.get('#/AddEmployee/0', function (context) {
            context.log('Yo yo yo');
          //   alert("hello");
            $("#home1").load('/Employee/Create/', function (items) {
                var flag = false;
                $.ajax({
                    type: 'GET',
                    url: "/Employee/GetDepartment/",
                    datatype: 'json',
                    success: function(data) {
                       // alert("success");
                        if (data == 'NoDataFound') {
                            // alert("data undefined");

                        } else {
                            var tr;
                            //  alert("else");
                            tr = $("<tr></tr>");
                            tr.append("<h2 style='color:blue'> Create Employee  </h2> ");
                            $("#tablecreate").append(tr);

                            tr = $("<tr></tr>");
                            tr.append("<td> Name : </td> <td><input type = 'text' id='txtname'> <div style='color:red' id='errorname'></div> </td> ");
                            $("#tablecreate").append(tr);
                            tr = $("<tr></tr>");
                            tr.append("<td> Designation : </td> <td><input type = 'text' id='txtdesignation'>  <div style='color:red' id='errordesignation'></div></td>");
                            $("#tablecreate").append(tr);

                            tr = $("<tr></tr>");
                            tr.append("<td> Emailid : </td> <td><input type = 'text' id='txtemailid'> <div style='color:red' id='erroremailid'></div> </td>");
                            $("#tablecreate").append(tr);
                            tr = $("<tr></tr>");
                            tr.append("<td> ContactNo : </td> <td><input type = 'text' id ='txtcontactno'> <div style='color:red' id='errorcontactno'></div> </td>");
                            $("#tablecreate").append(tr);

                            tr = $("<tr></tr>");
                            tr.append("<td>Department</td>");
                            var department = JSON.parse(data);
                            //alert(data);
                            var select = $("<select id='select'><div style='color:red' id='errordept'></div></select>");
                            $.each((department), function(key, value) {

                                select.append("<Option value = " + value.ID + "  id='ddldept'>" + value.DName + "</Option>");

                                tr.append(select);
                                $("#tablecreate").append(tr);

                            });

                            tr = $("<tr></tr>");
                            tr.append("<td><a value='Create' class ='btn btn-default' id='btncreate'  href='#/CreateEmployee/'>Create</a><a href='#/AddCancel' value='Cancel' class ='cancel btn btn-default'>Cancel</a> </td>");
                            $("#tablecreate").append(tr);

                            tr = $("<tr></tr>");
                            tr.append("<td> <a href='#/BackToEmpList/' class = 'backtodept' > Back to List </a> </td>");
                            $("#tablecreate").append(tr);

                        }

                    },
                    error: function(xhr, status, errorThrown, data) {
                        console.log("Sorry, there was a problem!");
                        console.log("Error: " + errorThrown);
                        console.log("Status: " + status);
                        alert("error :" + " " + errorThrown + " " + "Status: " + " " + status + "data : " + data);
                    }
                });
            });
        });
            //
     
        //add employee
        this.get('#/CreateEmployee/', function (context) {
            context.log('Yo yo yo');
         //  alert("Create");
        
                var regexemail = /[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
                var regexname = /^[A-Z]+[a-zA-Z''-'\s]*$/;
                var regdesignation = /^[A-Za-z- ]+$/;
                $("#errorname").html("");
                $("#errordept").html("");
                $("#erroremailid").html("");
                $("#errorcontactno").html("");
                $("#errordesignation").html("");
           
                var flag = false;
                var name = document.getElementById("txtname").value;
                var designation = document.getElementById("txtdesignation").value;
                var emailid = document.getElementById("txtemailid").value;
                var department = $("#select option:selected").val();
              
                var contactno = document.getElementById("txtcontactno").value;
              
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
                   // alert("designation = " + designation);
                    if (!(designation.match(regdesignation))) {
                        flag = true;
                    // alert("designation1 = " + designation);
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
                   // window.location.hash = "#/Create_employee/";
                }

                //contactno validation
                if (contactno == "") {
                    flag = true;
                    $("#errorcontactno").html("This field is required.");
                  
                }

                if(flag == true){
                    window.location.hash = "#/AddEmployee/";
                }
                else {
                    $.ajax({
                        type: 'Post',
                        url: "/Employee/Create/",
                        datatype: 'json',
                        data: { "Name": "" + name + "", "Designation": "" + designation + "", "ContactNo": "" + contactno + "", "Emailid": "" + emailid + "", "DepartmentID": "" + department + "" },
                        success: function (data) {
                            console.log("Success");
                           // alert("Employee detail added successfuly.");
                            window.location.hash = "#/EmployeeList/";
                           
                        },
                        error: function (xhr, status, errorThrown) {

                          // alert("error");
                            console.log("Sorry, there was a problem!");
                            console.log("Error: " + errorThrown);
                            console.log("Status: " + status);
                        },
                    });
                }
           });
        
        //Employee Detail.

        this.get('#/EmployeeDetail/:id?/?:name?', function (context) {
            context.log('Yo yo yo');
           
            $("#home1").load('/Employee/Details/', function (items) {
                var id = context.params.id;
              //  alert(id);
                $.ajax({
                    type: 'GET',
                    url: "/Employee/Detail/",
                    datatype: 'json',
                    success: function (data) {
                      ///   alert("success");
                        console.log("success" + "data = " + data);
                        
                        $.each((JSON.parse(data)), function (key, value) {
                           
                            var tr;
                            var div;
                            //alert(id + " " + value.ID);
                            if (id == (value.ID)) {
                                flag = true;
                                var deptid = value.DepartmentID;

                                $.ajax({
                                    type: 'GET',
                                    url: "/Employee/GetDepartment/",
                                    datatype: 'json',
                                    success: function (data) {
                                        // alert("dept success");
                                        var department = JSON.parse(data);
                                        //alert(data);
                                        var Deptname;
                                       
                                        $.each(JSON.parse(data), function (key, value) {
                                            
                                           // alert("dept id = " + value.ID + " empdeptid id = " + deptid);
                                            if (deptid == value.ID) {
                                                Deptname = value.DName;
                                              //  alert("deptname = "+Deptname);
                                            };
                                        });
                                        //  alert("outside each");
                                        tr = $("<tr></tr>");
                                        tr.append("<h2 style='color:blue'>  Details of " + value.Name + "  </h2> ")
                                        $("#tabledetail").append(tr);


                                        tr = $("<tr></tr>");
                                        tr.append("<td> Name : </td> <td>" + value.Name + " </td> ")
                                        $("#tabledetail").append(tr);

                                        tr = $("<tr></tr>");
                                        tr.append("<td> Designation : </td> <td> " + value.Designation + "</td>")
                                        $("#tabledetail").append(tr);

                                        tr = $("<tr></tr>");
                                        tr.append("<td> Department : </td> <td> " + Deptname + " </td>")
                                        $("#tabledetail").append(tr);

                                        tr = $("<tr></tr>");
                                        tr.append("<td> Emailid : </td> <td> " + value.Emailid + " </td>")
                                        $("#tabledetail").append(tr);

                                        tr = $("<tr></tr>");
                                        tr.append("<td> ContactNo : </td> <td> " + value.ContactNo + " </td>")
                                        $("#tabledetail").append(tr);


                                        tr = $("<tr></tr>");
                                        tr.append("<td> <a href='#/UpdateEmployeeDetail/0/" + value.ID + "/" + value.Name + "' id =" + value.ID + "> Edit </a> </td>")
                                        $("#tabledetail").append(tr);

                                        tr = $("<tr></tr>");
                                        tr.append("<td> <a href='#/DeleteEmployee/" + value.ID + "/" + value.Name + "' id =" + value.ID + " name =" + value.Name + "> Delete </a> </td>")
                                        $("#tabledetail").append(tr);


                                        tr = $("<tr></tr>");
                                        tr.append("<td> <a href='#/BackToEmpList/' class = 'backtodept' > Back to List </a> </td>");
                                        $("#tabledetail").append(tr);



                                    },
                                    error: function (xhr, status, errorThrown) {

                                       // alert("error");
                                        console.log("Sorry, there was a problem!");
                                        console.log("Error: " + errorThrown);
                                        console.log("Status: " + status);
                                    },
                                });

                            };
                        });

                    },
                    error: function (xhr, status, errorThrown) {

                     //   alert("error");
                        console.log("Sorry, there was a problem!");
                        console.log("Error: " + errorThrown);
                        console.log("Status: " + status);
                    },

                });

            });
        });

        //Delete

        this.get('#/DeleteEmployee/:id?/?:name?', function (context) {
            context.log('Yo yo yo');
           // alert("delete");
          
                var id = context.params.id;
              //  alert("id = " + id);
                var name = context.params.name;
                //alert("name = " + name);
                if (confirm("Are you sure that you want to delete details of " + name + " ?")) {
                    $.ajax({
                        type: 'POST',
                        url: "/Employee/Delete/",
                        datatype: 'json',
                        data: { "ID": "" + id + "" },
                        success: function (data) {
                          //  alert("success");
                            var deptdata = JSON.parse(data);
                            console.log("Success");
                       
                            window.location.hash = '#/EmployeeList/';
                        },
                        error: function (xhr, status, errorThrown) {

                           // alert("error");
                            console.log("Sorry, there was a problem!");
                            console.log("Error: " + errorThrown);
                            console.log("Status: " + status);
                        }

                    });
                }
            //});
        });

        //Edit view
        this.get('#/UpdateEmployeeDetail/0/:id?/?:name?', function (context) {
            context.log('Yo yo yo');
          //  alert("edit");
           
            $("#home1").load('/Employee/Edit/', function (items) {
                var id = context.params.id;
          //     alert("id = " + id);
                $.ajax({
                    type: 'GET',
                    url: "/Employee/GetEmployee/",
                    datatype: 'json',
                    data: { "ID": ""+id+"" },
                    success: function (data) {
                     //   alert("success");
                        var empdata = JSON.parse(data);
                        $.ajax({
                            type: 'GET',
                            url: "/Employee/GetDepartment/",
                            datatype: 'json',
                            success: function (data) {
                             //   alert("2nd success");
                             
                                var tr;
                                tr = $("<tr></tr>");
                                tr.append("<h2 style='color:blue'> Update details of " + empdata.Name + "  </h2> ")
                                $("#tableedit").append(tr);

                                tr = $("<tr></tr>");
                                tr.append("<td><input type = 'hidden' id='txtid' value = " + empdata.ID + ">  </td> ")
                                $("#tableedit").append(tr);

                                tr = $("<tr></tr>");
                                tr.append("<td> Name : </td> <td><input type = 'text' id='txtname' value = " + empdata.Name + "> <div style='color:red' id='errorname'></div> </td> ")
                                $("#tableedit").append(tr);
                                tr = $("<tr></tr>");
                                tr.append("<td> Designation : </td> <td><input type = 'text' id='txtdesignation' value = " + empdata.Designation + ">  <div style='color:red' id='errordesignation'></div></td>")
                                $("#tableedit").append(tr);
                                                              tr = $("<tr></tr>");
                                                              tr.append("<td> Emailid : </td> <td><input type = 'text' id='txtemailid' value = " + empdata.Emailid + "> <div style='color:red' id='erroremailid'></div> </td>")
                                $("#tableedit").append(tr);
                                tr = $("<tr></tr>");
                                tr.append("<td> ContactNo : </td> <td><input type = 'text' id ='txtcontactno' value = " + empdata.ContactNo + "> <div style='color:red' id='errorcontactno'></div> </td>")
                                $("#tableedit").append(tr);

                                tr = $("<tr></tr>");
                                tr.append("<td>Department</td>")
                                var department = JSON.parse(data);
                                //alert(data);
                                var select = $("<select id='select'><div style='color:red' id='errordept'></div></select>");
                                $.each((department), function (key, value) {

                                    if (empdata.DepartmentID == value.ID) {

                                        select.append("<Option value = " + value.ID + " selected id='ddldept'>" + value.DName + "</Option>");
                                    }
                                    else {
                                        select.append("<Option value = " + value.ID + " id='ddldept'>" + value.DName + "</Option>");
                                    }

                                    tr.append(select);
                                    $("#tableedit").append(tr);

                                });

                              
                                tr = $("<tr></tr>");
                                tr.append("<td><a href='#/EditEmployeeDetail/' value='Update' class ='update btn btn-default'>Update</a><a href='#/UpdateCancel/" + empdata.ID + "/" + empdata.Name + "' value='Cancel' class ='cancel btn btn-default'>cancel </a></td>")
                                $("#tableedit").append(tr);

                                tr = $("<tr></tr>");
                                tr.append("<td> <a href='#/BackToEmpList/' class = 'backtodept' > Back to List </a> </td>");
                                $("#tableedit").append(tr);


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
        });

        //Update detail
        this.get('#/EditEmployeeDetail/', function (context) {
          //  alert("update");
                        
                var regexemail = /[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
                var regexname = /^[A-Z]+[a-zA-Z''-'\s]*$/;
                var regdesignation = /^[A-Za-z- ]+$/;
                var flag = false;
                $("#errorname").html("");
                $("#errordept").html("");
                $("#erroremailid").html("");
                $("#errorcontactno").html("");
                $("#errordesignation").html("");
                //alert("hi");
                var id = document.getElementById("txtid").value;
                // alert("id " +id);
                var name = document.getElementById("txtname").value;
                var designation = document.getElementById("txtdesignation").value;
                var emailid = document.getElementById("txtemailid").value;
                var department = document.getElementById("select").value;
           //     alert("deptid = "+department);
                var contactno = document.getElementById("txtcontactno").value;
                //  alert("name " + name + designation + emailid + "dept = " + department + contactno);
                // email validation
                if (emailid != "") {
                    if (!(emailid.match(regexemail))) {
                        flag = true;
                        $("#erroremailid").html("Invalid email-id");
                        //alert("inside match else");
                       
                    }
                }
                else {
                    $("#erroremailid").html("This field is required.");
                    flag = true;
                  
                }

                //name validation
                if (name != "") {
                    if (!(name.match(regexname))) {
                        flag = true;
                        $("#errorname").html("Invalid name.");
                      
                    }
                }
                else {
                    $("#errorname").html("This field is required.");
                    flag = true;
                   
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
              //      alert("inside else" + flag);
                    window.location.hash = '#/UpdateEmployeeDetail/';
                   
                } else {
                    $.ajax({
                        type: 'Post',
                        url: "/Employee/Edit/",
                        datatype: 'json',
                        data: { "ID": "" + id + "", "Name": "" + name + "", "Designation": "" + designation + "", "ContactNo": "" + contactno + "", "Emailid": "" + emailid + "", "DepartmentID": "" + department + "" },
                        success: function (data) {
                            console.log("Success");
                          //  alert("Employee detail updated successfuly.");
                            window.location.hash = '#/EmployeeList/';
                        },
                        error: function (xhr, status, errorThrown) {

                           // alert("error");
                            console.log("Sorry, there was a problem!");
                            console.log("Error: " + errorThrown);
                            console.log("Status: " + status);
                        },
                    });
                }
            
        });

      
        this.get('#/BackToEmpList/', function (context) {
            context.log('Yo yo yo');
             window.location.hash = "#/EmployeeList/";
        });

        // Cancel create.
        this.get('#/AddCancel', function (context) {
            context.log('Yo yo yo');
         //   alert("hello");
            window.location.hash = '#/AddEmployee/0';
        });

        //Update cancel.
        this.get('#/UpdateCancel/:id?/?:name?', function (context) {
            context.log('Yo yo yo');
         //   alert("hello");
            var id = context.params.id;
            var deptname = context.params.name;
            window.location.hash = '#/UpdateEmployeeDetail/0/' + id + '/' + deptname + '';
        });

        this.get('#/Home', function (context) {
            //alert("hello");
            context.log('Yo yo yo');
            window.location.hash = "#/";
        });


       
        //Department...

       
        //Dept Home page.
        this.get('#/DepartmentList/', function (context) {
            context.log('Yo yo yo');
         //   alert("dept");
          
            $("#home1").load('/Department/Index/', function (items) {
           
                $.ajax({
                    type: 'GET',
                    url: "/Department/NoDepartmentFound/",
                    datatype: 'json',
                    success: function (data) {
                      // alert("1st success");
                        context.log('hello');
                        if (data == 'Nodatafound') {
                         //   alert("data undefined");
                            tr = $("<tr></tr>");
                            tr.append("<h2 style='color:blue'>  Currently there is no department. </h2> ");
                            $("#depttable").append(tr);
                            tr = $("<tr></tr>");
                            tr.append(" <h3 style='color:chocolate'>  First add department</h3> ");
                            $("#depttable").append(tr);
                            tr = $("<tr></tr>");
                            tr.append("<td><a href='#/AddDepartment/0' class = 'createdept'> Add Department </a>  </td>");
                            $("#depttable").append(tr);

                        }
                        else {
                        //   alert("success");
                            var tr;
                            tr = $("<tr></tr>");
                            tr.append("<h2 style='color:blue'> Department Details  </h2> ");
                            $("#depttable").append(tr);

                            tr = $("<tr></tr>");
                            tr.append("<td style='color:blue'><a href='#/Home' class = 'homehref'> Home </a>|<a href='#/AddDepartment/0' class = 'createdept'> Create new </a>");
                            $("#depttable").append(tr);
                           
                            tr = $("<tr class = 'header'></tr>");
                            tr.append("<th>Department Name</th>");
                            $("#depttable").append(tr);
                           //  alert(data);
                            console.log(JSON.parse(data));
                           
                            $.each(JSON.parse(data), function (key, value) {
                              //  alert("inside each");
                                //console.log(key + ": " + value);

                                tr = $("<tr id=" + value.ID + "></tr>");
                                tr.append("<td>" + value.DName + "</td><td><a href='#/UpdateDepartment/" + value.ID + "/" + value.DName + "' class = 'editdept' id =" + value.ID + " name=" + value.DName + "> Edit </a> </td><td> <a href='#/DeleteDepartment/" + value.ID + "/" + value.DName + "' class = 'deletedept' id =" + value.ID + " name =" + value.DName + "> Delete </a> </td><td> <a href='#/DepartmentDetail/" + value.ID + "/" + value.DName + "' class = 'detaildept' id =" + value.ID + "  name =" + value.DName + "> Detail </a> </td>"
                                                            );
                                $("#depttable").append(tr);

                            });
                        }

                    },
                    error: function (xhr, status, errorThrown, data) {
                        console.log("Sorry, there was a problem!");
                        console.log("Error: " + errorThrown);
                        console.log("Status: " + status);
                       // alert("error :" + " " + errorThrown + " " + "Status: " + " " + status + "data : " + data);
                    }
                });
             });
        });

        //Dept create
        this.get('#/AddDepartment/0', function (context) {
            context.log('Create');
            //    $('.home').on("click", '.createdept', function (event) {
            $("#home1").load('/Department/Create/', function () {
                             
                tr = $("<tr></tr>");
                tr.append("<h2 style='color:blue'> Create new department  </h2> ");
                $("#deptcreate").append(tr);

                tr = $("<tr></tr>");
                tr.append("<td> Name : </td><td><input type ='text'id='txtdept'><div  style='color:red'  id='error'></div></td>");
                $("#deptcreate").append(tr);

                tr = $("<tr></tr>");
                tr.append("<td><a value='Create' class ='btn btn-default' id='btncreatedept'  href = '#/CreateDeparment/'>Create</a><a href='#/CancelDepartment/' value='Cancel' class ='cancel btn btn-default' > Cancel </a> </td>")
                $("#deptcreate").append(tr);

                tr = $("<tr></tr>");
                tr.append("<td> <a href='#/BackToDeptList/' class = 'backtodept' > Back to List </a> </td>");
                $("#deptcreate").append(tr);

            });

        });

        //Add data in database.
        this.get('#/CreateDeparment/', function (context) {
          
            context.log('Yo yo yo');
          //  alert("create");
            //var has = window.location.hash;
            //var href = window.location.href;
            //var url = $(location).attr('href');
           // alert("url = " + url + " " + "hash = " + has);

    
           $("#error").html("");
         
            var dept = document.getElementById("txtdept").value;
        
            if (dept == "") {
               
                $("#error").append("This field is required.");
              
                window.location.hash = "#/AddDepartment/";
            }
            else {
                // console.log("hello");
               // alert("dept" + dept);
                $.ajax({
                    type: 'GET',
                    url: "/Department/GetDepartment/",
                    datatype: 'json',
                    success: function (data) {
                        // alert("success");
                        //console.log("success" + "data = " + data);
                         flag = false;
                       //  alert(data);
                        $.each((JSON.parse(data)), function (key, value) {
                            console.log("inside each");
                            console.log(key + ": " + value.DName);
                        //    alert("each");
                            if (dept == (value.DName)) {
                                flag = true;
                                $("#error").html(" already exist");
                                // alert(value.DName + " already exist");
                                console.log("already exist " + value.DName);
                                window.location.hash = "#/AddDepartment/";
                            }
                        });
                        if (flag) {
                          //  alert("flag = " + flag);
                        }
                        else {
                           // alert("flag = " + flag);
                            console.log("Inside else");
                          //   alert("inside else : flag " + flag)
                            $.ajax({
                                type: 'Post',
                                url: "/Department/Create/",
                                datatype: 'json',
                                data: { "DName": "" + dept + "" },
                                success: function (data) {
                                    console.log("Success");
                                     // alert(data.DName + " added successfully");
                                    window.location.hash = "#/DepartmentList/";
                                  
                                },
                                error: function (xhr, status, errorThrown) {

                                 // alert("error");
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
                       // alert("error :" + " " + errorThrown + " " + "Status: " + " " + status + "data : " + data);
                    }
                });
            }
        });


        //Delete Dept
        this.get('#/DeleteDepartment/:id?/?:name?', function (context) {
            context.log('Yo yo yo');
            //alert("delete");
         
            var id = context.params.id;
            var deptname = context.params.name;
               // alert("Id = " + id + deptname);
                if (confirm("Are you sure that you want to delete " + deptname + " ?")) {
                    $.ajax({
                        type: 'POST',
                        url: "/Department/Delete/",
                        datatype: 'json',
                        data: { "ID": "" + id + "" },
                        success: function (data) {
                            var deptdata = JSON.parse(data);
                          
                            console.log("Success");
                            console.log(deptdata.DName + " is deleted sucessfuly ");
                           // alert(deptdata.DName + " is deleted successfully ");
                            window.location.hash = "#/DepartmentList/";
                            $.ajax({
                                type: 'GET',
                                url: "/Department/LoadEmployee/",
                                datatype: 'json',
                                data: { "ID": "" + id + "" },
                                success: function (data) {
                                   // alert(data);   
                                    if (data == 'Nodatafound') {
                                    }   
                                    else {
                                        $.each(JSON.parse(data), function (key, value) {
                                           // alert("Inside each");
                                           // alert(value.ID + " " + value.DeptID);
                                            
                                            $.ajax({
                                                type: 'POST',
                                                url: "/Emp/Delete/",
                                                datatype: 'json',
                                                data: { "ID": "" + value.ID + "" },
                                                success: function (data) {
                                                 //   alert("success");
                                                    var deptdata = JSON.parse(data);
                                                    console.log("Success");
                                                    console.log("details of " + deptdata.Name + " is deleted sucessfuly ");
                                                  //  alert("details of " + deptdata.Name + " is deleted successfully ");
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
                                     //   alert("outside each");
                                    };
                                    },
                                        
                            });
                        },
                    
                        error: function (xhr, status, errorThrown) {

                          //  alert("error");
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
       
        //detail
        this.get('#/DepartmentDetail/:id?/?:name?', function (context) {
            context.log('Yo yo yo');
          
            var id = context.params.id;          
            var deptname = context.params.name;
          //  alert("Id = " + id + deptname);
            $("#home1").load('/Department/Details/', function (items) {
          

                    $.ajax({
                        type: 'GET',
                        url: "/Department/GetEmployee/",
                        datatype: 'json',
                        success: function (data) {
                        //  alert("success");
                            console.log("success" + "data = " + data);
                            flag = false;
                            var tr;
                            var div;
                            tr = $("<tr></tr>");
                            tr.append("<h2 style='color:blue'> Details of " + deptname + " </h2>");
                            $("#deptdetail").append(tr);

                            tr = $("<tr class = 'header'></tr>");
                            tr.append("<th>Name</th><th>Designation</th><th>Emailid</th><th>Contactno</th>");
                            $("#deptdetail").append(tr);
                            //  alert("ok");
                            $.each(JSON.parse(data), function (key, value) {
                              
                                //alert("deptid=" + value.DeptID +"id = "+id);

                                if (id == (value.DepartmentID)) {
                                    flag = true;
                                    //  alert("inside if");
                                    // alert("id = "+id + "value.id = "+value.ID );
                                    tr = $("<tr></tr>");
                                    tr.append("<td>" + value.Name + "</td><td>"
                                                     + value.Designation + "</td><td>"
                                                     + value.Emailid + "</td><td>"
                                                     + value.ContactNo + "</td><td >");
                                    $("#deptdetail").append(tr);

                                }
                            });
                            if (!flag) {
                               // alert("flag = "+flag);
                               
                                $("#home1").load('/Department/NoDataFound/', function (items) {

                                    tr = $("<tr></tr>");
                                    tr.append("<h2 style='color:blue'> Details of " + deptname + " </h2>");
                                    $("#Nodatatable").append(tr);
                                    tr = $("<tr></tr>");
                                    tr.append("<td> No data found </td>");
                                    $("#Nodatatable").append(tr);
                                    tr = $("<tr></tr>");
                                    tr.append("<td> <a href='#/BackToDeptList/' class = 'backtodept' > Back to List </a>  </td>");
                                    $("#Nodatatable").append(tr);
                                    
                                });
                            };
                            tr = $("<tr></tr>");
                            tr.append("<td><a href='#/BackToDeptList/' class = 'backtodept' > Back to List </a>  </td>");
                            $("#deptdetail").append(tr);
                        },
                        error: function (xhr, status, errorThrown) {
                            console.log("Sorry, there was a problem!");
                            console.log("Error: " + errorThrown);
                            console.log("Status: " + status);
                           // alert("error");
                        }

                    });
                    //  }

               // });

            });
        });

        //Edit view of department
        this.get('#/UpdateDepartment/:id?/?:name?', function (context) {
            context.log('Yo yo yo');
            // alert("Edit");
            
            $("#error").html("");
            var id = context.params.id;
            var deptname = context.params.name;
         //   $("#canceldept").attr("href", "#/edit/" + id + "/" + name + "");
            $("#home1").load('/Department/Edit/', function (items) {
        
                $("#error").html("");
                   
                    tr = $("<tr></tr>");
                    tr.append("<h2 style='color:blue'> Update Department  </h2> ");
                    $("#deptupdate").append(tr);

                    tr = $("<tr></tr>");
                    tr.append("<td> Name : </td><td><input type ='text' value =" + deptname + "  id='txtdept'><div style='color:red' id='error'></div></td>");
                    $("#deptupdate").append(tr);

                    tr = $("<tr></tr>");
                    tr.append("<td><a  href = '#/EditDepartment/" + id + "/" + deptname + "' value='Update' class ='btn btn-default' id1=" + id + " id='btnupdatedept'> Update</a><a href='#/CancelEdit/" + id + "/" + deptname + "' value='Cancel' id='canceldept' class ='btn btn-default'>Cancel </a></td>")
                    $("#deptupdate").append(tr);

                    tr = $("<tr></tr>");
                    tr.append("<td> <a href='#/BackToDeptList/' class = 'backtodept' > Back to List </a>  </td>");
                    $("#deptupdate").append(tr);

                });

          //  });

        });

        //Update depatment
        this.get('#/EditDepartment/:id?/?:name?', function (context) {
            context.log('Yo yo yo');
          //  alert("update");
            var id = context.params.id;
            var dept = context.params.name;
            $("#error").html("");
            //alert(id +" "+name);
         //   $('.home').on("click", '#btnupdatedept', function (event) {
              //  alert("hello");
            var deptname = document.getElementById("txtdept").value;
                if (deptname == "") {

                    $("#error").append("This field is required.");
                    window.location.hash = "#/EditDepartment/";
                }
                else {
                    $.ajax({
                        type: 'GET',
                        url: "/Department/GetDepartment/",
                        datatype: 'json',
                        success: function (data) {
                            //    alert("inside success");
                            var flag = false;
                            $.each((JSON.parse(data)), function (key, value) {
                              
                                console.log(key + ": " + value.DName);
                        
                                if (deptname == (value.DName)) {
                                    flag = true;
                                  
                                    $("#error").html(value.DName + " already exist");
                                  
                                    console.log("already exist " + value.DName);
                                    window.location.hash = "#/EditDepartment/";
                                }
                            });
                            if (flag) {
                               // alert("flag = " + flag);
                            }
                            else {

                               // alert("flag = " + flag);
                                $.ajax({
                                    type: 'POST',
                                    url: "/Department/Edit/",
                                    datatype: 'json',
                                    data: { "ID": "" + id + "", "DName": "" + deptname + "" },
                                    success: function (data) {
                                       
                                        console.log("Success post");
                                        console.log(data.DName + " is updated sucessfuly ");
                                     
                                        window.location.hash = "#/DepartmentList/";

                                    },
                                    error: function (xhr, status, errorThrown) {
                                      //  alert("error");
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
   
        //Cancel event for create department
        this.get('#/CancelDepartment/', function (context) {
            context.log('Yo yo yo');
            window.location.hash = '#/AddDepartment/0';
        });

        //cancel event for Upadte department
        this.get('#/CancelEdit/:id?/?:name?', function (context) {
            context.log('Yo yo yo');
            var id = context.params.id;
            var deptname = context.params.name;           
            window.location.hash = '#/UpdateDepartment/' + id + '/' + deptname + '';
        });

        //Back to department list
        this.get('#/BackToDeptList/', function (context) {
            context.log('Yo yo yo');
            window.location.hash = "#/DepartmentList/";
        });
        
    });


        $(function () {
        app.run('#/');
    });
    
    
})(jQuery);
























