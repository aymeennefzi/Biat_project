package com.biat.biat.Controllers;

import com.biat.biat.Entites.Agence;
import com.biat.biat.Entites.Agent;
import com.biat.biat.Entites.Client;
import com.biat.biat.Entites.Compte;
import com.biat.biat.Exception.RessourceNotFound;
import com.biat.biat.Services.IServices.IClientServices;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/client")
@RequiredArgsConstructor
public class ClientController {
    private final IClientServices clientServices;

    @GetMapping(path = "/all")
    public ResponseEntity<?> getAll() {

        try {
            List<Client> comptes = clientServices.GetAllClient();
            if (comptes.isEmpty()) {
                return ResponseEntity.status(HttpStatus.OK).body("Liste est vide ");
            }
            return ResponseEntity.ok(comptes);
        } catch (RessourceNotFound exception) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("quelque chose mal passé" + exception.getMessage());
        }
    }

    @DeleteMapping(path = "/supprimer/{id}")
    public ResponseEntity<String> SupprimerAgent(@PathVariable("id") long idClient) {
        try {
            clientServices.removeClient(idClient);
            return ResponseEntity.ok("Client deleted Successfuly");
        } catch (RessourceNotFound e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
    @GetMapping(path = "/{id}")
    public Client getClientById(@PathVariable("id") long id) {
        return clientServices.getClientById(id);
    }
    @GetMapping("/{clientId}/agent")
    public ResponseEntity<Agent> getAgentByClientId(@PathVariable Long clientId) {
        Agent agent = clientServices.findAgentByClientId(clientId);
        return ResponseEntity.ok().body(agent);
    }

    @GetMapping("/{clientId}/agence")
    public ResponseEntity<Agence> getAgenceByClientId(@PathVariable Long clientId) {
        Agence agence = clientServices.findAgenceByClientId(clientId);
        return ResponseEntity.ok().body(agence);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Client> updateClient(@PathVariable Long id, @RequestBody Client client) {
        client.setId(id);
        Client updatedClient = clientServices.updateClient(client);
        return ResponseEntity.ok(updatedClient);
    }
}
