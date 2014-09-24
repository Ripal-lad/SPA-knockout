


(function ($) {
    //alert("function");
    var flag = false;
   
    var app = $.sammy('#home1', function () {
      //  alert("hello");
      
        this.get('#/', function (context) {
            context.log('hi');
            $("#home1").load('/Home/Empmanagement/', function (items) {
                context.log('hello');
              
            });
         //   alert("get");

        });

        //Employee
        this.get('#/Emp/', function (context) {
            context.log('Yo yo yo');
           //alert("emp");
            $("#home1").load('/Emp/Index/', function (items) {
       
                $.ajax({
                    type: 'GET',
                    url: "/Emp/Getdepartment/",
                    datatype: 'json',
                    success: function (data) {
                        //alert("1st success");
                        //alert("data = "+data);
                        if (data == 'serializedata') {
                           // alert("data undefined");
                            $("#home1").load('/Emp/DeptNotAvailable/', function (items) {
                                //alert("inside deptnot");
                                tr = $("<tr></tr>");
                                tr.append("<h2 style='color:blue'>Currently there is no department yet </h2>");
                                $("#tabledeptnotexist").append(tr);
                                tr = $("<tr></tr>");
                                tr.append("<td> First add department details </td>");
                                $("#tabledeptnotexist").append(tr);
                                tr = $("<tr></tr>");
                                tr.append("<td><a href='#/Create/0' class = 'createdept'> Add Department </a>  </td>");
                                $("#tabledeptnotexist").append(tr);
                                
                            });
                          

                        }
                        else {
                            $.ajax({
                                type: 'GET',
                                url: "/Emp/LoadEmpdata/",
                                datatype: 'json',
                                success: function (data) {
                                    //alert("success");
                                    if (data == 'Nodatafound') {

                                        tr = $("<tr></tr>");
                                        tr.append("<h2 style='color:blue'> Employee Details  </h2> ");
                                        $("#empindex").append(tr);

                                        tr = $("<tr></tr>");
                                        tr.append("<td style='color:blue'><a href='#/Home' class = 'homehref'> Home </a>|<a href='#/Create_employee/0' class = 'createhref'> Create new </a>");
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
                                        tr.append("<td style='color:blue'><a href='#/Home' class = 'homehref'> Home </a>|<a href='#/Create_employee/0' class = 'createhref'> Create new </a>");
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
                                                             + value.ContactNo + "</td><td> <a href='#/Update_employeedetail/0/" + value.ID + "/" + value.Name + "' class = 'edithref' id =" + value.ID + "> Edit </a> </td><td> <a href='#/Delete_employee/" + value.ID + "/" + value.Name + "' class = 'deletehref' id =" + value.ID + " name =" + value.Name + "> Delete </a> </td><td> <a href='#/Empdetail/" + value.ID + "/" + value.Name + "' class = 'detailhref' id =" + value.ID + "> Detail </a> </td>"
                                                                        );
                                            $("#empindex").append(tr);


                                        });

                                    };
                                    //window.location.href = "/Emp/Index";
                                },
                                error: function (xhr, status, errorThrown, data) {
                                    console.log("Sorry, there was a problem!");
                                    console.log("Error: " + errorThrown);
                                    console.log("Status: " + status);
                                   // alert("error :" + " " + errorThrown + " " + "Status: " + " " + status + "data : " + data);
                                }
                            });
                            //alert("data defined");
                            // window.location.href = "/Emp/Create";
                        }

                    },
                    error: function (xhr, status, errorThrown, data) {
                        console.log("Sorry, there was a problem!");
                        console.log("Error: " + errorThrown);
                        console.log("Status: " + status);
                      //  alert("error :" + " " + errorThrown + " " + "Status: " + " " + status + "data : " + data);
                    }
                });


            });

        });

        //Create page
        this.get('#/Create_employee/0', function (context) {
            context.log('Yo yo yo');
          
            $("#home1").load('/Emp/Create/', function (items) {
            
                 $.ajax({
                    type: 'GET',
                    url: "/Emp/Getdepartment/",
                    datatype: 'json',
                    success: function (data) {
                        //alert("success");
                        if (data == undefined) {
                           // alert("data undefined");
                        
                        }
                        else {
                            var tr;
                            tr = $("<tr></tr>");
                            tr.append("<h2 style='color:blue'> Create new Employee  </h2> ")
                            $("#tablecreate").append(tr);

                            tr = $("<tr></tr>");
                            tr.append("<td> Name : </td> <td><input type = 'text' id='txtname'> <div id='errorname'></div> </td> ")
                            $("#tablecreate").append(tr);
                            tr = $("<tr></tr>");
                            tr.append("<td> Designation : </td> <td><input type = 'text' id='txtdesignation'>  <div id='errordesignation'></div></td>")
                            $("#tablecreate").append(tr);
                           
                            tr = $("<tr></tr>");
                            tr.append("<td> Emailid : </td> <td><input type = 'text' id='txtemailid'> <div id='erroremailid'></div> </td>")
                            $("#tablecreate").append(tr);
                            tr = $("<tr></tr>");
                            tr.append("<td> ContactNo : </td> <td><input type = 'text' id ='txtcontactno'> <div id='errorcontactno'></div> </td>")
                            $("#tablecreate").append(tr);

                            tr = $("<tr></tr>");
                            tr.append("<td>Department</td>")
                            var department = JSON.parse(data);
                            //alert(data);
                            var select = $("<select id='select'><div id='errordept'></div></select>");
                            $.each((department), function (key, value) {

                                select.append("<Option value = " + value.ID + "  id='ddldept'>" + value.DName + "</Option>");

                                tr.append(select);
                                $("#tablecreate").append(tr);

                            });

                            tr = $("<tr></tr>");
                            tr.append("<td><a value='Create' class ='btn btn-default' id='btncreate'  href='#/Createemp/'>Create</a><a href='#/Emp_Cancel' value='Cancel' class ='cancel btn btn-default'>Cancel</a> </td>")
                            $("#tablecreate").append(tr);

                            tr = $("<tr></tr>");
                            tr.append("<td> <a href='#/Back_Emplist/' class = 'backtodept' > Back to List </a> </td>");
                            $("#tablecreate").append(tr);

                          
                        }

                    },
                    error: function (xhr, status, errorThrown, data) {
                        console.log("Sorry, there was a problem!");
                        console.log("Error: " + errorThrown);
                        console.log("Status: " + status);
                      //  alert("error :" + " " + errorThrown + " " + "Status: " + " " + status + "data : " + data);
                    }
                });

            });
            //
            
        });

        //add employee
        this.get('#/Createemp/', function (context) {
            context.log('Yo yo yo');
          //  alert("Create");
          //  $('.home').on("click", '#btncreate', function (event) {
                var regexemail = /[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
                var regexname = /^[A-Z]+[a-zA-Z''-'\s]*$/;
                var regdesignation = /^[A-Za-z- ]+$/;
                $("#errorname").html("");
                $("#errordept").html("");
                $("#erroremailid").html("");
                $("#errorcontactno").html("");
                $("#errordesignation").html("");
                //alert("hi");
                var name = document.getElementById("txtname").value;
                var designation = document.getElementById("txtdesignation").value;
                var emailid = document.getElementById("txtemailid").value;
                var department = $("#select option:selected").val();
              //  alert("DEptid = " + department);
                var contactno = document.getElementById("txtcontactno").value;
                //alert("name " + name + designation + emailid + "dept = " + department + contactno);
                // email validation
                if (emailid != "") {
                    if (!(emailid.match(regexemail))) {
                        $("#erroremailid").html("Invalid Email-id");
                        //alert("inside match else");
                        window.location.hash = "#/Create_employee/";
                    }
                }
                else {
                    $("#erroremailid").html("This field is required.");
                    window.location.hash = "#/Create_employee/";
                }

                //name validation
                if (name != "") {
                    if (!(name.match(regexname))) {
                        $("#errorname").html("Text only.");
                        window.location.hash = "#/Create_employee/";
                    }
                }
                else {
                    $("#errorname").html("This field is required.");
                    window.location.hash = "#/Create_employee/";
                }

                // Designation Validation       
                if (designation != "") {
                    if (!(designation.match(regdesignation))) {
                        $("#errordesignation").html("Text only.");
                        window.location.hash = "#/Create_employee/";
                    }
                }
                else {

                    $("#errordesignation").html("This field is required.");
                    window.location.hash = "#/Create_employee/";
                }
                //department validation
                if (department == "") {
                    $("#errordept").html("This field is required.");
                    window.location.hash = "#/Create_employee/";
                }

                //contactno validation
                if (contactno == "") {
                    $("#errorcontactno").html("This field is required.");
                    window.location.hash = "#/Create_employee/";
                }

                if (name == "" || department == "" || emailid == "" || designation == "" || contactno == "") {
                   // alert("inside else");
                }
                else {
                    $.ajax({
                        type: 'Post',
                        url: "/Emp/Create/",
                        datatype: 'json',
                        data: { "Name": "" + name + "", "Designation": "" + designation + "", "ContactNo": "" + contactno + "", "Emailid": "" + emailid + "", "DeptID": "" + department + "" },
                        success: function (data) {
                            console.log("Success");
                           // alert("Employee detail added successfuly.");
                            window.location.hash = "#/Emp/";
                           
                        },
                        error: function (xhr, status, errorThrown) {

                           // alert("error");
                            console.log("Sorry, there was a problem!");
                            console.log("Error: " + errorThrown);
                            console.log("Status: " + status);
                        },
                    });
                }
           // });
        });
        
        //Employee Detail.

        this.get('#/Empdetail/:id?/?:name?', function (context) {
            context.log('Yo yo yo');
           
            $("#home1").load('/Emp/Details/', function (items) {
                var id = context.params.id;
               // alert(id);
                $.ajax({
                    type: 'GET',
                    url: "/Emp/Detail/",
                    datatype: 'json',
                    success: function (data) {
                        // alert("success");
                        console.log("success" + "data = " + data);
                        
                        $.each((JSON.parse(data)), function (key, value) {
                           
                            var tr;
                            var div;
                            //alert(id + " " + value.ID);
                            if (id == (value.ID)) {
                                flag = true;
                                var deptid = value.DeptID;

                              // alert("Inside if " + id + " "+value.ID +"dept id = "+value.DeptID);
                               // alert("Deptid = " + deptid);
                                
                                $.ajax({
                                    type: 'GET',
                                    url: "/Emp/Getdepartment/",
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

                                        //tr = $("<tr></tr>");
                                        //tr.append("<a href='javascript:void(0)' class = 'edithref' id =" + id + " > Edit </a>")
                                        //$("#tabledetail").append(tr);

                                        tr = $("<tr></tr>");
                                        tr.append("<td> <a href='#/Back_Emplist/' class = 'backtodept' > Back to List </a> </td>");
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

        this.get('#/Delete_employee/:id?/?:name?', function (context) {
            context.log('Yo yo yo');
           // alert("delete");
          //  $('.home').on("click", '.deletehref', function (event) {
            //    alert("hi");
               
                var id = context.params.id;
              //  alert("id = " + id);
                var name = context.params.name;
                //alert("name = " + name);
                if (confirm("Are you sure that you want to delete details of " + name + " ?")) {
                    $.ajax({
                        type: 'POST',
                        url: "/Emp/Delete/",
                        datatype: 'json',
                        data: { "ID": "" + id + "" },
                        success: function (data) {
                          //  alert("success");
                            var deptdata = JSON.parse(data);
                            console.log("Success");
                            console.log("details of " + deptdata.Name + " is deleted sucessfuly ");
                            alert("details of " + deptdata.Name + " is deleted successfully ");
                            window.location.hash='#/Emp/';
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
        this.get('#/Update_employeedetail/0/:id?/?:name?', function (context) {
            context.log('Yo yo yo');
           // alert("edit");
            //$('.home').on("click", '.edithref', function (event) {
            $("#home1").load('/Emp/Edit/', function (items) {
                var id = context.params.id;
              //  alert("id = " + id);
                $.ajax({
                    type: 'GET',
                    url: "/Emp/Getemployeedata/" + id + "",
                    datatype: 'json',
                    data: { "ID ": "" + id + "" },
                    success: function (data) {
                       // alert("success");
                        var empdata = JSON.parse(data);
                        $.ajax({
                            type: 'GET',
                            url: "/Emp/Getdepartment/",
                            datatype: 'json',
                            success: function (data) {
                            //    alert("2nd success");
                             
                                var tr;
                                tr = $("<tr></tr>");
                                tr.append("<h2 style='color:blue'> Update details of " + empdata.Name + "  </h2> ")
                                $("#tableedit").append(tr);

                                tr = $("<tr></tr>");
                                tr.append("<td><input type = 'hidden' id='txtid' value = " + empdata.ID + ">  </td> ")
                                $("#tableedit").append(tr);

                                tr = $("<tr></tr>");
                                tr.append("<td> Name : </td> <td><input type = 'text' id='txtname' value = " + empdata.Name + "> <div id='errorname'></div> </td> ")
                                $("#tableedit").append(tr);
                                tr = $("<tr></tr>");
                                tr.append("<td> Designation : </td> <td><input type = 'text' id='txtdesignation' value = " + empdata.Designation + ">  <div id='errordesignation'></div></td>")
                                $("#tableedit").append(tr);
                                                              tr = $("<tr></tr>");
                                tr.append("<td> Emailid : </td> <td><input type = 'text' id='txtemailid' value = " + empdata.Emailid + "> <div id='erroremailid'></div> </td>")
                                $("#tableedit").append(tr);
                                tr = $("<tr></tr>");
                                tr.append("<td> ContactNo : </td> <td><input type = 'text' id ='txtcontactno' value = " + empdata.ContactNo + "> <div id='errorcontactno'></div> </td>")
                                $("#tableedit").append(tr);

                                tr = $("<tr></tr>");
                                tr.append("<td>Department</td>")
                                var department = JSON.parse(data);
                                //alert(data);
                                var select = $("<select id='select'><div id='errordept'></div></select>");
                                $.each((department), function (key, value) {

                                    if (empdata.DeptID == value.ID) {

                                        select.append("<Option value = " + value.ID + " selected id='ddldept'>" + value.DName + "</Option>");
                                    }
                                    else {
                                        select.append("<Option value = " + value.ID + " id='ddldept'>" + value.DName + "</Option>");
                                    }

                                    tr.append(select);
                                    $("#tableedit").append(tr);

                                });

                              
                                tr = $("<tr></tr>");
                                tr.append("<td><a href='#/btnupdate/' value='Update' class ='update btn btn-default'>Update</a><a href='#/Empedit_Cancel/" + empdata.ID + "/" + empdata.Name + "' value='Cancel' class ='cancel btn btn-default'>cancel </a></td>")
                                $("#tableedit").append(tr);

                                tr = $("<tr></tr>");
                                tr.append("<td> <a href='#/Back_Emplist/' class = 'backtodept' > Back to List </a> </td>");
                                $("#tableedit").append(tr);


                            },
                            error: function (xhr, status, errorThrown, data) {
                                console.log("Sorry, there was a problem!");
                                console.log("Error: " + errorThrown);
                                console.log("Status: " + status);
                               // alert("error :" + " " + errorThrown + " " + "Status: " + " " + status + "data : " + data);
                            }
                        });

                        // window.location.href = "/Emp/Edit";

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
        this.get('#/btnupdate/', function (context) {
          //  alert("update");
           // $('.home').on("click", '.update', function (event) {
             
                var regexemail = /[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
                var regexname = /^[A-Z]+[a-zA-Z''-'\s]*$/;
                var regdesignation = /^[A-Za-z- ]+$/;

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
                        $("#erroremailid").html("Invalid email-id");
                        //alert("inside match else");
                        window.location.hash = '#/Update_employeedetail/';
                    }
                }
                else {
                    $("#erroremailid").html("This field is required.");
                    window.location.hash = '#/Update_employeedetail/';
                }

                //name validation
                if (name != "") {
                    if (!(name.match(regexname))) {
                        $("#errorname").html("Text only.");
                        window.location.hash = '#/Update_employeedetail/';
                    }
                }
                else {
                    $("#errorname").html("This field is required.");
                    window.location.hash = '#/Update_employeedetail/';
                }

                // Designation Validation       
                if (designation != "") {
                    if (!(designation.match(regdesignation))) {
                        $("#errordesignation").html("Text only.");
                        window.location.hash = '#/Update_employeedetail/';
                    }
                }
                else {

                    $("#errordesignation").html("This field is required.");
                    window.location.hash = '#/Update_employeedetail/';
                }
                //department validation
                if (department == "") {
                    $("#errordept").html("This field is required.");
                    window.location.hash = '#/Update_employeedetail/';
                }

                //contactno validation
                if (contactno == "") {
                    $("#errorcontactno").html("This field is required.");
                    window.location.hash = '#/Update_employeedetail/';
                }

                if (name == "" || department == "" || emailid == "" || designation == "" || contactno == "") {
                  //  alert("inside else");
                } else {
                    $.ajax({
                        type: 'Post',
                        url: "/Emp/Edit/",
                        datatype: 'json',
                        data: { "ID": "" + id + "", "Name": "" + name + "", "Designation": "" + designation + "", "ContactNo": "" + contactno + "", "Emailid": "" + emailid + "", "DeptID": "" + department + "" },
                        success: function (data) {
                            console.log("Success");
                          //  alert("Employee detail updated successfuly.");
                            window.location.hash = '#/Emp/';
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

      
        this.get('#/Back_Emplist/', function (context) {
            context.log('Yo yo yo');
             window.location.hash = "#/Emp/";
        });

        // Cancel create.
        this.get('#/Emp_Cancel', function (context) {
            context.log('Yo yo yo');
         //   alert("hello");
            window.location.hash = '#/Create_employee/0';
        });

        //Update cancel.
        this.get('#/Empedit_Cancel/:id?/?:name?', function (context) {
            context.log('Yo yo yo');
         //   alert("hello");
            var id = context.params.id;
            var deptname = context.params.name;
            window.location.hash = '#/Update_employeedetail/0/'+id+'/'+name+'';
        });

        this.get('#/Home', function (context) {
            //alert("hello");
            context.log('Yo yo yo');
            window.location.hash = "#/";
        });


       
        //Department...

       
        //Dept Home page.
        this.get('#/Dept/', function (context) {
            context.log('Yo yo yo');
          //  alert("dept");
          
            $("#home1").load('/Dept/Index/', function (items) {
           
                $.ajax({
                    type: 'GET',
                    url: "/Dept/Getdepartment/",
                    datatype: 'json',
                    success: function (data) {
                      //  alert("1st success");
                        context.log('hello');
                        if (data == undefined) {
                          //  alert("data undefined");
                            tr = $("<tr></tr>");
                            tr.append("<h2 style='color:blue'>  Currently there is no department yet </h2> ");
                            $("#depttable").append(tr);
                            tr = $("<tr></tr>");
                            tr.append(" <h3 style='color:chocolate'>  First add department details</h3> ");
                            $("#depttable").append(tr);

                        }
                        else {
                           // alert("success");
                            var tr;
                            tr = $("<tr></tr>");
                            tr.append("<h2 style='color:blue'> Department Details  </h2> ");
                            $("#depttable").append(tr);

                            tr = $("<tr></tr>");
                            tr.append("<td style='color:blue'><a href='#/Home' class = 'homehref'> Home </a>|<a href='#/Create/0' class = 'createdept'> Create new </a>");
                            $("#depttable").append(tr);
                           
                            tr = $("<tr class = 'header'></tr>");
                            tr.append("<th>Department Name</th>");
                            $("#depttable").append(tr);
                            // alert(data);
                            console.log(JSON.parse(data));
                            // var empdata = JSON.parse(data);
                            $.each(JSON.parse(data), function (key, value) {
                               // alert("inside each");
                                //console.log(key + ": " + value);

                                tr = $("<tr id=" + value.ID + "></tr>");
                                tr.append("<td>" + value.DName + "</td><td><a href='#/edit/" + value.ID + "/" + value.DName + "' class = 'editdept' id =" + value.ID + " name=" + value.DName + "> Edit </a> </td><td> <a href='#/delete/" + value.ID + "/" + value.DName + "' class = 'deletedept' id =" + value.ID + " name =" + value.DName + "> Delete </a> </td><td> <a href='#/detail/" + value.ID + "/" + value.DName + "' class = 'detaildept' id =" + value.ID + "  name =" + value.DName + "> Detail </a> </td>"
                                                            );
                                $("#depttable").append(tr);

                            });
                        }

                    },
                    error: function (xhr, status, errorThrown, data) {
                        console.log("Sorry, there was a problem!");
                        console.log("Error: " + errorThrown);
                        console.log("Status: " + status);
                        //alert("error :" + " " + errorThrown + " " + "Status: " + " " + status + "data : " + data);
                    }
                });

           });
        });

        //Dept create
        this.get('#/Create/0', function (context) {
            context.log('Create');
            //    $('.home').on("click", '.createdept', function (event) {
           $("#home1").load('/Dept/Create/', function () {
                             
                tr = $("<tr></tr>");
                tr.append("<h2 style='color:blue'> Create new department  </h2> ");
                $("#deptcreate").append(tr);

                tr = $("<tr></tr>");
                tr.append("<td> Name : </td><td><input type ='text' id='txtdept'><div id='error'></div></td>");
                $("#deptcreate").append(tr);

                tr = $("<tr></tr>");
                tr.append("<td><a value='Create' class ='btn btn-default' id='btncreatedept'  href = '#/Createdept/'>Create</a><a href='#/Cancel_Createdept/' value='Cancel' class ='cancel btn btn-default' > Cancel </a> </td>")
                $("#deptcreate").append(tr);

                tr = $("<tr></tr>");
                tr.append("<td> <a href='#/Back_Deptlist/' class = 'backtodept' > Back to List </a> </td>");
                $("#deptcreate").append(tr);

            });

        });

        //Add data in database.
        this.get('#/Createdept/', function (context) {
          
            context.log('Yo yo yo');
          //  alert("create");
            //var has = window.location.hash;
            //var href = window.location.href;
            //var url = $(location).attr('href');
           // alert("url = " + url + " " + "hash = " + has);

      //  $('#home1').on("click", '#btncreatedept', function (event) {
           $("#error").html("");
         
            var dept = document.getElementById("txtdept").value;
        
            if (dept == "") {
               
                $("#error").append("This field is required.");
              
                window.location.hash = "#/Create/";
            }
            else {
                // console.log("hello");
                //alert("dept" + dept);
                $.ajax({
                    type: 'GET',
                    url: "/Dept/Getdepartment/",
                    datatype: 'json',
                    success: function (data) {
                       //  alert("success");
                        //console.log("success" + "data = " + data);
                         flag = false;
                        $.each((JSON.parse(data)), function (key, value) {
                            console.log("inside each");
                            console.log(key + ": " + value.DName);
                            
                            if (dept == (value.DName)) {
                                flag = true;
                                $("#error").html(" already exist");
                                // alert(value.DName + " already exist");
                                console.log("already exist " + value.DName);
                                window.location.hash = "#/Create/";
                            }
                        });
                        if (flag) {
                           // alert("flag = " + flag);
                        }
                        else {
                           // alert("flag = " + flag);
                            console.log("Inside else");
                            // alert("inside else : flag " + flag)
                            $.ajax({
                                type: 'Post',
                                url: "/Dept/Create/",
                                datatype: 'json',
                                data: { "DName": "" + dept + "" },
                                success: function (data) {
                                    console.log("Success");
                                    //  alert(data.DName + " added successfully");
                                    window.location.hash="#/Dept/";
                                  
                                },
                                error: function (xhr, status, errorThrown) {

                                  //  alert("error");
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
        this.get('#/delete/:id?/?:name?', function (context) {
            context.log('Yo yo yo');
            //alert("delete");
         
            var id = context.params.id;
            var deptname = context.params.name;
               // alert("Id = " + id + deptname);
                if (confirm("Are you sure that you want to delete " + deptname + " ?")) {
                    $.ajax({
                        type: 'POST',
                        url: "/Dept/Delete/",
                        datatype: 'json',
                        data: { "ID": "" + id + "" },
                        success: function (data) {
                            var deptdata = JSON.parse(data);
                          
                            console.log("Success");
                            console.log(deptdata.DName + " is deleted sucessfuly ");
                            alert(deptdata.DName + " is deleted successfully ");
                            window.location.hash = "#/Dept/";
                            $.ajax({
                                type: 'GET',
                                url: "/Dept/LoadEmpdata/",
                                datatype: 'json',
                                data: { "ID": "" + id + "" },
                                success: function (data) {
                                   // alert(data);   
                                    if (data == 'serializedata') {
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
                    window.location.hash = "#/Dept/";
                }
            });
        //});

        //detail
        this.get('#/detail/:id?/?:name?', function (context) {
            context.log('Yo yo yo');
          
            var id = context.params.id;          
            var deptname = context.params.name;
          //  alert("Id = " + id + deptname);
            $("#home1").load('/Dept/Details/', function (items) {
          

                    $.ajax({
                        type: 'GET',
                        url: "/Dept/Getempdata/",
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

                                if (id == (value.DeptID)) {
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
                               
                                $("#home1").load('/Dept/NoDataFound/', function (items) {

                                    tr = $("<tr></tr>");
                                    tr.append("<h2 style='color:blue'> Details of " + deptname + " </h2>");
                                    $("#Nodatatable").append(tr);
                                    tr = $("<tr></tr>");
                                    tr.append("<td> No data found </td>");
                                    $("#Nodatatable").append(tr);
                                    tr = $("<tr></tr>");
                                    tr.append("<td> <a href='#/Back_Deptlist/' class = 'backtodept' > Back to List </a>  </td>");
                                    $("#Nodatatable").append(tr);
                                    
                                });
                            };
                            tr = $("<tr></tr>");
                            tr.append("<td><a href='#/Back_Deptlist/' class = 'backtodept' > Back to List </a>  </td>");
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

        //Edit dept
        this.get('#/edit/:id?/?:name?', function (context) {
            context.log('Yo yo yo');
            // alert("Edit");
            
            $("#error").html("");
            var id = context.params.id;
            var deptname = context.params.name;
         //   $("#canceldept").attr("href", "#/edit/" + id + "/" + name + "");
            $("#home1").load('/Dept/Edit/', function (items) {
             //   $('.home').on("click", '.editdept', function (event) {
                $("#error").html("");
                   
                    tr = $("<tr></tr>");
                    tr.append("<h2 style='color:blue'> Update Department  </h2> ");
                    $("#deptupdate").append(tr);

                    tr = $("<tr></tr>");
                    tr.append("<td> Name : </td><td><input type ='text' value =" + deptname + "  id='txtdept'><div id='error'></div></td>");
                    $("#deptupdate").append(tr);

                    tr = $("<tr></tr>");
                    tr.append("<td><a  href = '#/Updatedept/" + id + "/" + deptname + "' value='Update' class ='btn btn-default' id1=" + id + " id='btnupdatedept'> Update</a><a href='#/Cancel_editdept/" + id + "/" + deptname + "' value='Cancel' id='canceldept' class ='btn btn-default'>Cancel </a></td>")
                    $("#deptupdate").append(tr);

                    tr = $("<tr></tr>");
                    tr.append("<td> <a href='#/Back_Deptlist/' class = 'backtodept' > Back to List </a>  </td>");
                    $("#deptupdate").append(tr);

                });

          //  });

        });

        this.get('#/Updatedept/:id?/?:name?', function (context) {
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
                    window.location.hash = "#/Updatedept/";
                }
                else {
                    $.ajax({
                        type: 'GET',
                        url: "/Dept/Getdepartment/",
                        datatype: 'json',
                        success: function (data) {
                            //    alert("inside success");
                            var flag = false;
                            $.each((JSON.parse(data)), function (key, value) {
                                //  alert("inside each");
                                console.log(key + ": " + value.DName);
                           //     alert(deptname +" == "+ value.DName);
                                if (deptname == (value.DName)) {
                                    flag = true;
                                   // alert("inside if");
                                    $("#error").html(value.DName + " already exist");
                                  //  alert(value.DName + " " + deptname);
                                    console.log("already exist " + value.DName);
                                    window.location.hash = "#/Updatedept/";
                                }
                            });
                            if (flag) {
                               // alert("flag = " + flag);
                            }
                            else {

                               // alert("flag = " + flag);
                                $.ajax({
                                    type: 'POST',
                                    url: "/Dept/Edit/",
                                    datatype: 'json',
                                    data: { "ID": "" + id + "", "DName": "" + deptname + "" },
                                    success: function (data) {
                                       //alert("inside 2nd  success");
                                        console.log("Success post");
                                        console.log(data.DName + " is updated sucessfuly ");
                                        //alert(data.DName + " is updated successfully ");
                                        // $("#txtdept").val('');
                                        window.location.hash = "#/Dept/";

                                    },
                                    error: function (xhr, status, errorThrown) {
                                    //  //  alert("error");
                                        console.log("Sorry, there was a problem!");
                                        console.log("Error: " + errorThrown);
                                        console.log("Status: " + status);

                                    },
                                });

                            };
                        },
                    });
                };
            //});
        });
      //  this.get('#/Updatedept/:id?/?:name?', function (context);

        this.get('#/Cancel_Createdept/', function (context) {
            context.log('Yo yo yo');
           // alert("hello");
            window.location.hash = '#/Create/0';
        });

        //cancel edit dept
        this.get('#/Cancel_editdept/:id?/?:name?', function (context) {
            context.log('Yo yo yo');
          //  alert("hello");
            var id = context.params.id;
            var deptname = context.params.name;           
            window.location.hash = '#/edit/'+id+'/'+deptname+'';           
        });

        //Back to dept list
        this.get('#/Back_Deptlist/', function (context) {
            context.log('Yo yo yo');
            window.location.hash = "#/Dept/";
        });
    });


        $(function () {
        app.run('#/');
    });
    
    //alert("outside sammy");
})(jQuery);

























    //$(document).ready(function () {
    //alert("hello");
    //var app = angular.module("app", ['ngRoute']);
    //app.controller("mainController", ["$scope", function ($scope) {
    //    $scope.message = "Hello World";
    //  //  alert("controller")
    //}])
 
    //app.config(function ($routeProvider) {

    //    $routeProvider.when('/Edit',
    //        {
    //            templateUrl: '/Template/Index.html/',
    //            controller: 'mainController'
    //        })
    //  //  alert("config")
    //});

   
    //})