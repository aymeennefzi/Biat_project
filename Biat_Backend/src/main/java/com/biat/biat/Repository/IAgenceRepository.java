package com.biat.biat.Repository;

import com.biat.biat.Entites.Agence;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IAgenceRepository extends JpaRepository <Agence,Long> {
    Agence findByAgentList_Id(Long agentId);

}
