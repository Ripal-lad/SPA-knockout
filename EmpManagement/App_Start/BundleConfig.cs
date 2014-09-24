using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;

namespace EmpManagement.App_Start
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new Bundle("~/bundles/app-script")
            .Include("~/angularApp/app.js")

              // Modules/Components
              .Include("~/angularApp/admins/*.js")
              .Include("~/angularApp/home/*.js")
              .Include("~/angularApp/pages/*.js")
    );
        }
    }
}