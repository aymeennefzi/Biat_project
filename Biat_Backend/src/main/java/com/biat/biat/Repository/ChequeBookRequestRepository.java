package com.biat.biat.Repository;

import com.biat.biat.Entites.ChequeBookRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ChequeBookRequestRepository extends JpaRepository<ChequeBookRequest, Long> {
    @Query("SELECT COUNT(c) > 0 FROM ChequeBookRequest c WHERE c.client.id = :clientId AND c.status = 'PENDING'")
    boolean existsActiveRequestByClientId(@Param("clientId") Long clientId);

    ChequeBookRequest findTopByClientIdAndStatusOrderByRefusalDateDesc(Long clientId, String status);
    List<ChequeBookRequest> findAllByClient_Id(Long clientId);
    List<ChequeBookRequest> findAllByAgent_Id(Long agentId);


}
