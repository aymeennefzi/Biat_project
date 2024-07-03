package com.biat.biat.Repository;

import com.biat.biat.Entites.Client;
import com.biat.biat.Entites.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface IClientRepository extends JpaRepository<Client,Long> {
    @Query("SELECT c.compte.agent, c.compte.agence FROM Client c WHERE c.id = :clientId")
    Optional<Object[]> findAgentAndAgenceByClientId(@Param("clientId") Long clientId);

    Client findByEmail(String email);

}
