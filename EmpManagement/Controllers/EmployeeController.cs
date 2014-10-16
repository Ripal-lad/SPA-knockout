
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;
using EmpManagement.DAL;
using EmpManagement.Models;
using System.Net;
using System.Data.Entity;
using System.Runtime.Serialization;
using Newtonsoft.Json;

namespace EmpManagement.Controllers
{
    public class EmployeeController : Controller
    {
        private EmpContext db = new EmpContext();
      
        //Home page of the Employee
        //public ActionResult Index()
        //{
        //    Thread.Sleep(2000);
        //    return View();

        //}
        [HttpGet]
        //Display all data from database.
        public JsonResult LoadEmployee()
        {
            var employeeList = db.Employee.ToList();
            if (employeeList.Count == 0)
                {
                    return Json("Nodatafound", JsonRequestBehavior.AllowGet);
                }

            var serializedata = JsonConvert.SerializeObject(employeeList);
           // Thread.Sleep(2000);
                return Json(serializedata, JsonRequestBehavior.AllowGet);
        }

        // Create
       //Redirect to the create view.
        //public ActionResult Create()
        //{   
        //    Thread.Sleep(2000);
        //    return View();
        // }

        // Add  new employee details in database
        [HttpPost]
        public JsonResult Create(Employee employee)
        {
         
            db.Employee.Add(employee);
            db.SaveChanges();

          //  Thread.Sleep(2000);
            return Json(employee, JsonRequestBehavior.AllowGet);
        }

       
      //  Get department for dropdownlist
        [HttpGet]
        public JsonResult GetDepartment()
        {
            var DeptList = db.Department.ToList();
            if (DeptList.Count == 0)
            {
                return Json("NoDataFound", JsonRequestBehavior.AllowGet);
            }
            var serializedata = JsonConvert.SerializeObject(DeptList);
          // Thread.Sleep(2000);
            return Json(serializedata, JsonRequestBehavior.AllowGet);

        }
        // If there is no department in dept table.
        //public ActionResult DeptNotAvailable()
        //{
        //    Thread.Sleep(2000);
        //    return View();
        //}

        //public ActionResult Details()
        //{
        //    Thread.Sleep(2000);
        //    return View();
        //}
        [HttpGet]
        public JsonResult Detail()
        {
            
            var EmployeeDetails = from m in db.Employee
                             select m;
            var serializedata = JsonConvert.SerializeObject(EmployeeDetails);
           //Thread.Sleep(10000);
            return Json(serializedata, JsonRequestBehavior.AllowGet);
        }

      
        //Edit
        // Redirect to the Edit page
        [HttpGet]
        public JsonResult GetEmployee(int id)
        {
            var Employeedata = db.Employee.Find(id);
            var serializedata = JsonConvert.SerializeObject(Employeedata);
           //Thread.Sleep(2000);
            return Json(serializedata, JsonRequestBehavior.AllowGet);
          
        }
        //public ActionResult Edit()
        //{
        //    Thread.Sleep(2000);
        //     return View();
        //}

        // It will update data in entitty.
        [HttpPost]
        public JsonResult Edit(Employee employee)
        {
            
            db.Entry(employee).State = EntityState.Modified;
            db.SaveChanges();
          // Thread.Sleep(2000);
            return Json(employee, JsonRequestBehavior.AllowGet);
        }
        //Delete
        [HttpPost]
        public JsonResult Delete(int id)
        {
          
            var Employeedata = db.Employee.Find(id);
            db.Employee.Remove(Employeedata);
            db.SaveChanges();

            var serializedata = JsonConvert.SerializeObject(Employeedata);
           // Thread.Sleep(2000);
            return Json(serializedata, JsonRequestBehavior.AllowGet);
           
        }
    
    }
}
