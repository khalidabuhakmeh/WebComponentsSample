using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace WebComponentsSample.Pages;

[IgnoreAntiforgeryToken]
public class IndexModel(ILogger<IndexModel> logger) : PageModel
{
    public void OnGet()
    {
    }

    public IActionResult OnPostCount(int count)
    {
        return Content($"{++count}");
    }
}