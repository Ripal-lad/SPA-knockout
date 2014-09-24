 
//Create
var flag = false;
var Deptname;
$(document).ready(function () {
    alert("hello");
    //Employee details
   //Em[loyee Home page
    // $(".divindex").show();
   
    $(".Employee").click(function (event) {
        $(".divindex").show();
        $(".divhome").hide();
      // $(".divdept").hide();
        // alert("Hello");
        //var app = $.sammy('.divhome', function () {
        //    this.get('#/', function (context) {
             
                $.ajax({
                    type: 'GET',
                    url: "/Emp/Getdepartment/",
                    datatype: 'json',
                    success: function (data) {
                        //   alert("1st success");
                        if (data == undefined) {
                            alert("data undefined");
                            tr = $("<tr></tr>");
                            tr.append("<h2 style='color:blue'>  Currently there is no department yet </h2> ");
                            $("#empindex").append(tr);
                            tr = $("<tr></tr>");
                            tr.append(" <h3 style='color:chocolate'>  First add department details</h3> ");
                            $("#empindex").append(tr);

                        }
                        else {
                            $.ajax({
                                type: 'GET',
                                url: "/Emp/Index/",
                                datatype: 'json',
                                success: function (data) {
                                    //alert("success");
                                    var tr;
                                    tr = $("<tr></tr>");
                                    tr.append("<h2 style='color:blue'> Employee Details  </h2> ");
                                    $("#empindex").append(tr);

                                    tr = $("<tr></tr>");
                                    tr.append("<td style='color:blue'><a ='javascript:void(0)' class = 'homehref'> Home </a>|<a ='javascript:void(0)' class = 'createhref'> Create new </a>");
                                    $("#empindex").append(tr);

                                    tr = $("<tr class = 'header'></tr>");
                                    tr.append("<th>Name</th><th>Designation</th><th>Emailid</th><th>Contactno</th>");
                                    $("#empindex").append(tr);
                                    // alert(data);
                                //    console.log(JSON.parse(data));
                                    // var empdata = JSON.parse(data);
                                    $.each(JSON.parse(data), function (key, value) {
                                        //alert("inside each");
                                        //console.log(key + ": " + value);

                                        tr = $("<tr></tr>");
                                        tr.append("<td>" + value.Name + "</td><td>"
                                                         + value.Designation + "</td><td>"
                                                         + value.Emailid + "</td><td>"
                                                         + value.ContactNo + "</td><td> <a ='javascript:void(0)' class = 'edithref' id =" + value.ID + "> Edit </a> </td><td> <a ='javascript:void(0)' class = 'deletehref' id =" + value.ID + " name =" + value.Name + "> Delete </a> </td><td> <a ='javascript:void(0)' class = 'detailhref' id =" + value.ID + "> Detail </a> </td>"
                                                                    );
                                        $("#empindex").append(tr);


                                    });


                                    //window.location.href = "/Emp/Index";
                                },
                                error: function (xhr, status, errorThrown, data) {
                                    console.log("Sorry, there was a problem!");
                                    console.log("Error: " + errorThrown);
                                    console.log("Status: " + status);
                                    alert("error :" + " " + errorThrown + " " + "Status: " + " " + status + "data : " + data);
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
                        alert("error :" + " " + errorThrown + " " + "Status: " + " " + status + "data : " + data);
                    }
                });

                
            });
 
    
    //create page
  //  $(".create12").click(function (event) {
    $('.home').on("click", '.createhref', function (event) {
    event.preventDefault();
         alert("hello");
         $(".divindex").hide();
         $(".divdetail").hide();
        $(".divcreate").show();
        console.log("hello");
        //alert("dept" + dept);
        $.ajax({
            type: 'GET',
            url: "/Emp/Getdepartment/",
            datatype: 'json',
            success: function (data) {
                //alert("success");
                if (data == undefined) {
                    alert("data undefined");
                    window.location.href = "/Emp/DeptNotavailable";
                }
                else {
                    alert("data defined");
                    var tr;
                    tr = $("<tr></tr>");
                    tr.append("<h2 style='color:blue' align ='center'> Create new Employee  </h2> ")
                    $("#tablecreate").append(tr);

                    tr = $("<tr></tr>");
                    tr.append("<td> Name : </td> <td><input type = 'text' id='txtname'> <div id='errorname'></div> </td> ")
                    $("#tablecreate").append(tr);
                    tr = $("<tr></tr>");
                    tr.append("<td> Designation : </td> <td><input type = 'text' id='txtdesignation'>  <div id='errordesignation'></div></td>")
                    $("#tablecreate").append(tr);
                    tr = $("<tr></tr>");
                    tr.append("<td>Department</td>")
                    var department = JSON.parse(data);
                    //alert(data);
                    var select = $("<select><div id='errordept'></div></select>");
                    $.each((department), function (key, value) {

                        select.append("<Option value = " + value.ID + "  id='ddldept'>" + value.DName + "</Option>");
                      
                        tr.append(select);
                        $("#tablecreate").append(tr);

                    });
                    tr = $("<tr></tr>");
                    tr.append("<td> Emailid : </td> <td><input type = 'text' id='txtemailid'> <div id='erroremailid'></div> </td>")
                    $("#tablecreate").append(tr);
                    tr = $("<tr></tr>");
                    tr.append("<td> ContactNo : </td> <td><input type = 'text' id ='txtcontactno'> <div id='errorcontactno'></div> </td>")
                    $("#tablecreate").append(tr);

                    tr = $("<tr></tr>");
                    tr.append("<td><input type ='button' value='Create' class ='btn btn-default' id='btncreate'><input type ='button' value='Cancel' class ='cancel btn btn-default'> </td>")
                    $("#tablecreate").append(tr);

                    tr = $("<tr></tr>");
                    tr.append("<td> <a ='javascript:void(0)' class = 'back' > Back to List </a> </td>");
                    $("#tablecreate").append(tr);

                   // $("#emplyeedetail").load("Emp/Create");
                    //window.location.href = "/Emp/Create";

                }   
                   
            },            
            error: function (xhr, status, errorThrown, data) {
                console.log("Sorry, there was a problem!");
                console.log("Error: " + errorThrown);
                console.log("Status: " + status);
                alert("error :" + " " + errorThrown + " " + "Status: " + " " + status + "data : " + data);
            }
        });
        
    });

   //Inside create view
   // $(".btncreate").click(function () {
    $('.home').on("click", '#btncreate', function (event) {
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
        var department = document.getElementById("ddldept").value;
        var contactno = document.getElementById("txtcontactno").value;
        //alert("name " + name + designation + emailid + "dept = " + department + contactno);
        // email validation
        if (emailid != "") {
            if (!(emailid.match(regexemail))) {
                $("#erroremailid").html("Invalid Email-id");
                //alert("inside match else");
            }
        }
        else {
            $("#erroremailid").html("This field is required.");
        }

        //name validation
        if (name != "") {
            if (!(name.match(regexname))) {
                $("#errorname").html("Text only.");
            }
        }
        else {
            $("#errorname").html("This field is required.");
        }

        // Designation Validation       
        if (designation != "") {
            if (!(designation.match(regdesignation))) {
                $("#errordesignation").html("Text only.");
            }
        }
        else {

            $("#errordesignation").html("This field is required.");
        }
        //department validation
        if (department == "") {
            $("#errordept").html("This field is required.");
        }

        //contactno validation
        if (contactno == "") {
            $("#errorcontactno").html("This field is required.");
        }

        if (name == "" || department == "" || emailid == "" || designation == "" || contactno == "") {
            alert("inside else");
        }
        else {
            $.ajax({
                type: 'Post',
                url: "/Emp/Create/",
                datatype: 'json',
                data: { "Name": "" + name + "", "Designation": "" + designation + "", "ContactNo": "" + contactno + "", "Emailid": "" + emailid + "", "DeptID": "" + department + "" },
                success: function (data) {
                    console.log("Success");
                    alert("Employee detail added successfuly.");
                    $(".divindex").show();
                    $(".divcreate").hide();
                   // window.location.href = "../Emp/Index/";
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

    //Edit
    //retrieve data for update
   // $(".edit").click(function () {
    $('.home').on("click", '.edithref', function (event) {
        // alert("hi");
        $(".divedit").show(); 
        $(".divhome").hide();
        $(".divindex").hide();
        //$(".index").hide();
        var id = $(this).attr("id");
        alert("id = " + id);
        $.ajax({
            type: 'GET',
            url: "/Emp/Getemployeedata/" + id + "",
            datatype: 'json',
            data: { "ID ": "" + id + "" },
            success: function (data) {
             //   alert("success");
                var empdata = JSON.parse(data);
                $.ajax({
                    type: 'GET',
                    url: "/Emp/Getdepartment/",
                    datatype: 'json',
                    success: function (data) {
                       // alert("2nd success");
                        $(".divedit").show();
                        var tr;
                        tr = $("<tr></tr>");
                        tr.append("<h2 style='color:blue' align ='center'> Update details of " + empdata.Name + "  </h2> ")
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
                        tr.append("<td>Department</td>")
                        var department = JSON.parse(data);
                        //alert(data);
                        var select = $("<select><div id='errordept'></div></select>");
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
                        tr.append("<td> Emailid : </td> <td><input type = 'text' id='txtemailid' value = " + empdata.Emailid + "> <div id='erroremailid'></div> </td>")
                        $("#tableedit").append(tr);
                        tr = $("<tr></tr>");
                        tr.append("<td> ContactNo : </td> <td><input type = 'text' id ='txtcontactno' value = " + empdata.ContactNo + "> <div id='errorcontactno'></div> </td>")
                        $("#tableedit").append(tr);

                        tr = $("<tr></tr>");
                        tr.append("<td> <a ='javascript:void(0)' class = 'back' > Back to List </a> </td>");
                        $("#tableedit").append(tr);

                        tr = $("<tr></tr>");
                        tr.append("<td><input type ='button' value='Update' class ='update btn btn-default'><input type ='button' value='Cancel' class ='cancel btn btn-default'> </td>")
                        $("#tableedit").append(tr);
                       
                    },
                    error: function (xhr, status, errorThrown, data) {
                        console.log("Sorry, there was a problem!");
                        console.log("Error: " + errorThrown);
                        console.log("Status: " + status);
                        alert("error :" + " " + errorThrown + " " + "Status: " + " " + status + "data : " + data);
                    }
                });

                // window.location.href = "/Emp/Edit";

            },
            error: function (xhr, status, errorThrown) {
                console.log("Sorry, there was a problem!");
                console.log("Error: " + errorThrown);
                console.log("Status: " + status);
                alert("error :" + " " + errorThrown + " " + "Status: " + " " + status);
            }
        });

    });

    //$(".update").click(function(){ 
    $('.home').on("click", '.update', function (event){  
    $(".divedit").show(); 
        alert("Hello");

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
        var department = document.getElementById("ddldept").value;
        var contactno = document.getElementById("txtcontactno").value;
      //  alert("name " + name + designation + emailid + "dept = " + department + contactno);
        // email validation
        if (emailid != "") {
            if (!(emailid.match(regexemail))) {
                $("#erroremailid").html("Invalid email-id");
                //alert("inside match else");
            }           
        }
        else{           
            $("#erroremailid").html("This field is required.");
        }

        //name validation
        if (name != "") {
            if (!(name.match(regexname))) {
                $("#errorname").html("Text only.");
            }                      
        }
        else {
            $("#errorname").html("This field is required.");
        }

        // Designation Validation       
        if (designation != "") {
            if (!(designation.match(regdesignation))) {
                $("#errordesignation").html("Text only.");
            }
        }
        else {

            $("#errordesignation").html("This field is required.");
        }
        //department validation
        if (department == "") {
            $("#errordept").html("This field is required.");
        }

        //contactno validation
        if (contactno == "") {
            $("#errorcontactno").html("This field is required.");
        }

        if (name == "" || department == "" || emailid == "" || designation == "" || contactno == "") {
            alert("inside else");
        } else {
            $.ajax({
                type: 'Post',
                url: "/Emp/Edit/",
                datatype: 'json',
                data: { "ID":""+id +"","Name": "" + name + "", "Designation": "" + designation + "", "ContactNo": "" + contactno + "", "Emailid": "" + emailid + "", "DeptID": "" + department + "" },
                success: function (data) {
                    console.log("Success");
                    alert("Employee detail updated successfuly.");
                    window.location.href = "/Emp/Index/";
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
    
    //Detail

  //  $(".detail").click(function () {
    $('.home').on("click", '.detailhref', function (event) {
    alert("hi");
        $(".divindex").hide();
        $(".divdetail").show();
        var id = $(this).attr("id");
    //    alert(id);
        $.ajax({
            type: 'GET',
            url: "/Emp/Detail/",
            datatype: 'json',
            success: function (data) {
               // alert("success");
                console.log("success" + "data = " + data);
                var empdata = data;               
             //   alert("empdata = "+empdata);
                $.each((JSON.parse(data)), function (key, value) {
                    //  alert("inside each");
                    //console.log(key + ": " + value);
                    //  alert(id +" " +value.DeptID + "key  " + key.DeptID );
                    var tr;
                    var div;
                     //alert(id + " " + value.ID);
                    if (id == (value.ID)) {
                        var deptid = value.ID;
                      
                       // alert("Inside if " + id + " "+value.ID);
                        //alert("Deptid = " + deptid);
                        flag = true;
                        $.ajax({
                            type: 'GET',
                            url: "/Emp/Getdepartment/",
                            datatype: 'json',
                            success: function (data) {
                               // alert("dept success");
                                var department = JSON.parse(data);
                                //alert(data);

                                $.each(JSON.parse(data), function (key, value) {
                                    //alert("dept = " + value.ID + " emp = " + deptid);
                                    if (deptid == value.ID) {
                                        Deptname = value.DName;
                                        //alert("deptname = "+Deptname);
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
                                tr.append("<td> <a ='javascript:void(0)' class = 'back' > Back to List </a> </td>");
                                $("#tabledetail").append(tr);



                            },
                            error: function (xhr, status, errorThrown) {

                                alert("error");
                                console.log("Sorry, there was a problem!");
                                console.log("Error: " + errorThrown);
                                console.log("Status: " + status);
                            },
                        });

                    };
                    });
                
            },
            error: function (xhr, status, errorThrown) {

                alert("error");
                console.log("Sorry, there was a problem!");
                console.log("Error: " + errorThrown);
                console.log("Status: " + status);
            },
            
        });

    }); 
       
   //cancel

   // $(".cancel").click(function(){
    $('.home').on("click", '.cancel', function (event) {
        alert("hello");
        $("#txtname").val('');
        $("#txtdesignation").val('');
        $("#ddldept").val('');
        $("#txtcontactno").val('');
        $("#txtemailid").val('');
        $("#errorname").html("");
        $("#errordept").html("");
        $("#erroremailid").html("");
        $("#errorcontactno").html("");
        $("#errordesignation").html("");
        //dept
        $("#txtdept").val('');
        $("#error").html("");
    });


    //Delete
  //  $(".delete").click(function (event) {
    $('.home').on("click", '.deletehref', function (event){
     alert("hi");
        event.preventDefault();
        var id = $(this).attr("id");
        alert("id = "+ id);
        var name = $(this).attr("name");
        alert("name = " + name);
        if (confirm("Are you sure that you want to delete details of " + name + " ?")) {
            $.ajax({
                type: 'POST',
                url: "/Emp/Delete/",
                datatype: 'json',
                data: { "ID": "" + id + "" },
                success: function (data) {
                    alert("success");
                    var deptdata = JSON.parse(data);
                    console.log("Success");
                    console.log("details of "+deptdata.Name + " is deleted sucessfuly ");
                    alert("details of " + deptdata.Name + " is deleted successfully ");
                    // $.load("../Dept/Index/");
                    window.location.href = "/Emp/Index";
                },
                error: function (xhr, status, errorThrown) {

                    alert("error");
                    console.log("Sorry, there was a problem!");
                    console.log("Error: " + errorThrown);
                    console.log("Status: " + status);
                }

            });
        }
    });

    //Back to list
    $('.home').on("click", '.back', function (event){
        alert("hi how");
        $(".divindex").show();
        $(".divedit").hide();
        $("#tableedit tr").remove();
        $("#tabledetail tr").remove();
        $("#tablecreate tr").remove();
    });

    //Home
    $('.home').on("click", '.homehref', function (event) {
        $(".divhome ").show();
        $(".divindex").hide();
        $("#empindex tr").remove();
        $(".divdeptindex").hide();
        $("#depttable tr").remove();
    });


    //Department detail
    //department home

    $(".Department").click(function () {
        alert("hello");
        $(".divindex").hide();
        $(".divhome").hide();
        $(".divdeptindex").show();
        $.ajax({
            type: 'GET',
            url: "/Dept/Getdepartment/",
            datatype: 'json',
            success: function (data) {
                //   alert("1st success");
                if (data == undefined) {
                    alert("data undefined");
                    tr = $("<tr></tr>");
                    tr.append("<h2 style='color:blue'>  Currently there is no department yet </h2> ");
                    $("#depttable").append(tr);
                    tr = $("<tr></tr>");
                    tr.append(" <h3 style='color:chocolate'>  First add department details</h3> ");
                    $("#depttable").append(tr);
                  
                }
                else {
                    //alert("success");
                            var tr;
                            tr = $("<tr></tr>");
                            tr.append("<h2 style='color:blue'> Department Details  </h2> ");
                            $("#depttable").append(tr);

                            tr = $("<tr></tr>");
                            tr.append("<td style='color:blue'><a ='javascript:void(0)' class = 'homehref'> Home </a>|<a ='javascript:void(0)' class = 'createdept'> Create new </a>");
                            $("#depttable").append(tr);

                            tr = $("<tr class = 'header'></tr>");
                            tr.append("<th>Department Name</th>");
                            $("#depttable").append(tr);
                            // alert(data);
                            console.log(JSON.parse(data));
                            // var empdata = JSON.parse(data);
                            $.each(JSON.parse(data), function (key, value) {
                                //alert("inside each");
                                //console.log(key + ": " + value);
                               
                                tr = $("<tr id="+value.ID+"></tr>");
                                tr.append("<td>" + value.DName + "</td><td><a ='javascript:void(0)' class = 'editdept' id =" + value.ID + " name=" + value.DName + "> Edit </a> </td><td> <a ='javascript:void(0)' class = 'deletedept' id =" + value.ID + " name =" + value.DName + "> Delete </a> </td><td> <a ='javascript:void(0)' class = 'detaildept' id =" + value.ID + "  name =" + value.DName + "> Detail </a> </td>"
                                                            );
                                $("#depttable").append(tr);            
                                                    
                                                      
                            //window.location.href = "/Emp/Index";
                       
                    });
                    //alert("data defined");
                    // window.location.href = "/Emp/Create";
                }

            },
            error: function (xhr, status, errorThrown, data) {
                console.log("Sorry, there was a problem!");
                console.log("Error: " + errorThrown);
                console.log("Status: " + status);
                alert("error :" + " " + errorThrown + " " + "Status: " + " " + status + "data : " + data);
            }
        });


    });

    //Delete
   // $(".delete").click(function (event) {
    $('.home').on("click", '.deletedept', function (event){ 
    //    alert("hi");
        event.preventDefault();
        var id = $(this).attr("id");
        var deptname = $(this).attr("name");
          alert("Id = " + id + deptname);
        if (confirm("Are you sure that you want to delete " + deptname + " ?")) {
            $.ajax({
                type: 'POST',
                url: "/Dept/Delete/",
                datatype: 'json',
                data: { "ID": "" + id + "" },
                success: function (data) {
                    var deptdata = JSON.parse(data);
                    $(".divdeptindex").show();
                    console.log("Success");
                    console.log(deptdata.DName + " is deleted sucessfuly ");
                    alert(deptdata.DName + " is deleted successfully ");
                    //alert("tr#"+id+"");
                    //$("table#depttable tr#"+id +"").remove();
                    //alert("Hi ");
                   
                   
                },
                error: function (xhr, status, errorThrown) {

                    alert("error");
                    console.log("Sorry, there was a problem!");
                    console.log("Error: " + errorThrown);
                    console.log("Status: " + status);
                }

            });
        }
    });

    //Create
    //design of create
    //  $(".create").click(function (event) {
    $('.home').on("click", '.createdept', function (event) {
        alert("CREATE");
        $(".divdeptindex").hide();

        tr = $("<tr></tr>");
        tr.append("<h2 style='color:blue'> Create new department  </h2> ");
        $("#deptcreate").append(tr);

        tr = $("<tr></tr>");
        tr.append("<td> Name : </td><td><input type ='text' id='txtdept'><div id='error'></div></td>");
        $("#deptcreate").append(tr);

        tr = $("<tr></tr>");
        tr.append("<td><input type ='button' value='Create' class ='btn btn-default' id='btncreatedept'><input type ='button' value='Cancel' class ='cancel btn btn-default'> </td>")
        $("#deptcreate").append(tr);

        tr = $("<tr></tr>");
        tr.append("<td> <a ='javascript:void(0)' class = 'backtodept' > Back to List </a> </td>");
        $("#deptcreate").append(tr);
        $(".divdeptcreate").show();
    });
    //insert data
    $('.home').on("click", '#btncreatedept', function (event) {
        $("#error").html("");
        var dept = document.getElementById("txtdept").value;
        alert("dept ="+dept);
        if (dept == "") {

            $("#error").append("This field is required.");
        }
        else {
            // console.log("hello");
            //alert("dept" + dept);
            $.ajax({
                type: 'GET',
                url: "/Dept/Getdepartment/",
                datatype: 'json',
                success: function (data) {
                   // alert("success");
                    //console.log("success" + "data = " + data);

                    $.each((JSON.parse(data)), function (key, value) {
                        console.log("inside each");
                        console.log(key + ": " + value.DName);

                        if (dept == (value.DName)) {
                            flag = true;
                            $("#error").html(value.DName + " already exist");
                            // alert(value.DName + " already exist");
                            console.log("already exist " + value.DName);
                           
                        }
                    });
                    if (flag) {
                        alert("flag = " + flag);
                    }
                    else {
                        alert("flag = " + flag);
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

                                //window.location.href = "../Dept/Index/";
                             //   $("#txtdept").val('');
                                $(".divdeptcreate").hide();
                                $(".divdeptindex").show();
                                var tr;
                               // alert("name = "+data.DName +" "+data.ID);
                                    tr = $("<tr></tr>");
                                    tr.append("<td>" + data.DName + "</td><td><a ='javascript:void(0)' class = 'editdept' id =" + data.ID + " name=" + data.DName + "> Edit </a> </td><td> <a ='javascript:void(0)' class = 'deletedept' id =" + data.ID + " name =" + data.DName + "> Delete </a> </td><td> <a ='javascript:void(0)' class = 'detaildept' id =" + data.ID + "  name =" + data.DName + "> Detail </a> </td>"
                                                                );
                                    $("#depttable").append(tr);
                                   
                                                    
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
    
    //Edit
    //GUI of edit
  //  $(".ed").click(function (event) {
    $('.home').on("click", '.editdept', function (event){
      alert("hi");
        var id = $(this).attr("id");   // id of deptartment
        alert("id = " + id);
        var deptname = $(this).attr("name");

        alert("dept = " + deptname);
        $(".divdeptindex").hide();
        $(".divdeptupdate").show();

                    tr = $("<tr></tr>");
                    tr.append("<h2 style='color:blue'> Update Department  </h2> ");
                    $("#deptupdate").append(tr);

                    tr = $("<tr></tr>");
                    tr.append("<td> Name : </td><td><input type ='text' value ="+deptname+"  id='txtdept'><div id='error'></div></td>");
                    $("#deptupdate").append(tr);

                    tr = $("<tr></tr>");
                    tr.append("<td><input type ='button' value='Update' class ='btn btn-default' id1=" + id + " id='btnupdatedept'><input type ='button' value='Cancel' class ='cancel btn btn-default'> </td>")
                    $("#deptupdate").append(tr);

                    tr = $("<tr></tr>");
                    tr.append("<td> <a ='javascript:void(0)' class = 'backtodept' > Back to List </a> </td>");
                    $("#deptupdate").append(tr);
                  
              });
    //update department
    $('.home').on("click", '#btnupdatedept', function (event) {
        alert("hello");
        var deptname=document.getElementById("txtdept").value;
        alert(deptname);
        var id = $(this).attr("id1");
        alert("id = " + id);
        if (deptname == "") {

            $("#error").append("This field is required.");
        }
        else {
            $.ajax({
                type: 'GET',
                url: "/Dept/Getdepartment/",
                datatype: 'json',
                success: function (data) {
                    alert("inside success");
                    $.each((JSON.parse(data)), function (key, value) {
                        //  alert("inside each");
                        console.log(key + ": " + value.DName);

                        if (deptname == (value.DName)) {
                            flag = true;
                            alert("inside condition");
                            $("#error").html(value.DName + " already exist");
                            alert(value.DName + " " + deptname);
                            console.log("already exist " + value.DName);
                          
                        }
                    });
                    if (flag) {
                        alert("flag = " + flag);
                    }
                    else {

                        alert("flag = " + flag);
                        $.ajax({
                            type: 'POST',
                            url: "/Dept/Edit/",
                            datatype: 'json',
                            data: { "ID": "" + id + "", "DName": "" + deptname + "" },
                            success: function (data) {
                                alert("inside success");
                                console.log("Success post");
                                console.log(data.DName + " is updated sucessfuly ");
                                alert(data.DName + " is updated successfully ");
                                // $("#txtdept").val('');
                                
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
        
   // $(".detail").click(function (event) {
    $('.home').on("click", '.detaildept', function (event) {
        $(".divdeptdetail").show();
        $(".divdeptindex").hide();

          alert("hi");
       
        var id = $(this).attr("id");   // id of deptartment
     //   alert("id = " + id);
        console.log("id = " + id);
        var deptname = $(this).attr("name");
     //   alert("dept = " + deptname);
        $.ajax({
            type: 'GET',
            url: "/Dept/Detail/",
            datatype: 'json',
            success: function (data) {
                 //alert("success");
                console.log("success" + "data = " + data);
                // window.location.href="../Dept/Details";
                var tr;
                var div;
                tr = $("<tr></tr>");
                tr.append("<h2 style='color:blue' align ='center'> Details of " + deptname + " </h2>");
                $("#deptdetail").append(tr);
               
                tr = $("<tr class = 'header'></tr>");
                tr.append("<th>Name</th><th>Designation</th><th>Emailid</th><th>Contactno</th>");
                $("#deptdetail").append(tr);
              //  alert("ok");
                $.each(JSON.parse(data), function (key, value) {
                    flag = false;
                 //   alert("deptid=" + value.DeptID +"id = "+id);
                    
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
                    $(".divdeptdetail").hide();
                    $("#deptdetail tr").remove();
                    $(".divdeptnotfound").show();
                    tr = $("<tr></tr>");
                    tr.append("<h2 style='color:blue'> Details of " + deptname + " </h2>");
                    $("#Nodatatable").append(tr);
                    tr = $("<tr></tr>");
                    tr.append("<td> No data found </td>");
                    $("#Nodatatable").append(tr);
                    tr = $("<tr></tr>");
                    tr.append("<td> <a ='javascript:void(0)' class = 'backtodept' > Back to List </a> </td>");
                    $("#Nodatatable").append(tr);

                };
                tr = $("<tr></tr>");
                tr.append("<td> <a ='javascript:void(0)' class = 'backtodept' > Back to List </a> </td>");
                $("#deptdetail").append(tr);
            },
            error: function (xhr, status, errorThrown) {
                console.log("Sorry, there was a problem!");
                console.log("Error: " + errorThrown);
                console.log("Status: " + status);
                alert("error");
            }

        });
        //  }

    });

    //back to department index
    $('.home').on("click", '.backtodept', function (event) {
        $(".divdeptindex").show();
        $(".divdeptupdate").hide();
        $(".divdeptdetail").hide();
        $(".divdeptcreate").hide();
        $("#deptcreate tr").remove();
        $("#deptdetail tr").remove();
        $("#Nodatatable tr").remove();
    });
   
})

