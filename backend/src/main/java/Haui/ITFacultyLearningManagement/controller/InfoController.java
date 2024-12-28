package Haui.ITFacultyLearningManagement.controller;

import Haui.ITFacultyLearningManagement.custom.data.CustomResponse;
import Haui.ITFacultyLearningManagement.custom.info.InfoResponse;
import Haui.ITFacultyLearningManagement.entities.Lecture;
import Haui.ITFacultyLearningManagement.entities.Student;
import Haui.ITFacultyLearningManagement.security.service.UserDetailsImpl;
import Haui.ITFacultyLearningManagement.service.LectureService;
import Haui.ITFacultyLearningManagement.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/info")
public class InfoController {
    @Autowired
    private StudentService studentService;

    @Autowired
    private LectureService lectureService;

    @GetMapping("/get")
    public ResponseEntity<?> getInfo(){
        try{
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

            InfoResponse infoResponse = new InfoResponse();

            Optional<Student> studentOptional = studentService.findByAccountId(userDetails.getId());
            if (studentOptional.isPresent()){
                infoResponse.setFullName(studentService.getFullNameById(studentOptional.get().getStudentId()));
                infoResponse.setRoleName("Sinh viên");
            }

            Optional<Lecture> lectureOptional = lectureService.findByAccountId(userDetails.getId());
            if (lectureOptional.isPresent()){
                infoResponse.setFullName(lectureService.getFullNameById(lectureOptional.get().getLectureId()));
                infoResponse.setRoleName("Giảng viên");
            }
            return ResponseEntity.ok(new CustomResponse<>(1, infoResponse, "Success create classroom"));
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest().body(new CustomResponse<>(0, null, e.getMessage()));
        }
    }
}
