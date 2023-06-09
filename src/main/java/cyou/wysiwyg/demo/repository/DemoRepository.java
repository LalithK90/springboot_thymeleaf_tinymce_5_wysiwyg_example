package cyou.wysiwyg.demo.repository;

import cyou.wysiwyg.demo.entity.Demo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DemoRepository extends JpaRepository<Demo, Long> {
}
