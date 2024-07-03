package com.biat.biat.Repository;

import com.biat.biat.Entites.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IAdminRepository extends JpaRepository<Admin,Long> {
}
