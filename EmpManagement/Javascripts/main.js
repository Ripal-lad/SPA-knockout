
requirejs.config({
    baseUrl: '/Javascripts',
    paths: {
        knockout: "knockout-3.2.0",
        jquery: "jquery-1.10.2.min",
        sammy:"Sammy",
        EmployeeRequire: "EmpRequire",
      //  text: "require-text",
        }
});


requirejs(['jquery','knockout','sammy','EmployeeRequire'],
 function ($,ko,sammy,appViewModel) {
    alert("Hello");
    ko.applyBindings(new appViewModel());
});

