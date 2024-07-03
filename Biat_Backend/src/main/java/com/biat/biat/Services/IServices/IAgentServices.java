package com.biat.biat.Services.IServices;

import com.biat.biat.Entites.Agent;

import java.util.List;

public interface IAgentServices {

    List<Agent>GettAllAgent();
    void removeAgent(long idAgent);
    Agent updateAgent(Agent agent);
    Agent dassignAgentFromAgence(Long agentId) ;

    int getNombreComptesCrees(Long agentId);
    List<Agent> getAgentsByAgenceId(Long agenceId);
    Agent getAgentByIdWithAgence(long id);
}
