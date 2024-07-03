package com.biat.biat.Services.ServiceImpl;

import com.biat.biat.Entites.Agence;
import com.biat.biat.Entites.Agent;
import com.biat.biat.Exception.RessourceNotFound;
import com.biat.biat.Repository.IAgenceRepository;
import com.biat.biat.Repository.IAgentRepository;
import com.biat.biat.Services.IServices.IAgenceServices;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class IAgenceServiceImpl implements IAgenceServices {
private  final IAgenceRepository agenceRepository;
private final IAgentRepository agentRepository;

    @Override
    public Agence getAgenceByID(Long agentId) {
        return agenceRepository.findByAgentList_Id(agentId);
    }

    @Override

    public Agence AddAgence(Agence agence) {

        return agenceRepository.save(agence);
    }

    @Override
    public List<Agence> agenceListe() {
      return agenceRepository.findAll();
    }

    @Override
    @Transactional
    public Agence assignAgentsToAgence(Long agenceId, List<Long> agentIds) throws EntityNotFoundException {
        Agence agence = agenceRepository.findById(agenceId).orElseThrow(() -> new EntityNotFoundException("Agence not found with id: " + agenceId));

        List<Agent> agents = new ArrayList<>();
        for (Long agentId : agentIds) {
            Agent agent = agentRepository.findById(agentId).orElseThrow(() -> new EntityNotFoundException("Agent not found with id: " + agentId));
            agent.setAgence(agence);
            agents.add(agent);
        }

        agence.setAgentList(agents);
        return agenceRepository.save(agence);
    }

    @Override
    @Transactional
    public Agence dassignAgentsToAgence(Long agenceId, List<Long> agentIds) {
        // Trouver l'agence par son ID
        Agence agence = agenceRepository.findById(agenceId)
                .orElseThrow(() -> new EntityNotFoundException("Agence not found with id: " + agenceId));

        // Parcourir la liste des IDs d'agents à désaffecter
        for (Long agentId : agentIds) {
            // Trouver chaque agent par son ID
            Agent agent = agentRepository.findById(agentId)
                    .orElseThrow(() -> new EntityNotFoundException("Agent not found with id: " + agentId));

            // Désaffecter l'agent de l'agence en mettant à jour l'agence de l'agent à null
            agent.setAgence(null);

            // Sauvegarder les modifications pour chaque agent
            agentRepository.save(agent);
        }

        // Retourner l'agence après la désaffectation des agents
        return agence;
    }

    @Override
    public void deleteAgence(long agence) {
        Optional<Agence> agence1=agenceRepository.findById(agence);
        if(agence1.isPresent()){
            agenceRepository.deleteById(agence);
        }

    }
    @Override
    public Agence modifierUneAgence(Agence agence) {
        Optional<Agence> agenceToupdate=agenceRepository.findById(agence.getId());
        if(agenceToupdate.isPresent()){
            Agence agenceReadyToUpdate = agenceToupdate.get();
            agenceReadyToUpdate.setNom(agence.getNom());
            agenceReadyToUpdate.setVille(agence.getVille());
            agenceReadyToUpdate.setAdresse(agence.getAdresse());
            agenceReadyToUpdate.setFax(agence.getFax());
            agenceReadyToUpdate.setEmail(agence.getEmail());
            agenceReadyToUpdate.setTelephone(agence.getAdresse());
            agenceReadyToUpdate.setCodePostal(agence.getCodePostal());

            return agenceRepository.save(agenceReadyToUpdate);
        } else {
            throw new RessourceNotFound("etudiant not found avec id : " + agence.getId());
        }
    }

    @Override
    public Agence getAgenceByiD(Long idAgence) {
        Agence agence=agenceRepository.findById(idAgence).orElseThrow(()-> new RessourceNotFound("agence n'exite pas avec id"+idAgence));
        return agence;
    }

}
