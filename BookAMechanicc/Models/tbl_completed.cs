using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookAMechanicc.Models
{
    public class tbl_completed
    {
        [Key]
        public int id { get; set; }
        [ForeignKey("tbl_order")]
        public int order_id { get; set; }
        public string customer_review { get; set; }
        public string mechanic_review { get; set; }
        public int client_rating { get; set; }
        public int mechanic_rating { get; set; }
        public System.DateTime complete_date { get; set; }
        [ForeignKey("tbl_customer")]
        public int client_id { get; set; }

        [ForeignKey("tbl_mechanic")]
        public int mechanic_id { get; set; }

        public virtual tbl_customer tbl_customer { get; set; }
        public virtual tbl_mechanic tbl_mechanic { get; set; }
        public virtual tbl_order tbl_order { get; set; }
    }
}
