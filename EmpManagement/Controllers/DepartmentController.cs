using EmpManagement.DAL;
using EmpManagement.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using System.Threading;

namespace EmpManagement.Controllers
{
    public class DepartmentController : Controller
    {
        private EmpContext db = new EmpContext();
       
        // display the home page of the department
        //public ActionResult Index()
        //{
        //    //Thread.Sleep(2000);
        //    var department = from m in db.Department
        //                     select m;

        //    return View(department);
        //}

        // to get the detail of the department.
        [HttpGet]
        public JsonResult GetDepartment()
        {
            //Thread.Sleep(2000);
            var department = from m in db.Department
                             select m;

            var serializedata = JsonConvert.SerializeObject(department);
            return Json(serializedata, JsonRequestBehavior.AllowGet);
        }

        //public ActionResult Details()
        //{
        //    // Thread.Sleep(2000);
        //    return View();
        //}

        //get data for dept details.
        [HttpGet]
        public JsonResult GetEmployee()
        {
            //Thread.Sleep(2000);
            var EmployeeList = from m in db.Employee
                             select m;
            var serializedata = JsonConvert.SerializeObject(EmployeeList);
            return Json(serializedata, JsonRequestBehavior.AllowGet);
        }

        //If dept table is empty.
        [HttpGet]
        public JsonResult NoDepartmentFound()
        {
            //Thread.Sleep(2000);
            var DepartmentList = db.Department.ToList();
            if (DepartmentList.Count == 0)
            {
                return Json("Nodatafound", JsonRequestBehavior.AllowGet);
            }
            var serializedata = JsonConvert.SerializeObject(DepartmentList);
            return Json(serializedata, JsonRequestBehavior.AllowGet);
        }

        //Create
        //public ActionResult Create()
        //{
        //    // Thread.Sleep(2000);
        //    return View();
        //}

        // Post Empmanagement/Ecreate
        [HttpPost]
        public JsonResult Create(Department department)
        {
            // Thread.Sleep(2000);
            db.Department.Add(department);
            db.SaveChanges();

            return Json(department, JsonRequestBehavior.AllowGet);
        }

        //public ActionResult DeptAlreadyExist()
        //{
        //    // Thread.Sleep(2000);
        //    return View();
        //}

        //public ActionResult Edit()
        //{
        //    //Thread.Sleep(2000);
        //    return View();
        //}


        // It will Update data in entitty.
        [HttpPost]
      //  [ValidateAntiForgeryToken]
        public JsonResult Edit(Department department)
        {
            //Thread.Sleep(2000);
                db.Entry(department).State = EntityState.Modified;
                db.SaveChanges();

                return Json(department, JsonRequestBehavior.AllowGet);
            
        }

          
        // Display details of the Employee
        [HttpGet]
        public JsonResult LoadEmployee(int id)
        {
            //Thread.Sleep(2000);
            var EmployeeList = db.Employee.ToList();
            for (int i = 0; i < EmployeeList.Count; i++) // It will Check wheather employees exist in respective department
            {
                if (EmployeeList[i].DepartmentID == id)
                {
                    var empdetails = from e in db.Employee
                                     where e.DepartmentID == id
                                     select e;
                    var serializedata = JsonConvert.SerializeObject(empdetails);
                    return Json(serializedata, JsonRequestBehavior.AllowGet);
                 }
            }
            return Json("Nodatafound", JsonRequestBehavior.AllowGet);
        }

        //public ActionResult NoDataFound()
        //{
        //    //Thread.Sleep(2000);
        //    return View();
        //}

        //Delete
        //[HttpDelete]
        [HttpPost]
        public JsonResult Delete(int id)
        {
           // Thread.Sleep(2000);
            var department = db.Department.Find(id);
            db.Department.Remove(department);
            db.SaveChanges();
            var serializedata = JsonConvert.SerializeObject(department);
            return Json(serializedata, JsonRequestBehavior.AllowGet);
         }
       

    }
}