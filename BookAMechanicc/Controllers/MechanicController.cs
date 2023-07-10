using BookAMechanicc.Data;
using BookAMechanicc.Models;
using Microsoft.AspNetCore.Mvc;

namespace BookAMechanicc.Controllers
{
    public class MechanicController : Controller
    {
        private readonly ApplicationDbContext db;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public MechanicController(ApplicationDbContext context, IHttpContextAccessor httpContextAccessor)
        {
            db = context;
            _httpContextAccessor = httpContextAccessor;
        }
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult ManageMechanic()
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
            try
            {
                bool isAdded = (bool)TempData["isAdded"];
                string feedback = (string)TempData["feedback"];
                ViewBag.isAdded = isAdded;
                ViewBag.feedback = feedback;
            }
            catch (Exception)
            {
            }
            int id = (int)httpContext.Session.GetInt32("id");
            tbl_mechanic user = db.tbl_mechanic.Where(x => x.id == id).FirstOrDefault();
            return View(user);
        }
        public ActionResult CurrentOrder()
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
            try
            {
                bool isApproved = (bool)TempData["isApproved"];
                string feeback = TempData["feedback"] as string;
            }
            catch (Exception)
            {


            }
            int id = (int)httpContext.Session.GetInt32("id");
            tbl_mechanic user = db.tbl_mechanic.Where(x => x.id == id).FirstOrDefault();
            List<tbl_order> currOrders = db.tbl_order.Where(x => x.mechanic_id == user.id).ToList();
            return View(currOrders.Where(x => x.status == "pending" || x.status == "ongoing" || x.status == "review").ToList());
        }
        public ActionResult OrderHistory()
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
            List<tbl_order> orders = db.tbl_order.Where(x => x.mechanic_id == user.id).ToList();
            return View(orders.Where(x => x.status == "completed" || x.status == "cancelled"));
        }



        //methods that perform some functionality
        [HttpPost]
        public ActionResult EditMechanic(tbl_mechanic emp)
        {
            var httpContext = _httpContextAccessor.HttpContext;
            tbl_mechanic existingEmployee = db.tbl_mechanic.Find(emp.id);
            bool isAdded = false;
            try
            {
                existingEmployee.firstname = emp.firstname;
                existingEmployee.lastname = emp.lastname;
                existingEmployee.username = emp.username;
                existingEmployee.password = emp.password;
                existingEmployee.garageName = emp.garageName;
                existingEmployee.contact = emp.contact;
                existingEmployee.address = emp.address;
                existingEmployee.isBooked = emp.isBooked;
                existingEmployee.isOnline = emp.isOnline;
                existingEmployee.avg_rating = emp.avg_rating;
                db.SaveChanges();
                TempData["feedback"] = "Record Updated Successfully";
                isAdded = true;
            }
            catch (Exception ex)
            {
                TempData["feedback"] = "Unable to Update Record";
            }
            TempData["isAdded"] = isAdded;
            httpContext.Session.SetInt32("id", existingEmployee.id);
            return RedirectToAction("ManageMechanic");
        }

        public ActionResult Approve(int id)
        {
            var httpContext = _httpContextAccessor.HttpContext;
            bool isApproved = false;
            tbl_order order = db.tbl_order.Where(x => x.id == id).FirstOrDefault();
            int custid = order.customer_id;
            int mechid = order.mechanic_id;
            tbl_customer customer = db.tbl_customer.Where(x => x.id == custid).FirstOrDefault();
            tbl_mechanic mechanic = db.tbl_mechanic.Where(x => x.id == mechid).FirstOrDefault();
            if (customer.isBooked)
            {
                TempData["feedback"] = "Customer is already Booked!";
                TempData["isApproved"] = isApproved;
                return RedirectToAction("CurrentOrder");
            }
            try
            {
                order.status = "ongoing";
                customer.isBooked = true;
                mechanic.isBooked = true;
                db.SaveChanges();
                TempData["feedback"] = "Order Approved successfully";
                isApproved = true;
            }
            catch (Exception ex)
            {
                TempData["feedback"] = "Couldn't approve order! Try Again!";
            }
            TempData["isApproved"] = isApproved;
            return RedirectToAction("CurrentOrder");
        }

        public ActionResult Decline(int id)
        {
            var httpContext = _httpContextAccessor.HttpContext;
            bool isDeclined = false;
            tbl_order order = db.tbl_order.Where(x => x.id == id).FirstOrDefault();
            try
            {
                order.status = "declined";
                db.SaveChanges();
                TempData["feedback"] = "Order Declined";
                isDeclined = true;
            }
            catch (Exception ex)
            {
                TempData["feedback"] = "Couldn't decline order! Try Again!";
            }

            TempData["isApproved"] = isDeclined;
            return RedirectToAction("CurrentOrder");
        }

        public ActionResult CancelOrder(int id)
        {
            var httpContext = _httpContextAccessor.HttpContext;
            bool isDeclined = false;
            tbl_order order = db.tbl_order.Where(x => x.id == id).FirstOrDefault();
            try
            {
                tbl_cancel cancel = new tbl_cancel
                {
                    order_id = order.id,
                    cancelled_by = "mechanic",
                    reason = "No Reason"
                };
                order.status = "cancelled";
                order.tbl_customer.isBooked = false;
                order.tbl_mechanic.isBooked = false;
                order.tbl_cancel.Add(cancel);
                db.SaveChanges();
                isDeclined = true;
            }
            catch (Exception ex)
            {

            }
            return RedirectToAction("CurrentOrder");
        }

        public ActionResult ReviewOrder(int id)
        {

            return View(db.tbl_order.Where(x => x.id == id).FirstOrDefault());
        }

        public ActionResult ViewDetails(int id)
        {
            var httpContext = _httpContextAccessor.HttpContext;
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

        [HttpPost]
        public ActionResult ReviewOrder(int id, string review, string rating)
        {
            var httpContext = _httpContextAccessor.HttpContext;
            //int orderid = (int)Session["orderId"];
            tbl_order order = db.tbl_order.Where(x => x.id == id).FirstOrDefault();
            tbl_completed complete = db.tbl_completed.Where(x => x.order_id == id).FirstOrDefault();
            tbl_customer customer = db.tbl_customer.Where(x => x.id == order.customer_id).FirstOrDefault();
            tbl_mechanic mechanic = db.tbl_mechanic.Where(x => x.id == order.mechanic_id).FirstOrDefault();
            try
            {
                complete.mechanic_review = review;
                complete.mechanic_rating = Convert.ToInt32(rating);
                complete.complete_date = DateTime.Now;
                order.status = "completed";
                customer.isBooked = false;
                mechanic.isBooked = false;
                order.tbl_completed.Add(complete);
                db.SaveChanges();
            }
            catch (Exception ex)
            {

            }
            return RedirectToAction("OrderHistory");
        }
    }
}
