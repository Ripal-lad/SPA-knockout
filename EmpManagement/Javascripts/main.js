
requirejs.config({
    baseUrl: '/Javascripts',
    paths: {
        jquery: "jquery-1.10.2.min",
      //  jquery: "jquery-1.10.2",
        jqueryTmpl: "jquery.tmpl",
        knockout: "knockout-3.2.0",
        sammy:"Sammy",
        EmployeeRequire: "EmpRequire",
        demo: "EmpTemplate",
        employeelist: "EmployeeList",
     
     //    text: "text",
        }
});


requirejs(['jquery', 'jqueryTmpl', 'knockout', 'sammy', 'demo'],
 function ($,JT,ko,sammy,appViewModel) {     
     ko.applyBindings(new appViewModel());
 });




//   var viewModel = {
//    views: ko.observableArray([
//        new View("one", "oneTmpl", subModelA),
//        new View("two", "twoTmpl", subModelB)
//        ]),
//    selectedView: ko.observable()    
//};

//ko.applyBindings(viewModel);
    //appViewModel = {
    //    Emp: new EmployeeViewModel(),
    //}
   



