package cyou.wysiwyg.demo.service;

import cyou.wysiwyg.demo.entity.Demo;
import cyou.wysiwyg.demo.repository.DemoRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class DemoService {
    private final DemoRepository demoRepository;

    public void save(Demo demo) {
        demoRepository.save(demo);
    }

    public List<Demo> findAll() {
        return demoRepository.findAll();
    }
}
