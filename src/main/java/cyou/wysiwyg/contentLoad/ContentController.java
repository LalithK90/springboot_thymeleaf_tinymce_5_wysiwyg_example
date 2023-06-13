package cyou.wysiwyg.contentLoad;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Arrays;
import java.util.List;

@Controller
public class ContentController {

    // ...

    @GetMapping("/your-endpoint-url")
    public String getAdditionalContent(@RequestParam("page") int page, Model model) {
        // Simulating additional content retrieval based on the page number
        List<String> additionalContent = retrieveAdditionalContent(page);

        model.addAttribute("additionalContent", additionalContent);

        // Return the name of the Thymeleaf template fragment
        return "additional-content";
    }

    private List<String> retrieveAdditionalContent(int page) {
        // Implement the logic to retrieve the additional content based on the page number
        // This could involve querying a database, making an API call, etc.
        // Return the appropriate content as a List<String>
        // Example: return contentService.getAdditionalContent(page);
        return Arrays.asList("Content " + ((page - 1) * 10 + 1), "Content " + ((page - 1) * 10 + 2), "Content " + ((page - 1) * 10 + 3));
    }

    // ...
}

