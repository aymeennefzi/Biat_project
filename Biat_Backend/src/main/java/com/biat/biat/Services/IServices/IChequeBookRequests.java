package com.biat.biat.Services.IServices;
import com.biat.biat.Entites.ChequeBookRequest;

import java.util.List;


public interface IChequeBookRequests {
    ChequeBookRequest createChequeBookRequest(ChequeBookRequest request);
    ChequeBookRequest approveChequeBookRequest(Long requestId);
    ChequeBookRequest refuseChequeBookRequest(Long requestId);
    List<ChequeBookRequest> getAllRequestsByClientId(Long clientId);
    List<ChequeBookRequest> getAllRequestsByAgentId(Long agentId);
    void deleteChequeBookRequest(Long id);
    ChequeBookRequest  getRequestById(Long id);
}
