using System.ComponentModel.DataAnnotations;

namespace BookAMechanicc.Models
{
    public class tbl_customer
    {
        public tbl_customer()
        {
            this.tbl_completed = new HashSet<tbl_completed>();
            this.tbl_order = new HashSet<tbl_order>();
        }

        [Key]
        public int id { get; set; }
        public string firstname { get; set; }
        public string lastname { get; set; }
        public string address { get; set; }
        public string contact { get; set; }
        public string username { get; set; }
        public string password { get; set; }
        public bool isOnline { get; set; }
        public bool isBooked { get; set; }
        public Nullable<decimal> avg_rating { get; set; }

        public virtual ICollection<tbl_completed> tbl_completed { get; set; }
        public virtual ICollection<tbl_order> tbl_order { get; set; }
    }
}
