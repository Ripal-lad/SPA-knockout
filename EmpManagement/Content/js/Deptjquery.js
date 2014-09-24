////Create
var flag = false;
$(document).ready(function () {
    alert("hello");
    //$(".divindex").show();
    $("#error").html("");

    $(".create").click(function (event) {
        event.preventDefault();
        var dept = document.getElementById("txtdept").value;
      //  alert("dept ="+dept);
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
                    alert("success");
                    //console.log("success" + "data = " + data);

                    $.each((JSON.parse(data)), function (key, value) {
                        //console.log("inside each");
                        // console.log(key + ": " + value.DName);

                        if (dept == (value.DName)) {
                            flag = true;
                            $("#error").html(value.DName + " already exist");
                            // alert(value.DName + " already exist");
                            console.log("already exist " + value.DName);

                        }
                    });
                    if (flag) {
                        //alert("flag = " + flag);
                    }
                    else {
                        console.log("Inside else");
                         alert("inside else : flag " + flag)
                        $.ajax({
                            type: 'Post',
                            url: "/Dept/Create/",
                            datatype: 'json',
                            data: { "DName": "" + dept + "" },
                            success: function (data) {
                                console.log("Success");
                                alert("success" + data.DName);
                                window.location.href = "../Dept/Index/";
                            },
                            error: function (xhr, status, errorThrown) {

                                alert("error");
                                console.log("Sorry, there was a problem!");
                                console.log("Error: " + errorThrown);
                                console.log("Status: " + status);
                            }
                        })

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
    //Cancel

    $(".cancel").click(function () {
        alert("hello");
        $("#txtdept").val('');
        $(".txtdept").val('');
    })


    //Delete

    $(".delete").click(function (event) {
        //    alert("hi");
        event.preventDefault();
        var id = $(this).attr("id");
        var deptname = $(this).attr("name");
        //   alert("Id = " + id);
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
                    // $.load("../Dept/Index/");
                    window.location.href = "/Dept/Index";
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


    //Edit
    $(".ed").click(function (event) {
        //  alert("hi");
        event.preventDefault();
        var id = $(".txtdept").attr("id1");   // id of deptartment
        //alert("id = " + id);
        var deptname = document.getElementById("DName").value;
        //alert("dept = " + deptname);

        if (deptname == "") {
            $("#error").html("This field is required");
        }
        else {
            $.ajax({
                type: 'GET',
                url: "/Dept/Getdepartment/",
                datatype: 'json',
                success: function (data) {
                    // alert("success");
                    console.log("success" + "data = " + data);

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
                        // alert("flag = " + flag);
                    }
                    else {

                        //alert("flag = " + flag);
                        $.ajax({
                            type: 'POST',
                            url: "/Dept/Edit/",
                            datatype: 'json',
                            data: { "ID": "" + id + "", "DName": "" + deptname + "" },
                            success: function (data) {
                                //      alert("inside success");
                                console.log("Success post");
                                console.log(data.DName + " is updated sucessfuly ");
                                alert(data.DName + " is updated successfully ");

                                window.location.href = "/Dept/Index";
                            },
                            error: function (xhr, status, errorThrown) {

                                console.log("Sorry, there was a problem!");
                                console.log("Error: " + errorThrown);
                                console.log("Status: " + status);
                                alert("error");
                            }

                        });
                    }
                }
            });
        }
    });


    //Detail


    $(".detail").click(function (event) {

        $(".divdetail").show();
        $(".divindex").hide();
       
      //  alert("hi");
        event.preventDefault();
        var id = $(this).attr("id");   // id of deptartment
      //  alert("id = " + id);
        console.log("id = " + id);
        var deptname = $(this).attr("name");
        
        // alert("dept = " + deptname);
        $.ajax({
            type: 'GET',
            url: "/Dept/Detail/",
            datatype: 'json',
            success: function (data) {
               // alert("success");
                console.log("success" + "data = " + data);
                // window.location.href="../Dept/Details";
                tr = $("<tr></tr>");
                tr.append("<h2 style='color:blue' align ='center'> Details of " + deptname + " </h2>");
                $("#detailtable").append(tr);
                tr = $("<tr></tr>");
                tr.append("<a href = '/Dept/Index'> Back </td>");
                $("#detailtable").append(tr);
                tr = $("<tr class = 'header'></tr>");
                tr.append("<th>Name</th><th>Designation</th><th>Emailid</th><th>Contactno</th>");
                $("#detailtable").append(tr);

                $.each(JSON.parse(data), function (key, value) {
                    //  alert("inside each");
                    //console.log(key + ": " + value);
                    //  alert(id +" " +value.DeptID + "key  " + key.DeptID );
                    var tr;
                    var div;
                    if (id == (value.DeptID)) {
                        flag = true;
                        //  alert("flag = " + flag);
                        //alert("value of deptid"+value.DeptID +" id of selection = "+id);

                      //  $("#datanotfound").remove();
                        tr = $("<tr></tr>");
                        tr.append("<td>" + value.Name + "</td><td>"
                                         + value.Designation + "</td><td>"
                                         + value.Emailid + "</td><td>"
                                         + value.ContactNo + "</td><td >");
                        $("#detailtable").append(tr);

                    }
                });
                if (!flag) {
                    // alert("flag = " + flag);
                  //  alert("No data found");
                    //  $("#datafound").remove();
                    $(".divdetail").hide();
                    $(".divnodata").show();
                    tr = $("<tr></tr>");
                    tr.append("<h2 style='color:blue'> Details of " + deptname + " </h2>");
                    $("#Nodatatable").append(tr);
                   tr = $("<tr></tr>");
                    tr.append("<td> No data found </td>");
                    $("#Nodatatable").append(tr);

                };

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

})