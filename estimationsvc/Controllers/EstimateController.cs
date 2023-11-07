using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
namespace estimatesvc.Controllers;

[ApiController]
[Route("/")]
public class EstimateController : ControllerBase
{
    private static readonly string[] Summaries = new[]
    {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

    // private readonly ILogger<EstimateController> _logger;

    // public EstimateController(ILogger<EstimateController> logger)
    // {
    //     _logger = logger;
    // }

    // [HttpGet(Name = "GetEstimate")]
    // public IEnumerable<Estimate> Get()
    // {
    //     return Enumerable.Range(1, 5).Select(index => new Estimate
    //     {
    //         Date = DateTime.Now.AddDays(index),
    //         TemperatureC = Random.Shared.Next(-20, 55),
    //         Summary = Summaries[Random.Shared.Next(Summaries.Length)]
    //     })
    //     .ToArray();
    // }
    [HttpGet(Name = "ProcessEstimate")]
    public IResult Get(Estimate estimate)
    {
        var PolicyCost = new Estimate { PolicyEstimate = 5 };
        return (IResult)PolicyCost;
    }
}

// Call Another Api
// ControllerPublic async Task PostRequestAsync()
//     {
//         using (var client = new HttpClient())
//         {
//             client.BaseAddress = new Uri("http://localhost:6740");

//             var content = new FormUrlEncodedContent(new[]
//             {
//                 new KeyValuePair<string, string>("", "login")
//             });

//             var result = await client.PostAsync("/api/Membership/exists", content);

//             string resultContent = await result.Content.ReadAsStringAsync();

//             Console.WriteLine(resultContent);
//         }
//     }
//                 [HttpGet]
//             public async Task<HttpResponseMessage> GetRequestAsync(HttpRequestMessage Query)
//             {                   
//                 try
//                 {
//                     using (HttpClient client = new HttpClient())
//                     {                                                          
//                         HttpResponseMessage response = await client.GetAsync("http://localhost:8080/document/quicksearch/"+ Query.RequestUri.Query);

//                         if (response.IsSuccessStatusCode)
//                         {
//                             Console.Write("Success");
//                         }
//                         else
//                         {
//                             Console.Write("Failure");
//                         }

//                         return response;
//                     }
//                 }
//                 catch (Exception e)
//                 {        
//                     throw e;
//                 }
//             }