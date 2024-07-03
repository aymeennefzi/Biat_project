package com.biat.biat.Controllers;
import com.biat.biat.Entites.ChequeBookRequest;
import com.biat.biat.Exception.RessourceNotFound;
import com.biat.biat.Services.ServiceImpl.ChequeBookServiceImplements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/chequeBook")
@CrossOrigin("*")
public class ChequeBookController {
    @Autowired
    private ChequeBookServiceImplements chequeBookRequestService;
    @PostMapping()
    public ResponseEntity<Object> createChequeBookRequest(@RequestBody ChequeBookRequest request) {
        try {
            ChequeBookRequest createdRequest = chequeBookRequestService.createChequeBookRequest(request);
            return ResponseEntity.ok().body("{\"response\": \"" + createdRequest.getId() + "\"}");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error creating cheque book request: " + e.getMessage());
        }
    }
    @PutMapping("/approve/{requestId}")
    public ResponseEntity<?> approveChequeBookRequest(@PathVariable Long requestId) {
        try {
            ChequeBookRequest approvedRequest = chequeBookRequestService.approveChequeBookRequest(requestId);
            return ResponseEntity.ok(approvedRequest);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
    @PutMapping("/refuse/{requestId}")
    public ResponseEntity<?> refuseChequeBookRequest(@PathVariable Long requestId) {
        try {
            ChequeBookRequest refusedRequest = chequeBookRequestService.refuseChequeBookRequest(requestId);
            return ResponseEntity.ok(refusedRequest);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
    @GetMapping("/client/{clientId}")
    public ResponseEntity<List<ChequeBookRequest>> getAllRequestsByClientId(@PathVariable Long clientId) {
        List<ChequeBookRequest> requests = chequeBookRequestService.getAllRequestsByClientId(clientId);
        return ResponseEntity.ok(requests);
    }

    @GetMapping("/agent/{agentId}")
    public ResponseEntity<List<ChequeBookRequest>> getAllRequestsByAgentId(@PathVariable Long agentId) {
        List<ChequeBookRequest> requests = chequeBookRequestService.getAllRequestsByAgentId(agentId);
        return ResponseEntity.ok(requests);
    }
    @DeleteMapping(path = "/supprimer/{id}")
    public ResponseEntity<String> SupprimerRequest(@PathVariable("id") long id) {
        try {
            chequeBookRequestService.deleteChequeBookRequest(id);
            return ResponseEntity.ok("request deleted Successfuly");
        } catch (RessourceNotFound e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/demande/{id}")
    public ResponseEntity<ChequeBookRequest> getDemandeById(@PathVariable("id") Long id) {
        ChequeBookRequest demande = chequeBookRequestService.getRequestById(id);
        return ResponseEntity.ok(demande);
    }
}

