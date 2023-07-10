using BookAMechanicc.Data;
using BookAMechanicc.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace BookAMechanicc.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly ApplicationDbContext db;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public HomeController(ILogger<HomeController> logger, ApplicationDbContext context, IHttpContextAccessor httpContextAccessor)
        {
            db = context;
            _httpContextAccessor = httpContextAccessor;
            _logger = logger;
        }
      

        public ActionResult Index()
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
            string username = httpContext.Session.GetString("UserName");
            tbl_admin user = db.tbl_admin.Where(x => x.username == username).FirstOrDefault();
            ViewBag.user = user;
            return View();
        }
        public ActionResult CustomerIndex()
        {
            var httpContext = _httpContextAccessor.HttpContext;
            try
            {
                string isCust = httpContext.Session.GetString("isCust");
                if (isCust != "True")
                {
                    return RedirectToAction("Login", "Login");
                }
            }
            catch (Exception)
            {
                return RedirectToAction("Login", "Login");

            }
            int id = (int)httpContext.Session.GetInt32("id");
            tbl_customer user = db.tbl_customer.Where(x => x.id == id).FirstOrDefault();
            ViewBag.user = user;
            return View();
        }
        public ActionResult MechanicIndex()
        {
            var httpContext = _httpContextAccessor.HttpContext;
            try
            {
                string isMech = httpContext.Session.GetString("isMech");
                if (isMech != "True")
                {
                    return RedirectToAction("Login", "Login");
                }
            }
            catch (Exception)
            {
                return RedirectToAction("Login", "Login");
            }
            int id = (int)httpContext.Session.GetInt32("id");
            tbl_mechanic user = db.tbl_mechanic.Where(x => x.id == id).FirstOrDefault();
            ViewBag.user = user;
            return View();
        }

    }
}