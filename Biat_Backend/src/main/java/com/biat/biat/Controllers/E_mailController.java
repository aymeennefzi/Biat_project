//package com.biat.biat.Controllers;
//
//import com.biat.biat.Services.ServiceImpl.SendEmailServiceImp;
//import lombok.RequiredArgsConstructor;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@CrossOrigin("*")
//@RequiredArgsConstructor
//public class E_mailController {
//
//    private final SendEmailServiceImp sendEmailServiceImp;
//
//@GetMapping("sendEmail")
//    public String sendEmail(){
//    sendEmailServiceImp.sendEmail("slouma4ghodbeny@gmail.com","test body","text subject");
//    return "Send successfully";
//}
//
//}
package com.biat.biat.Controllers;

import com.biat.biat.Services.ServiceImpl.SendEmailServiceImp;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
public class E_mailController {

    private final SendEmailServiceImp sendEmailServiceImp;

    @GetMapping("sendEmail")
    public String sendEmail(@RequestParam String recipient,
                            @RequestParam String body,
                            @RequestParam String subject) {
        sendEmailServiceImp.sendEmail(recipient, body, subject);
        return "Send successfully";
    }
}
