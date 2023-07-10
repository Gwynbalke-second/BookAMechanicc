using BookAMechanicc.Data;
using BookAMechanicc.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;

namespace BookAMechanicc.Controllers
{
    public class LoginController : Controller
    {
        private readonly ApplicationDbContext db;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public LoginController(ApplicationDbContext context, IHttpContextAccessor httpContextAccessor)
        {
            db = context;
            _httpContextAccessor = httpContextAccessor;
        }

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Login()
        {
            var httpContext = _httpContextAccessor.HttpContext;
            if (httpContext.Session.GetString("Error") != null)
            {
                ViewBag.error = httpContext.Session.GetString("Error");
                httpContext.Session.Remove("Error");
            }

            if (httpContext.Session.GetString("UserNotValid") != null)
            {
                ViewBag.error = httpContext.Session.GetString("UserNotValid");
                httpContext.Session.Remove("UserNotValid");
            }

            if (httpContext.Session.GetString("pass") != null)
            {
                ViewBag.error = "Password Changed Successfully :)";
                httpContext.Session.Remove("pass");
            }

            ViewBag.feedback = TempData["Feedback"] as string;
            return View();
        }


        [HttpPost]
        public ActionResult Login(string username, string password, string role)
        {
            var httpContext = _httpContextAccessor.HttpContext;

            if (role == "admin")
            {               
                    bool isValid = false;

                    var _Employee = db.tbl_admin.FirstOrDefault(x => x.username == username);
                    if (_Employee == null)
                    {
                        //user not found
                        httpContext.Session.SetString("UserNotValid", "Username does not exsist");
                        return RedirectToAction("Login", "Login");
                    }
                    else
                    {
                        isValid = _Employee.password == password;
                    }

                    if (!isValid)
                    {
                        httpContext.Session.SetString("UserNotValid", " Invalid Username or Password.");
                        return RedirectToAction("Login", "Login");
                    }
                
                httpContext.Session.SetString("User",_Employee.username);
                httpContext.Session.SetString("isCust", false.ToString());
                httpContext.Session.SetString("isAdmin", true.ToString());
                httpContext.Session.SetString("isMech", false.ToString());


                if (isValid)
                    {
                        httpContext.Session.SetString("UserName", _Employee.username);
                        return RedirectToAction("Index", "Home");
                    }
                
            }
            else if (role == "customer")
            {                
                    bool isValid = false;

                    var _Employee = db.tbl_customer.FirstOrDefault(x => x.username == username);
                    if (_Employee == null)
                    {
                    //user not found 
                    httpContext.Session.SetString("UserNotValid", " User Does Not Exists.");
                    return RedirectToAction("Login", "Login");
                    }
                    else
                    {
                        isValid = _Employee.password == password;
                    }

                    if (!isValid)
                    {
                    httpContext.Session.SetString("UserNotValid", " Invalid Username or Password.");
                    return RedirectToAction("Login", "Login");
                    }

                httpContext.Session.SetString("User", _Employee.username);
                httpContext.Session.SetInt32("id", _Employee.id);
                httpContext.Session.SetString("last", _Employee.firstname);
                httpContext.Session.SetString("first", _Employee.lastname);
                httpContext.Session.SetString("isCust", true.ToString());
                httpContext.Session.SetString("isAdmin", false.ToString());
                httpContext.Session.SetString("isMech", false.ToString());

                if (isValid)
                    {
                    httpContext.Session.SetString("UserName", _Employee.username);
                    
                        return RedirectToAction("CustomerIndex", "Home");
                    }
                
            }
            else if (role == "mechanic")
            {               
                    bool isValid = false;

                    var _Employee = db.tbl_mechanic.FirstOrDefault(x => x.username == username);
                    if (_Employee == null)
                    {
                    //user not found 
                    httpContext.Session.SetString("UserNotValid", " User Does Not Exists.");
                    return RedirectToAction("Login", "Login");
                    }
                    else
                    {
                        isValid = _Employee.password == password;
                    }

                    if (!isValid)
                    {
                    httpContext.Session.SetString("UserNotValid", " Invalid Username or Password.");
                    return RedirectToAction("Login", "Login");
                    }

                httpContext.Session.SetString("User", _Employee.username);
                httpContext.Session.SetInt32("id", _Employee.id);
                httpContext.Session.SetString("last", _Employee.firstname);
                httpContext.Session.SetString("first", _Employee.lastname);
                httpContext.Session.SetString("isCust", false.ToString());
                httpContext.Session.SetString("isAdmin", false.ToString());
                httpContext.Session.SetString("isMech", true.ToString());


                if (isValid)
                    {
                    httpContext.Session.SetString("UserName", _Employee.username);
                   
                        return RedirectToAction("MechanicIndex", "Home");
                    }
                
            }

            return View();

        }

        public ActionResult SignUp()
        {
            return View();
        }
        public ActionResult SignUpCustomer()
        {
            return View();
        }
        public ActionResult SignUpMechanic()
        {
            return View();
        }
        public ActionResult Logout()
        {
            HttpContext.Session.Clear();           
            return RedirectToAction("Login");
        }
        [HttpPost]
        public ActionResult SignUpCustomer(tbl_customer user)
        {
            Boolean isSignedUp = false;
            if (ModelState.IsValid)
            {
                tbl_customer User = new tbl_customer
                {
                    firstname = user.firstname,
                    lastname = user.lastname,
                    address = user.address,
                    contact = user.contact,
                    username = user.username,
                    password = user.password,
                    avg_rating = 0,
                    isOnline = false,
                    isBooked = false
                };
                try
                {
                    db.tbl_customer.Add(User);
                    db.SaveChanges();
                    isSignedUp = true;
                    TempData["Feedback"] = "User Signed Up Successfully!";
                }
                catch (Exception ex)
                {
                    isSignedUp = false;
                    TempData["Feedback"] = "Failed To Sign you Up! Please Try again";
                }
            }
            ModelState.Clear();
            if (isSignedUp)
            {
                return RedirectToAction("Login");
            }
            ViewBag.feedback = TempData["Feedback"] as String;
            ViewBag.signedUp = isSignedUp;
            return View();
        }
        [HttpPost]
        public ActionResult SignUpMechanic(tbl_mechanic user)
        {
            Boolean isSignedUp = false;
            if (ModelState.IsValid)
            {
                tbl_mechanic User = new tbl_mechanic
                {
                    firstname = user.firstname,
                    lastname = user.lastname,
                    garageName = user.garageName,
                    address = user.address,
                    contact = user.contact,
                    username = user.username,
                    password = user.password,
                    avg_rating = 0,
                    isOnline = false,
                    isBooked = false
                };
                try
                {
                    db.tbl_mechanic.Add(User);
                    db.SaveChanges();
                    isSignedUp = true;
                    TempData["Feedback"] = "User Signed Up Successfully!";
                }
                catch (Exception ex)
                {
                    isSignedUp = false;
                    TempData["Feedback"] = "Failed To Sign you Up! Please Try again";
                }
            }
            ModelState.Clear();
            if (isSignedUp)
            {
                return RedirectToAction("Login");
            }
            ViewBag.feedback = TempData["Feedback"] as String;
            ViewBag.signedUp = isSignedUp;
            return View();
        }
    }
}
