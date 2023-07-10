using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookAMechanicc.Models
{
    public class tbl_order
    {
        public tbl_order()
        {
            this.tbl_cancel = new HashSet<tbl_cancel>();
            this.tbl_completed = new HashSet<tbl_completed>();
        }
        [Key]
        public int id { get; set; }

        [ForeignKey("tbl_customer")]
        public int customer_id { get; set; }

        [ForeignKey("tbl_mechanic")]
        public int mechanic_id { get; set; }
        public System.DateTime order_date { get; set; }
        public string service { get; set; }
        public Nullable<decimal> order_price { get; set; }
        public string status { get; set; }

        public virtual ICollection<tbl_cancel> tbl_cancel { get; set; }
        public virtual ICollection<tbl_completed> tbl_completed { get; set; }
        public virtual tbl_customer tbl_customer { get; set; }
        public virtual tbl_mechanic tbl_mechanic { get; set; }
    }
}
