using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Json.Net;
namespace estimatesvc.Controllers;

[ApiController]
[Route("/")]
public class EstimateController : ControllerBase
{
    private readonly ILogger<EstimateController> _logger;

    public EstimateController(ILogger<EstimateController> logger)
    {
        _logger = logger;
    }

    [HttpGet(Name = "healthcheck")]
    public ActionResult Get()
    {
        var webAppName = Environment.GetEnvironmentVariable("APPSETTING_WEBSITE_SITE_NAME");
        if (webAppName == null)
        {
            webAppName = "local";
        }
        var response = new { Status = "ready", appname = webAppName };
        return Ok(response);
    }

    [HttpPost(Name = "ProcessEstimate")]
    public ActionResult<Estimate> ProcessEstimate(Estimate estimate)
    {
        var PolicyCost = estimate;
        var EstimateBuilder = estimate.ItemValue;
        EstimateBuilder = (EstimateBuilder * (decimal).03);
        // CreateYear policies
        if (PolicyCost.CreateYear < 1500)
        {
            EstimateBuilder = EstimateBuilder + 500;
            PolicyCost.Messages = PolicyCost.Messages + ";estimation svc (CreateYear): antique item fee +$500";
        }
        if (PolicyCost.CreateYear > 1900)
        {
            EstimateBuilder = EstimateBuilder * (decimal).9;
            PolicyCost.Messages = PolicyCost.Messages + ";estimation svc (CreateYear): new item -10% discount";
        }
        // Insurance type policies
        if (PolicyCost.InsuranceType == "Object becomes self-aware or develops aspirations of world domination")
        {
            EstimateBuilder = EstimateBuilder * (decimal)1.3;
            PolicyCost.Messages = PolicyCost.Messages + ";estimation svc (Insurance Type): Self-Awareness World Domination Rider required + 30%";
        }
        // Value policies
        if (PolicyCost.ItemValue > 150000)
        {
            EstimateBuilder = EstimateBuilder + 10000;
            PolicyCost.Messages = PolicyCost.Messages + ";estimation svc (ItemValue): Expensive Product fee +$10,000";
        }
        // Other insurer policies
        if (PolicyCost.PreviousInsurer == "Infinity Eye")
        {
            if (PolicyCost.ItemValue > 850000)
            {
                PolicyCost.Messages = PolicyCost.Messages + ";estimation svc (PreviousInsurer): Infinity Eye special pricing & itemvalue > $850,000 [TODO: ADD HIGH VALUE PRICE TABLE- DEFAULT TO $1 FOR NOW. WILL FIX TOMORROW. OO! A SQURREL!]";
                EstimateBuilder = 1;
            }
            if (PolicyCost.ItemValue < 850000)
            {
                PolicyCost.Messages = PolicyCost.Messages + ";estimation svc (PreviousInsurer): Infinity Eye special pricing & itemvalue < $850,000 -18% discount";
                EstimateBuilder = EstimateBuilder * (decimal).82;
            }
        }
        PolicyCost.PolicyEstimate = Math.Round((decimal)EstimateBuilder, 2);
        PolicyCost.Status = "quoted";
        string text = JsonNet.Serialize(PolicyCost);
        _logger.LogInformation(text);
        return Ok(PolicyCost);
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