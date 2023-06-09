package cyou.wysiwyg.demo.controller;

import cyou.wysiwyg.demo.entity.Demo;
import cyou.wysiwyg.demo.service.DemoService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
@AllArgsConstructor
public class TINYMCEController {
    private final DemoService demoService;

    @GetMapping("/tinymce")
    public String tinymce() {
        return "tinymce";
    }

    @PostMapping("/rich_text_editor")
    public String save(@ModelAttribute Demo demo) {
        System.out.println(demo.getDescription());
        demoService.save(demo);
        return "rich_text_editor";
    }

    @GetMapping("/findAll")
    public String findAll(Model model) {
        model.addAttribute("demos", demoService.findAll());
        return "view";
    }
}
