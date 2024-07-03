package com.biat.biat.Services.ServiceImpl;
import com.biat.biat.Entites.*;
import com.biat.biat.Exception.RessourceNotFound;
import com.biat.biat.Repository.ChequeBookRequestRepository;
import com.biat.biat.Repository.ICompteRepository;
import com.biat.biat.Services.IServices.IChequeBookRequests;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class ChequeBookServiceImplements implements IChequeBookRequests {
    @Autowired
    private ChequeBookRequestRepository chequeBookRequestRepository;
    @Autowired
    private ICompteRepository compteRepository ;

    @Autowired
    private SendEmailServiceImp sendEmailService;

@Override
public ChequeBookRequest createChequeBookRequest(ChequeBookRequest request) {
    try {
        if (chequeBookRequestRepository.existsActiveRequestByClientId(request.getClient().getId())) {
            throw new IllegalArgumentException("Client already has an active cheque book request.");
        }
        Compte compte = compteRepository.findByClient_Id(request.getClient().getId());
        if (compte == null) {
            throw new IllegalArgumentException("Client does not have an account.");
        }
        if (compte.getTypeCompte() != TypeCompte.CHEQUIER) {
            throw new IllegalArgumentException("Cheque book request can only be made for 'CHEQUIER' accounts.");
        }
        ChequeBookRequest lastRefusedRequest = chequeBookRequestRepository.findTopByClientIdAndStatusOrderByRefusalDateDesc(request.getClient().getId(), "REFUSED");
        if (lastRefusedRequest != null) {
            LocalDateTime refusalDate = LocalDateTime.ofInstant(lastRefusedRequest.getRefusalDate().toInstant(), ZoneId.systemDefault());
            LocalDateTime threeMonthsLater = refusalDate.plusMonths(3);
            if (LocalDateTime.now().isBefore(threeMonthsLater)) {
                throw new IllegalArgumentException("Client can only submit a new cheque book request three months after the last refusal.");
            }
        }
        request.setRequestDate(new Date());
        request.setStatus("PENDING");
        return chequeBookRequestRepository.save(request);
    } catch (IllegalArgumentException e) {
        throw e;
    } catch (Exception e) {
        e.printStackTrace();
        throw new IllegalArgumentException("An unexpected error occurred while creating the cheque book request.", e);
    }
}
    @Transactional
    public ChequeBookRequest approveChequeBookRequest(Long requestId) {
        ChequeBookRequest request = chequeBookRequestRepository.findById(requestId)
                .orElseThrow(() -> new IllegalArgumentException("Request not found"));
        if (!"PENDING".equals(request.getStatus())) {
            throw new IllegalArgumentException("Cannot approve request. Status is not PENDING.");
        }
        request.setStatus("APPROVED");
        request.setAcceptedDate(new Date());
        String email=request.getClient().getEmail();
        String subject = "Your Cheque Book Request has been Approved";
        String body = "Dear " + request.getClient().getNom() + " a ," +new Date()+"\n\n"+
                "Your cheque book request has been approved.\n\n" +
                "Regards,\nYour Biat Bank";
        sendEmailService.sendEmail(email, body, subject);
        return chequeBookRequestRepository.save(request);
    }

    @Transactional
    public ChequeBookRequest refuseChequeBookRequest(Long requestId) {
        ChequeBookRequest request = chequeBookRequestRepository.findById(requestId)
                .orElseThrow(() -> new IllegalArgumentException("Request not found"));

        if (!"PENDING".equals(request.getStatus())) {
            throw new IllegalArgumentException("Cannot refuse request. Status is not PENDING.");
        }
        request.setStatus("REFUSED");
        request.setRefusalDate(new Date());
        String email=request.getClient().getEmail();
        String subject = "Your Cheque Book Request has  been REFUSED";
        String body = "Dear " + request.getClient().getNom() + " a ," +new Date()+"\n\n"+
                "Your cheque book request has been REFUSED.\n\n" +
                "Regards,\nYour Biat Bank";
        sendEmailService.sendEmail(email, body, subject);
        return chequeBookRequestRepository.save(request);
    }
    public List<ChequeBookRequest> getAllRequestsByClientId(Long clientId) {
        return chequeBookRequestRepository.findAllByClient_Id(clientId);
    }
    public List<ChequeBookRequest> getAllRequestsByAgentId(Long agentId) {
        return chequeBookRequestRepository.findAllByAgent_Id(agentId);
    }

    public void deleteChequeBookRequest(Long id) {
        Optional<ChequeBookRequest> chequeBookRequestOptional = chequeBookRequestRepository.findById(id);
        if (chequeBookRequestOptional.isPresent()) {
            chequeBookRequestRepository.deleteById(id);
        } else {
            throw new RessourceNotFound("ChequeBookRequest not found with id: " + id);
        }
    }
    @Override
    public ChequeBookRequest  getRequestById(Long id) {
        ChequeBookRequest request=chequeBookRequestRepository.findById(id).orElseThrow(()-> new RessourceNotFound("demande n'exite pas avec id"+id));
        return request;
    }
}
