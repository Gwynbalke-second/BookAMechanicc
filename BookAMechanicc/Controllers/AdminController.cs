using BookAMechanicc.Data;
using BookAMechanicc.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;

namespace BookAMechanicc.Controllers
{
    public class AdminController : Controller
    {
        private readonly ApplicationDbContext db;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public AdminController(ApplicationDbContext context, IHttpContextAccessor httpContextAccessor)
        {
            db = context;
            _httpContextAccessor = httpContextAccessor;
        }
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult ManageCustomer()
        {
            var httpContext = _httpContextAccessor.HttpContext;
            try
            {
                string isAdmin = httpContext.Session.GetString("isAdmin");
                if (isAdmin != "True")
                {
                    return RedirectToAction("Login", "Login");
                }
            }
            catch (Exception)
            {
                return RedirectToAction("Login", "Login");

            }
            
                List<tbl_customer> AllEmployees = db.tbl_customer.ToList();
                int count = db.tbl_customer.Count();
                ViewBag.count = count;
                return View(AllEmployees);
            
        }

        public ActionResult ManageMechanic()
        {
            var httpContext = _httpContextAccessor.HttpContext;
            try
            {
                string isAdmin = httpContext.Session.GetString("isAdmin");
                if (isAdmin != "True")
                {
                    return RedirectToAction("Login", "Login");
                }
            }
            catch (Exception)
            {
                return RedirectToAction("Login", "Login");

            }
            
                List<tbl_mechanic> AllEmployees = db.tbl_mechanic.ToList();
                int count = db.tbl_mechanic.Count();
                ViewBag.count = count;
                return View(AllEmployees);
            
        }

        public ActionResult AllOrders()
        {
            var httpContext = _httpContextAccessor.HttpContext;
            try
            {
                string isAdmin = httpContext.Session.GetString("isAdmin");
                if (isAdmin != "True")
                {
                    return RedirectToAction("Login", "Login");
                }
            }
            catch (Exception)
            {
                return RedirectToAction("Login", "Login");

            }
            return View(db.tbl_order.Where(x => x.status == "completed" || x.status == "cancelled"));
        }

        public ActionResult ViewDetails(int id)
        {
            var httpContext = _httpContextAccessor.HttpContext;


            var admin = httpContext.Session.GetString("User");

            ViewBag.username = admin;
            tbl_order order = db.tbl_order.Where(x => x.id == id).FirstOrDefault();
            if (order.status.Equals("completed"))
            {
                ViewBag.completed = db.tbl_completed.Where(x => x.order_id == id).FirstOrDefault();
            }
            else
            {
                ViewBag.cancelled = db.tbl_cancel.Where(x => x.order_id == id).FirstOrDefault();
            }
            return View(db.tbl_order.Where(x => x.id == id).FirstOrDefault());
        }


        public ActionResult CurrOrders()
        {
            var httpContext = _httpContextAccessor.HttpContext;
            try
            {
                string isAdmin = httpContext.Session.GetString("isAdmin");
                if (isAdmin != "True")
                {
                    return RedirectToAction("Login", "Login");
                }
            }
            catch (Exception)
            {
                return RedirectToAction("Login", "Login");

            }
            return View();
        }


        ///Delete methods for customers and mechanics
        [HttpPost]
        public ActionResult DeleteCustomer(int id)
        {
            int count = db.tbl_customer.Where(x => x.id == id).Count();
            if (count > 0)
            {
                tbl_customer deletedEmp = db.tbl_customer.Where(x => x.id == id).FirstOrDefault();
                db.tbl_customer.Remove(deletedEmp);
                db.SaveChanges();
                return Json("1");
            }
            return Json("User does not exist");
        }
        [HttpPost]
        public ActionResult DeleteMechanic(int id)
        {
            int count = db.tbl_mechanic.Where(x => x.id == id).Count();
            if (count > 0)
            {
                tbl_mechanic deletedEmp = db.tbl_mechanic.Where(x => x.id == id).FirstOrDefault();
                db.tbl_mechanic.Remove(deletedEmp);
                db.SaveChanges();
                return Json("1");
            }
            return Json("User does not exist");
        }
    }
}
