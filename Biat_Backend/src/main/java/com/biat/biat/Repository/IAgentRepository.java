package com.biat.biat.Repository;

import com.biat.biat.Entites.Agent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IAgentRepository extends JpaRepository<Agent,Long> {
    List<Agent> findByAgenceId(Long agenceId);
}
