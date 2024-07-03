package com.biat.biat;

import com.biat.biat.Entites.Admin;
import com.biat.biat.Entites.Role;
import com.biat.biat.Entites.User;
import com.biat.biat.Repository.IAdminRepository;
import com.biat.biat.Repository.IUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication


@EnableAspectJAutoProxy
@RequiredArgsConstructor
@ComponentScan(basePackages={"com.biat.biat" ,"com.biat.biat.CorsCongiguration"})
public class BiatApplication implements CommandLineRunner {
    private final IUserRepository userRepository;
    private final IAdminRepository adminRepository;
    public static void main(String[] args) {
        SpringApplication.run(BiatApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        User adminAccount = userRepository.findByRole(Role.ADMIN);
        if (adminAccount == null) {
            Admin admin = new Admin();
            admin.setEmail("admin@gmail.com");
            admin.setNom("admin");
            admin.setPrenom("admin");
            admin.setRole(Role.ADMIN);
            admin.setPassword(new BCryptPasswordEncoder().encode("admin"));
            adminRepository.save(admin);
        }
    }
}
