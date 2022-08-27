namespace OrdersAPI
{
    public class Order
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string CartTotal { get; set; } = string.Empty;
        public int TotalItems { get; set; } = 0;
        public string Status { get; set; } = string.Empty;

    }
}
