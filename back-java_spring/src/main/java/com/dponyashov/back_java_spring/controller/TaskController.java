package com.dponyashov.back_java_spring.controller;

import com.dponyashov.back_java_spring.dto.tasks.TaskDto;
import com.dponyashov.back_java_spring.dto.tasks.TaskNewDto;
import com.dponyashov.back_java_spring.dto.user.UserDto;
import com.dponyashov.back_java_spring.services.TaskService;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Objects;

@RestController
@AllArgsConstructor
@Log4j2
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;

    // Этот метод выполнится ПЕРЕД любым другим методом в этом контроллере
    @ModelAttribute("currentUser")
    public UserDto populateUser(@RequestAttribute("currentUser") UserDto user) {

        log.info("ModelAttribute user.Id: {}", user.getId());
        // Извлекает атрибут "currentUser", который был добавлен, например, в Фильтре или Перехватчике
        return user;
    }

    @GetMapping
    public ResponseEntity<Collection<TaskDto>> findAll(@RequestAttribute("currentUser") UserDto currentUser){
        log.info("TaskController.findAll");
        log.info("currentUser {}", currentUser);
//            return ResponseEntity.ok().body(taskService.findAll());
        return ResponseEntity.ok().body(taskService.findByUserId(currentUser.getId()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskDto> findById(@RequestAttribute("currentUser") UserDto currentUser,
                                            @PathVariable("id") Long id){
        log.info("TaskController.findById");
        log.info("currentUser {}", currentUser.toString());

        var savedTask = taskService.findById(id);

        if (Objects.equals(savedTask.getUserId(), currentUser.getId())){
            throw  new RuntimeException("Пользователь не соответствуется таске!");
        }

        return ResponseEntity.ok().body(savedTask);
    }

    @PostMapping
    public ResponseEntity<TaskDto> createTask(@RequestAttribute("currentUser") UserDto currentUser,
                                              @RequestBody TaskNewDto taskNewDto){
        log.info("TaskController.createTask");
        log.info("currentUser {}", currentUser.toString());

        log.info(currentUser.toString());

        TaskDto newTask = TaskDto.builder()
//                .id(0L)
                .text(taskNewDto.getText())
                .userId(currentUser.getId())
                .completed(taskNewDto.isCompleted())
                .build();

        return ResponseEntity.ok().body(taskService.save(newTask));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskDto> changeTask(@PathVariable("id") Long id,
                                              @RequestAttribute("currentUser") UserDto currentUser,
                                              @RequestBody TaskNewDto taskNewDto){
        log.info("TaskController.changeTask");

        log.info("currentUser {}", currentUser.toString());

        var savedTask = taskService.findById(id);

        TaskDto newTask = TaskDto.builder()
                .id(id)
                .text(taskNewDto.getText())
                .userId(savedTask.getUserId())
                .completed(taskNewDto.isCompleted())
                .build();

        return ResponseEntity.ok().body(taskService.save(newTask));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable("id") Long id,
                                        @RequestAttribute("currentUser") UserDto currentUser){
        log.info("TaskController.deleteTask");
        log.info("currentUser {}", currentUser.toString());

        taskService.findById(id);

        taskService.delete(id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
