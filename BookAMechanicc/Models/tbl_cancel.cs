using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookAMechanicc.Models
{
    public class tbl_cancel
    {
        [Key]
        public int id { get; set; }

        [ForeignKey("tbl_order")]
        public int order_id { get; set; }
        public string cancelled_by { get; set; }
        public string reason { get; set; }

        public virtual tbl_order tbl_order { get; set; }
    }
}
