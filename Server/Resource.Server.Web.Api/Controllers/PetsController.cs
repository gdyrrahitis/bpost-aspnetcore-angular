namespace Resource.Server.Web.Api.Controllers
{
    using System.Collections.Generic;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class PetsController : ControllerBase
    {
        [HttpGet]
        public ActionResult<IEnumerable<string>> Get() => new [] { "Max", "Charlie", "Molly" };
    }
}
