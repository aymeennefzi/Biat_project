package com.biat.biat.Controllers;

import com.biat.biat.Entites.Agent;
import com.biat.biat.Exception.RessourceNotFound;
import com.biat.biat.Services.IServices.IAgentServices;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("*")
@RequestMapping("/agent")
@RequiredArgsConstructor
public class AgentController {

private final IAgentServices agentServices;
    @GetMapping(path = "/all")
    public ResponseEntity<?> getAllAgent() {

        try {
            List<Agent> Agents = agentServices.GettAllAgent();
            if (Agents.isEmpty()) {
                return ResponseEntity.status(HttpStatus.OK).body("Liste est vide ");
            }
            return ResponseEntity.ok(Agents);
        } catch (RessourceNotFound exception) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("quelque chose mal passé"+exception.getMessage());
        }
    }

    @DeleteMapping(path = "/supprimer/{id}")
    public ResponseEntity<String> SupprimerAgent(@PathVariable("id") long agentId) {
        try {
            agentServices.removeAgent(agentId);
            return ResponseEntity.ok("agent deleted Successfuly");
        } catch (RessourceNotFound e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
    @PutMapping("/dassign/{id}")
    public ResponseEntity<Agent> dassignAgentFromAgence(@PathVariable("id") Long agentId) {
        Agent updatedAgent = agentServices.dassignAgentFromAgence(agentId);
        return ResponseEntity.ok(updatedAgent);
    }

    @GetMapping("/productivity-comparison/{agentId1}/{agentId2}")
    public ResponseEntity<Map<String, Object>> comparerProductivite(@PathVariable Long agentId1, @PathVariable Long agentId2) {
        int comptesAgent1 = agentServices.getNombreComptesCrees(agentId1);
        int comptesAgent2 = agentServices.getNombreComptesCrees(agentId2);

        Map<String, Object> resultat = new HashMap<>();
        resultat.put("agentId1", agentId1);
        resultat.put("comptesAgent1", comptesAgent1);
        resultat.put("agentId2", agentId2);
        resultat.put("comptesAgent2", comptesAgent2);

        return ResponseEntity.ok(resultat);
    }
    @GetMapping("/by-agence/{agenceId}")
    public ResponseEntity<List<Agent>> getAgentsByAgenceId(@PathVariable Long agenceId) {
        List<Agent> agents = agentServices.getAgentsByAgenceId(agenceId);
        return ResponseEntity.ok(agents);
    }
    @GetMapping("/{id}")
    public Agent getAgentByIdWithDetails(@PathVariable Long id) {
        return agentServices.getAgentByIdWithAgence(id);
    }

}
