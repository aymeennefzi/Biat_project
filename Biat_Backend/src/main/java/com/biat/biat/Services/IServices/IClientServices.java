package com.biat.biat.Services.IServices;

import com.biat.biat.Entites.Agence;
import com.biat.biat.Entites.Agent;
import com.biat.biat.Entites.Client;

import java.util.List;

public interface IClientServices {
    List<Client> GetAllClient();
    void removeClient(long id);
    Client getClientById(long id);
    Agent findAgentByClientId(Long clientId);
    Agence findAgenceByClientId(Long clientId);
    Client updateClient(Client client);

}
