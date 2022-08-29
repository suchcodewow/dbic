using Microsoft.AspNetCore.Mvc;

namespace OrdersAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly DataContext _context;

        public OrderController(DataContext context)
        {
            _context = context;
        }

        [Route("api/[controller]/myOrders")]
        [HttpGet]
        public async Task<ActionResult<List<Order>>> GetbyUser(Order request)
            {
            var myOrders = await _context.Orders.Where(s => s.Name == request.Name).ToListAsync();
            return Ok(myOrders);
        }

        [HttpGet]
        public async Task<ActionResult<List<Order>>> Get()
        {

            return Ok(await _context.Orders.ToListAsync());
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> Get(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
                return BadRequest("Order not found.");
            return Ok(order);
        }
        [HttpPost]
        public async Task<ActionResult<List<Order>>> AddOrder(Order order)
        {
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();
            return Ok(await _context.Orders.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult<List<Order>>> UpdateOrder(Order request)
        {
            var order = await _context.Orders.FindAsync(request.Id);
            if (order == null)
                return BadRequest("Order not found.");

            order.Name = request.Name;
            order.Status = request.Status;
            order.CartTotal = request.CartTotal;
            order.TotalItems = request.TotalItems;

            await _context.SaveChangesAsync();
            return Ok(await _context.Orders.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Order>>> Delete(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
                return BadRequest("Order not found.");

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return Ok(await _context.Orders.ToListAsync());
        }
    }
}
