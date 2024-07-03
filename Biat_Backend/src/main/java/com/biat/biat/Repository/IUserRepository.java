package com.biat.biat.Repository;

import com.biat.biat.Entites.Role;
import com.biat.biat.Entites.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IUserRepository extends JpaRepository<User,Long> {
    Optional<User> findByEmail(String email);
    User findByRole(Role role);
    Optional<User> findByPasswordResetToken(String passwordResetToken);


}
