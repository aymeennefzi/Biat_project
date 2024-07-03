package com.biat.biat.Services.ServiceImpl;

import com.biat.biat.Entites.*;
import com.biat.biat.Exception.RessourceNotFound;
import com.biat.biat.Repository.IAgenceRepository;
import com.biat.biat.Repository.IAgentRepository;
import com.biat.biat.Repository.IClientRepository;
import com.biat.biat.Repository.ICompteRepository;
import com.biat.biat.Services.IServices.ICompteServices;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class ICompteServicesImp implements ICompteServices {
    private final ICompteRepository compteRepository;
    private final IAgentRepository agentRepository;
    private final IAgenceRepository agenceRepository;
    private final IClientRepository clientRepository;

    @Override
    public List<Compte> getAllAcoutByAgence(Long idAgence) {
        return compteRepository.findByAgence_Id(idAgence);
    }

    @Override
    @Transactional
    public Compte ajouterCompte(Compte compte) {
        System.out.println("Client associé au compte : " + compte.getClient());

        if (compte.getClient() == null) {
            throw new RuntimeException("Client must be specified for the compte.");
        }
        System.out.println("Client associé au compte : " + compte.getClient());

        Optional<Client> clientOpt = clientRepository.findById(compte.getClient().getId());

        Optional<Agent> agentOpt = agentRepository.findById(compte.getAgent().getId());
        Optional<Agence> agenceOpt = agenceRepository.findById(compte.getAgence().getId());
        if (clientOpt.isPresent() && agentOpt.isPresent() && agenceOpt.isPresent()) {
            compte.setClient(clientOpt.get());
            compte.setAgent(agentOpt.get());
            compte.setAgence(agenceOpt.get());
            compte.setSolde(0);
            compte.setDateCreation(new Date());
            return compteRepository.save(compte);
        } else {
            throw new RuntimeException("Client, Agent, or Agence not found");
        }
    }

    @Override
    public List<Compte> getAllAcout() {
        return compteRepository.findAll();
    }

    public TypeCompte getTypeCompteByClientId(Long clientId) {
        Compte compte = compteRepository.findByClient_Id(clientId);
        if (compte == null) {
            throw new IllegalArgumentException("Client does not have an account.");
        }
        return compte.getTypeCompte();
    }

    @Override
    public int getNbAcoutByTypeCompte(TypeCompte typeCompte) {
        List<Compte> compteList = compteRepository.findByTypeCompte(typeCompte);
        return compteList.size();
    }

    @Override
    public Compte addAcount(Long idAgent, Long idClient, Compte compte, Long idAgence) {
        Optional<Client> clientOpt = clientRepository.findById(idClient);
        Optional<Agent> agentOpt = agentRepository.findById(idAgent);
        Optional<Agence> agenceOpt = agenceRepository.findById(idAgence);

        if (clientOpt.isPresent() && agentOpt.isPresent() && agenceOpt.isPresent()) {
            compte.setClient(clientOpt.get());
            compte.setAgent(agentOpt.get());
            compte.setAgence(agenceOpt.get());
            return compteRepository.save(compte);
        } else {
            throw new RuntimeException("Client, Agent, or Agence not found");
        }
    }

    @Override
    public Compte  updateAccount(Compte compte) {
        Optional<Compte> compteOpt = compteRepository.findById(compte.getId());
        if (compteOpt.isPresent()) {
            Compte existingCompte = compteOpt.get();
            existingCompte.setNumeroCompte(compte.getNumeroCompte());
            existingCompte.setTypeCompte(compte.getTypeCompte());
            existingCompte.setSolde(compte.getSolde());
            existingCompte.setDateCreation(compte.getDateCreation());
            existingCompte.setClient(compte.getClient());
            existingCompte.setAgent(compte.getAgent());
            existingCompte.setAgence(compte.getAgence());
            return  compteRepository.save(existingCompte);
        } else {
            throw new RessourceNotFound("etudiant not found avec id : " + compte.getId());
        }
    }

    public void deleteAccount(Long id) {
        if (compteRepository.existsById(id)) {
            compteRepository.deleteById(id);
        } else {
            throw new RuntimeException("Compte non trouvé avec l'ID : " + id);
        }
    }

    public Compte getCompteById(Long id) {
        return compteRepository.findById(id)
                .orElseThrow(() -> new RessourceNotFound("Compte not found avec id : " + id));
    }

    public Double getSoldeByClientId(Long clientId) {
        return compteRepository.findSoldeByClientId(clientId);
    }
}
