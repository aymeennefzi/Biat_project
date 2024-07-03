package com.biat.biat.Controllers;

import com.biat.biat.Entites.Agence;
import com.biat.biat.Entites.Agent;
import com.biat.biat.Entites.Compte;
import com.biat.biat.Entites.TypeCompte;
import com.biat.biat.Exception.RessourceNotFound;
import com.biat.biat.Services.IServices.ICompteServices;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("*")
@RequestMapping("/compte")
@RequiredArgsConstructor
public class CompteController {
private final ICompteServices compteServices;

    @GetMapping(path = "/all/{idAgence}")
    public ResponseEntity<?> getAllAgentByAgence(@PathVariable("idAgence")Long idAgence) {

        try {
            List<Compte> comptes = compteServices.getAllAcoutByAgence(idAgence);
            if (comptes.isEmpty()) {
                return ResponseEntity.status(HttpStatus.OK).body("Liste est vide ");
            }
            return ResponseEntity.ok(comptes);
        } catch (RessourceNotFound exception) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("quelque chose mal passé"+exception.getMessage());
        }
    }
    @PostMapping(path = "/add")
    public ResponseEntity<?> AjouterCompte(@RequestBody Compte compte) {
        try {

            if (compte.getClient() == null) {
                return new ResponseEntity<>("Client cannot be null", HttpStatus.BAD_REQUEST);
            }
            return new ResponseEntity<>(compteServices.ajouterCompte(compte), HttpStatus.CREATED);
        } catch (RessourceNotFound exception) {
            return new ResponseEntity<>(exception.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PostMapping(path = "/addAcount/{idAgent}/{idClient}/{idAgence}")
    public ResponseEntity<?> AjouterCompte(@RequestBody Compte compte,@PathVariable("idAgent") Long idAgent,@PathVariable("idClient") Long idClient,@PathVariable("idAgence") Long idAgence) {
        try {
            return new ResponseEntity<>(compteServices.addAcount(idAgent,idAgence,compte,idClient), HttpStatus.CREATED);
        } catch (RessourceNotFound exception) {
            return new ResponseEntity<>(exception.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(path = "/all")
    public ResponseEntity<?> getAll() {

        try {
            List<Compte> comptes = compteServices.getAllAcout();
            if (comptes.isEmpty()) {
                return ResponseEntity.status(HttpStatus.OK).body("Liste est vide ");
            }
            return ResponseEntity.ok(comptes);
        } catch (RessourceNotFound exception) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("quelque chose mal passé"+exception.getMessage());
        }
    }

    @GetMapping("/type/{clientId}")
    public ResponseEntity<TypeCompte> getTypeCompteByClientId(@PathVariable Long clientId) {
        try {
            TypeCompte typeCompte = compteServices.getTypeCompteByClientId(clientId);
            return ResponseEntity.ok(typeCompte);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @GetMapping("/NbCompteByType")
    public ResponseEntity<Map<String, Object>> NbCompteByType() {
        int comptesEp = compteServices.getNbAcoutByTypeCompte(TypeCompte.EPARGNE);
        int compteCourant = compteServices.getNbAcoutByTypeCompte(TypeCompte.COURANT);
        int compteChequier= compteServices.getNbAcoutByTypeCompte(TypeCompte.CHEQUIER);
        Map<String, Object> resultat = new HashMap<>();
        resultat.put("ep", comptesEp);
        resultat.put("courant", compteCourant);
        resultat.put("chequier", compteChequier);
        return ResponseEntity.ok(resultat);
    }


    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateAccount( @RequestBody Compte updatedCompte) {
        try {
            compteServices.updateAccount(updatedCompte);
            return ResponseEntity.ok("Compte mis à jour avec succès.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erreur lors de la mise à jour du compte: " + e.getMessage());
        }
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteAccount(@PathVariable Long id) {
        try {
            compteServices.deleteAccount(id);
            return ResponseEntity.ok("Compte supprimé avec succès.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erreur lors de la suppression du compte: " + e.getMessage());
        }
    }
    @GetMapping("/{id}")
    public ResponseEntity<Compte> getCompteById(@PathVariable Long id) {
        Compte compte = compteServices.getCompteById(id);
        return ResponseEntity.ok(compte);
    }
    @GetMapping("/solde/{clientId}")
    public ResponseEntity<Double> getSoldeByClientId(@PathVariable Long clientId) {
        Double solde = compteServices.getSoldeByClientId(clientId);
        return ResponseEntity.ok(solde);
    }
}
